import React, { useState } from "react";
import { Box, Grid, Button, TextField } from "@mui/material";
import toast from "react-simple-toasts";
import axios from "axios";
import { homeStyle } from "../styles/CommonStyle";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function Home(props) {
  const classes = homeStyle();

  const [user, setUser] = useState({ email: "", password: "" });

  const goToRegister = () => {
    props.setLayout("register");
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(user.email)) toast("Enter the valid email");
    else if (user.password === "") toast("Password cannot be empty");
    else {
      axios
        .post("/user/login", user)
        .then((res) => {
          toast(res.data.message);

          if (res.data.message === "success") {
            localStorage.setItem("OEC_token", res.data.token);
            props.setLayout("main");
          }
        })
        .catch((err) => {
          toast(err.message);
          console.log(err);
        });
    }
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Box className={classes.head}>Online Exam Conductor</Box>
        <Box className={classes.para}>
          Welcome, please enter your login credentials!
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
        <Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            className={classes.btn}
            color="success"
          >
            Login
          </Button>

          <Box className={classes.typo} onClick={goToRegister}>
            Need an account? <span className={classes.link}>Register here</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
