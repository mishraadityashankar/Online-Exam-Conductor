import React, { useState } from "react";
import { Box, Avatar, Button, TextField, Grid } from "@mui/material";
import axios from "axios";
import toast from "react-simple-toasts";
import { editProfileStyle } from "../styles/CommonStyle";
import {
  validateEmail,
  validateExpertise,
  validateMobile,
} from "../helpers/validations";

function EditProfile(props) {
  const classes = editProfileStyle();
  const userDetails = props.userDetails;
  const [errMsg, setErrMsg] = useState("");
  const intialState = {
    ...userDetails,
  };

  const [user, setUser] = useState(intialState);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    if (!validateEmail(user.email)) setErrMsg("Email is not valid");
    else if (!validateMobile(user.contact))
      setErrMsg("Contact number should have 10 digits");
    else if (!validateExpertise(user.expertise))
      setErrMsg("Expertise Subjects should be separated by single space");
    else if (user.password === "" || user.name === "" || user.address === "")
      setErrMsg("A required field cannot be empty");
    else {
      axios
        .post("/user/update", user, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("OEC_token"),
          },
        })
        .then((res) => {
          toast(res.data.message);
          props.setUserDetails(user);
          setErrMsg("");
          props.setCurrPage("examList");
        })
        .catch((err) => {
          console.log(err);
          toast(err.message);
        });
    }
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
                <Box style={{ color: "red" }}>{errMsg}</Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Box>
                <Box className={classes.formElement}>
                  <TextField
                    label="Name"
                    fullWidth
                    required
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
                    required
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
                        required
                        value={user.class}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        label="Roll No"
                        fullWidth
                        type="Name"
                        required
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
                      required
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
                  required
                  name="institute"
                  value={user.institute}
                  onChange={handleChange}
                />
              </Box>
              <Box className={classes.formElement}>
                <TextField
                  label="Address"
                  fullWidth
                  required
                  size="small"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid container spacing={2} className={classes.formElement}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Button
                  fullWidth
                  onClick={() => props.setCurrPage("examList")}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Button fullWidth onClick={handleUpdate} variant="contained">
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default EditProfile;
