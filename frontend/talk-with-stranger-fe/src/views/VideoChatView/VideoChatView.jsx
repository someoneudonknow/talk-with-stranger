import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import VideoController from "../../components/VideoController/VideoController";
import ChatBar from "../../components/Chat/ChatBar/ChatBar";
import { ChatInput } from "../../components/Chat";
import useMedia from "../../hooks/useMedia";
import usePeer from "../../hooks/usePeer";
import socket from "../../socket/index";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const messages = [
  {
    sendAt: "2024-03-03T10:30:00Z",
    text: "Hello!",
    username: "John",
    isSender: true,
  },
  {
    sendAt: "2024-03-03T10:35:00Z",
    text: "Hi John, how are you?",
    username: "Sarah",
    isSender: false,
  },
];

const VideoChatView = () => {
  const [input, setInput] = useState("");
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef();
  const [conservation, setConservation] = useState(null);
  const callRef = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [
    localVolume,
    setLocalOptions,
    localOptions,
    localStream,
    devicesLoading,
  ] = useMedia(
    {
      audio: true,
      video: true,
    },
    localVideoRef
  );

  const [peerInstance, peerInitiating] = usePeer((call) => {
    if (callRef.current) {
      callRef.current.close();
    }
    call.answer(localStream);

    call.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });

    call.on("close", () => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    });
  });

  const [callLoading, setCallLoading] = useState(false);

  useEffect(() => {
    socket.on("conservation/founding", () => {
      setCallLoading(true);
    });

    socket.on("conservation/founded", (data) => {
      setCallLoading(false);
      setConservation(data);

      if (data.caller.userId === currentUser.id) {
        const call = peerInstance.call(data.receiver.peerId, localStream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });

        call.on("close", () => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
        });

        callRef.current = call;
      }
    });

    return () => {
      socket.off("conservation/founding");
      socket.off("conservation/founded");
      socket.emit("conservation/cancelFind", currentUser.id);
    };
  }, [peerInstance, currentUser.id, localStream]);

  const handleMicTonggle = () => {
    setLocalOptions((prev) => {
      const prevAudio = prev.audio;
      return { ...prev, audio: !prevAudio };
    });
  };

  const handleCameraTonggle = () => {
    setLocalOptions((prev) => {
      const prevVideo = prev.video;
      return { ...prev, video: !prevVideo };
    });
  };

  const handleSkipBtnClick = async () => {
    if (callRef.current) {
      callRef.current.close();
      remoteVideoRef.current.srcObject = null;
    }

    socket.emit("conservation/findRandom", {
      userId: currentUser.id,
      userName: `${currentUser.user_first_name}${currentUser.user_last_name}`,
      userAvatarUrl: currentUser.user_avatar,
      userCountry: currentUser.user_country,
      peerId: peerInstance.id,
    });
  };

  const handleMessageSend = (message, setValue) => {
    setValue("chatMessageInput", "");
  };

  const handleVolumeChange = (_, newValue) => {
    localVideoRef.current.volume = newValue / 100;
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 96px)",
      }}
    >
      <Typography>
        peer id: {peerInitiating ? <CircularProgress /> : peerInstance?.id}
      </Typography>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <Box sx={{ height: "50%" }}>
        <Grid container spacing={1} height="100%">
          <Grid sx={{ position: "relative" }} item xs={6}>
            <VideoController
              loading={devicesLoading || peerInitiating}
              options={localOptions}
              onMicBtnClick={handleMicTonggle}
              onCameraBtnClick={handleCameraTonggle}
              onVolumeChange={handleVolumeChange}
              ref={localVideoRef}
              onSkipBtnClick={handleSkipBtnClick}
              volume={localVolume}
              fullControl
            />
          </Grid>
          <Grid item xs={6}>
            <VideoController loading={callLoading} ref={remoteVideoRef} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "40%", overflow: "auto" }}>
        <ChatBar messages={messages} />
      </Box>
      <Box sx={{ height: "10%" }}>
        <Divider />
        <ChatInput onMessageSend={handleMessageSend} />
      </Box>
    </Box>
  );
};

export default VideoChatView;
