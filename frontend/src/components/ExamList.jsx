import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import toast from "react-simple-toasts";
import { examListStyles } from "../styles/ExamStyle";

function ExamList(props) {
  const classes = examListStyles();
  const [testList, setTestList] = useState([]);
  useEffect(() => {
    axios
      .get("/test/get", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setTestList(res.data.result);
          console.log(res.data);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      });
  }, []);

  const handleEnter = (curTest) => {
    props.setSelectedTest(curTest);
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
      <Grid container spacing={2}>
        {testList.map((ele) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box>
              <Box className={classes.box}>
                <Typography
                  style={{ fontSize: "18px", marginBottom: "20px" }}
                  className={classes.heading1}
                >
                  Test Name : {ele.testName}
                </Typography>
                <Grid container spacing={2} className={classes.typo}>
                  <Grid item xs={6}>
                    <Typography>Subject: {ele.subject}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      Start Date: {moment(ele.startTime).format("YYYY-MM-DD")}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} className={classes.typo}>
                  <Grid item xs={6}>
                    <Typography>
                      Start Time: {moment(ele.startTime).format("HH:mm")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      Duration: {getDuration(ele.startTime, ele.endTime)}
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
    </Box>
  );
}

export default ExamList;
