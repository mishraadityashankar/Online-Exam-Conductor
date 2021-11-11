import { Drawer, Typography, Box, Avatar, Button } from "@mui/material";
import React, { useState } from "react";

function Navbar(props) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "blue",
          color: "white",
          cursor: "pointer",
        }}
      >
        <Box>logo</Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "25%",
          }}
        >
          <Box type="button">Register</Box>
          <Box>Exam List</Box>
          <Box>Grades</Box>
        </Box>
        <Box onClick={toggleDrawer(true)}>login</Box>
      </Box>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          style={{
            width: "300px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            My Profile
          </Typography>
          <Avatar
            sx={{ bgcolor: "orange", width: 150, height: 150, margin: "20px" }}
          >
            A
          </Avatar>
          <Box style={{ padding: "10px" }}>Name : Aditya Shankar Mishra</Box>
          <Box style={{ padding: "10px" }}>Email : xyz@xyz.com</Box>
          <Box style={{ padding: "10px" }}>Role : Student</Box>
          <Box style={{ padding: "10px" }}>Contact : 983914718</Box>
          <Box
            style={{
              width: "55%",
              paddingTop: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined" color="secondary">
              Edit
            </Button>
            <Button variant="contained" color="primary">
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
