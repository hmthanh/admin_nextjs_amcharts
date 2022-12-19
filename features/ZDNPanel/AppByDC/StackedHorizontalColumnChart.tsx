import * as am5 from "@amcharts/amcharts5";
// import * as am5map from "@amcharts/amcharts5/map";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { useLayoutEffect } from "react";
// import * as am5plugins_forceDirected from "@amcharts/amcharts5/plugins/forceDirected";

export interface ITreeNodeType {
  value?: number;
  name?: string;
  children?: any[];
}
export default function StackedHorizontalColumnChart() {
  // am5.useTheme(am5themes_Animated);
  useLayoutEffect(() => {
    let root = am5.Root.new("StackedHorizontalColumnChart");
    root._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

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

    let data = [
      {
        year: "2021",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1
      },
      {
        year: "2022",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2
      },
      {
        year: "2023",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4
      }
    ];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
        // fillRule:
      })
    );

    let yRenderer = yAxis.get("renderer");
    yRenderer.labels.template.setAll({
      fill: am5.color("#FFFFFF"),
      fontSize: 13
    });
    yRenderer.grid.template.setAll({
      stroke: am5.color("#FFFFFF"),
      strokeWidth: 1,
      strokeOpacity: 0.2
    });
    yAxis.data.setAll(data);

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );
    let xRenderer = xAxis.get("renderer");
    xRenderer.labels.template.setAll({
      fill: am5.color("#FFFFFF"),
      fontSize: 13
    });
    xRenderer.grid.template.setAll({
      stroke: am5.color("#FFFFFF"),
      strokeWidth: 1,
      strokeOpacity: 0.2
    });

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        layout: am5.GridLayout.new(root, {
          maxColumns: 5
        })
      })
    );
    legend.labels.template.setAll({
      fontSize: 12,
      fontWeight: "400",
      fill: am5.color("#FFFFFF"),
      maxHeight: 50
    });

    legend.markers.template.setAll({
      width: 14,
      height: 14
    });

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name: string, fieldName: string) {
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

    makeSeries("Europe", "europe");
    makeSeries("North America", "namerica");
    makeSeries("Asia", "asia");
    makeSeries("Latin America", "lamerica");
    makeSeries("Middle East", "meast");
    makeSeries("Africa", "africa");

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return <div id="StackedHorizontalColumnChart" style={{ width: "100%", height: "100%" }}></div>;
}
