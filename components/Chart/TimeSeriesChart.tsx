import "chartjs-adapter-moment";

import { CategoryScale, Chart as ChartJS, Colors, Filler, Legend, LinearScale, LineElement, PointElement, TimeSeriesScale, Title, Tooltip } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useRef } from "react";
import { Line } from "react-chartjs-2";


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

ChartJS.register(Colors as any, Title, Tooltip, Legend, TimeSeriesScale, LineElement, LinearScale, PointElement, CategoryScale, Filler, zoomPlugin, customCanvasBackgroundColor);

export default function TimeSeriesChart({ chartData, chartConfig }: { chartData: any | undefined; chartConfig: any }) {
  const chartRef = useRef(null);

  if (chartData) {
    return (
      <Line
        options={chartConfig}
        ref={chartRef}
        width={"100%"}
        className="h-full"
        data={chartData}
        // data={{
        //   labels,
        //   datasets: [
        //     {
        //       label: "Bandwidth",
        //       data: values,
        //       borderWidth: 5,
        //       borderColor: "#16BDE4",
        //       fill: "start",
        //       backgroundColor: (context: ScriptableContext<"line">) => {
        //         const ctx = context.chart.ctx;
        //         const gradient = ctx.createLinearGradient(0, 300, 0, 44);
        //         gradient.addColorStop(1, "rgba(54,162,235,0.3)");
        //         gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
        //         gradient.addColorStop(0, "rgba(119,52,169,0)");
        //         return gradient;
        //       },
        //     },
        //   ],
        // }}
      />
    );
  } else {
    return <div></div>;
  }
}
