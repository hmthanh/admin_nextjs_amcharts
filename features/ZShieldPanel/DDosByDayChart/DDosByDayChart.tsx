import { useEffect, useState } from "react";
import { IBandwidthType, Series } from "../../../helper/IDataType";
import { getGradient } from "../../../helper/utils";
import { dataUsage } from "../faker";
import { StackBarChart } from "./StackBarChart";
// import { IBandwidthType, Series } from "../../helper/IDataType";
// import { getGradient } from "../../helper/utils";
// import { dataUsage } from "./faker";

export default function DDosByDayChart() {
  const [dataUsageChart, setDataUsageChart] = useState({});

  const width = 0,
    height = 0;
  let gradient: any;
  useEffect(() => {
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
              },
            },
            // fill:"#3366CC",
            // backgroundColor: "#d048b6",
            // borderColor: "#d048b6",
            // pointBackgroundColor: "#d048b6",
            // pointBorderColor: "rgba(255,255,255,0)",
            // pointHoverBackgroundColor: "#d048b6",
          },
        ],
      });
    }
  }, [gradient, height, width]);

  const options = {};

  // ***************** OPTION **********************

  return (
    <div className="p-6 box-container h-full">
      <StackBarChart />
    </div>
  );
}
