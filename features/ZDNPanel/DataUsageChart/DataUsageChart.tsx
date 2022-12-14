import { useLayoutEffect, useState } from "react";
import TimeSeriesChart from "../../../components/Chart/TimeSeriesChart";
import { IBandwidthType, Series } from "../../../helper/IDataType";
import { getGradient } from "../../../helper/utils";
import { dataUsage } from "../faker";
// import TimeSeriesChart from "../../components/Chart/TimeSeriesChart";
// import { IBandwidthType, Series } from "../../helper/IDataType";
// import { getGradient } from "../../helper/utils";
// import { dataUsage } from "./faker";


export default function DataUsageChart() {
  const [dataUsageChart, setDataUsageChart] = useState({});

  const width = 0,
    height = 0;
  let gradient: any;
  useLayoutEffect(() => {
    // async () => {
    // const response = await fetch("http://10.90.85.9:19040/stats?a=ZDNDataUsage&domain=zadn&day=30");
    // const res: IBandwidthType = await response.json();
    const res: IBandwidthType = dataUsage;
    let labels: number[] = [];
    let values: number[] = [];

    if (res) {
      let timestamp: number[] = [];
      let stats: number[] = [];
      // res.data.map((item: Series) => {
      //   timestamp.push(item.date);
      //   stats.push(item.value);
      // });
      res.data.forEach((item: Series) => {
        return { timestamp: item.date, stats: item.value };
      });
      labels = timestamp;
      values = stats;

      setDataUsageChart({
        labels,
        datasets: [
          {
            label: "Bandwidth",
            data: values,
            borderWidth: 5,
            borderColor: "#16BDE4",
            fill: {
              target: "origin",
              above: function (context: any) {
                const { ctx, chartArea } = context.chart;
                return getGradient(ctx, chartArea, gradient, width, height);
              }
            }
            // fill:"#3366CC",
            // backgroundColor: "#d048b6",
            // borderColor: "#d048b6",
            // pointBackgroundColor: "#d048b6",
            // pointBorderColor: "rgba(255,255,255,0)",
            // pointHoverBackgroundColor: "#d048b6",
          }
        ]
      });
    }
  }, [gradient, height, width]);

  const options = {
    scaleFontColor: "red",
    // elements: {
    //   point: {
    //     radius: 2,
    //   },
    // },
    // data: {
    //   borderColor: '#d346b1',
    //   backgroundColor:"#d346b1",
    //   pointBackgroundColor: "#d346b1",
    //   pointBorderColor: "rgba(255,255,255,0)",
    //   pointHoverBackgroundColor: "#d346b1",
    // },
    // chartArea: {
    //   backgroundColor: "#d346b1"
    // },
    animation: {},
    plugins: {
      // customCanvasBackgroundColor: {
      //   color: "#111c44"
      // },
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
        // display: false
        // position: "bottom",
        // align: "center",
        // labels: {
        //   font: {
        //     size: 14,
        //     family: "Segoe UI",
        //     weight: "600",
        //   },
        //   color: "black",
        // },
        // title: {},
      },
      // title: {
      //   display: true,
      //   text: "Thống kê dữ liệu sử dụng trong tháng",
      //   font: {
      //     size: 20,
      //     family: "Segoe UI",
      //     weight: "600"
      //   },
      //   padding: {
      //     bottom: 20
      //   },
      //   color: "white"
      // },
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
          count: 6
          // callback: function (label: any) {
          //   const download = Number(label);
          //   const newLabel = formatBytes(download);
          //   return newLabel;
          // }
        }
      }
    }
  };
  // ***************** OPTION **********************

  return (
    <div
      className="p-6 box-left-containter bg-[#111c44]
border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid  bg-clip-border"
    >
      <TimeSeriesChart/>
        {/* // data={{
        //   labels,
        //   datasets: [
        //     {
        //       label: "Bandwidth",
        //       data: values,
        //       borderWidth: 5,
        //       borderColor: "#16BDE4",
        //       fill: {
        //         target: "origin",
        //         above: function (context: any) {
        //           const { ctx, chartArea } = context.chart;
        //           return getGradient(ctx, chartArea, gradient, width, height);
        //         }
        //       }
        //       // fill:"#3366CC",
        //       // backgroundColor: "#d048b6",
        //       // borderColor: "#d048b6",
        //       // pointBackgroundColor: "#d048b6",
        //       // pointBorderColor: "rgba(255,255,255,0)",
        //       // pointHoverBackgroundColor: "#d048b6",
        //     }
        //   ]
        // }}
        // data={{ dataUsageChart }}
        // options={options} */}
      
      {/* <TimeSeries/> */}
    </div>
  );
}
