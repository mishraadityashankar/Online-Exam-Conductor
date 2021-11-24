import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  IconButton,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-simple-toasts";
import { examListStyles } from "../styles/ExamStyle";

function ExamList(props) {
  const classes = examListStyles();
  const [loading, setLoading] = useState(true);
  const [examList, setExamList] = useState(null);
  const [displayExam, setDisplayExam] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const fetchExams = () => {
    axios
      .get("/exam/getByUser", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setExamList(res.data.result);
          setDisplayExam(res.data.result.remainingExams);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (checked) {
        setDisplayExam(examList.expiredExams);
      } else {
        setDisplayExam(examList.remainingExams);
      }
    }
  }, [checked]);

  const handleDelete = (examId) => {
    axios
      .delete("/exam/delete/" + examId + "/" + props.userDetails._id, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        toast(res.data.message);
        fetchExams();
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        props.setLayout("home");
      });
  };
  const handleEdit = (examId) => {
    axios
      .get("/exam/fullDetails/" + examId + "/" + props.userDetails._id, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        toast(res.data.message);
        props.setEditExamDetails(res.data.result);
        props.setCurrPage("createExam");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        props.setLayout("home");
      });
  };
  const handleEnter = (curExam) => {
    props.setSelectedExam(curExam);
    props.setCurrPage("examDetails");
  };

  const getDuration = (startTime, endTime) => {
    let m1 = moment(startTime);
    let m2 = moment(endTime);
    let m3 = m2.diff(m1, "minutes");
    return m3 + " minutes";
  };

  const getResults = (examId) => {
    axios
      .get("/responses/getByExamId/" + examId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          props.setResponseHistory(res.data.result);
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

  const noExam = () => {
    return (
      <Box className={classes.noexam}>
        <Box>
          <Box>No {checked ? "expired " : "live "}exam found</Box>
          <Button
            style={{ marginTop: "20px" }}
            variant="outlined"
            onClick={() => props.setCurrPage("createExam")}
          >
            Create Exam
          </Button>
        </Box>
      </Box>
    );
  };

  const content = () => {
    if (loading) {
      Loader();
    } else {
      return (
        <>
          <Box>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Expired Exam"
            />
          </Box>
          {displayExam.length === 0 && noExam()}
          <Grid container spacing={2}>
            {displayExam.map((ele, ind) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Box className={classes.box}>
                  <Grid container spacing={2} className={classes.typo}>
                    <Grid item xs={9}>
                      <Typography className={classes.heading1}>
                        <span>Exam Name: </span> {ele.examName}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          aria-label="edit"
                          onClick={() => handleEdit(ele._id)}
                          disabled={checked}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          aria-label="delete"
                          onClick={() => handleDelete(ele._id)}
                          disabled={checked}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} className={classes.typo}>
                    <Grid item xs={6}>
                      <Typography>
                        <span>Subject: </span>
                        {ele.subject}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        <span>Duration: </span>
                        {getDuration(ele.startTime, ele.endTime)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} className={classes.typo}>
                    <Grid item xs={6}>
                      <Typography>
                        <span>Date: </span>
                        {moment(ele.startTime).format("YYYY-MM-DD")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        <span>Time: </span>
                        {moment(ele.startTime).format("HH:mm")}
                      </Typography>
                    </Grid>
                  </Grid>
                  {checked ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => getResults(ele._id)}
                    >
                      Results
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEnter(ele)}
                    >
                      Enter
                    </Button>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      );
    }
  };
  return <Box className={classes.root}>{content()}</Box>;
}

export default ExamList;
