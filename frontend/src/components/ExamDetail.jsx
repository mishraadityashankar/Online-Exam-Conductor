import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  getIconButtonUtilityClass,
  Grid,
  Typography,
} from "@mui/material";
import { useTimer } from "react-timer-hook";

import { makeStyles } from "@mui/styles";
import axios from "axios";
import toast from "react-simple-toasts";

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
  // const expireTime = new Date(props.selectedTest.startTime);
  const expiryTimestamp = new Date(props.selectedTest.startTime);
  const [isDisable, setIsDisable] = useState(true);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setIsDisable(false),
  });
  console.log(expiryTimestamp, props.selectedTest.startTime);
  const classes = useStyles();
  const newResponses = {
    testId: props.selectedTest._id,
    testName: props.selectedTest.testName,
    studentId: props.userDetails._id,
    questions: props.selectedTest.questions,
    totalMarks: props.selectedTest.totalMarks,
    passingMarks: props.selectedTest.passingMarks,
    recordedAnswers: [],
  };
  const instructions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  ];

  //   useEffect(() => {
  //     console.log(document.fullscreenElement);
  //     if (!document.fullscreenElement) {
  //       toast("enter full screen");
  //     }
  //   }, [document.fullscreenElement]);

  const handleStart = (e) => {
    axios
      .post("/responses/create", newResponses, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.result.completed) {
          toast("Test already attempted");
          toast("Redirecting to result page", 4000);
          props.setCurrPage("resultHistory");
        } else {
          console.log(res.data);
          toast(res.data.message);
          props.setResponsesId(res.data.result._id);
          props.setLayout("examWindow");
          handleFullScreen();
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        props.setLayout("home");
      });
  };
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => console.log(e));
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box className={classes.box}>
            <Typography className={classes.formElement}>
              <span>Test ID: </span> {props.selectedTest._id}
            </Typography>
            <Typography className={classes.formElement}>
              <span>Test Name: </span> {props.selectedTest.testName}
            </Typography>
            <Typography className={classes.formElement}>
              <span>Subject: </span> {props.selectedTest.subject}
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
              <span>Starts in: </span>
              <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
              <span>{seconds}</span>
            </Typography>

            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isDisable}
                  onClick={handleStart}
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
