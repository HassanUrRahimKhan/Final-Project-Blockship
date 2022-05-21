import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/images/Logo.png";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { injected } from "../../utils/connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";

const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "50px 30px",
  paddingTop: "20px",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  width: "350px",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  margin: "10px auto",
  height: "175px",
  width: "250px",
}));

const CustomButtons = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  width: "95%",
  height: "50px",
  color: "rgba(255,255,255,0.3)",
  fontSize: "17px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  userSelect: "none",

  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
  },
}));

const ErrorMessage = styled("div")(({ theme }) => ({
  textAlign: "center",
  color: "rgba(255,255,255,0.5)",
  fontSize: "17px",
  fontWeight: 400,
  userSelect: "none",
  marginTop: "10px",
}));

const Index: FC = () => {
  const { activate } = useWeb3React();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [errorFlg, setErrorFlg] = useState(false);

  const getErrorMessage = (error: any) => {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorFrame
    ) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      return "An unknown error occurred. Check the console for more details.";
    }
  };

  const activateWallet = async () => {
    setErrorFlg(false);
    try {
      await activate(injected);
      localStorage.setItem("preConnected", "true");
      navigate("/home");
    } catch (e: any) {
      if (e.message !== "The user rejected the request.") {
        const err = getErrorMessage(e);
        setErrorMsg(err);
        setErrorFlg(true);
        console.log(err);
      } else {
        setErrorMsg("You rejected the wallet connection request.");
        setErrorFlg(true);
      }
    }
  };

  return (
    <MainDiv>
      <Logo src={AppLogo} />
      {errorFlg ? <ErrorMessage>Attention : {errorMsg}</ErrorMessage> : null}
      <CustomButtons
        onClick={() => {
          activateWallet();
        }}
      >
        CONNECT METAMASK
      </CustomButtons>
    </MainDiv>
  );
};

export default Index;
