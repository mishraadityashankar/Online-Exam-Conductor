import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
} from "@mui/material";

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
    if (!validateEmail(user.email) || user.password === "") {
      alert("Enter the valid data");
    } else {
      axios
        .post("/user/login", user)
        .then((res) => {
          alert(res.data.message);
          if (res.data.message === "success") {
            localStorage.setItem("OEC_token", res.data.token);
            props.setLayout("main");
          }
        })
        .catch((err) => {
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
          height: "50vh",
          width: "30%",
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
        <Box
          style={{
            height: "65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            color="success"
          >
            Login
          </Button>
        </Box>

        <Box
          style={{
            padding: "10px",
          }}
          onClick={goToRegister}
          variant="p"
        >
          Need an account?{" "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
          >
            Sign up here
          </span>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
