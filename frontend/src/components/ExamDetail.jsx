import React, { useEffect } from "react";
import {
  Box,
  Button,
  getIconButtonUtilityClass,
  Grid,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "left",
  },
  box: {
    padding: "20px",
    backgroundColor: "#EBF2F8",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  card: {
    width: "70%",
    padding: "10px",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    margin: "10px",
    fontSize: "14px",
    "& span": {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
  btn: {
    margin: "10px",
  },
});
function ExamDetail(props) {
  const classes = useStyles();
  const instructions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  ];

  //   useEffect(() => {
  //     console.log(document.fullscreenElement);
  //     if (!document.fullscreenElement) {
  //       alert("enter full screen");
  //     }
  //   }, [document.fullscreenElement]);
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => console.log(e));
  };
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box className={classes.box}>
            <Typography className={classes.formElement}>
              <span>Test ID: </span> 897966866886868
            </Typography>
            <Typography className={classes.formElement}>
              <span>Test Name: </span> MINRO
            </Typography>
            <Typography className={classes.formElement}>
              <span>Subject: </span> English
            </Typography>

            <Typography className={classes.formElement}>
              <span>Date: </span>25/89/190
            </Typography>

            <Typography className={classes.formElement}>
              <span>Time: </span>5:40
            </Typography>

            <Typography className={classes.formElement}>
              <span> Duration: </span>45 min
            </Typography>
            <Typography className={classes.formElement}>
              <span> Created By: </span>Santosh Rathore{" "}
            </Typography>

            <Typography className={classes.formElement}>
              <span>Starts in: </span>15 sec
            </Typography>

            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => props.setLayout("examWindow")}
                  // onClick={() => deleteQuestion(ind)}
                >
                  Start Exam
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleFullScreen}
                  // onClick={() => deleteQuestion(ind)}
                >
                  Enter Full Screen
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Box style={{ padding: "20px" }}>
            <Typography
              style={{
                fontSize: "24px",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Instructions
            </Typography>
            {instructions.map((ele, ind) => (
              <Typography style={{ marginBottom: "20px" }}>
                <span>{ind + 1 + " "}</span>
                {ele}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExamDetail;
