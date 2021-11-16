import { Drawer, Typography, Box, Avatar, Button } from "@mui/material";
import { textAlign } from "@mui/system";
import React, { useState } from "react";

function Navbar(props) {
  const [open, setOpen] = useState(false);
  const userDetails = props.userDetails;
  const handleLogout = () => {
    localStorage.removeItem("OEC_token");
    props.setLayout("home");
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const handleBox1 = () => {
    if (userDetails.role === "Student") {
      props.setCurrPage("examList");
    } else {
      props.setCurrPage("createQuestion");
    }
  };

  const handleBox2 = () => {
    if (userDetails.role === "Student") {
      console.log("Student");
    } else {
      props.setCurrPage("createExam");
    }
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#3399ff",
          color: "white",
          cursor: "pointer",
        }}
      >
        <Box style={{ fontSize: "28px", fontWeight: "bold" }}>
          Online Exam Conductor
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          <Box onClick={() => props.setLayout("register")}>Register</Box>
          <Box onClick={handleBox1}>
            {userDetails.role === "Student" ? "Exam List" : "Create Question"}
          </Box>
          <Box onClick={handleBox2}>
            {userDetails.role === "Student" ? "My Grades" : "Create Exam"}
          </Box>
          <Box onClick={toggleDrawer(true)}>Profile</Box>
        </Box>
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
            Name : {userDetails.name}
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Email : {userDetails.email}
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Role : {userDetails.role}
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Address : {userDetails.address}
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Institute : {userDetails.institute}
          </Box>
          <Box style={{ padding: "5px", textAlign: "center" }}>
            Contact : {userDetails.contact}
          </Box>
          {userDetails.role === "Student" ? (
            <>
              {" "}
              <Box style={{ padding: "5px", textAlign: "center" }}>
                Class : {userDetails.class}
              </Box>
              <Box style={{ padding: "5px", textAlign: "center" }}>
                Rollno : {userDetails.rollNo}
              </Box>{" "}
            </>
          ) : (
            <Box style={{ padding: "5px", textAlign: "center" }}>
              Expertise : {userDetails.expertise}
            </Box>
          )}

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
              onClick={() => props.setCurrPage("editProfile")}
            >
              Update
            </Button>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
