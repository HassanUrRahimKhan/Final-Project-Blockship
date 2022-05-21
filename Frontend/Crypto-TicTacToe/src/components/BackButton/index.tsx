import { FC } from "react";
import { styled } from "@mui/material/styles";
import BackIcon from "../../assets/images/backlogo.svg";
import { useNavigate } from "react-router-dom";

const BackButton = styled("div")<{ visible?: boolean }>(
  ({ theme, visible }) => ({
    height: "42.5px",
    background: "rgba(255, 255, 255, 0.1)",
    visibility: visible ? "hidden" : "visible",
    boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
    backdropFilter: "blur(4px)",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    padding: "5px 5px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "15px",
    fontWeight: 700,
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    position: "fixed",
    left: "15px",
    top: "0px",
    width: "fit-content",
    zIndex: "100",
    userSelect: "none",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.3)",
    },
  })
);

const Index: FC = () => {
  const navigate = useNavigate();
  return (
    <BackButton
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        navigate("/");
      }}
    >
      {
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          src={BackIcon}
          style={{ height: "90%", width: "100%", opacity: "0.7" }}
        />
      }
    </BackButton>
  );
};

export default Index;
