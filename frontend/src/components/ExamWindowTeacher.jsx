import React, { useEffect, useState } from "react";

import { useTimer } from "react-timer-hook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import ChatWindow from "./ChatWindow";
import QuestionList from "./QuestionList";
import toast from "react-simple-toasts";
import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";

function ExamWindowTeacher(props) {
  const [loading, setLoading] = useState(true);
  const [startTest, setStartTest] = useState(false);
  const selectedTest = props.selectedTest;
  const [testDetails, setTestDetails] = useState(null);
  const expiryTimestamp1 = new Date(selectedTest.startTime);
  const expiryTimestamp2 = new Date(selectedTest.endTime);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: expiryTimestamp1,
    onExpire: () => setStartTest(true),
  });

  const endTimer = useTimer({
    expiryTimestamp: expiryTimestamp2,
    onExpire: () => handleTestEnd(),
  });

  useEffect(() => {
    axios
      .get("/test/details/" + props.selectedTest._id, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setTestDetails(res.data.result);
          console.log(res.data);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      })
      .finally(() => setLoading(false));
  }, []);

  const getResults = (testId) => {
    axios
      .get("/responses/getByTestId/" + testId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          props.setResponseHistory(res.data.result);
          console.log(res.data.result);
          props.setCurrPage("resultHistory");
          window.scrollTo({ top: 0 });
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      });
  };
  const handleTestEnd = () => {
    toast("Test Ended", 4000);
    toast("Fetching result list", 4000);
    getResults(props.selectedTest._id);
  };
  const Loader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          height: "60vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="100px" />
      </Box>
    );
  };

  const content = () => {
    if (loading) {
      Loader();
    } else {
      return (
        <Box>
          <Grid container spacing={2}>
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
                    <Typography
                      style={{ fontSize: "24px", fontWeight: "bold" }}
                    >
                      {selectedTest.testName}
                    </Typography>
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
                    {!startTest ? (
                      <Typography>
                        Starts in: <span>{days}</span>:<span>{hours}</span>:
                        <span>{minutes}</span>:<span>{seconds}</span>
                      </Typography>
                    ) : (
                      <Typography>
                        Ends in: <span>{endTimer.days}</span>:
                        <span>{endTimer.hours}</span>:
                        <span>{endTimer.minutes}</span>:
                        <span>{endTimer.seconds}</span>
                      </Typography>
                    )}
                  </Box>
                  {startTest ? (
                    <ChatWindow
                      userDetails={props.userDetails.name}
                      testId={selectedTest._id}
                    ></ChatWindow>
                  ) : (
                    <Box>Test not started yet</Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Box>
                <QuestionList
                  role={props.userDetails.role}
                  questions={testDetails.questions}
                  deleteQuestion={() => console.log("Deleted")}
                ></QuestionList>
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    }
  };
  return <Box>{content()}</Box>;
}

export default ExamWindowTeacher;
