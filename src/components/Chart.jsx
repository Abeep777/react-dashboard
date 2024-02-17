import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Typography, IconButton } from "@mui/material";

const Chart = ({ list }) => {
  // Group data by category
  const groupedData = list.reduce((result, item) => {
    const category = item.category || "CSV"; // Default to 'CSV' if category is not provided
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);
    return result;
  }, {});

  // Convert grouped data to an array as per the pie chart series data
  const chartData = Object.keys(groupedData).map((category, index) => ({
    id: index,
    label: category,
    value: groupedData[category].length,
  }));

  return (
    <>
      {chartData && chartData.length > 0 ? (
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label} (${item.value})`,
              arcLabelMinAngle: 45,
              data: chartData,
            },
          ]}
          height={200}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography variant="body1" color="secondary">
            No chart to show
          </Typography>
          <IconButton size="large" color="inherit">
            <PieChartIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default Chart;
