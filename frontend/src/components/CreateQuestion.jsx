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

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "lightblue",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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

  const initialQuestion = {
    questionName: "",
    problemStatement: "",
    subject: "",
    marks: "",
    difficulty: "",
    answer: "",
    explanation: "",
    option_A: "",
    option_B: "",
    option_C: "",
    option_D: "",
  };

  const [question, setQuestion] = useState(initialQuestion);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  return (
    <Box className={classes.root}>
      <Box
        style={{
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
          width: "50%",
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
          <Button startIcon={<AddIcon />} variant="outlined" color="success">
            Create
          </Button>
        </Box>
        <Box className={classes.formElement}>
          <TextField sx={{ width: "49%" }} label="Question Name" size="small" />
          <TextField sx={{ width: "49%" }} label="Subject" size="small" />
        </Box>
        <Box className={classes.formElement}>
          <TextField
            id="outlined-select-currency"
            select
            sx={{ width: "49%" }}
            label="Difficulty"
            size="small"
            value={question.difficulty}
            //onChange={handleChange}
          >
            {difficulty.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ width: "49%" }}
            type="number"
            label="Marks"
            size="small"
          />
        </Box>

        <Box className={classes.formElement}>
          <TextField
            label="Option A"
            variant="standard"
            fullWidth
            size="small"
          />
        </Box>
        <Box className={classes.formElement}>
          <TextField
            label="Option B"
            variant="standard"
            fullWidth
            size="small"
          />
        </Box>
        <Box className={classes.formElement}>
          <TextField
            label="Option C"
            variant="standard"
            fullWidth
            size="small"
          />
        </Box>
        <Box className={classes.formElement}>
          <TextField
            label="Option D"
            variant="standard"
            fullWidth
            size="small"
          />
        </Box>

        <Box className={classes.formElement}>
          <FormLabel className={classes.formElement}>Correct Options</FormLabel>

          <FormControlLabel
            label="Option A"
            control={<Checkbox name="jason" />}
          />
          <FormControlLabel
            label="Option B"
            control={<Checkbox name="jason" />}
          />
          <FormControlLabel
            label="Option C"
            control={<Checkbox name="jason" />}
          />
          <FormControlLabel
            label="Option D"
            control={<Checkbox name="jason" />}
          />
        </Box>
        <Box className={classes.formElement}>
          <TextField
            label="Explanation"
            multiline
            minRows={3}
            maxRows={3}
            fullWidth
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CreateQuestion;
