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
  {
    sendAt: "2024-03-03T10:40:00Z",
    text: "I'm doing well, thanks! How about you?",
    username: "John",
    isSender: true,
  },
  {
    sendAt: "2024-03-03T10:45:00Z",
    text: "I'm good too. Just busy with work.",
    username: "Sarah",
    isSender: false,
  },
  {
    sendAt: "2024-03-03T10:50:00Z",
    text: "That's understandable. Work can be demanding.",
    username: "John",
    isSender: true,
  },
  {
    sendAt: "2024-03-03T10:55:00Z",
    text: "Yes, it can be. But it's also rewarding.",
    username: "Sarah",
    isSender: false,
  },
  {
    sendAt: "2024-03-03T11:00:00Z",
    text: "Absolutely! The sense of accomplishment is great.",
    username: "John",
    isSender: true,
  },
  {
    sendAt: "2024-03-03T11:05:00Z",
    text: "By the way, do you want to grab lunch tomorrow?",
    username: "Sarah",
    isSender: true,
  },
  {
    sendAt: "2024-03-03T11:10:00Z",
    text: "Sure, that sounds like a plan! What time works for you?",
    username: "John",
    isSender: true,
  },
  {
    sendAt: "2024-03-03T11:15:00Z",
    text: "12:30 PM works for me. How about you?",
    username: "Sarah",
    isSender: false,
  },
  {
    sendAt: "2024-03-03T11:20:00Z",
    text: "Sounds good! Let's meet at that new restaurant downtown.",
    username: "John",
    isSender: false,
  },
];

const VideoChatView = () => {
  const [input, setInput] = useState("");
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef();
  const callRef = useRef();
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
    setCallLoading(true);

    if (callRef.current) {
      callRef.current.close();
    }

    const call = await peerInstance.call(input, localStream);

    call.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });

    call.on("close", () => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    });

    callRef.current = call;

    setCallLoading(false);
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
