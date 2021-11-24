import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import toast from "react-simple-toasts";
import { examListStyles } from "../styles/ExamStyle";

function ExamList(props) {
  const classes = examListStyles();
  const [examList, setExamList] = useState([]);
  useEffect(() => {
    axios
      .get("/exam/get", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setExamList(res.data.result);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      });
  }, []);

  const handleEnter = (curExam) => {
    props.setSelectedExam(curExam);
    props.setCurrPage("examDetails");
  };

  const getDuration = (startTime, endTime) => {
    let m1 = moment(startTime);
    let m2 = moment(endTime);
    let m3 = m2.diff(m1, "minutes");
    return m3 + " minutes";
  };
  return (
    <Box className={classes.root}>
      {examList.length ? (
        <Grid container spacing={2}>
          {examList.map((ele) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <Box>
                <Box className={classes.box}>
                  <Typography className={classes.heading1}>
                    Exam Name: {ele.examName}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography className={classes.typo}>
                        <span>Subject: </span> {ele.subject}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.typo}>
                        <span>Date: </span>
                        {moment(ele.startTime).format("YYYY-MM-DD")}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography className={classes.typo}>
                        <span>Time: </span>
                        {moment(ele.startTime).format("HH:mm")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.typo}>
                        <span>Duration: </span>{" "}
                        {getDuration(ele.startTime, ele.endTime)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEnter(ele)}
                  >
                    Enter
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className={classes.noexam}>No Exams Found</Box>
      )}
    </Box>
  );
}

export default ExamList;
