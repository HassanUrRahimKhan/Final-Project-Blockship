import { FC } from "react";
import { styled } from "@mui/material/styles";

const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginBottom: "100px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "20px",
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
  opacity: "0.3",
}));

const Index: FC = () => {
  return (
    <MainDiv>
      <Heading>
        <span style={{ fontSize: "70px" }}>404</span> <br /> Page not found!
      </Heading>
    </MainDiv>
  );
};

export default Index;
