import React from "react";
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
  const role = "student";
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
                A
              </Avatar>
              <Box style={{ fontSize: "18px", padding: "5px" }}>
                Email : xyz@xyz.com
              </Box>
              <Box style={{ fontSize: "18px", padding: "5px" }}>
                Role : teacher
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
              />
              <TextField
                style={{ marginBottom: "20px" }}
                label="Contact"
                fullWidth
                size="small"
              />
              <Box
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField label="Class" type="Name" size="small" />
                <TextField label="Roll No" type="Name" size="small" />
              </Box>

              <TextField label="Expertise" fullWidth size="small" />
            </Box>
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Address" fullWidth size="small" />
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Institute" fullWidth size="small" />
          </Box>
          <Box className={classes.formElement}></Box>
          <Box>
            <Button className={classes.btn} variant="outlined" color="success">
              Cancel
            </Button>
            <Button className={classes.btn} variant="contained" color="success">
              Update
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditProfile;
