import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "lightblue",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  card: {
    width: "35%",
    padding: "10px",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  btn: {
    marginleft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  },
});
function Register(props) {
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
            Register
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Email" size="small" />
            <TextField label="Password" size="small" />
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Name" fullWidth size="small" />
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Address" fullWidth size="small" />
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Contact" size="small" />
            <TextField label="Role" size="small" />
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Institute" fullWidth size="small" />
          </Box>
          <Box className={classes.formElement}>
            <TextField label="Class" type="Name" size="small" />
            <TextField label="Roll No" type="Name" size="small" />
          </Box>

          <Box className={classes.formElement}>
            <TextField label="Expertise" fullWidth size="small" />
          </Box>
          <Button
            className={classes.btn}
            variant="contained"
            fullWidth
            color="success"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
