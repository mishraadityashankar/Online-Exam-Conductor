import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

function ExamList(props) {
  return (
    <Box style={{ padding: "20px", textAlign: "left" }}>
      <Grid container spacing={2}>
        {["", "", ""].map((ele) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box
              style={{
                borderRadius: "5px",
                boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                padding: "20px",
                backgroundColor: "#F5F5F5",
              }}
            >
              <Typography style={{ fontSize: "24px", marginBottom: "20px" }}>
                Test Name : XYZ
              </Typography>
              <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                <Grid item xs={6}>
                  <Typography>Subject: English</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Date: 25/89/190</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                <Grid item xs={6}>
                  <Typography>Time: 5:40</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography></Typography>
                  Duration: 45 min
                </Grid>
              </Grid>
              <Button
                //className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => props.setCurrPage("examDetails")}
                // onClick={() => deleteQuestion(ind)}
              >
                Enter
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ExamList;
