import React, { useState } from "react";
import { Box, Avatar, Button, TextField, Grid } from "@mui/material";
import axios from "axios";
import toast from "react-simple-toasts";
import { editProfileStyle } from "../styles/CommonStyle";

function EditProfile(props) {
  const classes = editProfileStyle();
  const userDetails = props.userDetails;
  const intialState = {
    ...userDetails,
  };

  const [user, setUser] = useState(intialState);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    axios
      .post("/user/update", user, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        toast(res.data.message);
        props.setUserDetails(user);
        props.setCurrPage("createExam");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.card}>
        <Box>
          <Box className={classes.head1}>Update Profile</Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Box>
                <Avatar
                  sx={{
                    bgcolor: "orange",
                    width: 150,
                    fontSize: "48px",
                    height: 150,
                    margin: "20px",
                  }}
                >
                  {user.name[0]}
                </Avatar>
                <Box className={classes.typo1}>Email : {userDetails.email}</Box>
                <Box className={classes.typo1}>Role : {userDetails.role}</Box>
                <Grid container spacing={2} className={classes.formElement}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Button
                      fullWidth
                      onClick={() => props.setCurrPage("createExam")}
                      variant="outlined"
                      color="success"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Button
                      fullWidth
                      onClick={handleUpdate}
                      variant="contained"
                      color="success"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Box>
                <Box className={classes.formElement}>
                  <TextField
                    label="Name"
                    fullWidth
                    size="small"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </Box>
                <Box className={classes.formElement}>
                  <TextField
                    label="Contact"
                    fullWidth
                    size="small"
                    name="contact"
                    value={user.contact}
                    onChange={handleChange}
                  />
                </Box>
                {userDetails.role === "Student" && (
                  <Grid container spacing={2} className={classes.formElement}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        label="Class"
                        fullWidth
                        type="Name"
                        size="small"
                        name="class"
                        value={user.class}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        label="Roll No"
                        fullWidth
                        type="Name"
                        size="small"
                        name="rollNo"
                        value={user.rollNo}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                )}
                {userDetails.role === "Faculty" && (
                  <Box className={classes.formElement}>
                    <TextField
                      label="Expertise"
                      fullWidth
                      size="small"
                      name="expertise"
                      value={user.expertise}
                      onChange={handleChange}
                    />
                  </Box>
                )}
              </Box>
              <Box className={classes.formElement}>
                <TextField
                  label="Institute"
                  fullWidth
                  size="small"
                  name="institute"
                  value={user.institute}
                  onChange={handleChange}
                />
              </Box>
              <Box className={classes.formElement}>
                <TextField
                  label="Address"
                  fullWidth
                  size="small"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default EditProfile;
