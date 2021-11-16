import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormLabel,
  TextField,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

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
    height: "93%",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  btn: {
    margin: "10px",
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

function Register(props) {
  const classes = useStyles();
  const [user, setUser] = useState(intialState);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const goToRegister = () => {
    props.setLayout("home");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validateEmail(user.email) ||
      !validateMobile(user.contact) ||
      user.password === "" ||
      user.name === "" ||
      user.address === ""
    )
      alert("Enter the valid data");
    else {
      axios
        .post("/user/register", user)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
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
            <TextField
              sx={{ width: "48%" }}
              required
              name="email"
              label="Email"
              value={user.email}
              onChange={handleChange}
              size="small"
            />
            <TextField
              sx={{ width: "48%" }}
              name="password"
              required
              label="Password"
              onChange={handleChange}
              value={user.password}
              size="small"
            />
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
            <TextField
              sx={{ width: "48%" }}
              name="contact"
              required
              value={user.contact}
              onChange={handleChange}
              label="Contact"
              size="small"
            />
            <TextField
              sx={{ width: "48%", textAlign: "left" }}
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
              <TextField
                sx={{ width: "48%" }}
                label="Class"
                type="Name"
                size="small"
                name="class"
                onChange={handleChange}
                value={user.class}
              />
              <TextField
                sx={{ width: "48%" }}
                label="Roll No"
                type="Name"
                size="small"
                name="rollNo"
                onChange={handleChange}
                value={user.rollNo}
              />
            </Box>
          ) : (
            <Box className={classes.formElement}>
              <TextField
                label="Expertise"
                name="expertise"
                fullWidth
                size="small"
                onChange={handleChange}
                value={user.expertise}
              />
            </Box>
          )}

          <Button
            className={classes.btn}
            variant="contained"
            fullWidth
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Box
            style={{
              padding: "10px",
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={goToRegister}
          >
            Go to login
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
