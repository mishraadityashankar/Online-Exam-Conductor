import React from "react";
import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
} from "@mui/material";

import moment from "moment";
import { studentResultStyles } from "../styles/StudentStyle";

function StudentsResultList(props) {
  const classes = studentResultStyles();
  return (
    <Box className={classes.root}>
      {props.responseHistory ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box className={classes.box}>
              <Typography className={classes.typo}>
                <span>Test Name:</span> {props.responseHistory[0].testName}
              </Typography>

              <Typography className={classes.typo}>
                <span>Date:</span>{" "}
                {moment(props.responseHistory[0].finishTime).format(
                  "YYYY-MM-DD"
                )}
              </Typography>
              <Typography className={classes.typo}>
                <span>Passing Marks:</span>{" "}
                {props.responseHistory[0].passingMarks}
              </Typography>
              <Typography className={classes.typo}>
                <span>Total Marks:</span> {props.responseHistory[0].totalMarks}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box className={classes.table}>
              <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        width="10%"
                        sx={{ fontWeight: "bold" }}
                      >
                        Rank
                      </TableCell>
                      <TableCell width="30%" sx={{ fontWeight: "bold" }}>
                        Student Name
                      </TableCell>
                      <TableCell
                        align="center"
                        width="15%"
                        sx={{ fontWeight: "bold" }}
                      >
                        Scores Obtained
                      </TableCell>
                      <TableCell
                        align="center"
                        width="15%"
                        sx={{ fontWeight: "bold" }}
                      >
                        Finish Time
                      </TableCell>
                      <TableCell
                        align="center"
                        width="15%"
                        sx={{ fontWeight: "bold" }}
                      >
                        Result
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.responseHistory.length ? (
                      props.responseHistory.map((row, ind) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            width="10%"
                            component="th"
                            scope="row"
                          >
                            {ind + 1}
                          </TableCell>

                          <TableCell width="30%">
                            {row.studentId.name}
                          </TableCell>
                          <TableCell align="center" width="15%">
                            {row.scoresObtained}
                          </TableCell>
                          <TableCell align="center" width="15%">
                            {moment(row.finishTime).format("HH:mm:ss")}
                          </TableCell>
                          <TableCell align="center" width="15%">
                            {row.passed ? "Passed" : "Failed"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <Box>No responses</Box>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box>Loading</Box>
      )}
    </Box>
  );
}

export default StudentsResultList;
