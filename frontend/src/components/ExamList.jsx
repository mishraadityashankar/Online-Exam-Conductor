import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { getAutoHeightDuration } from "@mui/material/styles/createTransitions";

function ExamList(props) {
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
          const curDateTime = new Date();
          setTestList(
            res.data.result.filter((ele) => new Date(ele.endTime) > curDateTime)
          );
          console.log(res.data);
        } else {
          alert(res.data.message);
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
    <Box style={{ padding: "20px", textAlign: "left" }}>
      <Grid container spacing={2}>
        {testList.map((ele) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box
              style={{
                borderRadius: "5px",
                boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                padding: "20px",
                backgroundColor: "#F5F5F5",
              }}
            >
              <Typography style={{ fontSize: "24px", marginBottom: "20px" }}>
                Test Name : {ele.testName}
              </Typography>
              <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                <Grid item xs={6}>
                  <Typography>Subject: {ele.subject}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Start Date: {moment(ele.startTime).format("YYYY-MM-DD")}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ marginBottom: "20px" }}>
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
                //className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => handleEnter(ele)}
                // onClick={() => deleteQuestion(ind)}
              >
                Enter
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ExamList;
