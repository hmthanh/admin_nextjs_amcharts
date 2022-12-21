import * as am5 from "@amcharts/amcharts5";
// import * as am5map from "@amcharts/amcharts5/map";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { useEffect } from 'react';

interface ITreeNodeType {
  value?: number;
  name?: string;
  children: ITreeNodeType[];
}

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(
  root: any,
  chart: any,
  xAxis: any,
  yAxis: any,
  data: any,
  legend: any,
  name: string,
  fieldName: string
) {
  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      stacked: true,
      xAxis: xAxis,
      yAxis: yAxis,
      baseAxis: yAxis,
      valueXField: fieldName,
      categoryYField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryY}: {valueX}",
    tooltipY: am5.percent(90)
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueX}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}

export default function StackedBarChart() {
  // am5.useTheme(am5themes_Animated);
  useEffect(() => {
    let root = am5.Root.new("StackedBarChart");
    root._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    // // Create wrapper container
    // let container = root.container.children.push(
    //   am5.Container.new(root, {
    //     width: am5.percent(100),
    //     height: am5.percent(100),
    //     layout: root.verticalLayout
    //   })
    // );

    // let series = container.children.push(
    //   am5hierarchy.ForceDirected.new(root, {
    //     singleBranchOnly: false,
    //     downDepth: 1,
    //     initialDepth: 2,
    //     valueField: "value",
    //     categoryField: "name",
    //     childDataField: "children",
    //     centerStrength: 0.5
    //   })
    // );

    // // Generate and set data
    // // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
    // let maxLevels = 2;
    // let maxNodes = 5;
    // let maxValue = 100;

    // let data: ITreeNodeType = {
    //   name: "Root",
    //   children: []
    // };
    // generateLevel(data, "", 0);

    // series.data.setAll([data]);
    // series.set("selectedDataItem", series.dataItems[0]);

    // function generateLevel(data: ITreeNodeType, name: string, level: number) {
    //   for (var i = 0; i < Math.ceil(maxNodes * Math.random()) + 1; i++) {
    //     let nodeName = name + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
    //     let child: ITreeNodeType;
    //     if (level < maxLevels) {
    //       child = {
    //         name: nodeName + level,
    //         children: []
    //       };

    //       if (level > 0 && Math.random() < 0.5) {
    //         child.value = Math.round(Math.random() * maxValue);
    //       } else {
    //         child.children = [];
    //         generateLevel(child, nodeName + i, level + 1);
    //       }
    //     } else {
    //       child = {
    //         name: name + i,
    //         value: Math.round(Math.random() * maxValue),
    //         children: []
    //       };
    //     }
    //     data.children.push(child);
    //   }

    //   level++;
    //   return data;
    // }

    // // Make stuff animate on load
    // series.appear(1000, 100);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panY",
        wheelY: "zoomY",
        layout: root.verticalLayout
      })
    );

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set(
    //   "scrollbarY",
    //   am5.Scrollbar.new(root, {
    //     orientation: "vertical"
    //   })
    // );

    let data = [
      {
        year: "2021",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 1,
        meast: 0.8,
        africa: 0.4
      },
      {
        year: "2022",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.5,
        meast: 0.4,
        africa: 0.3
      },
      {
        year: "2023",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
        meast: 0.9,
        africa: 0.5
      }
    ];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    yAxis.data.setAll(data);

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    makeSeries(root, chart, xAxis, yAxis, data, legend, "Europe", "europe");
    makeSeries(root, chart, xAxis, yAxis, data, legend, "North America", "namerica");
    makeSeries(root, chart, xAxis, yAxis, data, legend, "Asia", "asia");
    makeSeries(root, chart, xAxis, yAxis, data, legend, "Latin America", "lamerica");
    makeSeries(root, chart, xAxis, yAxis, data, legend, "Middle East", "meast");
    makeSeries(root, chart, xAxis, yAxis, data, legend, "Africa", "africa");

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="StackedBarChart" style={{ width: "100%", height: "500px" }}></div>;
}
