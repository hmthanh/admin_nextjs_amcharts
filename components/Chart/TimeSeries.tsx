import "chartjs-adapter-moment";

import {
  CategoryScale,
  Chart as ChartJS,
  ChartArea,
  Colors,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
  TimeSeriesScale,
  Title,
  Tooltip
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";

import { dataUsage } from "../../features/ZDNPanel/faker";
import { IBandwidthType, Series } from "../../helper/IDataType";
import { formatBytes, getGradient } from "../../helper/utils";

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

const res: IBandwidthType = dataUsage;
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

export const chartDatabase = {
  labels,
  datasets: [
    {
      label: "Bandwidth",
      data: values,
      borderWidth: 5,
      borderColor: "#16BDE4"
      // fill: {
      //   target: "origin",
      //   above: function (context) {
      //     const { ctx, chartArea } = context.chart;
      //     return getGradient(ctx, chartArea, gradient, width, height);
      //   }
      // }
      // fill: "start"
    }
  ]
};
// const labels = ["January", "February", "March", "April", "May", "June", "July"];
// const colors = ["red", "orange", "yellow", "lime", "green", "teal", "blue", "purple"];
// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [591, 220, -197, 314, -631, -12, 591]
//     }
//   ]
// };

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//   const colorStart = faker.random.arrayElement(colors);
//   const colorMid = faker.random.arrayElement(  colors.filter((color) => color !== colorStart));
//   const colorEnd = faker.random.arrayElement(colors.filter((color) => color !== colorStart && color !== colorMid));

//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//   gradient.addColorStop(0, colorStart);
//   gradient.addColorStop(0.5, colorMid);
//   gradient.addColorStop(1, colorEnd);

//   return gradient;
// }

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(1, "rgba(54,162,235,0.3)");
  gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
  gradient.addColorStop(0, "rgba(119,52,169,0)");

  return gradient;
}

export const chartOptions: ChartOptions<"line"> = {
  elements: {
    point: {
      radius: 2
    }
  },
  plugins: {
    // datalabels: {
    //   anchor: "end",
    //   align: "top",
    //   formatter: Math.round,
    //   font: {
    //     weight: "bold"
    //   }
    // },
    // colors: {
    //   enabled: true
    // },
    legend: {
      display: false,
      position: "bottom" as const,
      align: "center" as const,
      labels: {
        font: {
          size: 14,
          family: "Segoe UI",
          weight: "600"
        },
        color: "black"
      },
      title: {}
    },
    title: {
      display: true,
      text: "Thống kê dữ liệu sử dụng trong tháng",
      font: {
        size: 16,
        family: "Segoe UI",
        weight: "600"
      },
      padding: {
        bottom: 20
      },
      color: "white"
    },
    tooltip: {},
    // ******************** START ZOOM ********************
    zoom: {
      pan: {
        enabled: true,
        mode: "x"
      },
      zoom: {
        wheel: {
          enabled: true
        },
        pinch: {
          enabled: true
        },
        mode: "x"
      }
    }
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
  // showLine: true,
  scales: {
    x: {
      type: "time",
      time: {
        parser: "DD/MM/YYYY",
        // round: "second",
        unit: "day",
        tooltipFormat: "HH:mm:ss (DD/MM/YYYY)",
        displayFormats: {
          hour: "DD/MM"
        }
        // min: minDate,
        // max: maxDate,
      },
      grid: {
        // drawBorder: false,
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
        // borderDash: [5, 5],
        color: "rgb(255 255 255 / 0.2)"
      },
      ticks: {
        color: "white",
        // count: 30,
        maxTicksLimit: 30,
        maxRotation: 0,
        font: {
          size: 14,
          family: "Segoe UI",
          lineHeight: 2
        }
      }
    },
    y: {
      grid: {
        color: "rgb(255 255 255 / 0.2)"
      },
      beginAtZero: false,
      suggestedMin: 0,
      ticks: {
        color: "white",
        font: {
          size: 14,
          family: "Segoe UI"
        },
        count: 6,
        callback: function (label: any) {
          const download = Number(label);
          const newLabel = formatBytes(download);
          return newLabel;
        }
      }
    }
  }
};

export default function TimeSeries() {
  const chartRef = useRef<any>(null);

  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: []
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    if (chart) {
      const chartData = {
        ...chartDatabase,
        datasets: chartDatabase.datasets.map((dataset) => ({
          ...dataset,
          fill: createGradient(chart.ctx, chart.chartArea)
        }))
      };
      // setChartData(chartData);

      // chartOptions = {...chartOptions};
    }
  }, [chartData]);

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
  //     // console.log("chart", chart);
  //     // console.log("ctx", ctx);
  //     // console.log("chartArea", chartArea);

  //     // console.log('CanvasRenderingContext2D', chart.ctx);
  //     // console.log('HTMLCanvasElement', chart.canvas);
  //   }
  // }, [width, height]);

  // let gradient: CanvasGradient = {};

  const options = {
    // scaleFontColor: "red",
    // elements: {
    //   point: {
    //     radius: 2
    //   }
    // },
    // data: {
    //   borderColor: "#d346b1",
    //   backgroundColor: "#d346b1",
    //   pointBackgroundColor: "#d346b1",
    //   pointBorderColor: "rgba(255,255,255,0)",
    //   pointHoverBackgroundColor: "#d346b1"
    // },
    // chartArea: {
    //   backgroundColor: "#d346b1"
    // },
    // animation: {},
    plugins: {
      customCanvasBackgroundColor: {
        color: "#111c44"
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: Math.round,
        font: {
          weight: "bold"
        }
      },
      colors: {
        enabled: true
      },
      legend: {
        display: false,
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          font: {
            size: 14,
            family: "Segoe UI",
            weight: "600"
          },
          color: "black"
        },
        title: {}
      },
      title: {
        display: true,
        text: "Thống kê dữ liệu sử dụng trong tháng",
        font: {
          size: 16,
          family: "Segoe UI",
          weight: "600"
        },
        padding: {
          bottom: 20
        },
        color: "white"
      },
      tooltip: {},
      // ******************** START ZOOM ********************
      zoom: {
        pan: {
          enabled: true,
          mode: "x"
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: "x"
        }
      }
    },
    transitions: {
      zoom: {
        animation: {
          duration: 100,
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
          parser: "DD/MM/YYYY",
          // round: "second",
          unit: "day",
          tooltipFormat: "HH:mm:ss (DD/MM/YYYY)",
          displayFormats: {
            hour: "DD/MM"
          }
          // min: minDate,
          // max: maxDate,
        },
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
          color: "rgb(255 255 255 / 0.2)"
        },
        ticks: {
          color: "white",
          count: 30,
          maxTicksLimit: 30,
          maxRotation: 0,
          font: {
            size: 14,
            family: "Segoe UI",
            lineHeight: 2
          }
        }
      },
      y: {
        grid: {
          color: "rgb(255 255 255 / 0.2)"
        },
        beginAtZero: false,
        suggestedMin: 0,
        ticks: {
          color: "white",
          font: {
            size: 14,
            family: "Segoe UI"
          },
          count: 6,
          callback: function (label: any) {
            const download = Number(label);
            const newLabel = formatBytes(download);
            return newLabel;
          }
        }
      }
    }
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

  return (
    //     <div
    //       className="p-6 box-left-containter bg-[#111c44]
    // border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid  bg-clip-border"
    //     >
    // {/* </div> */}
    <Chart ref={chartRef} type="line" data={chartData} options={chartOptions}/>
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
