import "chartjs-adapter-moment";

// import "chartjs-adapter-moment";
import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeSeriesScale,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

import ItemSummary from "../../ZDNPanel/TotalSummary/ItemSummary";
import { dataUsage } from "../faker";

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

ChartJS.register(Title, Tooltip, Legend, TimeSeriesScale, LineElement, LinearScale, PointElement, CategoryScale);

export default function TimeSeriesChart() {
  const chartRef = useRef(null);
  const res = dataUsage;
  let labels: number[] = [];
  let values: number[] = [];
  const labels2 = [
    "zingnews.vn",
    "thanhnien.vn",
    "baomoi.com",
    "tienphong.vn",
    "plo.vn",
    "giaoduc.net.vn",
    "baonghean.vn",
  ];
  // let dataValues = [
  //   { [9, 18, 24, 11, 21, 9, 8, 92, 3, 6, 8, 1] },
  //   { [9, 18, 24, 11, 21, 9, 8, 92, 3, 6, 8, 1] },
  //   { [9, 18, 24, 11, 21, 9, 8, 92, 3, 6, 8, 1] },
  //   { [67, 15, 61, 43, 87, 14, 70, 9, 18, 24, 4] },
  //   { [9, 18, 70, 18, 21, 38, 80, 72, 63, 32, 67] },
  //   { [5, 85, 42, 69, 88, 7, 18, 6, 8, 1, 92, 3] },
  //   { [5, 2, 23, 69, 72, 26, 58, 81, 55, 10, 33] }
  // ];

  let timestamp: number[] = [];
  let stats: number[] = [];

  res.data.forEach((item: any) => {
    timestamp.push(item.date);
    stats.push(item.value);
  });
  labels = timestamp;
  values = stats;

  const options = {
    elements: {
      point: {
        radius: 2,
      },
    },
    chartArea: {
      backgroundColor: "#d346b1",
    },
    animation: {},
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: Math.round,
        font: {
          weight: "bold",
        },
      },
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
        title: {},
      },
      title: {
        display: true,
        text: "Số lần tấn công DDos trong tháng 12",
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
      // ******************** START ZOOM ********************
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic",
        },
      },
    },
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
        time: {
          parser: "DD/MM/YYYY",
          // round: "second",
          // unit: "day",
          tooltipFormat: "HH:mm:ss (DD/MM/YYYY)",
          displayFormats: {
            hour: "DD/MM",
          },
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
          color: "rgb(255 255 255 / 0.2)",
        },
        ticks: {
          color: "white",
          count: 4,
          maxTicksLimit: 7,
          maxRotation: 0,
          font: {
            size: 14,
            family: "Segoe UI",
            lineHeight: 2,
          },
          callback: function (timestamp: number) {
            const time = new Date(timestamp);
            const month = time.getMonth() + 1;
            return "Tháng " + (month);
          },
        },
      },
      y: {
        grid: {
          color: "rgb(255 255 255 / 0.2)",
        },
        beginAtZero: false,
        suggestedMin: 0,
        ticks: {
          color: "white",
          font: {
            size: 14,
            family: "Segoe UI",
          },
          count: 6,
        },
      },
    },
  };

  return (
    <Line
      // @ts-ignore
      options={options}
      ref={chartRef}
      data={{
        labels,
        datasets: [
          { label: "baomo2i.com", data: [0, 0, 1, 11, 35, 29, 16, 18] },
          { label: "baonghean.vn", data: [0, 4, 4, 7, 25, 14, 9, 5] },
          { label: "giaoduc.net.vn", data: [0, 2, 0, 3, 9, 7, 2, 2] },
          { label: "nhandan.vn", data: [0, 0, 0, 0, 7, 9, 5, 2] },
          { label: "plo.vn", data: [3, 3, 6, 5, 11, 11, 7, 6] },
          { label: "thanhnien.vn", data: [18, 19, 37, 116, 77, 44, 37] },
          { label: "tienphong.vn", data: [1, 3, 1, 3, 36, 23, 14, 11] },
          { label: "sggp.org.vn", data: [1, 0, 0, 0, 0, 3, 4, 2] },
          { label: "zingnews.vn", data: [1, 6, 12, 5, 26, 40, 19, 22] },
        ],
      }}
      plugins={[Colors as any, Filler, zoomPlugin, customCanvasBackgroundColor]}
    />
  );
}

// }
// labels,
// datasets: dataValues.map((item) => item.values)
// [
//   {
//     label: "thanhnien",
//     data: values,
//     borderWidth: 5,
//     borderColor: "#16BDE4"
//     // fill: "start",
//     // backgroundColor: (context: ScriptableContext<"line">) => {
//     //   const ctx = context.chart.ctx;
//     //   const gradient = ctx.createLinearGradient(0, 300, 0, 44);
//     //   gradient.addColorStop(1, "rgba(54,162,235,0.3)");
//     //   gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
//     //   gradient.addColorStop(0, "rgba(119,52,169,0)");
//     //   return gradient;
//     // }
//   },
//   {
//     label: "zingnews",
//     data: value2,
//     borderWidth: 5,
//     borderColor: "#ea580c"
//   }
// ]
// }}
