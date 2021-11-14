import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/AddCircle";

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
});

function CreateExam(props) {
  const classes = useStyles();
  const fake = [
    {
      questionName: "xyz",
      problemStatement: "xxhhxhhxhhx xhxhhxhhx xhxhxhx",
      marks: "1",
      difficulty: "easy",
      answer: "jsjjsbsvgs",
      explanation: "ibis gsgsusgq sgq sugqusq ssugqs qisgqs qs",
      options: [
        "jhjahjhajhajhajhajajha",
        "jhahajhajhajhajha",
        "babahaajbajajb",
        "jhsjhsjhsjhs",
      ],
    },
    {
      questionName: "xyz",
      problemStatement: "xxhhxhhxhhx xhxhhxhhx xhxhxhx",
      marks: "1",
      difficulty: "easy",
      answer: "jsjjsbsvgs",
      explanation: "ibis gsgsusgq sgq sugqusq ssugqs qisgqs qs",
      options: [
        "jhjahjhajhajhajhajajha",
        "jhahajhajhajhajha",
        "babahaajbajajb",
        "jhsjhsjhsjhs",
      ],
    },
    {
      questionName: "xyz",
      problemStatement: "xxhhxhhxhhx xhxhhxhhx xhxhxhx",
      marks: "1",
      difficulty: "easy",
      answer: "jsjjsbsvgs",
      explanation: "ibis gsgsusgq sgq sugqusq ssugqs qisgqs qs",
      options: [
        "jhjahjhajhajhajhajajha",
        "jhahajhajhajhajha",
        "babahaajbajajb",
        "jhsjhsjhsjhs",
      ],
    },
    {
      questionName: "xyz",
      problemStatement: "xxhhxhhxhhx xhxhhxhhx xhxhxhx",
      marks: "1",
      difficulty: "easy",
      answer: "jsjjsbsvgs",
      explanation: "ibis gsgsusgq sgq sugqusq ssugqs qisgqs qs",
      options: [
        "jhjahjhajhajhajhajajha",
        "jhahajhajhajhajha",
        "babahaajbajajb",
        "jhsjhsjhsjhs",
      ],
    },
  ];
  const initialQuestion = {
    questionName: "",
    problemStatement: "",
    marks: "",
    difficulty: "",
    answer: "",
    explanation: "",
    options: [""],
  };
  const [questionList, setQuestionList] = useState([
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
  ]);

  const addQuestion = () => {
    setQuestionList([...questionList, initialQuestion]);
  };

  const deleteQuestion = (id) => {
    if (questionList.length > 1) {
      let updatedQuestions = questionList.filter((item, index) => index !== id);
      setQuestionList(updatedQuestions);
    } else {
      alert("Atleast one question should be there");
    }
  };

  return (
    <Box className={classes.root}>
      <Box
        style={{
          width: "27%",
          height: "60%",
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <Box
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
            margintop: "20px",
          }}
        >
          Assesment Details
        </Box>
        <Box className={classes.formElement}>
          <TextField label="Assesment Name" fullWidth size="small" />
        </Box>
        <Box className={classes.formElement}>
          <TextField
            label="Subject"
            style={{ marginRight: "5px" }}
            size="small"
          />
          <TextField type="number" label="Duration (minutes)" size="small" />
        </Box>
        <FormLabel className={classes.formElement}>
          Select Exam Date & Time
        </FormLabel>
        <Box className={classes.formElement}>
          <TextField style={{ marginRight: "5px" }} type="date" size="small" />
          <TextField type="time" size="small" />
        </Box>

        <Button
          className={classes.btn}
          variant="contained"
          fullWidth
          color="success"
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

            //onChange={handleChange}
          >
            {questionList.map((option) => (
              <MenuItem key={option} value={option}>
                Find the ace
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" color="error">
            Add question
          </Button>
        </Box>

        <Box
          style={{
            height: "90%",
            overflowY: "auto",
          }}
        >
          {questionList.map((cur) => (
            <Accordion style={{ margin: "8px" }}>
              <AccordionSummary
                style={{ backgroundColor: "#F5F5F5" }}
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
                  <Typography style={{ display: "block" }}>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      1.{" "}
                    </span>{" "}
                    Find the ace
                  </Typography>
                  <Box style={{ display: "flex", flexDirection: "row" }}>
                    <Typography style={{ marginRight: "10px" }}>
                      Marks: 15
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography style={{ marginLeft: "10px" }}>
                      Difficulty: Easy
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Divider light />
                <Box style={{ textAlign: "left" }}>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                  <Divider light />
                  <Typography>
                    <span>Option A:</span> Lorem ipsum dolor sit amet,
                    consectetur
                  </Typography>
                  {/* <Box>
      <FormControlLabel
        label="Option A"
        control={<Checkbox name="jason" />}
      />
    </Box> */}
                  <Typography>
                    <span>Option B:</span> Lorem ipsum dolor sit amet,
                    consectetur
                  </Typography>
                  <Typography>
                    <span>Option C:</span> Lorem ipsum dolor sit amet,
                    consectetur
                  </Typography>
                  <Typography>
                    <span>Option D:</span> Lorem ipsum dolor sit amet,
                    consectetur
                  </Typography>
                  <Divider light />
                  <Typography>
                    <span>Correct Anwers:</span> Options 1,2,3
                  </Typography>
                  <Divider light />
                  <Typography>
                    <span>Explanation: </span> Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                  </Typography>
                  <Divider light />
                  <Box style={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      className={classes.btn}
                      variant="outlined"
                      color="error"
                    >
                      Edit
                    </Button>
                    <Button
                      className={classes.btn}
                      variant="contained"
                      color="error"
                    >
                      Delete
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
