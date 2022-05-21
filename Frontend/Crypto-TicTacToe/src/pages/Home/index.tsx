import { FC } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/images/Logo.png";

const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginBottom: "100px",
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
  userSelect: "none",
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
    color: "rgba(255,255,255,0.7)",
    background: "rgba(255, 255, 255, 0.1)",
  },
}));

const Index: FC = () => {
  const navigate = useNavigate();

  return (
    <MainDiv>
      <Logo src={AppLogo} />
      <CustomButtons onClick={() => navigate("/lobby")}>
        GAME LOBBY
      </CustomButtons>
      <CustomButtons onClick={() => navigate("/collection")}>
        COLLECTION
      </CustomButtons>
      <CustomButtons onClick={() => navigate("/info")}>
        HOW IT WORKS?
      </CustomButtons>
    </MainDiv>
  );
};

export default Index;
