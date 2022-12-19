import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Scale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

const customCanvasBackgroundColor = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart: any, args: any, options: any) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#111c44";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  Colors as any,
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  Filler,
  customCanvasBackgroundColor,
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  chartArea: {
    backgroundColor: "#d346b1",
  },
  animation: {},
  responsive: true,
  plugins: {
    // datalabels: {
    //   anchor: "end",
    //   align: "top",
    //   formatter: Math.round,
    //   font: {
    //     weight: "bold"
    //   }
    // },
    colors: {
      enabled: true,
    },
    legend: {
      position: "bottom" as const,
      align: "center" as const,
      labels: {
        font: {
          size: 14,
          family: "Segoe UI",
          weight: "600",
        },
        color: "white",
      },
    },
    title: {
      display: true,
      text: "Thống kê tấn công DDos trong ngày",
      titleAlign: "center",
      // align: "center",
      font: {
        size: 16,
        family: "Segoe UI",
        weight: "600",
      },
      padding: {
        bottom: 20,
      },
      color: "white",
    },
    tooltip: {},
    // ******************** END ZOOM ********************
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    showLine: true,
    scales: {
      x: {
        type: "time",
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
          color: "rgb(255 255 255 / 0.2)",
        },
        ticks: {
          display: false,
          // color: "red",
          color: "white",
          font: {
            size: 14,
            family: "Segoe UI",
            lineHeight: 2,
          },
        },
      },
      y: {
        beginAtZero: false,
        suggestedMin: 0,
        grid: {
          display: true,
          color: "rgb(255 255 255 / 0.2)",
        },
        ticks: {
          color: "white",
          font: {
            size: 14,
            family: "Segoe UI",
          },
        },
      },
    },
  },
};

const labels = ["January"];

export const data = {
  labels,
  datasets: [
    {
      label: "thanhnien.vn",
      data: [111],
      // borderColor: "rgb(255, 99, 132)"
      // backgroundColor: "rgba(255, 99, 132, 0.5)"
    },
    {
      label: "zingnews.vn",
      data: [85],
      // borderColor: "rgb(53, 162, 235)",
      // backgroundColor: "rgba(53, 162, 235, 0.5)"
    },
    {
      label: "baomoi.com",
      data: [67],
      // borderColor: "rgb(53, 162, 235)",
      // backgroundColor: "rgba(53, 162, 235, 0.5)"
    },
    {
      label: "tienphong.vn",
      data: [121],
      // borderColor: "rgb(53, 162, 235)",
      // backgroundColor: "rgba(53, 162, 235, 0.5)"
    },
    {
      label: "sggp.org.vn",
      data: [2],
      // borderColor: "rgb(53, 162, 235)",
      // backgroundColor: "rgba(53, 162, 235, 0.5)"
    },
  ],
};

export function StackBarChart() {
  return <Bar height={"100%"} width={"100%"} options={options} data={data} />;
}
