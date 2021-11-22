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
  const [testList, setTestList] = useState(null);
  const [displayTest, setDisplayTest] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const fetchTests = () => {
    axios
      .get("/test/getByUser", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setTestList(res.data.result);
          setDisplayTest(res.data.result.remainingTests);
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
  };
  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (checked) {
        setDisplayTest(testList.expiredTests);
      } else {
        setDisplayTest(testList.remainingTests);
      }
    }
  }, [checked]);

  const handleDelete = (testId) => {
    axios
      .delete("/test/delete/" + testId + "/" + props.userDetails._id, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        toast(res.data.message);
        fetchTests();
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        props.setLayout("home");
      });
  };
  const handleEdit = (testId) => {
    axios
      .get("/test/fullDetails/" + testId + "/" + props.userDetails._id, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        toast(res.data.message);
        console.log(res.data.result);
        props.setEditTestDetails(res.data.result);
        props.setCurrPage("createExam");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        props.setLayout("home");
      });
  };
  const handleEnter = (curTest) => {
    props.setSelectedTest(curTest);
    props.setCurrPage("examDetails");
  };

  const getDuration = (startTime, endTime) => {
    let m1 = moment(startTime);
    let m2 = moment(endTime);
    let m3 = m2.diff(m1, "minutes");
    return m3 + " minutes";
  };

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

  const noTest = () => {
    return (
      <Box className={classes.notest}>
        <Box>
          <Typography className={classes.notestTypo}>
            {" "}
            No {checked ? "expired " : "remaining "}test found
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => props.setCurrPage("createExam")}
          >
            Create Test
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
              label="Expired Test"
            />
          </Box>
          <Grid container spacing={2}>
            {displayTest.length === 0 && noTest()}
            {displayTest.map((ele, ind) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Box className={classes.box}>
                  <Grid container spacing={2} className={classes.typo}>
                    <Grid item xs={9}>
                      <Typography className={classes.heading1}>
                        Test Name : {ele.testName}
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
                      <Typography>Subject: {ele.subject}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        Duration: {getDuration(ele.startTime, ele.endTime)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} className={classes.typo}>
                    <Grid item xs={6}>
                      <Typography>
                        Start Date: {moment(ele.startTime).format("YYYY-MM-DD")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        Start Time: {moment(ele.startTime).format("HH:mm")}
                      </Typography>
                    </Grid>
                  </Grid>
                  {checked ? (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => getResults(ele._id)}
                    >
                      Results
                    </Button>
                  ) : (
                    <Button
                      fullWidth
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
