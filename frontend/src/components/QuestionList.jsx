import React from "react";
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
import { makeStyles } from "@mui/styles";
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
function QuestionList(props) {
  const classes = useStyles();
  return (
    <Box>
      {props.questions.map((curQuestion, ind) => (
        <Accordion
          style={{
            margin: "5px",
            boxShadow: "0 4px 4px 0 rgb(0 0 0 / 20%)",
          }}
        >
          <AccordionSummary
            style={{ backgroundColor: "#EBF2F8" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography
                  style={{
                    padding: "5px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {ind + 1 + " "}. {curQuestion.questionName}
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
                  Marks: {curQuestion.marks}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box style={{ textAlign: "left", padding: "5px" }}>
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
              {props.role === "Faculty" && (
                <>
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
      ))}
    </Box>
  );
}

export default QuestionList;
