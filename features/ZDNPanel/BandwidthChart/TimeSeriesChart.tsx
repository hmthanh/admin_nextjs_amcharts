// import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeSeriesScale,
  ScriptableContext,
  Filler,
  Title,
  Tooltip
} from "chart.js";
import "chartjs-adapter-moment";

// import { useLayoutEffect, useState } from "react";

import { faker } from "@faker-js/faker";
import { useEffect, useRef, useState } from "react";

// import { getGradient } from "../../helper/utils";
import zoomPlugin from "chartjs-plugin-zoom";
import { IBandwidthType, Series } from "../../../helper/IDataType";
import { formatBytesPerSeconds, getCurrentTime } from "../../../helper/utils";
import { bandwidthData } from "../faker";
const customCanvasBackgroundColor = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart: any, args: any, options: any) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#111c44";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

ChartJS.register(
  Colors as any,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
  zoomPlugin,
  customCanvasBackgroundColor
);

export default function TimeSeriesChart() {
  const chartRef = useRef(null);
  // const [gradient,setGradient] = useState({ addColorStop: (arg0: number, arg1: string) => {}});
  let width = 0,
    height = 0;

  // useEffect(() => {
  //   let gradient = {};
  //   const chart = chartRef.current;
  //   if (chart) {
  //     const { ctx, chartArea } = chart;
  //     gradient = getGradient(ctx, chartArea, gradient, width, height);
  //     // return getGradient(ctx, chartArea, gradient, width, height);

  //   }
  // }, [width, height]);

  // let gradient: CanvasGradient = {};

  const res: IBandwidthType = bandwidthData;
  let labels: number[] = [];
  let values: number[] = [];

  let timestamp: number[] = [];
  let stats: number[] = [];

  res.data.forEach((item: Series) => {
    timestamp.push(item.date);
    stats.push(item.value);
  });
  labels = timestamp;
  values = stats;

  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    chartArea: {
      backgroundColor: "#d346b1"
    },
    animation: {},
    plugins: {
      colors: {
        enabled: true,
      },
      // ******************** LEGEND TITLE ********************
      legend: {
        display: false,
        position: "bottom",
        align: "center",
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
      // ******************** LEGEND TITLE ********************
      // ******************** START TITLE ********************
      title: {
        display: true,
        text: "Thống kê traffic trong ngày (" + getCurrentTime() + ")",
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
      // ******************** END TITLE ********************
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
      // ******************** END ZOOM ********************
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic"
        }
      }
    },
    // ******************** END ZOOM ********************
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index"
    },
    showLine: true,
    scales: {
      x: {
        type: "time",
        time: {
          round: "second",
          unit: "hour",
          tooltipFormat: "HH:mm:ss (DD/MM/YYYY)",
          displayFormats: {
            hour: "HH:mm",
          },
          // min: minDate,
          // max: maxDate,
        },
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
          color: "rgb(255 255 255 / 0.2)",
        },
        ticks: {
          color: "white",
          maxTicksLimit: 12,
          maxRotation: 0,
          font: {
            size: 14,
            family: "Segoe UI",
            lineHeight: 2,
          },
        },
      },
      y: {
        grid: { color: "rgb(255 255 255 / 0.2)" },
        beginAtZero: false,
        suggestedMin: 0,
        ticks: {
          color: "white",
          font: {
            size: 14,
            family: "Segoe UI",
          },
          callback: function (label:any) {
            const download = Number(label);
            const newLabel = formatBytesPerSeconds(download);
            return newLabel;
          },
        },
      },
    },
  };

  // const labels = ["January", "February", "March", "April", "May", "June", "July"];
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)"
  //     }
  //   ]
  // };

  // useEffect(() => {
  //   const chartCurrent = chartRef.current;
  // })

  return (
    <Line
      // @ts-ignore
      options={options}
      ref={chartRef}
      data={{
        labels,
        datasets: [
          {
            label: "Bandwidth",
            data: values,
            borderWidth: 2.5,
            borderColor:"#5E72E4",
            fill: "start",
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 300, 0, 44);
              gradient.addColorStop(1, "rgba(54,162,235,0.3)");
              gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
              gradient.addColorStop(0, "rgba(119,52,169,0)");
              return gradient;
            }
          }
        ]
      }}
    />
  );
}

// backgroundColor: (context: ScriptableContext<"line">) => {
//   // const { ctx, chartArea } = context.chart;
//   const ctx = context.chart.ctx;
//   // const gradient = ctx.createLinearGradient(0, 0, 0, 200);
//   // return getGradient(ctx, chartArea, gradient, width, height);
//   const gradient = ctx.createLinearGradient(0, 0, 0, 200);
//   // gradient.addColorStop(0, "rgba(250,174,50,1)");
//   // gradient.addColorStop(1, "rgba(250,174,50,0)");
//   return gradient;
// }
