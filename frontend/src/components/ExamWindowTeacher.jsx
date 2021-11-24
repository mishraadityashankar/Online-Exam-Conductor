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
  const [startExam, setStartExam] = useState(false);
  const selectedExam = props.selectedExam;
  const [examDetails, setExamDetails] = useState(null);
  const expiryTimestamp1 = new Date(selectedExam.startTime);
  const expiryTimestamp2 = new Date(selectedExam.endTime);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: expiryTimestamp1,
    onExpire: () => setStartExam(true),
  });

  const endTimer = useTimer({
    expiryTimestamp: expiryTimestamp2,
    onExpire: () => handleExamEnd(),
  });
  const getDuration = (startTime, endTime) => {
    let m1 = moment(startTime);
    let m2 = moment(endTime);
    let m3 = m2.diff(m1, "minutes");
    return m3 + " min";
  };
  useEffect(() => {
    axios
      .get(
        "/exam/fullDetails/" +
          props.selectedExam._id +
          "/" +
          props.userDetails._id,
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "Success") {
          setExamDetails(res.data.result);
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

  const getResults = (examId) => {
    axios
      .get("/responses/getByExamId/" + examId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          props.setResponseHistory(res.data.result);

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
  const handleExamEnd = () => {
    toast("Exam Ended", 4000);
    toast("Fetching result list", 4000);
    getResults(props.selectedExam._id);
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
                      {"Exam Name | " + props.selectedExam.examName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.formElement}>
                      {"Total Marks  " + props.selectedExam.totalMarks}
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography className={classes.formElement}>
                    <span>Subject </span> {props.selectedExam.subject}
                  </Typography>
                  <Typography className={classes.formElement}>
                    <span> Duration </span>
                    {getDuration(
                      props.selectedExam.startTime,
                      props.selectedExam.endTime
                    )}
                  </Typography>
                  {!startExam ? (
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
                {startExam ? (
                  <ChatWindow
                    userDetails={props.userDetails.name}
                    examId={selectedExam._id}
                  ></ChatWindow>
                ) : (
                  <Box className={classes.heading1}>Exam not started yet</Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Box className={classes.outerBox}>
                <Box className={classes.questionList}>
                  <QuestionList
                    role={props.userDetails.role}
                    questions={examDetails.questions}
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
