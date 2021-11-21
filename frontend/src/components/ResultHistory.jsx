import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { PieChart } from "react-minimal-pie-chart";
import { VictoryPie } from "victory-pie";
import moment from "moment";

import {
  Box,
  Button,
  getIconButtonUtilityClass,
  Grid,
  Typography,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Divider,
  Avatar,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import QuestionList from "./QuestionList";

const useStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "left",
    backgroundColor: "#EBF2F8",
  },
  box: {
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  card: {
    width: "70%",
    padding: "10px",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    margin: "2px",
    padding: "5px",
    fontSize: "14px",
    "& span": {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
  btn: {
    marginTop: "10px",
  },
});
function ResultHistory(props) {
  const classes = useStyles();

  const selectedResponses = props.curResponses;
  console.log(selectedResponses);
  const formatAnswer = (answerArray) => {
    let ans = " ";
    answerArray.map((ele, ind) => {
      if (ele) ans += String.fromCharCode(65 + ind) + " ";
    });
    return ans;
  };

  const formatMarkedAnswer = (responseString) => {
    console.log(responseString);

    const responseArr = responseString.split(",").map((ele) => ele === "true");
    return formatAnswer(responseArr);
  };

  //   useEffect(() => {
  //     console.log(document.fullscreenElement);
  //     if (!document.fullscreenElement) {
  //       alert("enter full screen");
  //     }
  //   }, [document.fullscreenElement]);
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => console.log(e));
  };
  const handleSelection = (e) => {
    // setSelectedResponses(e.target.value);
    // console.log(e.target.id);
  };
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
    <Box
      style={{
        padding: "20px",
        backgroundColor: "#EBF2F8",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box
            style={{
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
            }}
          >
            {selectedResponses ? (
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
                  <Box style={{ textAlign: "left" }}>
                    <Typography
                      className={classes.formElement}
                      style={{
                        fontSize: "26px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Results
                    </Typography>
                    <Typography className={classes.formElement}>
                      Date:{" "}
                      {moment(selectedResponses.finishTime).format(
                        "YYYY-MM-DD"
                      )}
                    </Typography>
                    <Typography className={classes.formElement}>
                      Finish Time:{" "}
                      {moment(selectedResponses.finishTime).format("HH:mm:ss")}
                    </Typography>
                    <Typography className={classes.formElement}>
                      Total Marks: {selectedResponses.totalMarks}
                    </Typography>
                    <Typography className={classes.formElement}>
                      Marks Obtained: {selectedResponses.scoresObtained}
                    </Typography>
                    <Typography className={classes.formElement}>
                      Status: {selectedResponses.passed ? "Passed" : "Failed"}
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
          <Box
            style={{
              padding: "20px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                TestName: {selectedResponses.testName}
              </Typography>
              <Button onClick={() => props.setCurrPage("resultHistory")}>
                Back
              </Button>
            </Box>

            <Box
              style={{
                height: "400px",
                overflow: "auto",
                padding: "10px",
                textAlign: "left",
              }}
            >
              {selectedResponses && selectedResponses.questions.length ? (
                <QuestionList
                  questions={selectedResponses.questions}
                  responses={selectedResponses}
                ></QuestionList>
              ) : (
                //(

                //   selectedResponses.questions.map((curQuestion, ind) => (
                //     <Accordion
                //       style={{
                //         margin: "5px",
                //         boxShadow: "0 4px 4px 0 rgb(0 0 0 / 20%)",
                //       }}
                //     >
                //       <AccordionSummary
                //         style={{ backgroundColor: "#EBF2F8" }}
                //         expandIcon={<ExpandMoreIcon />}
                //         aria-controls="panel1a-content"
                //         id="panel1a-header"
                //       >
                //         <Grid container spacing={2}>
                //           <Grid item xs={10}>
                //             <Typography
                //               style={{
                //                 padding: "5px",
                //                 fontWeight: "bold",
                //                 fontSize: "18px",
                //               }}
                //             >
                //               {ind + 1 + " "}. {curQuestion.questionName}
                //             </Typography>
                //           </Grid>
                //           <Grid item xs={2}>
                //             <Typography
                //               style={{
                //                 textAlign: "right",
                //                 padding: "5px",
                //                 fontWeight: "bold",
                //               }}
                //             >
                //               Marks: {curQuestion.marks}
                //             </Typography>
                //           </Grid>
                //         </Grid>
                //       </AccordionSummary>
                //       <AccordionDetails>
                //         <Divider light />
                //         <Box style={{ textAlign: "left", padding: "5px" }}>
                //           <Typography className={classes.paragraph}>
                //             {curQuestion.problemStatement}
                //           </Typography>
                //           <Divider light />
                //           <Typography className={classes.paragraph}>
                //             <span>Option A:</span> {curQuestion.option_A}
                //           </Typography>

                //           <Typography className={classes.paragraph}>
                //             <span>Option B:</span> {curQuestion.option_B}
                //           </Typography>
                //           <Typography className={classes.paragraph}>
                //             <span>Option C:</span> {curQuestion.option_C}
                //           </Typography>
                //           <Typography className={classes.paragraph}>
                //             <span>Option D:</span> {curQuestion.option_D}
                //           </Typography>
                //           <Divider light />
                //           <Typography className={classes.paragraph}>
                //             <span>Correct Anwers:</span>
                //             {formatAnswer(curQuestion.answer)}
                //           </Typography>
                //           <Divider light />
                //           <Typography className={classes.paragraph}>
                //             <span>Marked Anwers:</span>
                //             {formatMarkedAnswer(
                //               selectedResponses.recordedAnswers[ind]
                //             )}
                //             {/* {formatAnswer(
                //                   selectedResponses.recordedAnswers[ind].split(
                //                     ","
                //                   )
                //                 )} */}
                //           </Typography>
                //           <Divider light />
                //           <Typography className={classes.paragraph}>
                //             <span>Explanation: </span> {curQuestion.explanation}
                //           </Typography>
                //           <Divider light />
                //         </Box>
                //       </AccordionDetails>
                //     </Accordion>
                //   ))
                // ) : (

                <Box>Select Exam</Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResultHistory;
