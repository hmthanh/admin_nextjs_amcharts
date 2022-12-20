import TimeSeriesChart from "./TimeSeriesChart";
import { formatBytesPerSeconds, getCurrentTime } from "../../../helper/utils";
import { useBandwidthData } from "./useBandwidthData";
import LoadingPanel from "../../../components/LoadingPanel/LoadingPanel";
import ErrorPanel from "../../../components/ErrorPanel/ErrorPanel";

export default function BandwidthChart() {
  const { data, error, isLoading } = useBandwidthData();

  const chartConfig = {
    elements: {
      point: {
        radius: 0,
      },
    },
    chartArea: {
      backgroundColor: "#d346b1",
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
          limits: {
            y: { min: 0, max: 100 },
            y2: { min: -5, max: 5 },
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
          callback: function (label: any) {
            const download = Number(label);
            const newLabel = formatBytesPerSeconds(download);
            return newLabel;
          },
        },
      },
    },
  };

  if (error)
    return (
      <div className="p-6 box-container half-reponsive-panel">
        <ErrorPanel />
      </div>
    );
  if (isLoading)
    return (
      <div className="p-6 box-container half-reponsive-panel">
        <LoadingPanel/>
      </div>
    );
  return (
    <div className="p-6 box-container half-reponsive-panel">
      <TimeSeriesChart chartData={data} chartConfig={chartConfig} />
    </div>
  );
}
