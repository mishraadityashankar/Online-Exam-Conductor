import React, { useEffect } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { makeStyles } from "@mui/styles";

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
    margin: "10px",
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
function ExamWindow(props) {
  const classes = useStyles();
  const instructions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  ];

  //   useEffect(() => {
  //     console.log(document.fullscreenElement);
  //     if (!document.fullscreenElement) {
  //       alert("enter full screen");
  //     }
  //   }, [document.fullscreenElement]);
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => console.log(e));
  };
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          style={{ height: "100vh", overflow: "auto" }}
        >
          {["", "", "", "", "", "", "", "", "", ""].map((ele) => (
            <Accordion
              style={{
                margin: "10px",
                boxShadow: "0 4px 4px 0 rgb(0 0 0 / 20%)",
              }}
            >
              <AccordionSummary
                style={{ backgroundColor: "#F8F8F8" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>1. Find the Ace</Typography>
                    <Typography>Easy</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ textAlign: "right" }}>
                      Marks: 1
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </Typography>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <Checkbox
                        // checked={question.answer[0]}
                        // onChange={(e) => handleChecked(e, 0)}
                        name="opt_a"
                      />
                    </Box>
                    <Typography>
                      <span>A:</span>{" "}
                      {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                      }
                    </Typography>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <Checkbox
                        // checked={question.answer[0]}
                        // onChange={(e) => handleChecked(e, 0)}
                        name="opt_a"
                      />
                    </Box>
                    <Typography>
                      <span>B:</span>{" "}
                      {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                      }
                    </Typography>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <Checkbox
                        // checked={question.answer[0]}
                        // onChange={(e) => handleChecked(e, 0)}
                        name="opt_a"
                      />
                    </Box>
                    <Typography>
                      <span>C:</span>{" "}
                      {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                      }
                    </Typography>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <Checkbox
                        // checked={question.answer[0]}
                        // onChange={(e) => handleChecked(e, 0)}
                        name="opt_a"
                      />
                    </Box>
                    <Typography>
                      <span>D:</span>{" "}
                      {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                      }
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
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
                <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
                  Minor 1
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => props.setLayout("main")}
                >
                  Endtest
                </Button>
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
                  Total Marks: 15
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Subject: Maths
                </Typography>
              </Box>
              <Box>
                <Typography>Time Left: 15sec</Typography>
              </Box>
            </Box>
            <Typography
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Ask Doubt
            </Typography>
            <TextField
              label="Ask Question"
              name="testName"
              style={{ marginBottom: "20px" }}
              //   value={exam.testName}
              //   onChange={handleChange}
              fullWidth
              size="small"
            />
            <Box
              style={{
                backgroundColor: "white",
                padding: "20px",
                height: "270px",
                overflow: "auto",
              }}
            >
              {[
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
              ].map((ele) => (
                <Box>
                  <Typography
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Aditya
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    Hello Sir how are you
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExamWindow;
