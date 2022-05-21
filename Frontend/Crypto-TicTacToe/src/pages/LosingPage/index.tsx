import { FC } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginBottom: "100px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "30px",
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

const Heading = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "30px",
  userSelect: "none",
  opacity: "0.5",
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
      <Heading>Sorry!</Heading>
      <br />
      <Heading style={{ fontSize: "15px" }}>
        you lost the match, try again.
      </Heading>
      <br />
      <CustomButtons onClick={() => navigate("/")}>TRY AGAIN</CustomButtons>
    </MainDiv>
  );
};

export default Index;
