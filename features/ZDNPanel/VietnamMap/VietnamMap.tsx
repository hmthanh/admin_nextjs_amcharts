import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

import ErrorPanel from "../../../components/ErrorPanel/ErrorPanel";
import LoadingPanel from "../../../components/LoadingPanel/LoadingPanel";
import { useStatsServer } from "./useStatsServer";

interface IProps {
  data?: number[];
}

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
  const data = [12, 5, 6, 6, 9, 10];
  const h = 120;
  const w = 250;
  const svg = d3.select(svgRef.current);

  svg.attr("width", w).attr("height", h).style("margin-top", 50).style("margin-left", 50);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", (d, i) => h - 10 * d)
    .attr("width", 20)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "steelblue");
}

export const MyD3Component = (props: IProps) => {
  const d3Container = useRef(null);

  useEffect(() => {}, []);

  return <svg className="d3-component" width={"100%"} height={"100%"} ref={d3Container} />;
};

export default function VietnamMap() {
  const { data, error, isLoading } = useStatsServer();

  //   if (error)
  //     return (
  //       <div className="p-6 box-container half-reponsive-panel">
  //         <ErrorPanel />
  //       </div>
  //     );
  //   if (isLoading)
  //     return (
  //       <div className="p-6 box-container half-reponsive-panel">
  //         <LoadingPanel />
  //       </div>
  //     );
  //   if (data) {
  //   }
  return (
    <div className="box-container h-full">
      Hello
      <MyD3Component />
    </div>
  );
}
