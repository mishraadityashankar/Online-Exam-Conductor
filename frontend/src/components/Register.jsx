import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormLabel,
  Grid,
  TextField,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import toast from "react-simple-toasts";

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
    width: "60%",
    padding: "10px",
    height: "85%",
    overflow: "auto",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  btn: {
    width: "50%",
    marginTop: "20px",
  },
});
const intialState = {
  email: "",
  password: "",
  name: "",
  address: "",
  contact: "",
  role: "Student",
  institute: "",
  class: "",
  rollNo: "",
  expertise: "",
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validateMobile(phone) {
  const re = /^\d{10}$/;
  return re.test(phone);
}

function validateExpertise(subjects) {
  const re = /^[a-zA-Z0-9\x20]*$/;
  return re.test(subjects);
}
function Register(props) {
  const classes = useStyles();
  const [user, setUser] = useState(intialState);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const goToHome = () => {
    props.setLayout("home");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(user.email)) setErrMsg("Email is not valid");
    else if (!validateMobile(user.contact))
      setErrMsg("Contact number should have 10 digits");
    else if (!validateExpertise(user.expertise))
      setErrMsg("Expertise Subjects should be separated by single space");
    else if (user.password === "" || user.name === "" || user.address === "")
      setErrMsg("Required field cannot be empty");
    else {
      axios
        .post("/user/register", user)
        .then((res) => {
          console.log(res.data);
          toast(res.data.message);
          setUser(intialState);
        })
        .catch((err) => console.log(err));
    }
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
            Register
          </Box>

          <Box className={classes.formElement}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  value={user.email}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  name="password"
                  required
                  label="Password"
                  onChange={handleChange}
                  value={user.password}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Name"
              name="name"
              required
              value={user.name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Address"
              name="address"
              required
              value={user.address}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  name="contact"
                  required
                  value={user.contact}
                  onChange={handleChange}
                  label="Contact"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  sx={{ textAlign: "left" }}
                  fullWidth
                  label="Role"
                  required
                  select
                  size="small"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                >
                  {["Faculty", "Student"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Institute"
              name="institute"
              onChange={handleChange}
              value={user.institute}
              fullWidth
              size="small"
            />
          </Box>
          {user.role === "Student" ? (
            <Box className={classes.formElement}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    label="Class"
                    type="Name"
                    size="small"
                    name="class"
                    onChange={handleChange}
                    value={user.class}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    label="Roll No"
                    type="Name"
                    size="small"
                    name="rollNo"
                    onChange={handleChange}
                    value={user.rollNo}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box className={classes.formElement}>
              <TextField
                label="Assigned Subjects"
                fullWidth
                name="expertise"
                size="small"
                value={user.expertise}
                onChange={handleChange}
              />
            </Box>
          )}
          <Typography style={{ color: "red" }}>{errMsg}</Typography>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={handleSubmit}
                style={{
                  padding: "10px",
                }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Button
                variant="outlined"
                fullWidth
                style={{
                  padding: "10px",
                }}
                onClick={goToHome}
              >
                Go to login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
