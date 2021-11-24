import { Drawer, Typography, Box, Avatar, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import toast from "react-simple-toasts";
import { navbarStyle } from "../styles/CommonStyle";
function Navbar(props) {
  const classes = navbarStyle();
  const [open, setOpen] = useState(false);
  const userDetails = props.userDetails;
  const handleLogout = () => {
    localStorage.removeItem("OEC_token");
    toast("Logged out successfully");
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

  const handleBox = () => {
    if (userDetails.role === "Student") {
      props.setCurrPage("resultHistory");
    } else {
      props.setCurrPage("createExam");
    }
  };

  const gotoUpdate = () => {
    setOpen(false);
    props.setCurrPage("editProfile");
  };

  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
            <Box className={classes.navHead}>Online Exam Conductor</Box>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            <Box
              className={classes.navItem}
              onClick={() => props.setCurrPage("examList")}
            >
              Exam List
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            <Box className={classes.navItem} onClick={handleBox}>
              {userDetails.role === "Student" ? "My Grades" : "Create Exam"}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            <Box className={classes.navItem} onClick={toggleDrawer(true)}>
              Profile
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box className={classes.headBox}>
          <Typography variant="h4" className={classes.head}>
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
            {userDetails.name[0]}
          </Avatar>
          <Box className={classes.outerBox}>
            <Box className={classes.typo}>
              <span>Name: </span> {userDetails.name}
            </Box>
            <Box className={classes.typo}>
              <span>Email: </span> {userDetails.email}
            </Box>
            <Box className={classes.typo}>
              <span>Role: </span> {userDetails.role}
            </Box>
            <Box className={classes.typo}>
              <span>Address: </span> {userDetails.address}
            </Box>
            <Box className={classes.typo}>
              <span>Institute: </span> {userDetails.institute}
            </Box>
            <Box className={classes.typo}>
              <span>Contact: </span> {userDetails.contact}
            </Box>
            {userDetails.role === "Student" ? (
              <>
                <Box className={classes.typo}>
                  <span>Class: </span> {userDetails.class}
                </Box>
                <Box className={classes.typo}>
                  <span>Rollno: </span> {userDetails.rollNo}
                </Box>
              </>
            ) : (
              <Box className={classes.typo}>
                <span>Expertise: </span> {userDetails.expertise}
              </Box>
            )}
          </Box>
          <Box className={classes.btnGrp}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={gotoUpdate}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
