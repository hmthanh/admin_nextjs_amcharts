import dynamic from "next/dynamic";
import { useLayoutEffect, useState } from "react";

const StackedVerticalColumnChart = dynamic(() => import("./StackedVerticalColumnChart"), {
  ssr: false
});

export default function EdgeSeverUsage() {
  const [dataUsageChart, setDataUsageChart] = useState({});
  

  useLayoutEffect(() => {}, []);

  return (
    <div
      className="pt-2 box-right-containter bg-[#111c44]
        border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl 
        shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl
        border-0 border-solid bg-clip-border"
    >
      <StackedVerticalColumnChart />
    </div>
  );
}


