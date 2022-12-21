import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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

  useEffect(() => {}, []);

  return (
    <div
      className="box-container h-full"
    >
      <PieChartWithLegend />
      {/* <PieChart chartData={data}/> */}
    </div>
  );
}
