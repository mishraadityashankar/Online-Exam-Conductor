import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

import axios from "axios";
import moment from "moment";
import toast from "react-simple-toasts";
import { responseListStyles } from "../styles/ResponseStyle";

function ResponsesList(props) {
  const classes = responseListStyles();
  const [responsesList, setResponsesList] = useState([]);

  useEffect(() => {
    axios
      .get("/responses/getByUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setResponsesList(res.data.result);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      });
    return () => {
      console.log("unmounts");
    };
  }, []);

  const handleView = (id) => {
    axios
      .get("/responses/details/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          props.setCurResponses(res.data.result);
        } else {
          toast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      })
      .finally(() => props.setCurrPage("singleResponses"));
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.table}>
        {responsesList.length ? (
          <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    width="10%"
                    sx={{ fontWeight: "bold" }}
                  >
                    S.No
                  </TableCell>
                  <TableCell width="30%" sx={{ fontWeight: "bold" }}>
                    Exam Name
                  </TableCell>
                  <TableCell
                    align="center"
                    width="15%"
                    sx={{ fontWeight: "bold" }}
                  >
                    Date
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
                  <TableCell
                    align="center"
                    width="15%"
                    sx={{ fontWeight: "bold" }}
                  >
                    More Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responsesList.map((row, ind) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      width="10%"
                      component="th"
                      scope="row"
                    >
                      {ind + 1}
                    </TableCell>

                    <TableCell width="30%">{row.examName}</TableCell>
                    <TableCell align="center" width="15%">
                      {moment(row.finishTime).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="center" width="15%">
                      {moment(row.finishTime).format("HH:mm:ss")}
                    </TableCell>
                    <TableCell align="center" width="15%">
                      {row.passed ? "Passed" : "Failed"}
                    </TableCell>
                    <TableCell align="center" width="15%">
                      <Button onClick={() => handleView(row._id)}>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box>No Responses</Box>
        )}
      </Box>
    </Box>
  );
}

export default ResponsesList;
