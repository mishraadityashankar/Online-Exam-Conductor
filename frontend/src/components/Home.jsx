import React from "react";
import {
  Drawer,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
function Home(props) {
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
          <TextField label="Email" fullWidth size="small" />
          <TextField label="Password" fullWidth size="small" />
          <Button variant="contained" fullWidth color="success">
            Submit
          </Button>
        </Box>
        <Box>
          Need an account? <a href="#">Sign up</a>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
