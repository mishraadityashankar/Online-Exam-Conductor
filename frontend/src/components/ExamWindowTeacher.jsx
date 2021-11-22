import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import axios from "axios";
import { examWindowTeacherStyles } from "../styles/ExamStyle";
import ChatWindow from "./ChatWindow";
import QuestionList from "./QuestionList";
import toast from "react-simple-toasts";
import moment from "moment";
import {
  Box,
  Grid,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

function ExamWindowTeacher(props) {
  const classes = examWindowTeacherStyles();
  const [loading, setLoading] = useState(true);
  const [startTest, setStartTest] = useState(false);
  const selectedTest = props.selectedTest;
  const [testDetails, setTestDetails] = useState(null);
  const expiryTimestamp1 = new Date(selectedTest.startTime);
  const expiryTimestamp2 = new Date(selectedTest.endTime);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: expiryTimestamp1,
    onExpire: () => setStartTest(true),
  });

  const endTimer = useTimer({
    expiryTimestamp: expiryTimestamp2,
    onExpire: () => handleTestEnd(),
  });
  const getDuration = (startTime, endTime) => {
    let m1 = moment(startTime);
    let m2 = moment(endTime);
    let m3 = m2.diff(m1, "minutes");
    return m3 + " min";
  };
  useEffect(() => {
    axios
      .get("/test/details/" + props.selectedTest._id, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setTestDetails(res.data.result);
          console.log(res.data);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      })
      .finally(() => setLoading(false));
  }, []);

  const getResults = (testId) => {
    axios
      .get("/responses/getByTestId/" + testId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          props.setResponseHistory(res.data.result);
          console.log(res.data.result);
          props.setCurrPage("resultHistory");
          window.scrollTo({ top: 0 });
        } else {
          toast(res.data.message);
          props.setCurrPage("examList");
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      });
  };
  const handleTestEnd = () => {
    toast("Test Ended", 4000);
    toast("Fetching result list", 4000);
    getResults(props.selectedTest._id);
  };
  const Loader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          height: "60vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="100px" />
      </Box>
    );
  };

  const content = () => {
    if (loading) {
      Loader();
    } else {
      return (
        <Box className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Box className={classes.box}>
                <Box>
                  <Box>
                    <Typography className={classes.heading2}>
                      {"Test Name | " + props.selectedTest.testName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.formElement}>
                      {"Total Marks  " + props.selectedTest.totalMarks}
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography className={classes.formElement}>
                    <span>Subject </span> {props.selectedTest.subject}
                  </Typography>
                  <Typography className={classes.formElement}>
                    <span> Duration </span>
                    {getDuration(
                      props.selectedTest.startTime,
                      props.selectedTest.endTime
                    )}
                  </Typography>
                  {!startTest ? (
                    <Typography className={classes.formElement}>
                      <span>Starts in </span> {days}:{hours}:{minutes}:{seconds}
                    </Typography>
                  ) : (
                    <Typography className={classes.formElement}>
                      <span>Ends in </span>
                      {endTimer.days}:{endTimer.hours}:{endTimer.minutes}:
                      {endTimer.seconds}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box className={classes.chatBox}>
                {startTest ? (
                  <ChatWindow
                    userDetails={props.userDetails.name}
                    testId={selectedTest._id}
                  ></ChatWindow>
                ) : (
                  <Box className={classes.heading1}>Test not started yet</Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Box className={classes.outerBox}>
                <Box className={classes.questionList}>
                  <QuestionList
                    role={props.userDetails.role}
                    questions={testDetails.questions}
                    deleteQuestion={() => console.log("Deleted")}
                  ></QuestionList>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    }
  };
  return <Box>{content()}</Box>;
}

export default ExamWindowTeacher;
