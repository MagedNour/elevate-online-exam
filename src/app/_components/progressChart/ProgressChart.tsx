import React from "react";
import { Chart } from "react-google-charts";







export default function ProgressChart({ correct, incorrect }: { correct: number; incorrect: number }) {

  const total = correct + incorrect; // Calculate total questions
  const correctPercentage = (correct / total) * 100; // Calculate percentage for Correct
  const incorrectPercentage = (incorrect / total) * 100; // Calculate percentage for Incorrect

  const data = [
    ["state", "value"],
    ["Correct", correct],
    ["Incorrect", incorrect],

  ];

  const options = {
    pieHole: 0.9,
    is3D: false,
    legend: 'none',
    slices: {
      0: { offset: 0, color: "#02369C" },
      1: { offset: 0.1, color: "#CC1010" },
    },
    pieSliceText: 'none',


  };

  return (
    <div style={{ position: "relative", width: "164px", height: "164px" }}>
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
      {/* Overlay text for percentage */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        {Math.round(correctPercentage)}% {/* Displaying the correct percentage */}
      </div>
    </div>

  );
}
