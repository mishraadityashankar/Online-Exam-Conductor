import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
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

import axios from "axios";
import moment from "moment";
import toast from "react-simple-toasts";

function StudentsResultList(props) {
  return (
    <Box
      style={{
        padding: "20px",
        height: "100vh",
        backgroundColor: "#EBF2F8",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {props.responseHistory ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                padding: "10px",
              }}
            >
              <Typography
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "18px",
                }}
              >
                Test Name: {props.responseHistory[0].testName}
              </Typography>

              <Typography
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "18px",
                }}
              >
                Date:{" "}
                {moment(props.responseHistory[0].finishTime).format(
                  "YYYY-MM-DD"
                )}
              </Typography>
              <Typography
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "18px",
                }}
              >
                Passing Marks: {props.responseHistory[0].passingMarks}
              </Typography>
              <Typography
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "18px",
                }}
              >
                Total Marks: {props.responseHistory[0].totalMarks}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box style={{ height: "500px", overflow: "auto" }}>
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
