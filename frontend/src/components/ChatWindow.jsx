import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  getIconButtonUtilityClass,
  Grid,
  Typography,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Divider,
} from "@mui/material";
import io from "socket.io-client";

function ChatWindow(props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [user, setUser] = useState("");
  useEffect(() => {
    let socket = io();
    const user = props.userDetails;
    setUser(user);
    socket.emit("join-room", props.testId, user);
    socket.on("createMessage", (userName, msg) => {
      console.log(userName, msg);
      setMessages((oldMessages) => [...oldMessages, { userName, msg }]);
    });

    setSocket(socket);

    return () => socket.close();
  }, []);

  const handleSend = () => {
    console.log(input);
    socket.emit("message", user, input);
    console.log(messages);
    setInput("");
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <Typography
        style={{
          fontSize: "26px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Ask Doubt
      </Typography>
      <Box style={{ display: "flex", justifyItems: "space-between" }}>
        <TextField
          label="Ask Question"
          name="testName"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={input}
          onChange={handleChange}
          size="small"
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
      <Box
        style={{
          backgroundColor: "white",
          padding: "20px",
          height: "270px",
          overflow: "auto",
        }}
      >
        {messages.map((ele) => (
          <Box>
            <Typography
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {ele.userName}
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
              }}
            >
              {ele.msg}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default ChatWindow;
