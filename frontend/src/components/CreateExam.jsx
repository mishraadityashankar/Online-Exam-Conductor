import React, { useState, useEffect } from "react";
import {
  Drawer,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Card,
  FormLabel,
  TextareaAutosize,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Icon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import moment from "moment";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#F5F5F5",
    display: "flex",
    justifyContent: "space-between",
    height: "90vh",
    padding: "20px",
  },
  card: {
    width: "45%",
    padding: "10px",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "10px",
  },
  btn: {
    marginleft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  },
  paragraph: {
    padding: "5px",
    "& span": {
      color: "black",
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
});

function CreateExam(props) {
  const classes = useStyles();
  const initialExam = {
    testName: "",
    questions: [],
    createdBy: props.userDetails._id,
    startTime: "",
    endTime: "",
    subject: "",
    passingMarks: 0,
    totalMarks: 0,
    studentEnrolled: [],
    expired: false,
  };
  const [exam, setExam] = useState(initialExam);
  const [questionList, setQuestionList] = useState([]);
  const [pickedQuestion, setPickedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    axios
      .get("/question/get", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setQuestionList(res.data.result);
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

  const addQuestion = () => {
    if (pickedQuestion)
      setSelectedQuestions([...selectedQuestions, pickedQuestion]);
    setTotalMarks(totalMarks + pickedQuestion.marks);
  };

  const deleteQuestion = (id) => {
    let newtotal = 0;
    selectedQuestions.map((ele, ind) => {
      if (ind != id) newtotal += ele.marks;
      return;
    });
    let updatedQuestions = selectedQuestions.filter(
      (item, index) => index !== id
    );
    setTotalMarks(newtotal);
    setSelectedQuestions(updatedQuestions);
  };

  const handleSelection = (e) => {
    setPickedQuestion(e.target.value);
  };
  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
    console.log(time);
  };
  const formatAnswer = (answerArray) => {
    let ans = " ";
    answerArray.map((ele, ind) => {
      if (ele) ans += String.fromCharCode(65 + ind) + " ";
    });
    return ans;
  };

  const handleSubmit = () => {
    console.log(date);
    const startTime = new Date(date);
    console.log(startTime);
    const startDatetimeUTC = moment.utc(startTime).format();
    console.log(startDatetimeUTC);
    const endTime = moment(startTime).add(duration, "m").toDate();
    console.log(endTime);
    const endDatetimeUTC = moment.utc(endTime).format();
    console.log(endDatetimeUTC);
    const questions = selectedQuestions.map((ele) => ele._id);
    if (exam.passingMarks > totalMarks) {
      alert("Passing marks cannot be greater than total");
      return;
    }
    const reqBody = {
      ...exam,
      startTime: startDatetimeUTC,
      endTime: endDatetimeUTC,
      questions: questions,
      totalMarks: totalMarks,
    };
    axios
      .post("/test/add", reqBody, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        setExam(initialExam);
        setDate("");
        setDuration(0);
        setPickedQuestion(null);
        setSelectedQuestions([]);
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      });
  };
  return (
    <Box className={classes.root}>
      <Box
        style={{
          width: "27%",

          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
          backgroundColor: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
            margintop: "20px",
            height: "15%",
          }}
        >
          Assesment Details
        </Box>

        <Box style={{ height: "70%" }}>
          <Typography>Total Marks: {totalMarks}</Typography>
          <Box className={classes.formElement}>
            <TextField
              label="Assesment Name"
              name="testName"
              value={exam.testName}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Subject"
              size="small"
              name="subject"
              fullWidth
              value={exam.subject}
              onChange={handleChange}
            />
          </Box>

          <Box className={classes.formElement}>
            <TextField
              style={{ marginRight: "5px" }}
              type="number"
              label="Passing Marks"
              size="small"
              name="passingMarks"
              value={exam.passingMarks}
              onChange={handleChange}
            />
            <TextField
              name="duration"
              value={duration}
              onChange={handleDuration}
              type="number"
              label="Duration (minutes)"
              size="small"
            />
          </Box>
          <FormLabel className={classes.formElement}>
            Select Exam Date & Time
          </FormLabel>
          <Box className={classes.formElement}>
            <TextField
              value={date}
              type="datetime-local"
              onChange={handleDate}
              size="small"
            />
          </Box>
        </Box>
        <Button
          className={classes.btn}
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Box>

      <Box
        style={{
          marginLeft: "20px",
          width: "70%",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",

            marginBottom: "20px",
          }}
        >
          <TextField
            id="outlined-select-currency"
            select
            sx={{ width: "83%" }}
            label="Select question"
            size="small"
            value={pickedQuestion}
            onChange={handleSelection}
          >
            {questionList.map((option) => (
              <MenuItem key={option} value={option}>
                {option.questionName}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" color="primary" onClick={addQuestion}>
            Add question
          </Button>
        </Box>

        <Box
          style={{
            height: "90%",
            overflowY: "auto",
          }}
        >
          {selectedQuestions.length === 0 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "36px",
              }}
            >
              No selected questions !!
            </Box>
          )}
          {selectedQuestions.map((curQuestion, ind) => (
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
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  <Typography
                    style={{
                      display: "block",
                      fontSize: "20px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>{ind + 1}. </span>{" "}
                    {curQuestion.questionName}
                  </Typography>
                  <Box style={{ display: "flex", flexDirection: "row" }}>
                    <Typography style={{ marginRight: "10px" }}>
                      Marks: {curQuestion.marks}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    >
                      Difficulty: {curQuestion.difficulty}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Divider light />
                <Box style={{ textAlign: "left", padding: "5px" }}>
                  <Typography className={classes.paragraph}>
                    {curQuestion.problemStatement}
                  </Typography>
                  <Divider light />
                  <Typography className={classes.paragraph}>
                    <span>Option A:</span> {curQuestion.option_A}
                  </Typography>
                  {/* <Box>
      <FormControlLabel
        label="Option A"
        control={<Checkbox name="jason" />}
      />
    </Box> */}
                  <Typography className={classes.paragraph}>
                    <span>Option B:</span> {curQuestion.option_B}
                  </Typography>
                  <Typography className={classes.paragraph}>
                    <span>Option C:</span> {curQuestion.option_C}
                  </Typography>
                  <Typography className={classes.paragraph}>
                    <span>Option D:</span> {curQuestion.option_D}
                  </Typography>
                  <Divider light />
                  <Typography className={classes.paragraph}>
                    <span>Correct Anwers:</span>
                    {formatAnswer(curQuestion.answer)}
                  </Typography>
                  <Divider light />
                  <Typography className={classes.paragraph}>
                    <span>Explanation: </span> {curQuestion.explanation}
                  </Typography>
                  <Divider light />
                  <Box style={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      className={classes.btn}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      className={classes.btn}
                      variant="contained"
                      color="primary"
                      onClick={() => deleteQuestion(ind)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        {/* {questionList.map((data, key) => (
          <Box
            style={{
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
              marginBottom: "20px",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box className={classes.formElement}>
                <Typography
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  {key + 1 + " "}
                </Typography>
                <TextField
                  label="Question Name"
                  value={data.questionName}
                  size="small"
                />
              </Box>
              <Box className={classes.formElement}>
                <TextField label="Difficulty" size="small" />
                <TextField label="Marks" size="small" />
              </Box>
            </Box>
            {data.options.map((opt) => (
              <Box className={classes.formElement}>
                <TextField label="Option" value={opt} fullWidth size="small" />
              </Box>
            ))}

            <Box className={classes.formElement}>
              <TextField label="Correct answer" fullWidth size="small" />
            </Box>
            <Box className={classes.formElement}>
              <TextField
                multiline
                minRows={3}
                label="Explanation"
                fullWidth
                size="small"
              />
            </Box>
          </Box>
        ))} */}
      </Box>
    </Box>
  );
}

export default CreateExam;
