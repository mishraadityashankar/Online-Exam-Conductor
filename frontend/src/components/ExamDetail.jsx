import React, { useState } from "react";
import { Box, Button, Grid, Typography, Divider } from "@mui/material";
import { useTimer } from "react-timer-hook";
import moment from "moment";
import axios from "axios";
import toast from "react-simple-toasts";
import { examDetailsStyles } from "../styles/ExamStyle";

function ExamDetail(props) {
  const expiryTimestamp = new Date(props.selectedTest.startTime);
  const [isDisable, setIsDisable] = useState(true);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => setIsDisable(false),
  });

  const classes = examDetailsStyles();
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
    "It is an Online Examination system, fully computerized, user friendly having advanced security features making it fair, transparent and standardized",
    "The examination does not require using any paper, pen, pencil and calculator.",
    "Every student will take the examination on a Laptop/Desktop/Smart Phone",
    "Student can enter the exam only after start time of exam is reached",
    "Student have to give exam in FULL SCREEN MODE and in any case if student exit from full screen, all the questions will be disabled and he/she needs to click on FULL SCREEN BUTTON to resume",
    "On computer screen every student will be given objective type Multiple Correct Questions and students needs to select appropriate set of answers by clicking the checkboxes",
    "Student can save there progress by clicking the 'SAVE' button",
    "Student can resume the test before the end time is reached, if due to some reasons exit from the test window",
    "There will be NO NEGATIVE MARKING for the wrong answers.",
    "Students can use 'ASK DOUBT' section to ask any doubt in between the examination",
    "The system automatically shuts down when the time limit is over OR when unfair activities recorded AND if examinee finishes the exam before time he can quit by pressing the 'End Test' button. The students don’t click the 'END TEST' Button until the student want to quit from Examination",
    "Once the examination is over student can see the results by navigating to the 'MY GRADES' section",
  ];

  const getDuration = (startTime, endTime) => {
    let m1 = moment(startTime);
    let m2 = moment(endTime);
    let m3 = m2.diff(m1, "minutes");
    return m3 + " min";
  };

  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => console.log(e));
  };
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

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Box className={classes.box}>
            <Typography className={classes.heading1}>Exam Details</Typography>
            <Divider />
            <Typography className={classes.formElement}>
              <span>Test Name </span> {props.selectedTest.testName}
            </Typography>
            <Typography className={classes.formElement}>
              <span>Subject </span> {props.selectedTest.subject}
            </Typography>

            <Typography className={classes.formElement}>
              <span>Date </span>
              {moment(props.selectedTest.startTime).format("YYYY-MM-DD")}
            </Typography>

            <Typography className={classes.formElement}>
              <span>Time </span>
              {moment(props.selectedTest.startTime).format("HH:mm")}
            </Typography>

            <Typography className={classes.formElement}>
              <span> Duration </span>
              {getDuration(
                props.selectedTest.startTime,
                props.selectedTest.endTime
              )}
            </Typography>
            <Typography className={classes.formElement}>
              <span> Total Marks </span>
              {props.selectedTest.totalMarks}
            </Typography>
            <Typography className={classes.formElement}>
              <span> Passing Marks </span>
              {props.selectedTest.passingMarks}
            </Typography>

            <Typography className={classes.formElement}>
              <span>Starts in </span>
              {days}:{hours}:{minutes}:{seconds}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isDisable}
              onClick={handleStart}
            >
              Enter Exam
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Box className={classes.box}>
            <Typography className={classes.heading2}>Instructions</Typography>
            <Divider />
            <Box className={classes.instructionsBox}>
              {instructions.map((ele, ind) => (
                <Typography className={classes.typo}>
                  <span>{ind + 1 + ". "}</span>
                  {ele}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExamDetail;
