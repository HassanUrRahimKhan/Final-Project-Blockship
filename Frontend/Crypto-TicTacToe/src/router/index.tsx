import { FC, useEffect, useState } from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import ConnectWallet from "../pages/ConnectWallet";
import Home from "../pages/Home";
import Lobby from "../pages/Lobby";
import Collection from "../pages/Collection";
import Info from "../pages/Info";
import Game from "../pages/Game";
import PageNotFound from "../pages/PageNotFound";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connector";
import WinningPage from "../pages/WinningPage";
import LosingPage from "../pages/LosingPage";
import DrawPage from "../pages/DrawPage";
import axios from "axios";
import { baseUrl } from "../utils/urls";

const WalletConnectedRoutes = () => {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Navigate to={"/home"} />,
        },
        {
          path: "connectWallet",
          element: <Navigate to={"/home"} />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "lobby",
          element: <Lobby />,
        },
        {
          path: "collection",
          element: <Collection />,
        },
        {
          path: "info",
          element: <Info />,
        },
        {
          path: "game",
          children: [{ path: "*", element: <Game /> }],
        },
        {
          path: "won",
          element: <WinningPage />,
        },
        {
          path: "lost",
          element: <LosingPage />,
        },
        {
          path: "draw",
          element: <DrawPage />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
};

const WalletNotConnectedRoutes = () => {
  return useRoutes([
    {
      path: "connectWallet",
      element: <ConnectWallet />,
    },
    {
      path: "*",
      element: <Navigate to={"/connectWallet"} />,
    },
  ]);
};

const Index: FC = () => {
  const { activate, active } = useWeb3React();
  const navigate = useNavigate();
  const [checkingPreState, setCheckingPreState] = useState(true);

  useEffect(() => {
    axios.get(baseUrl + "/nfttt");
    reConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reConnect = async () => {
    if (localStorage.getItem("preConnected") === "true") {
      await activate(injected);
      setCheckingPreState(false);
      navigate(window.location.href.split("/")[3]);
    }
    setCheckingPreState(false);
  };

  return checkingPreState
    ? null
    : active
    ? WalletConnectedRoutes()
    : WalletNotConnectedRoutes();
};

export default Index;
