import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
// const customCanvasBackgroundColor = {
//   id: "customCanvasBackgroundColor",
//   beforeDraw: (chart:any, args:any, options:any) => {
//     const { ctx } = chart;
//     ctx.save();
//     ctx.globalCompositeOperation = "destination-over";
//     ctx.fillStyle = options.color || "#111c44";
//     ctx.fillRect(0, 0, chart.width, chart.height);
//     ctx.restore();
//   },
// };

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
  // customCanvasBackgroundColor
);

let gradient, width, height;

export default function PieChart({ chartData }: any) {

  const options = {
    borderWidth: 1,
    colors: {
      enabled: true
    },
    maintainAspectRatio: false,
    animation: {},
    responsive: true,
    scales: {},
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "white",
          font: {
            family: "Segoe UI",
            size: 12,
            weight: "600"
          }
        }
      },
      title: {
        display: true,
        text: "Số lượng Server theo Data Center",
        font: {
          size: 20,
          family: "Segoe UI",
          weight: "600"
        },
        padding: {
          bottom: 20
        },
        color: "white"
      },
      tooltip: {
        enabled: true,
        family: "Segoe UI",
        weight: "600"
      }
    }
  };
  return <Pie data={chartData} options={options} />;
}

// elements: {
//   arc: {
//     backgroundColor: function (context) {
//       let c = colors[context.dataIndex];
//       if (!c) {
//         return;
//       }
//       if (context.active) {
//         c = helpers.getHoverColor(c);
//       }
//       const mid = helpers
//         .color(c)
//         .desaturate(0.2)
//         .darken(0.2)
//         .rgbString();
//       const start = helpers.color(c).lighten(0.2).rotate(270).rgbString();
//       const end = helpers.color(c).lighten(0.1).rgbString();
//       return createRadialGradient3(context, start, mid, end);
//     },
//   },
// },
// elements: {
//   arc: {
//     backgroundColor: function (context) {
//       const { ctx, chartArea } = context.chart;
//       return getArcGradient(ctx, chartArea, gradient, width, height);
//     },
//     // colorize.bind(null, false, false),
//     // hoverBackgroundColor: hoverColorize,
//   },
// },

// datalabels: {
//   formatter: (value: any, context: any) => {
//     return "hello"; //context.chart.data.labels[context.dataIndex];
//   }
// }
