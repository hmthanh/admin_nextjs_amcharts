import dynamic from "next/dynamic";
import { useLayoutEffect, useState } from "react";
import PieChart from "../../../components/Chart/PieChart";

const PieChartWithLegend = dynamic(() => import("./PieChartWithLegend"), {
  ssr: false
});

export default function EdgeSeverStatistic() {
  const [dataUsageChart, setDataUsageChart] = useState({});
  const data = {
    labels: ["QTSC", "ZALO-VNPT HCM", "ZALO-VNPT HN", "VNPT-HN", "FPT-HCM", "FPT-HN", "VIETTEL-HCM", "Sing - OVH"],
    datasets: [
      {
        label: "Servers",
        data: [11, 30, 16, 8, 25, 9, 10, 2],
        borderColor: "#212D63",
        backgroundColor: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#676767"]
      }
    ]
  };

  useLayoutEffect(() => {}, []);

  return (
    <div
      className="box-right-containter bg-[#111c44]
        border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl 
        shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl
        border-0 border-solid bg-clip-border"
    >
      <PieChartWithLegend />
      {/* <PieChart chartData={data}/> */}
    </div>
  );
}