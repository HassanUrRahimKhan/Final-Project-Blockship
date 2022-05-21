/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import OnlinePlayers from "./components/OnlinePlayers";
import GameRequests from "./components/GameRequests";
import { ref, onChildAdded, onChildRemoved, onValue } from "firebase/database";
import axios from "axios";
import { database } from "../../utils/firebase";
import { useWeb3React } from "@web3-react/core";
import { baseUrl } from "../../utils/urls";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
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

  [theme.breakpoints.down("smd")]: {
    marginTop: "75px",
  },
}));

const SubLayout = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  padding: "30px",
  paddingTop: "40px",

  [theme.breakpoints.down("smd")]: {
    padding: "19px",
    flexDirection: "column-reverse",
  },
}));

const SubDiv = styled("div")(({ theme }) => ({
  width: "45%",
  height: "fit-content",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",

  [theme.breakpoints.down("smd")]: {
    width: "570px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: "20px",
  },
}));

const Index: FC = () => {
  const { account } = useWeb3React();

  let [onlinePlayers, setOnlinePlayers] = useState<string[] | [] | any>([]);
  let [requestPlayers, setRequestPlayers] = useState<string[] | [] | any>([]);
  let [requestedToPlayers, setRequestedToPlayers] = useState<
    string[] | [] | any
  >([]);

  let [connectionStatus, setConnectionStatus] = useState<boolean>(false);
  let [connectionKey, setConnectionKey] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const socket = io(baseUrl, { transports: ["websocket"] });
  const navigate = useNavigate();

  const getOnlineUsers = () => {
    onChildAdded(ref(database, "/onlineUsers"), (data) => {
      if (data.val() != account) {
        onlinePlayers.push(data.val());
      }
      setOnlinePlayers([...onlinePlayers]);
    });
    onChildRemoved(ref(database, "/onlineUsers"), (data) => {
      onlinePlayers = onlinePlayers.filter((e: string) => e !== data.val());
      setOnlinePlayers([...onlinePlayers]);
    });
  };

  const getRequestedUsers = () => {
    onChildAdded(
      ref(database, "/usersInfo/" + account + "/requests"),
      (data) => {
        requestPlayers.push(data.val());
        setRequestPlayers([...requestPlayers]);
      }
    );
    onChildRemoved(
      ref(database, "/usersInfo/" + account + "/requests"),
      (data) => {
        requestPlayers = requestPlayers.filter((e: string) => e !== data.val());
        setRequestPlayers([...requestPlayers]);
      }
    );
  };

  const getRequestedToUsers = () => {
    onChildAdded(
      ref(database, "/usersInfo/" + account + "/requestedTo"),
      (data) => {
        requestedToPlayers.push(data.val());
        setRequestedToPlayers([...requestedToPlayers]);
      }
    );
    onChildRemoved(
      ref(database, "/usersInfo/" + account + "/requestedTo"),
      (data) => {
        requestedToPlayers = requestedToPlayers.filter(
          (e: string) => e !== data.val()
        );
        setRequestedToPlayers([...requestedToPlayers]);
      }
    );
  };

  const lookForGame = () => {
    onValue(ref(database, "/usersInfo/" + account + "/game"), (data) => {
      if (data.val() != "-" && data.val() != null) {
        setGameId(data.val());
      }
    });
  };

  const goOnline = async () => {
    if (socket && account) {
      socket.on("connect", function () {
        socket.emit("join", account);
        socket.on("joined", (key) => {
          if (key != "error") {
            setConnectionKey(key);
            setConnectionStatus(true);
            getOnlineUsers();
            getRequestedUsers();
            getRequestedToUsers();
            lookForGame();
          }
        });
      });
    }
  };

  const requestPlay = async (player: string) => {
    if (connectionKey != "") {
      await axios.get(
        baseUrl + "/nfttt/sendRequest/" + player + "/" + connectionKey
      );
    }
  };

  const play = async (player: string) => {
    if (connectionKey != "") {
      await axios.get(
        baseUrl + "/nfttt/acceptRequest/" + player + "/" + connectionKey
      );
    }
  };

  useEffect(() => {
    if (gameId != "" && connectionKey != "") {
      navigate("/game/" + gameId + "/" + connectionKey);
    }
  }, [gameId]);

  useEffect(() => {
    onlinePlayers = [];
    requestPlayers = [];
    requestedToPlayers = [];
    setConnectionStatus(false);
    goOnline();

    return () => {
      socket.close();
    };
  }, [account]);

  return (
    <MainDiv>
      <BackButton />
      <Heading>GAME LOBBY</Heading>
      {connectionStatus ? (
        <SubLayout>
          <SubDiv>
            <OnlinePlayers
              players={onlinePlayers}
              requestPlay={requestPlay}
              requestedToPlayers={requestedToPlayers}
            />
          </SubDiv>
          <SubDiv>
            <GameRequests
              players={requestPlayers}
              play={play}
              onlinePlayers={onlinePlayers}
            />
          </SubDiv>
        </SubLayout>
      ) : (
        <>
          <Heading style={{ marginTop: "55px", fontSize: "20px" }}>
            Connecting.....
          </Heading>
          <Heading
            style={{ marginTop: "10px", fontSize: "15px", margin: "0px 10px" }}
          >
            "Make sure you are not connected with same wallet address on another
            device, window or tab."
          </Heading>
        </>
      )}
    </MainDiv>
  );
};

export default Index;
