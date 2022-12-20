import TimeSeriesChart from "../../../components/Chart/TimeSeriesChart";
import { formatBytes } from "../../../helper/utils";
import { useDataUsage } from "./useDataUsage";
import LoadingPanel from "../../../components/LoadingPanel/LoadingPanel";

export default function DataUsageChart() {
  const { data, error, isLoading } = useDataUsage();
  // console.log("data", data);

  // ***************** OPTION **********************
  const chartConfig = {
    elements: {
      point: {
        radius: 2,
      },
    },
    data: {
      borderColor: "#d346b1",
      backgroundColor: "#d346b1",
      pointBackgroundColor: "#d346b1",
      pointBorderColor: "rgba(255,255,255,0)",
      pointHoverBackgroundColor: "#d346b1",
    },
    chartArea: {
      backgroundColor: "#d346b1",
    },
    animation: {},
    plugins: {
      customCanvasBackgroundColor: {
        color: "#111c44",
      },
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
        display: false,
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          font: {
            size: 14,
            family: "Segoe UI",
            weight: "600",
          },
          color: "black",
        },
        title: {},
      },
      title: {
        display: true,
        text: "Thống kê dữ liệu sử dụng trong tháng",
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
          unit: "day",
          tooltipFormat: "HH:mm:ss (DD/MM/YYYY)",
          displayFormats: {
            hour: "DD/MM",
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
          count: 30,
          maxTicksLimit: 30,
          maxRotation: 0,
          font: {
            size: 14,
            family: "Segoe UI",
            lineHeight: 2,
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
          callback: function (label: any) {
            const download = Number(label);
            const newLabel = formatBytes(download);
            return newLabel;
          },
        },
      },
    },
  };
  // ***************** OPTION **********************

  if (error) return <div className="p-6 box-container half-reponsive-panel">Failed to load</div>;
  if (isLoading)
    return (
      <div className="p-6 box-container half-reponsive-panel">
        <LoadingPanel />
      </div>
    );
  return (
    <div className="p-6 box-container half-reponsive-panel">
      <TimeSeriesChart chartData={data} chartConfig={chartConfig} />
    </div>
  );
}
