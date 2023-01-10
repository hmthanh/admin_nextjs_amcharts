import * as am5 from "@amcharts/amcharts5";
// import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useEffect, useMemo } from "react";

export default function StackedVerticalColumnChart({ dataChart }: { dataChart?: any }) {
  const data = useMemo(
    () => [
      { cluster: "QTSC", Usage: 2.53, "Remain Capacity": 90 },
      { cluster: "FPT-HCM", Usage: 107.4, "Remain Capacity": 240 },
      { cluster: "ZALO VNPT-HCM", Usage: 157.68, "Remain Capacity": 300 },
      { cluster: "VIETTEL-HCM", Usage: 16.32, "Remain Capacity": 100 },
      { cluster: "VNPT-HN", Usage: 49.33, "Remain Capacity": 100 },
      { cluster: "ZALO VNPT-HN", Usage: 112.01, "Remain Capacity": 160 },
      { cluster: "FPT-HN", Usage: 56.04, "Remain Capacity": 80 },
    ],
    [],
  );

  // am5.useTheme(am5themes_Animated);
  useEffect(() => {
    let root = am5.Root.new("StackedVerticalColumnChart");
    root._logo?.dispose();

    let customTheme = am5.Theme.new(root);
    customTheme.rule("Label").set("fontSize", 12);
    customTheme.rule("Label").set("fill", am5.color("#FFFFFF"));
    customTheme.rule("ColorSet").set("colors", [am5.color(0xef4444), am5.color(0x3b82f6)]);
    customTheme.rule("Grid").setAll({ stroke: am5.color(0xffffff), strokeWidth: 1, strokeOpacity: 0.2 });

    root.setThemes([am5themes_Animated.new(root), customTheme, am5themes_Responsive.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      }),
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );
    legend.markers.template.setAll({
      width: 12,
      height: 12,
    });

    // *************** xAxis ***************
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "cluster",
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );
    xAxis.data.setAll(data);
    // *************** xAxis ***************

    // *************** yAxis ***************
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );
    // *************** yAxis ***************

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name: string, fieldName: string, stacked: boolean) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          stacked: stacked,
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "cluster",
        }),
      );

      series.columns.template.setAll({
        // fill: am5.color(0xe4572e),
      });

      // series.columns.template.setAll({
      //   tooltipText: "{name}, {categoryX}:{valueY}",
      //   width: am5.percent(90),
      //   tooltipY: am5.percent(10)
      // });
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.percent(50),
            centerX: am5.percent(50),
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }

    makeSeries("Usage", "Usage", false);
    makeSeries("Remain Capacity", "Remain Capacity", true);

    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id="StackedVerticalColumnChart" style={{ width: "100%", height: "100%" }}></div>;
}
