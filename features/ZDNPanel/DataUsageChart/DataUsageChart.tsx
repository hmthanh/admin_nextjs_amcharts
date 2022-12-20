import { useLayoutEffect, useState } from "react";
import TimeSeriesChart from "../../../components/Chart/TimeSeriesChart";
import { IBandwidthType, Series } from "../../../helper/IDataType";
import { getGradient } from "../../../helper/utils";
import { dataUsage } from "../faker";

export default function DataUsageChart() {
  const [dataUsageChart, setDataUsageChart] = useState({});

  // ***************** OPTION **********************

  return (
    <div className="p-6 box-container half-reponsive-panel">
      <TimeSeriesChart />
    </div>
  );
}
