import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ inputData }) => {
    const data = {
        labels: Object.keys(inputData),
        datasets: [
            {
                label: "Confidence Score",
                data: Object.values(inputData),
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.5)",
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
                position: "right",
            },
            title: {
                display: true,
                text: "Chart.js Horizontal Bar Chart",
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
