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

const ChatBar = ({ onMessageSend }) => {
  const { register, handleSubmit, setValue } = useForm();

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          overflow: "auto",
          height: "183px",
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
      <Divider sx={{ mt: 1 }} />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit((data) => onMessageSend(data, setValue))}
      >
        <Stack direction="row" pt={1}>
          <TextField
            fullWidth
            variant="standard"
            label="Type your message here"
            size="small"
            {...register("chatMessageInput", {
              required: true,
            })}
          />
          <Button
            type="submit"
            sx={{ ml: 2, minWidth: "70px" }}
            variant="contained"
          >
            <Send />
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChatBar;
