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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "35%",
    padding: "20px",
    alignContent: "left",
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
      <Box>
        <Typography variant="h3">Register form</Typography>
      </Box>

      <Card className={classes.card}>
        <CardContent>
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
            <TextField label="Institute" size="small" />
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
