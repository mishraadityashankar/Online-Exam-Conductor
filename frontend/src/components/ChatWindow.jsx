import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import io from "socket.io-client";
import { commonStyles, chatWindowStyles } from "../styles/CommonStyle";

function ChatWindow(props) {
  const classes1 = commonStyles();
  const classes2 = chatWindowStyles();
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
  }, [props.userDetails, props.testId]);

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
    <Box className={classes2.root}>
      <Typography className={classes1.subHeadingCenter}>
        Query Section
      </Typography>
      <Grid container spacing={2} className={classes1.formElement}>
        <Grid item xs={9}>
          <TextField
            label="Ask Question"
            name="testName"
            fullWidth
            value={input}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Grid>
      </Grid>
      <Box className={classes2.chatBox}>
        {messages.map((ele) => (
          <Box className={classes2.msgBox}>
            <Typography className={classes2.typo1}>{ele.userName}</Typography>
            <Typography className={classes2.typo2}>{ele.msg}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ChatWindow;
