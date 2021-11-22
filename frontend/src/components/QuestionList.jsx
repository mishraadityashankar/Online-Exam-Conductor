import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { questionStyles } from "../styles/ExamStyle";

const formatAnswer = (answerArray) => {
  let ans = " ";
  answerArray.map((ele, ind) => {
    if (ele) ans += String.fromCharCode(65 + ind) + " ";
  });
  return ans;
};

const formatMarkedAnswer = (responseString) => {
  const responseArr = responseString.split(",").map((ele) => ele === "true");
  return formatAnswer(responseArr);
};

function QuestionList(props) {
  const classes = questionStyles();
  return (
    <Box>
      {props.questions && props.questions.length ? (
        props.questions.map((curQuestion, ind) => (
          <Accordion className={classes.accordion}>
            <AccordionSummary
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={10} xl={10}>
                  <Typography className={classes.typo}>
                    {ind + 1 + " "}. {curQuestion.questionName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={2} xl={2}>
                  <Typography className={classes.typo}>
                    Marks: {curQuestion.marks}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography className={classes.paragraph}>
                  {curQuestion.problemStatement}
                </Typography>
                <Divider light />
                <Typography className={classes.paragraph}>
                  <span>Option A:</span> {curQuestion.option_A}
                </Typography>

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
                {props.responses && (
                  <>
                    <Divider light />
                    <Typography className={classes.paragraph}>
                      <span>Marked Anwers:</span>
                      {formatMarkedAnswer(props.responses.recordedAnswers[ind])}
                    </Typography>
                  </>
                )}
                <Divider light />
                <Typography className={classes.paragraph}>
                  <span>Explanation: </span> {curQuestion.explanation}
                </Typography>
                {props.role === "Faculty" && props.page === "createExam" && (
                  <>
                    <Divider light />
                    <Box className={classes.buttonBox}>
                      <Button
                        className={classes.btn}
                        variant="contained"
                        color="success"
                        onClick={() => props.deleteQuestion(ind)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box className={classes.noQuestion}>No Questions</Box>
      )}
    </Box>
  );
}

export default QuestionList;
