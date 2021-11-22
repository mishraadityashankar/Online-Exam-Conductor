import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormLabel,
  Grid,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import QuestionList from "./QuestionList";
import toast from "react-simple-toasts";
import { commonStyles, createExamStyles } from "../styles/CommonStyle";
import CreateQuestion from "./CreateQuestion";

function CreateExam(props) {
  const isEditing = props.editTestDetails ? true : false;
  const prevTest = props.editTestDetails;
  const initialExam = {
    testName: isEditing ? prevTest.testName : "",
    questions: [],
    createdBy: props.userDetails._id,
    startTime: "",
    endTime: "",
    subject: isEditing ? prevTest.subject : "",
    passingMarks: isEditing ? prevTest.passingMarks : 0,
    totalMarks: isEditing ? prevTest.totalMarks : 0,
    studentEnrolled: [],
    expired: isEditing ? prevTest.expired : false,
    activityThreshold: isEditing ? prevTest.activityThreshold : 3,
  };
  const initialQuestion = {
    questionName: "",
    problemStatement: "",
    subject: "",
    marks: 1,
    difficulty: "Easy",
    answer: [false, false, false, false],
    explanation: "Not available",
    option_A: "",
    option_B: "",
    option_C: "",
    option_D: "",
    createdBy: props.userDetails._id,
  };

  const classes = commonStyles();
  const classes1 = createExamStyles();
  const [open, setOpen] = useState(false);
  const [exam, setExam] = useState(initialExam);
  const [questionList, setQuestionList] = useState([]);
  const [totalQuestionList, setTotalQuestionList] = useState([]);
  const [pickedQuestion, setPickedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(
    isEditing ? prevTest.questions : []
  );
  const [totalMarks, setTotalMarks] = useState(
    isEditing ? prevTest.totalMarks : 0
  );
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const difficulty = ["Easy", "Medium", "Hard"];
  const [question, setQuestion] = useState(initialQuestion);
  const [err, setErr] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErr("");
    setQuestion(initialQuestion);
  };

  const fetchQuestions = () => {
    axios
      .get("/question/get", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
        params: {
          subject: exam.subject,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setQuestionList(res.data.result);
          setTotalQuestionList(res.data.result);
          console.log(res.data);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        props.setLayout("home");
      });
  };
  useEffect(() => {
    fetchQuestions();
  }, [exam.subject]);

  useEffect(() => {
    const filteredQuestion = totalQuestionList.filter(
      (ele) => ele.subject === exam.subject
    );
    setQuestionList(filteredQuestion);
  }, [exam.subject]);

  const addQuestion = () => {
    if (pickedQuestion)
      setSelectedQuestions([...selectedQuestions, pickedQuestion]);
    setTotalMarks(totalMarks + pickedQuestion.marks);
  };

  const deleteQuestion = (id) => {
    let newtotal = 0;
    selectedQuestions.map((ele, ind) => {
      if (ind !== id) newtotal += ele.marks;
      return;
    });
    let updatedQuestions = selectedQuestions.filter(
      (item, index) => index !== id
    );
    if (updatedQuestions.length === 0) setPickedQuestion(null);
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

  const handleSubmit = () => {
    const startTime = new Date(date);
    const startDatetimeUTC = moment.utc(startTime).format();
    const endTime = moment(startTime).add(duration, "m").toDate();
    const endDatetimeUTC = moment.utc(endTime).format();
    const questions = selectedQuestions.map((ele) => ele._id);

    if (exam.testName === "") {
      toast("Test Name cannot be empty");
      return;
    } else if (startTime == "Invalid Date" || endTime == "Invalid Date") {
      toast("Select date properly");
      return;
    } else if (exam.activityThreshold < 0) {
      toast("User activity threshold has be to positive");
      return;
    } else if (duration < 0) {
      toast("Duration has be to positive");
      return;
    } else if (exam.passingMarks > totalMarks || exam.passingMarks < 0) {
      toast(
        "Passing marks should be positive and less than or equals to total"
      );
      return;
    } else if (exam.subject === "") {
      toast("Select subject properly");
      return;
    }

    const reqBody = {
      ...exam,
      startTime: startDatetimeUTC,
      endTime: endDatetimeUTC,
      questions: questions,
      totalMarks: totalMarks,
    };
    const url = isEditing
      ? "/test/update/" + prevTest._id + "/" + props.userDetails._id
      : "/test/add";
    axios
      .post(url, reqBody, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setExam(initialExam);
        setDate("");
        setDuration(0);
        setTotalMarks(0);
        setPickedQuestion(null);
        setSelectedQuestions([]);
        toast(res.data.message);
        if (isEditing) {
          props.setCurrPage("examList");
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
      });
  };

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleOptionChecked = (e, id) => {
    console.log(id);
    const newAnswer = question.answer.map((ele, key) => {
      if (key === id) {
        return e.target.checked;
      }
      return ele;
    });

    setQuestion({ ...question, answer: newAnswer });
  };

  const handleCreateQuestion = (e) => {
    if (question.questionName === "") {
      setErr("Question Name cannot be empty");
      return;
    } else if (question.problemStatement === "") {
      setErr("Problem Statement cannot be empty");
      return;
    } else if (question.marks < 0) {
      setErr("Marks has be to positive");
      return;
    } else if (
      question.answer.reduce((count, ele) => {
        return ele ? count + 1 : count;
      }, 0) < 1
    ) {
      setErr("Select atleast one option");
      return;
    } else if (question.option_A === "") {
      setErr("Option A cannot be empty");
      return;
    } else if (question.option_B === "") {
      setErr("Option B cannot be empty");
      return;
    } else if (question.option_C === "") {
      setErr("Option C cannot be empty");
      return;
    } else if (question.option_D === "") {
      setErr("Option D cannot be empty");
      return;
    }
    axios
      .post("/question/add", question, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        toast(res.data.message, 4000);
        setQuestion(initialQuestion);
        fetchQuestions();
      })
      .catch((err) => {
        setOpen(false);
        console.log(err);
        toast(err.message, 4000);
      })
      .finally(() => {
        setErr("");
      });
  };
  return (
    <Box className={classes1.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box className={classes1.gridOuter}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className={classes.headingLeft}>Test Details</Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.normalParaRight}>
                  Total Marks: {totalMarks}
                </Box>
              </Grid>
            </Grid>
            <Box className={classes.formElement}>
              <TextField
                label="Test Name"
                name="testName"
                value={exam.testName}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Box>
            <Grid container spacing={2} className={classes.formElement}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  fullWidth
                  label="Select subject"
                  size="small"
                  name="subject"
                  value={exam.subject}
                  onChange={handleChange}
                >
                  {props.userDetails.expertise.split(" ").map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  label="User Activity Threshold"
                  size="small"
                  type="number"
                  name="activityThreshold"
                  fullWidth
                  value={exam.activityThreshold}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.formElement}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Passing Marks"
                  size="small"
                  name="passingMarks"
                  value={exam.passingMarks}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  name="duration"
                  fullWidth
                  value={duration}
                  onChange={handleDuration}
                  type="number"
                  label="Duration (minutes)"
                  size="small"
                />
              </Grid>
            </Grid>

            <Box>
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
            <Grid container spacing={2} className={classes.formElement}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Button variant="outlined" fullWidth onClick={handleClickOpen}>
                  Create Question
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleSubmit}
                >
                  {isEditing ? "Update Test" : "Create Test"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Box className={classes1.gridOuter}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={8} lg={9} xl={9}>
                <Box>
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label="Select question"
                    size="small"
                    value={pickedQuestion}
                    helperText="Select subject first to filter the questions"
                    onChange={handleSelection}
                  >
                    {questionList.length === 0 && (
                      <Box style={{ textAlign: "center", padding: "10px" }}>
                        No previous question found of the selected subject
                      </Box>
                    )}
                    {questionList.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option.questionName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                <Box>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    disabled={!pickedQuestion || pickedQuestion === ""}
                    onClick={addQuestion}
                  >
                    Add existing question
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box className={classes1.questionList}>
              {selectedQuestions.length === 0 ? (
                <Box className={classes.subHeadingCenter}>
                  No selected questions !!
                </Box>
              ) : (
                <QuestionList
                  role={props.userDetails.role}
                  questions={selectedQuestions}
                  deleteQuestion={deleteQuestion}
                  page="createExam"
                ></QuestionList>
              )}
            </Box>
            <Dialog fullWidth open={open} onClose={handleClose}>
              <DialogTitle className={classes.subHeadingCenter}>
                Create Question
              </DialogTitle>
              <DialogContentText className={classes.err}>
                {err}
              </DialogContentText>
              <DialogContent>
                <CreateQuestion
                  difficulty={difficulty}
                  question={question}
                  handleQuestionChange={handleQuestionChange}
                  handleOptionChecked={handleOptionChecked}
                  userDetails={props.userDetails}
                ></CreateQuestion>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleCreateQuestion}>
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateExam;
