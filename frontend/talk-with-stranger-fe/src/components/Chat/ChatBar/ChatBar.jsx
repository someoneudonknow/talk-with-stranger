import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import ChatMessageItem from "../ChatMessageItem/ChatMessageItem";

const ChatBar = ({ messages }) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        // height: "100%",
        width: "100%",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          overflow: "auto",
          width: "100%",
          display: "flex",
        }}
      >
        {messages.map((message, i) => (
          <ChatMessageItem
            key={i}
            active={message.isSender}
            messageRight={!message.isSender}
            sendAt={message.sendAt}
            text={message.text}
            username={message.username}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ChatBar;
