import React from "react";
import { VictoryPie } from "victory-pie";
import moment from "moment";
import { Box, Button, Grid, Typography } from "@mui/material";
import QuestionList from "./QuestionList";
import { resultHistoryStyles } from "../styles/ResponseStyle";

function ResultHistory(props) {
  const classes = resultHistoryStyles();
  const selectedResponses = props.curResponses;
  const myData = [
    {
      x: "Correct",
      y: selectedResponses.scoresObtained,
    },
    {
      x: "Wrong",
      y: selectedResponses.totalMarks - selectedResponses.scoresObtained,
    },
  ];
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box className={classes.box}>
            {selectedResponses ? (
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
                  <Box>
                    <Typography className={classes.head}>Results</Typography>
                    <Typography className={classes.formElement}>
                      <span>Date: </span>
                      {moment(selectedResponses.finishTime).format(
                        "YYYY-MM-DD"
                      )}
                    </Typography>
                    <Typography className={classes.formElement}>
                      <span>Finish Time: </span>
                      {moment(selectedResponses.finishTime).format("HH:mm:ss")}
                    </Typography>
                    <Typography className={classes.formElement}>
                      <span>Total Marks: </span> {selectedResponses.totalMarks}
                    </Typography>
                    <Typography className={classes.formElement}>
                      <span>Passing Obtained: </span>{" "}
                      {selectedResponses.passingMarks}
                    </Typography>
                    <Typography className={classes.formElement}>
                      <span>Marks Obtained: </span>{" "}
                      {selectedResponses.scoresObtained}
                    </Typography>
                    <Typography className={classes.formElement}>
                      <span>Status: </span>{" "}
                      {selectedResponses.passed ? "Passed" : "Failed"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
                  <Box>
                    <VictoryPie
                      height={300}
                      padAngle={({ datum }) => datum.y}
                      colorScale={["green", "red"]}
                      data={myData}
                    />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Box>Select Exam</Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Box className={classes.box}>
            <Box className={classes.flexBox}>
              <Typography className={classes.head}>
                Exam Name: {selectedResponses.examName}
              </Typography>
              <Button onClick={() => props.setCurrPage("resultHistory")}>
                Back
              </Button>
            </Box>

            <Box className={classes.flexBox2}>
              {selectedResponses && selectedResponses.questions.length ? (
                <QuestionList
                  questions={selectedResponses.questions}
                  responses={selectedResponses}
                ></QuestionList>
              ) : (
                <Box>No questions found</Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResultHistory;
