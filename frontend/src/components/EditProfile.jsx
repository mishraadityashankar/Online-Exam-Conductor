import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import axios from "axios";
import toast from "react-simple-toasts";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "lightblue",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "95vh",
  },
  card: {
    width: "45%",
    padding: "10px",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "10px",
  },
  btn: {
    marginleft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  },
});

function EditProfile(props) {
  const classes = useStyles();
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
      <Card className={classes.card}>
        <CardContent>
          <Box
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Update Profile
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
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
              <Box style={{ fontSize: "18px", padding: "5px" }}>
                Email : {userDetails.email}
              </Box>
              <Box style={{ fontSize: "18px", padding: "5px" }}>
                Role : {userDetails.role}
              </Box>
            </Box>

            <Box
              style={{
                display: "flex",
                width: "65%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                style={{ marginBottom: "20px" }}
                label="Name"
                fullWidth
                size="small"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                style={{ marginBottom: "20px" }}
                label="Contact"
                fullWidth
                size="small"
                name="contact"
                value={user.contact}
                onChange={handleChange}
              />
              {userDetails.role === "Student" && (
                <Box
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    label="Class"
                    type="Name"
                    size="small"
                    name="class"
                    value={user.class}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Roll No"
                    type="Name"
                    size="small"
                    name="rollNo"
                    value={user.rollNo}
                    onChange={handleChange}
                  />
                </Box>
              )}
              {userDetails.role === "Faculty" && (
                <TextField
                  label="Expertise"
                  fullWidth
                  size="small"
                  name="expertise"
                  value={user.expertise}
                  onChange={handleChange}
                />
              )}
            </Box>
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

          <Box>
            <Button
              className={classes.btn}
              onClick={() => props.setCurrPage("createExam")}
              variant="outlined"
              color="success"
            >
              Cancel
            </Button>
            <Button
              className={classes.btn}
              onClick={handleUpdate}
              variant="contained"
              color="success"
            >
              Update
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditProfile;
