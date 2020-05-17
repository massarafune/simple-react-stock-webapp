import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";


const chartConfig = {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Closing Price",
                data: [],
                backgroundColor: "rgba(126,126,126,0.3)",
                borderColor: "rgba(41,41,41,0.5)",
                borderWidth: 1
            }
        ]
    },
    options: {
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 0,
                bottom: 10
            }
        },
        scales: {
            xAxes:[
                {
                    ticks: {
                        reverse: true,
                        maxTicksLimit: 10
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false
                    }
                }
            ]
        }
    }
};

export default function ChartObject(data) {
    const chartContainer = useRef(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChart = new Chartjs(chartContainer.current, chartConfig);
            setChart(newChart);
        }
    }, [chartContainer]);

    useEffect(()=> {
        if(chart){
            const newChart = new Chartjs(chartContainer.current, chartConfig);
            setChart(newChart);
        }
    },[data]);

    useEffect(()=> {
        if(chart){
            const closing = data.data.map(x=>x.close);
            // const closing = data.data.reverse().map(x=>x.close);
            const dateLabel = data.data.map(x=>x.timestamp);
            updateDataset(0, closing, dateLabel);
        }
    },[chart]);

    const updateDataset = (datasetIndex, newData, newLabel) => {
        // console.log(chartInstance);
        chart.data.datasets[datasetIndex].data = newData;
        chart.data.labels = newLabel;
        chart.update();
    };

    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
};

