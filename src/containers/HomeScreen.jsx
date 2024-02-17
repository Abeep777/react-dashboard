import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Chart from "../components/Chart";
import QuestionsTable from "../components/QuestionsTable";
import Title from "../components/Title";

const getLocalStorage = () => {
  const lists = localStorage.getItem("questionList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const HomeScreen = () => {
  const listArray = getLocalStorage();
  return (
    <>
      <div style={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Title>
                Chart showing data from Manual entry(M) and CSV file(CSV)
              </Title>
              <Chart list={listArray} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <div>
                <Title>Total Number of Questions</Title>
                <Typography component="p" variant="h4">
                  {listArray && listArray.length}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>All Questions List</Title>
              <QuestionsTable questions={listArray} actionShow={false} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HomeScreen;
