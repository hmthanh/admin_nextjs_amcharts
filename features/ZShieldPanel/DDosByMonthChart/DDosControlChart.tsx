import { useEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5xy from "@amcharts/amcharts5/xy";

export interface ITreeNodeType {
  value?: number;
  name?: string;
  children?: any[];
}
export default function DDosControlChart() {
  // am5.useTheme(am5themes_Animated);
  useEffect(() => {
    let root = am5.Root.new("DDosControlChart");
    root._logo?.dispose();

    let customTheme = am5.Theme.new(root);
    customTheme
      .rule("ColorSet")
      .set("colors", [am5.color(0xef4444), am5.color(0x22c55e), am5.color(0x3b82f6), am5.color(0xa855f7), am5.color(0xec4899), am5.color(0xfacc15), am5.color(0xd946ef)]);
    customTheme.rule("Grid").setAll({ stroke: am5.color(0xffffff), strokeWidth: 1, strokeOpacity: 0.2 });

    // customTheme.rule("Label").set("fontSize", 14);
    customTheme.rule("Label").set("fill", am5.color("#FFF"));
    // customTheme.rule("fill").set
    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root), customTheme]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      }),
    );

    // // Create axes
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    // let xRenderer = am5xy.AxisRendererX.new(root, {});
    // xRenderer.grid.template.set("forceHidden", true);
    // xRenderer.labels.template.setAll({ multiLocation: 0, location: 0 });

    // let xAxis = chart.xAxes.push(
    //   am5xy.DateAxis.new(root, {
    //     baseInterval: { timeUnit: "minute", count: 30 },
    //     renderer: xRenderer,
    //     tooltip: am5.Tooltip.new(root, {}),
    //     extraMin: 0.01,
    //     extraMax: 0.01,
    //     tooltipLocation: 0,
    //   }),
    // );

    // let yRenderer = am5xy.AxisRendererY.new(root, {});
    // yRenderer.grid.template.set("forceHidden", true);

    // let yAxis = chart.yAxes.push(
    //   am5xy.ValueAxis.new(root, {
    //     renderer: yRenderer,
    //   }),
    // );

    // // Add cursor
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    // let cursor = chart.set(
    //   "cursor",
    //   am5xy.XYCursor.new(root, {
    //     behavior: "none",
    //     xAxis: xAxis,
    //   }),
    // );
    // cursor.lineY.set("visible", false);

    // // Add series
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    // let series = chart.series.push(
    //   am5xy.LineSeries.new(root, {
    //     name: "Series",
    //     xAxis: xAxis,
    //     yAxis: yAxis,
    //     valueYField: "value",
    //     valueXField: "timestamp",
    //     locationX: 0,
    //     seriesTooltipTarget: "bullet",
    //     tooltip: am5.Tooltip.new(root, {
    //       labelText: "{valueY}",
    //     }),
    //   }),
    // );

    // series.bullets.push(function () {
    //   let circleTemplate = am5.Template.new({
    //     radius: 6,
    //     templateField: "bulletSettings",
    //     fill: series.get("fill"),
    //     strokeWidth: 2,
    //     stroke: root.interfaceColors.get("background"),
    //   });

    //   let circle = am5.Circle.new(root, {}, circleTemplate);

    //   return am5.Bullet.new(root, {
    //     sprite: circle,
    //     locationX: 0,
    //   });
    // });
    // // chart.series.push(
    // //   data222
    // // )

    // function createGuide(value: any, text: any, dashArray: any) {
    //   let guideDataItem = yAxis.makeDataItem({ value: value });
    //   yAxis.createAxisRange(guideDataItem);
    //   guideDataItem.get("grid" as any).setAll({
    //     forceHidden: false,
    //     strokeOpacity: 0.2,
    //     strokeDasharray: dashArray,
    //   });

    //   let label = guideDataItem.get("label");
    //   label?.setAll({
    //     text: text,
    //     isMeasured: false,
    //     centerY: am5.p100,
    //   });

    //   label?.adapters.add("x", function (x) {
    //     return chart.plotContainer.width();
    //   });

    //   chart.events.on("boundschanged", function () {
    //     label?.set("x", label?.get("x"));
    //   });
    // }

    // createGuide(98.8, "LCL", [2, 2]);
    // // createGuide(100.1, "CL");
    // createGuide(101.2, "UCL", [2, 2]);

    // let data = [
    //   {
    //     timestamp: new Date(2020, 0, 2, 1, 30).getTime(),
    //     value: 100.39,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 2, 0).getTime(),
    //     value: 101.1,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 2, 30).getTime(),
    //     value: 101.45,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 3, 0).getTime(),
    //     value: 101.15,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 3, 30).getTime(),
    //     value: 100.5,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 4, 0).getTime(),
    //     value: 101.55,
    //     // bulletSettings: { fill: am5.color("#f0c803") },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 4, 30).getTime(),
    //     value: 101.7,
    //     // bulletSettings: { fill: am5.color("#970505") },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 5, 0).getTime(),
    //     value: 100.5,
    //     // bulletSettings: { fill: am5.color("#f0c803") },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 5, 30).getTime(),
    //     value: 100.92,
    //     // bulletSettings: { fill: am5.color("#f0c803") },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 6, 0).getTime(),
    //     value: 102.2,
    //     // bulletSettings: { fill: am5.color("#970505") },
    //   },
    // ];

    // series.data.setAll(data);

    // The data
    var data = [
      {
        year: "1930",
        italy: 1,
        germany: 5,
        uk: 3,
        "baomoi.com": 3,
        "baonghean.vn": 3,
        "giaoduc.net.vn": 9,
        "nhandan.vn": 3,
        "plo.vn": 3,
        "thanhnien.vn": 3,
        "tienphong.vn": 3,
        "sggp.org.vn": 3,
        "zingnews.vn": 3,
      },
      {
        year: "1934",
        italy: 1,
        germany: 2,
        uk: 6,
        "baomoi.com": 6,
        "baonghean.vn": 6,
        "giaoduc.net.vn": 9,
        "nhandan.vn": 6,
        "plo.vn": 6,
        "thanhnien.vn": 6,
        "tienphong.vn": 9,
        "sggp.org.vn": 6,
        "zingnews.vn": 6,
      },
      {
        year: "1938",
        italy: 2,
        germany: 3,
        uk: 1,
        "baomoi.com": 1,
        "baonghean.vn": 1,
        "giaoduc.net.vn": 4,
        "nhandan.vn": 1,
        "plo.vn": 1,
        "thanhnien.vn": 1,
        "tienphong.vn": 1,
        "sggp.org.vn": 2,
        "zingnews.vn": 8,
      },
      {
        year: "1950",
        italy: 3,
        germany: 4,
        uk: 1,
        "baomoi.com": 1,
        "baonghean.vn": 1,
        "giaoduc.net.vn": 8,
        "nhandan.vn": 1,
        "plo.vn": 1,
        "thanhnien.vn": 1,
        "tienphong.vn": 1,
        "sggp.org.vn": 11,
        "zingnews.vn": 8,
      },
      {
        year: "1954",
        italy: 5,
        germany: 1,
        uk: 2,
        "baomoi.com": 2,
        "baonghean.vn": 2,
        "giaoduc.net.vn": 7,
        "nhandan.vn": 2,
        "plo.vn": 2,
        "thanhnien.vn": 2,
        "tienphong.vn": 2,
        "sggp.org.vn": 2,
        "zingnews.vn": 2,
      },
      {
        year: "1958",
        italy: 3,
        germany: 2,
        uk: 1,
        "baomoi.com": 1,
        "baonghean.vn": 1,
        "giaoduc.net.vn": 9,
        "nhandan.vn": 1,
        "plo.vn": 1,
        "thanhnien.vn": 1,
        "tienphong.vn": 1,
        "sggp.org.vn": 10,
        "zingnews.vn": 8,
      },
      {
        year: "1962",
        italy: 1,
        germany: 2,
        uk: 3,
        "baomoi.com": 3,
        "baonghean.vn": 3,
        "giaoduc.net.vn": 1,
        "nhandan.vn": 3,
        "plo.vn": 3,
        "thanhnien.vn": 3,
        "tienphong.vn": 3,
        "sggp.org.vn": 3,
        "zingnews.vn": 3,
      },
      {
        year: "1966",
        italy: 2,
        germany: 1,
        uk: 5,
        "baomoi.com": 5,
        "baonghean.vn": 5,
        "giaoduc.net.vn": 8,
        "nhandan.vn": 5,
        "plo.vn": 5,
        "thanhnien.vn": 5,
        "tienphong.vn": 9,
        "sggp.org.vn": 5,
        "zingnews.vn": 5,
      },
      {
        year: "1970",
        italy: 3,
        germany: 5,
        uk: 2,
        "baomoi.com": 2,
        "baonghean.vn": 2,
        "giaoduc.net.vn": 9,
        "nhandan.vn": 5,
        "plo.vn": 2,
        "thanhnien.vn": 2,
        "tienphong.vn": 3,
        "sggp.org.vn": 2,
        "zingnews.vn": 2,
      },
      {
        year: "1974",
        italy: 4,
        germany: 3,
        uk: 6,
        "baomoi.com": 6,
        "baonghean.vn": 6,
        "giaoduc.net.vn": 9,
        "nhandan.vn": 6,
        "plo.vn": 6,
        "thanhnien.vn": 9,
        "tienphong.vn": 6,
        "sggp.org.vn": 7,
        "zingnews.vn": 6,
      },
      {
        year: "1978",
        italy: 1,
        germany: 2,
        uk: 4,
        "baomoi.com": 4,
        "baonghean.vn": 8,
        "giaoduc.net.vn": 9,
        "nhandan.vn": 4,
        "plo.vn": 4,
        "thanhnien.vn": 4,
        "tienphong.vn": 8,
        "sggp.org.vn": 4,
        "zingnews.vn": 4,
      },
    ];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("location", 0.5);
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
    });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: false,
        }),
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function createSeries(name: string, field: string) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          }),
        }),
      );

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill"),
          }),
        });
      });

      // create hover state for series and for mainContainer, so that when series is hovered,
      // the state would be passed down to the strokes which are in mainContainer.
      series.set("setStateOnChildren", true);
      series.states.create("hover", {});

      series.mainContainer.set("setStateOnChildren", true);
      series.mainContainer.states.create("hover", {});

      series.strokes.template.states.create("hover", {
        strokeWidth: 4,
      });

      series.data.setAll(data);
      series.appear(1000);
    }

    // createSeries("Italy", "italy");
    // createSeries("Germany", "germany");
    // createSeries("UK", "uk");

    createSeries("Baomoi", "baomoi.com");
    createSeries("Baonghean", "baonghean.vn");
    createSeries("Giaoduc", "giaoduc.net.vn");
    createSeries("Nhandan", "nhandan.vn");
    createSeries("Plo", "plo.vn");
    createSeries("Thanh Nien", "thanhnien.vn");
    createSeries("Tien Phong", "tienphong.vn");
    createSeries("sggp", "sggp.org.vn");
    createSeries("Zing News", "zingnews.vn");

    var legend = root.container.children.push(
      am5.Legend.new(root, {
        width: am5.percent(100),
        // centerX: am5.p50,
        // x: am5.p50,
        // layout: root.grid
        layout: root.gridLayout
        // layout: am5.GridLayout.new(root, {
        //   maxColumns: 5,
        //   fixedWidthGrid: true,
        // }),
      }),
    );
    legend.labels.template.setAll({
      fontSize: 16,
      fontWeight: "300",
    });

    // // Add legend
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    // let legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.p50,
    //     x: am5.p50,
    //   }),
    // );
    // legend.markers.template.setAll({
    //   width: 12,
    //   height: 12,
    // });

    // // Make series change state when legend item is hovered
    // legend.itemContainers.template.states.create("hover", {});

    // legend.itemContainers.template.events.on("pointerover", function(e) {
    //   e.target.dataItem.dataContext.hover();
    // });
    // legend.itemContainers.template.events.on("pointerout", function(e) {
    //   e.target.dataItem.dataContext.unhover();
    // });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // series.appear(1000);
    legend.data.setAll(chart.series.values);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return <div id="DDosControlChart" style={{ width: "100%", height: "100%" }}></div>;
}
