import { FC } from "react";
import { styled } from "@mui/material/styles";
import AppLogo from "../../assets/images/Logo.png";
import BackButton from "../../components/BackButton";

const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginBottom: "100px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "20px 30px",
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
  userSelect: "none",
}));

const Index: FC = () => {
  return (
    <>
      <BackButton />
      <MainDiv>
        <Logo src={AppLogo} />
        <div
          style={{
            fontSize: "14px",
            fontWeight: 400,
            marginTop: "20px",
            opacity: "0.5",
            textAlign: "left",
            userSelect: "none",
          }}
        >
          &#8226; Connect with your Metamask wallet. <br />
          <br />
          &#8226; Play TicTacToe with online players. <br />
          <br />
          &#8226; Win and Collect Non-fungible tokens. <br />
          <br />
        </div>
      </MainDiv>
    </>
  );
};

export default Index;
