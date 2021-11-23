import React, { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { commonStyles } from "../styles/CommonStyle";
import { createExamStyles } from "../styles/ExamStyle";

function CreateQuestion(props) {
  const classes = commonStyles();
  const classes1 = createExamStyles();
  return (
    <Box>
      <Box className={classes.formElement}>
        <TextField
          variant="standard"
          fullWidth
          label="Question Name"
          name="questionName"
          value={props.question.questionName}
          onChange={props.handleQuestionChange}
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
          value={props.question.problemStatement}
          onChange={props.handleQuestionChange}
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
          value={props.question.option_A}
          onChange={props.handleQuestionChange}
          size="small"
        />
      </Box>
      <Box className={classes.formElement}>
        <TextField
          label="Option B"
          variant="standard"
          name="option_B"
          value={props.question.option_B}
          onChange={props.handleQuestionChange}
          fullWidth
          size="small"
        />
      </Box>
      <Box className={classes.formElement}>
        <TextField
          label="Option C"
          variant="standard"
          name="option_C"
          value={props.question.option_C}
          onChange={props.handleQuestionChange}
          fullWidth
          size="small"
        />
      </Box>
      <Box className={classes.formElement}>
        <TextField
          label="Option D"
          variant="standard"
          name="option_D"
          value={props.question.option_D}
          onChange={props.handleQuestionChange}
          fullWidth
          size="small"
        />
      </Box>
      <Box className={classes.formElement}>
        <Box className={classes1.flexBox1}>
          <FormLabel className={classes.formElement}>Correct Options</FormLabel>

          <FormControlLabel
            label="Option A"
            control={
              <Checkbox
                checked={props.question.answer[0]}
                onChange={(e) => props.handleOptionChecked(e, 0)}
                name="opt_a"
              />
            }
          />
          <FormControlLabel
            label="Option B"
            control={
              <Checkbox
                checked={props.question.answer[1]}
                onChange={(e) => props.handleOptionChecked(e, 1)}
                name="opt_b"
              />
            }
          />
          <FormControlLabel
            label="Option C"
            control={
              <Checkbox
                checked={props.question.answer[2]}
                onChange={(e) => props.handleOptionChecked(e, 2)}
                name="opt_c"
              />
            }
          />
          <FormControlLabel
            label="Option D"
            control={
              <Checkbox
                checked={props.question.answer[3]}
                onChange={(e) => props.handleOptionChecked(e, 3)}
                name="opt_d"
              />
            }
          />
        </Box>
        <Box className={classes1.flexBox2}>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            label="Select subject"
            size="small"
            name="subject"
            value={props.question.subject}
            onChange={props.handleQuestionChange}
          >
            {props.userDetails.expertise.split(" ").map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            label="Difficulty"
            size="small"
            name="difficulty"
            value={props.question.difficulty}
            onChange={props.handleQuestionChange}
          >
            {props.difficulty.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="marks"
            value={props.question.marks}
            onChange={props.handleQuestionChange}
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
          value={props.question.explanation}
          onChange={props.handleQuestionChange}
          minRows={3}
          maxRows={3}
          fullWidth
          size="small"
        />
      </Box>
    </Box>
  );
}

export default CreateQuestion;
