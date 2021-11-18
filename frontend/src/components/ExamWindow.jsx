import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useTimer } from "react-timer-hook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "left",
    backgroundColor: "#EBF2F8",
  },
  box: {
    padding: "20px",
    margin: "20px",
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
    margin: "10px",
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
function ExamWindow(props) {
  const classes = useStyles();
  const selectedTest = props.selectedTest;
  const [selectedTestDetails, setSelectedTestDetails] = useState(null);
  const [answers, setAnswers] = useState([]);
  const expiryTimestamp = new Date(selectedTest.endTime);
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
    onExpire: () => console.warn("hello"),
  });
  useEffect(() => {
    axios
      .get("/test/details/" + selectedTest._id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setSelectedTestDetails(res.data.result);
          setAnswers(
            res.data.result.questions.map((ele) => [false, false, false, false])
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

  //   useEffect(() => {
  //     console.log(document.fullscreenElement);
  //     if (!document.fullscreenElement) {
  //       alert("enter full screen");
  //     }
  //   }, [document.fullscreenElement]);
  const onChangeAnswers = (e, questionNumber, checkedOption) => {
    setAnswers(
      answers.map((singleAns, ind) => {
        if (ind === questionNumber) {
          const newSingleAns = singleAns.map((option, optionNo) => {
            if (optionNo === checkedOption) return e.target.checked;
            return option;
          });
          return newSingleAns;
        }
        return singleAns;
      })
    );
  };
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => console.log(e));
  };

  const handleSubmit = (id) => {
    console.log(answers[id]);
    const boolAnswerString = answers.map((ele) => ele.toString());
    console.log(boolAnswerString);
    axios
      .post("/responses/generateResult", {
        responsesId: props.responsesId,
        answers: boolAnswerString,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  return (
    <Box className={classes.root}>
      {selectedTestDetails && answers.length ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            style={{ height: "100vh", overflow: "auto" }}
          >
            {selectedTestDetails.questions.map((ele, ind) => (
              <Accordion
                style={{
                  margin: "10px",
                  boxShadow: "0 4px 4px 0 rgb(0 0 0 / 20%)",
                }}
              >
                <AccordionSummary
                  style={{ backgroundColor: "#F8F8F8" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
                      <Typography
                        style={{
                          padding: "5px",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        {ind + 1 + " "}. {ele.questionName}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        style={{
                          textAlign: "right",
                          padding: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Marks: {ele.marks}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ padding: "10px" }}>
                    {ele.problemStatement}
                  </Typography>

                  <Box>
                    <Box>
                      <Checkbox
                        checked={answers[ind][0]}
                        onChange={(e) => onChangeAnswers(e, ind, 0)}
                        name="opt_a"
                      />

                      <Typography variant="p">
                        <span>A: </span> {ele.option_A}
                      </Typography>
                    </Box>

                    <Box>
                      <Checkbox
                        checked={answers[ind][1]}
                        onChange={(e) => onChangeAnswers(e, ind, 1)}
                        name="opt_b"
                      />
                      <Typography variant="p">
                        <span>B:</span> {ele.option_B}
                      </Typography>
                    </Box>

                    <Box>
                      <Checkbox
                        checked={answers[ind][2]}
                        onChange={(e) => onChangeAnswers(e, ind, 2)}
                        name="opt_c"
                      />
                      <Typography variant="p">
                        <span>C:</span> {ele.option_C}
                      </Typography>
                    </Box>

                    <Box>
                      <Checkbox
                        checked={answers[ind][3]}
                        onChange={(e) => onChangeAnswers(e, ind, 3)}
                        name="opt_d"
                      />
                      <Typography variant="p">
                        <span>D:</span> {ele.option_D}
                      </Typography>
                    </Box>
                  </Box>
                  <Box style={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      onClick={() => handleSubmit(ind)}
                    >
                      Submit
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box>
              <Box
                style={{
                  marginBottom: "20px",
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {selectedTest.testName}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => props.setLayout("main")}
                  >
                    Endtest
                  </Button>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Total Marks: {selectedTest.totalMarks}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Subject: {selectedTest.subject}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    Ends in: <span>{days}</span>:<span>{hours}</span>:
                    <span>{minutes}</span>:<span>{seconds}</span>
                  </Typography>
                </Box>
              </Box>
              <Typography
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Ask Doubt
              </Typography>
              <TextField
                label="Ask Question"
                name="testName"
                style={{ marginBottom: "20px" }}
                //   value={exam.testName}
                //   onChange={handleChange}
                fullWidth
                size="small"
              />
              <Box
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  height: "270px",
                  overflow: "auto",
                }}
              >
                {[
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                ].map((ele) => (
                  <Box>
                    <Typography
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Aditya
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      Hello Sir how are you
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box>Loading</Box>
      )}
    </Box>
  );
}

export default ExamWindow;
