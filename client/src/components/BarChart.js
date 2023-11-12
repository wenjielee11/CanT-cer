import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ inputData }) => {
    const data = {
        labels: Object.keys(inputData),
        datasets: [
            {
                label: "Confidence Score",
                data: Object.values(inputData),
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Example of a softer color
                borderColor: "rgba(75, 192, 192, 1)", // Matching border color
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75, 192, 192, 0.4)", // Hover state color
                hoverBorderColor: "rgba(75, 192, 192, 1)", // Hover state border color
            },
        ],
    };
    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 20,
                    padding: 20,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: "Diagnosis Result",
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(200, 200, 200, 0.8)",
                },
                ticks: {
                    color: "#000", // Tick labels color
                },
            },
            y: {
                grid: {
                    color: "rgba(200, 200, 200, 0.8)",
                },
                ticks: {
                    color: "#000", // Tick labels color
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
