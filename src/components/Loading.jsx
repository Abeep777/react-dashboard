import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

function Loading() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <div>
        <CircularProgress />
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      </div>
    </Box>
  );
}

export default Loading;
