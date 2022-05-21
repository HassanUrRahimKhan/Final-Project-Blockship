/* eslint-disable eqeqeq */
import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Web3 from "web3";
import { ABI } from "../../utils/contractABI";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import OpenseaLogo from "../../assets/images/opensea-logo.png";
import BackButton from "../../components/BackButton";

const MainDiv = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflowY: "scroll",
}));

const Heading = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "50px",
  fontSize: "30px",
  userSelect: "none",
  opacity: "0.3",

  [theme.breakpoints.down("sm")]: {
    marginTop: "75px",
  },
}));

const SubLayout = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "30px",
  paddingTop: "20px",
  flexWrap: "wrap",
}));

const TokenCard = styled("div")(({ theme }) => ({
  width: "230px",
  height: "230px",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  margin: "10px 15px",

  [theme.breakpoints.down("sm")]: {
    width: "95%",
    height: "fit-content",
  },
}));

const ClaimBtn = styled("div")(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  background: "rgba(255, 255, 255, 0.15)",
  color: "rgba(255, 255, 255, 0.7)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",
  position: "absolute",
  right: "-8px",
  bottom: "-8px",
  cursor: "pointer",
}));

const Index: FC = () => {
  const web3context = useWeb3React();
  const web3 = new Web3(web3context?.library?.currentProvider);
  const account = web3context.account;
  let [tickets, setTickets] = useState<any>([]);
  const [totalTickets, setTotalTickets] = useState(-1);

  useEffect(() => {
    getTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3context.account]);

  const getTokens = async () => {
    tickets = [];
    setTickets([...tickets]);
    setTotalTickets(-1);
    if (account && web3) {
      const contract = new web3.eth.Contract(
        JSON.parse(ABI),
        "0x7f0c1bAE7Ed06bF1479f1Be3B23CE08c4872dc7e"
      );
      const tokenCount = await contract.methods.balanceOf(account).call();
      const gameWin = await contract.methods.getUserGames(account).call();
      const ownedTokens = [];

      for (let i = 0; i < tokenCount; i++) {
        let tid = await contract.methods.tokenOfOwnerByIndex(account, i).call();
        ownedTokens.push(tid);
      }

      let URI, metadata, ownership;
      if (gameWin.length > 0) {
        for (let i = 0; i < parseInt(gameWin.length); i++) {
          if (gameWin[i] != 0) {
            URI = await contract.methods.tokenURI(parseInt(gameWin[i])).call();
            ownership = ownedTokens.includes(gameWin[i]);
            metadata = await axios.get(URI);

            if (ownership) {
              metadata["data"]["ownership"] = true;
              tickets = [...tickets, metadata.data];
            } else {
              metadata["data"]["ownership"] = false;
              tickets = [...tickets, metadata.data];
            }
          } else {
            break;
          }
        }
        setTickets(tickets);
      }
      setTotalTickets(parseInt(tickets.length));
    }
  };

  const mint = async (id: number) => {
    if (account && web3) {
      const contract = new web3.eth.Contract(
        JSON.parse(ABI),
        "0x7f0c1bAE7Ed06bF1479f1Be3B23CE08c4872dc7e"
      );
      contract.methods
        .mintNFTTT(account, id)
        .send({ from: account })
        .on(
          "confirmation",
          async function (confirmationNumber: any, receipt: any) {
            if (confirmationNumber === 1) {
              getTokens();
            }
          }
        );
    }
  };

  return (
    <MainDiv>
      <BackButton />
      <Heading>YOUR COLLECTION</Heading>
      <SubLayout>
        {totalTickets === -1 ? (
          <Heading style={{ fontSize: "20px" }}>Loading...</Heading>
        ) : null}
        {totalTickets === 0 ? (
          <Heading style={{ fontSize: "20px" }}>
            You don't have any tokens. If you just won a game, it might take
            some time to show here and you can claim.
          </Heading>
        ) : null}
        {tickets.map((e: any, i: any) => {
          return (
            <TokenCard>
              <img src={e.image} alt="" />
              {e.ownership ? (
                <a
                  href={
                    "https://testnets.opensea.io/assets/0x7f0c1bAE7Ed06bF1479f1Be3B23CE08c4872dc7e/" +
                    e.name.split("#")[1].toString()
                  }
                  target={"_blank"}
                  rel={"noreferrer"}
                  key={i}
                >
                  <img
                    src={OpenseaLogo}
                    alt=""
                    style={{
                      height: "40px",
                      width: "40px",
                      position: "absolute",
                      right: "-8px",
                      bottom: "-8px",
                      opacity: "0.3",
                    }}
                  />
                </a>
              ) : (
                <ClaimBtn
                  onClick={() => {
                    mint(parseInt(e.name.split("#")[1]));
                  }}
                >
                  Claim
                </ClaimBtn>
              )}
            </TokenCard>
          );
        })}
      </SubLayout>
    </MainDiv>
  );
};

export default Index;
