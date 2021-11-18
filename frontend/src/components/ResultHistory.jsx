import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { PieChart } from "react-minimal-pie-chart";
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
import axios from "axios";
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
function ResultHistory(props) {
  const classes = useStyles();
  const selectedTest = props.selectedTest;
  const userDetails = props.userDetails;
  const [selectedTestDetails, setSelectedTestDetails] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("/test/details/" + selectedTest._id, {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("OEC_token"),
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.message === "Success") {
  //           setSelectedTestDetails(res.data.result);
  //           console.log(res.data);
  //         } else {
  //           alert(res.data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         props.setLayout("home");
  //       });
  //   }, []);

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
    <Box
      style={{ padding: "20px", backgroundColor: "#EBF2F8", height: "90vh" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box
            style={{
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
            }}
          >
            <Typography
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              My Profile
            </Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "orange",
                  width: 150,
                  height: 150,
                  margin: "20px",
                  fontSize: "42px",
                }}
              >
                A
              </Avatar>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }}
            >
              <Typography className={classes.formElement}>
                TestName: XYZ
              </Typography>
              <Typography className={classes.formElement}>
                Total Marks: 80
              </Typography>
              <Typography className={classes.formElement}>
                Marks Obtained: 50
              </Typography>
              <Typography className={classes.formElement}>
                Status: Pass
              </Typography>
              <Typography className={classes.formElement}>
                Remarks: Do well next time
              </Typography>
              <Typography className={classes.formElement}>Responses</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Box
            style={{
              padding: "20px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Results
              </Typography>
              <TextField
                id="outlined-select-currency"
                select
                sx={{ width: "50%", margin: "10px" }}
                label="Select question"
                size="small"
                // value={pickedQuestion}
                //onChange={handleSelection}
              >
                {["", "", ""].map((option) => (
                  <MenuItem key={option} value={option}>
                    {"ioioioioioioioiooioioioioioioio"}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6} lg={12} xl={12}>
                    <Box style={{ textAlign: "left" }}>
                      <Typography className={classes.formElement}>
                        TestName: XYZ
                      </Typography>
                      <Typography className={classes.formElement}>
                        Date: 27/11/10
                      </Typography>
                      <Typography className={classes.formElement}>
                        Total Marks: 80
                      </Typography>
                      <Typography className={classes.formElement}>
                        Marks Obtained: 50
                      </Typography>
                      <Typography className={classes.formElement}>
                        Status: Pass
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={12} xl={12}>
                    <Box>
                      <PieChart
                        data={[
                          { title: "Correct", value: 10, color: "#4acf50" },
                          { title: "Wrong", value: 15, color: "#ff4040" },
                        ]}
                        label={({ dataEntry }) => {
                          console.log(dataEntry);
                          return `${Math.round(dataEntry.percentage)} %`;
                        }}
                        radius={40}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                <Box
                  style={{
                    height: "400px",
                    overflow: "auto",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {["", "", "", "", "", ""].map((ele, ind) => (
                    <Accordion
                      style={{
                        margin: "5px",
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
                            <Typography
                              style={{
                                padding: "5px",
                                fontWeight: "bold",
                                fontSize: "18px",
                              }}
                            >
                              {ind + 1 + " "}. {ele.questionName}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              style={{
                                textAlign: "right",
                                padding: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Marks: {ele.marks}
                            </Typography>
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography style={{ padding: "10px" }}>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum
                          {ele.problemStatement}
                        </Typography>
                        <Box>
                          <Box>
                            <Typography variant="p">
                              <span>A: </span> {ele.option_A}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="p">
                              <span>B:</span> {ele.option_B}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="p">
                              <span>C:</span> {ele.option_C}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="p">
                              <span>D:</span> {ele.option_D}
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResultHistory;
