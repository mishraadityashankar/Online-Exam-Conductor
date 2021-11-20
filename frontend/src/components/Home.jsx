import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import toast from "react-simple-toasts";
import axios from "axios";
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function Home(props) {
  const goToRegister = () => {
    props.setLayout("register");
  };
  const [user, setUser] = useState({ email: "", password: "" });

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
    <Box
      style={{
        backgroundColor: "lightblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        style={{
          height: "80%",
          overflow: "auto",
          width: "40%",
          backgroundColor: "white",
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          padding: "25px",
        }}
      >
        <Box
          style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Online Exam Conductor
        </Box>
        <Box style={{ fontSize: "14px", marginBottom: "10px" }}>
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
            style={{ padding: "5px", marginTop: "10px", marginBottom: "10px" }}
            color="success"
          >
            Login
          </Button>

          <Box
            style={{
              padding: "10px",
            }}
            onClick={goToRegister}
          >
            Need an account?{" "}
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
            >
              Register here
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
