import { Box, Container, Grid, TextField } from "@mui/material";
import React from "react";
import VideoController from "../../components/VideoController/VideoController";
import ChatBar from "../../components/Chat/ChatBar/ChatBar";

const VideoChatView = () => {
  const handleMessageSend = (message, setValue) => {
    console.log(message);

    setValue("chatMessageInput", "");
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <VideoController />
      </Grid>
      <Grid item xs={6}>
        <VideoController onlyVolumeControl />
      </Grid>
      <Grid item xs={12}>
        <ChatBar onMessageSend={handleMessageSend} />
      </Grid>
    </Grid>
  );
};

export default VideoChatView;
