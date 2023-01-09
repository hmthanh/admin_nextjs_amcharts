import { any } from "@amcharts/amcharts5/.internal/core/util/Array";
import * as d3 from "d3";
import { DSVRowString, schemeGnBu } from "d3";
import React, { useEffect, useRef } from "react";
// import * as topojson from "topojson-client";
import { feature } from "topojson-client";
import ErrorPanel from "../../../components/ErrorPanel/ErrorPanel";
import LoadingPanel from "../../../components/LoadingPanel/LoadingPanel";
import { useStatsServer } from "./useStatsServer";
import vietnamGeo from "./vietnamGeo.json";
import { geoOrthographic, geoPath } from "d3-geo";
// import topojson from "topojson";
// import vietnamPopulation from "./vietnamPopulation";

// const countries = feature(vietnamGeo, vietnamGeo.objects.countries).features

export default function VietnamMap() {
  // const { data, error, isLoading } = useStatsServer();
  const chartRef = useRef(null);
  var center: [number, number] = [106.34899620666437, 16.553160650957434];
  // var scale = 2500;
  var scale = 150;
  var width = 960,
    height = 700;
  var offset: [number, number] = [width / 2, height / 2 - 50];
  const projection = d3.geoMercator().translate(offset).scale(scale).center(center);
  const svg = d3.select(chartRef.current).append("svg").attr("width", width).attr("height", height);
  const path = d3.geoPath().projection(projection);
  var g = svg.append("g");
  // const zoom = d3
  //   .zoom()
  //   .scaleExtent([1, 13])
  //   .on("zoom", (e) => {
  //     g.selectAll("path").attr("transform", e.transform);
  //   });
  // svg.call(zoom as any);
  // g.call(zoom).on("mousedown.zoom", null);
  // const zoom = d3.behavior.zoom()
  // .translate([0, 0])
  // .scale(1)
  // .scaleExtent([1, 13])
  // .on('zoom', zoomed);

  useEffect(() => {
    const svg2 = d3.select(chartRef.current).append("svg").attr("width", 500).attr("height", 500);
    // const featureMap: FeatureCollection = feature(topology, topology.objects.countries);

    // svg2.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 50).attr("fill", "blue");
    d3.json("https://gist.githubusercontent.com/d3noob/7b7e98331f440139dff50f4a58044677/raw/c569c5bf3aa337d8358a939164d9135c72487a85/world-110m2.json").then(function (
      topology: any,
    ) {
      // const featureMap: GeoJSON.FeatureCollection = topojson.feature(topology, topology.objects.countries)
      // const featureMap = topojson.feature(topology, topology.objects.countries);
      // const mapFeature = g.selectAll("path").data(topojson.feature(topology, topology.objects.countries) as any).enter().append("path").attr("d", path);
      console.log("Hello");
      // svg2.selectAll("path").data(featureMap.features as GeometryCollection
      //   ).enter().append("path").attr("d", path);
    });
  });

  // const [width, setWidth] = useSate
  // projection.fitSize([600, 600], geojson);
  // const path = d3.geoPath().projection(projection);

  // d3.select(chartRef.current).selectAll("path")
  //   .data(geojson.features)
  //   .enter()
  //   .append("path")
  //   .attr("d", path)
  //   .attr("fill", "#ccc");

  // return <svg ref={chartRef}></svg>;
  return (
    <div
      ref={chartRef}
      style={{
        height: "100%",
        width: "100%",
      }}
    ></div>
  );
  // <div id="VietnamMap" style={{ width: "100%", height: "100%" }}></div>;
}
