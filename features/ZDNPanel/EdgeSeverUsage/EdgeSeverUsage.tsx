import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StackedVerticalColumnChart = dynamic(() => import("./StackedVerticalColumnChart"), {
  ssr: false,
});

export default function EdgeSeverUsage() {
  const [dataUsageChart, setDataUsageChart] = useState({});

  
  useEffect(() => {}, []);

  return (
    <div className="pt-3 box-container h-full">
      <StackedVerticalColumnChart />
    </div>
  );
}
