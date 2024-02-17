import React, { useState } from "react";
import { Button, Typography, Paper } from "@mui/material";
import Papa from "papaparse";

const CsvUploader = ({ onUpload }) => {
  const [csvData, setCSVData] = useState(null);

  const handleFileUpload = () => {
    if (csvData) {
      onUpload(csvData);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data;
          setCSVData(parsedData);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <>
      <Paper style={{ padding: "20px", margin: "20px" }}>
        <Typography variant="h5">Upload Questions from CSV</Typography>
        <div style={{ padding: "20px 0 20px 0" }}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <Button variant="contained" onClick={handleFileUpload}>
          Upload CSV
        </Button>
      </Paper>
    </>
  );
};

export default CsvUploader;
