import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Card,
  TextareaAutosize,
  Checkbox,
  CardContent,
  Grid,
  FormControlLabel,
  FormLabel,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "lightblue",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "20px",
  },
  card: {
    width: "70%",
    padding: "10px",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  btn: {
    display: "block",
    width: "38%",
  },
});

function CreateQuestion(props) {
  const classes = useStyles();
  const difficulty = ["Easy", "Medium", "Hard"];
  const userDetails = props.userDetails;
  const initialQuestion = {
    questionName: "",
    problemStatement: "",
    subject: "",
    marks: 1,
    difficulty: "Easy",
    answer: [false, false, false, false],
    explanation: "",
    option_A: "",
    option_B: "",
    option_C: "",
    option_D: "",
    createdBy: userDetails._id,
  };

  const [question, setQuestion] = useState(initialQuestion);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleChecked = (e, id) => {
    console.log(id);
    const newAnswer = question.answer.map((ele, key) => {
      if (key === id) {
        return e.target.checked;
      }
      return ele;
    });

    setQuestion({ ...question, answer: newAnswer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/question/add", question, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        setQuestion(initialQuestion);
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
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
          width: "70%",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <Box className={classes.formElement}>
          <Typography
            sx={{
              width: "60%",
              display: "block",
              textAlign: "left",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Create Question
          </Typography>
          <Button
            onClick={handleSubmit}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </Box>
        <Box>
          <Box className={classes.formElement}>
            <TextField
              variant="standard"
              fullWidth
              label="Question Name"
              name="questionName"
              value={question.questionName}
              onChange={handleChange}
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Problem Statement"
              multiline
              minRows={3}
              maxRows={3}
              name="problemStatement"
              value={question.problemStatement}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Option A"
              variant="standard"
              fullWidth
              name="option_A"
              value={question.option_A}
              onChange={handleChange}
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Option B"
              variant="standard"
              name="option_B"
              value={question.option_B}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Option C"
              variant="standard"
              name="option_C"
              value={question.option_C}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Option D"
              variant="standard"
              name="option_D"
              value={question.option_D}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>
          <Box className={classes.formElement}>
            <Box
              style={{ display: "flex", flexDirection: "column", width: "40%" }}
            >
              <FormLabel className={classes.formElement}>
                Correct Options
              </FormLabel>

              <FormControlLabel
                label="Option A"
                control={
                  <Checkbox
                    checked={question.answer[0]}
                    onChange={(e) => handleChecked(e, 0)}
                    name="opt_a"
                  />
                }
              />
              <FormControlLabel
                label="Option B"
                control={
                  <Checkbox
                    checked={question.answer[1]}
                    onChange={(e) => handleChecked(e, 1)}
                    name="opt_b"
                  />
                }
              />
              <FormControlLabel
                label="Option C"
                control={
                  <Checkbox
                    checked={question.answer[2]}
                    onChange={(e) => handleChecked(e, 2)}
                    name="opt_c"
                  />
                }
              />
              <FormControlLabel
                label="Option D"
                control={
                  <Checkbox
                    checked={question.answer[3]}
                    onChange={(e) => handleChecked(e, 3)}
                    name="opt_d"
                  />
                }
              />
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
                justifyContent: "space-around",
              }}
            >
              <TextField
                fullWidth
                name="subject"
                value={question.subject}
                onChange={handleChange}
                label="Subject"
                size="small"
              />
              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label="Difficulty"
                size="small"
                name="difficulty"
                value={question.difficulty}
                onChange={handleChange}
              >
                {difficulty.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="marks"
                value={question.marks}
                onChange={handleChange}
                fullWidth
                type="number"
                label="Marks"
                size="small"
              />
            </Box>
          </Box>
          <Box className={classes.formElement}>
            <TextField
              label="Explanation"
              multiline
              name="explanation"
              value={question.explanation}
              onChange={handleChange}
              minRows={3}
              maxRows={3}
              fullWidth
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateQuestion;
