import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useTimer } from "react-timer-hook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import ChatWindow from "./ChatWindow";
import toast from "react-simple-toasts";
import { examWindowStyles } from "../styles/ExamStyle";

function ExamWindow(props) {
  const classes2 = examWindowStyles();
  const selectedTest = props.selectedTest;
  const [selectedTestDetails, setSelectedTestDetails] = useState(null);
  const [answers, setAnswers] = useState(
    localStorage.getItem("Answers")
      ? JSON.parse(localStorage.getItem("Answers"))
      : []
  );
  const [errMsg, setErrMsg] = useState([]);
  const [count, setCount] = useState(0);
  const expiryTimestamp = new Date(selectedTest.endTime);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => handleSubmit(),
  });

  window.onfocus = function (ev) {
    console.log("gained focus");
  };

  window.onblur = function (ev) {
    setCount(count + 1);
  };
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
          if (localStorage.getItem("Answers")) {
            setAnswers(JSON.parse(localStorage.getItem("Answers")));
          } else {
            setAnswers(
              res.data.result.questions.map((ele) => [
                false,
                false,
                false,
                false,
              ])
            );
          }

          setErrMsg(res.data.result.questions.map((ele) => ["", "", "", ""]));
          console.log(res.data);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        props.setLayout("main");
      });
  }, []);

  useEffect(() => {
    if (count > selectedTest.activityThreshold) {
      toast("Test is ended because of Tab switches", 4000);
      handleSubmit();
    }
  }, [count]);

  const onSave = (id) => {
    localStorage.setItem("Answers", JSON.stringify(answers));
    if (answers[id].reduce((sum, ele) => (ele ? (sum += 1) : sum), 0) > 0) {
      setErrMsg(
        errMsg.map((ele, ind) => {
          if (ind === id) return "";
          else return ele;
        })
      );
      toast("Saved");
    } else {
      setErrMsg(
        errMsg.map((ele, ind) => {
          if (ind === id) return "Please select atleast one option";
          else return ele;
        })
      );
    }
  };

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

  const handleSubmit = () => {
    let savedAnswers = answers;
    if (localStorage.getItem("Answers")) {
      savedAnswers = JSON.parse(localStorage.getItem("Answers"));
      localStorage.removeItem("Answers");
    }

    const boolAnswerString = savedAnswers.map((ele) => ele.toString());
    console.log(boolAnswerString);
    axios
      .post(
        "/responses/saveResult",
        {
          responsesId: props.responsesId,
          answers: boolAnswerString,
          completed: true,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("OEC_token"),
          },
        }
      )
      .then((res) => {
        toast(res.data.message, 4000);
      })
      .catch((err) => {
        console.log(err);
        toast(err.message, 4000);
      })
      .finally(() => props.setLayout("main"));
  };
  return (
    <Box className={classes2.root}>
      {selectedTestDetails && answers.length ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            className={classes2.questionGrid}
          >
            {selectedTestDetails.questions.map((ele, ind) => (
              <Accordion
                disabled={!document.fullscreenElement}
                className={classes2.questionBox}
              >
                <AccordionSummary
                  className={classes2.summary}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
                      <Typography className={classes2.typo1}>
                        {ind + 1 + " "}. {ele.questionName}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography className={classes2.typo2}>
                        Marks: {ele.marks}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes2.typo3}>
                    {ele.problemStatement}
                  </Typography>

                  <Box>
                    <Box>
                      <Checkbox
                        disabled={!document.fullscreenElement}
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
                        disabled={!document.fullscreenElement}
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
                        disabled={!document.fullscreenElement}
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
                        disabled={!document.fullscreenElement}
                        checked={answers[ind][3]}
                        onChange={(e) => onChangeAnswers(e, ind, 3)}
                        name="opt_d"
                      />
                      <Typography variant="p">
                        <span>D:</span> {ele.option_D}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes2.flexBox1}>
                    <Typography className={classes2.err}>
                      {errMsg[ind]}
                    </Typography>
                    <Button
                      disabled={!document.fullscreenElement}
                      variant="contained"
                      onClick={() => onSave(ind)}
                    >
                      Save
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box>
              <Box className={classes2.examDetailsBox}>
                <Box className={classes2.headBox}>
                  <Typography className={classes2.testName}>
                    {"Test Name | " + selectedTest.testName}
                  </Typography>
                </Box>
                <Box className={classes2.flexBox1}>
                  <Typography className={classes2.typo4}>
                    Total Marks: {selectedTest.totalMarks}
                  </Typography>
                  <Typography className={classes2.typo4}>
                    Passing Marks: {selectedTest.passingMarks}
                  </Typography>
                </Box>
                <Box className={classes2.flexBox1}>
                  <Typography className={classes2.typo4}>
                    Ends in: <span>{days}</span>:<span>{hours}</span>:
                    <span>{minutes}</span>:<span>{seconds}</span>
                  </Typography>
                  <Typography className={classes2.typo4}>
                    Subject: {selectedTest.subject}
                  </Typography>
                </Box>
                {!document.fullscreenElement && (
                  <Typography className={classes2.err2}>
                    Please enable full screen by pressing the button below
                  </Typography>
                )}
                <Grid container spacing={2} className={classes2.buttonGrid}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleFullScreen}
                    >
                      Full Screen
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      End Test
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <ChatWindow
                userDetails={props.username}
                testId={selectedTest._id}
              ></ChatWindow>
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
