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

function ResponsesList(props) {
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
          console.log(res.data.result);
        } else {
          alert(res.data.message);
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
    console.log(id);
    axios
      .get("/responses/details/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("OEC_token"),
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          console.log(res.data);
          props.setCurResponses(res.data.result);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      })
      .finally(() => props.setCurrPage("singleResponses"));
  };
  return (
    <Box
      style={{
        backgroundColor: "#EBF2F8",
        padding: "20px",
        height: "100vh",
      }}
    >
      {responsesList.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "blue" }}>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  S.No
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Test Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Finish Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Result
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
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
                  <TableCell align="center" component="th" scope="row">
                    {ind + 1}
                  </TableCell>

                  <TableCell align="center">{row.testName}</TableCell>
                  <TableCell align="center">
                    {moment(row.finishTime).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.finishTime).format("HH:mm:ss")}
                  </TableCell>
                  <TableCell align="center">
                    {row.passed ? "Passed" : "Failed"}
                  </TableCell>
                  <TableCell align="center">
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
  );
}

export default ResponsesList;
