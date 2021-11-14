import { Drawer, Typography, Box, Avatar, Button } from "@mui/material";
import { textAlign } from "@mui/system";
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
            width: "350px",
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
            sx={{
              bgcolor: "orange",
              width: 150,
              height: 150,
              margin: "20px",
              fontSize: "42px",
            }}
          >
            A
          </Avatar>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Name : Aditya Shankar Mishra
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Email : xyz@xyz.com
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Role : Student
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Address : C22/74 Kabir Chaura, Varansi ggjgjgjjgjgjg
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Institute : C22/74 Kabir Chaura, Varansi ggjgjgjjgjgjg
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Contact : 983914718
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Class : xiii
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Rollno : 2017IMT005
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Expertise : Science, Maths
          </Box>
          <Box
            style={{
              width: "55%",
              paddingTop: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ marginRight: "10px" }}
              variant="outlined"
              color="secondary"
            >
              Update
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
