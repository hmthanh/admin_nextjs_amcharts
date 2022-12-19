import * as am5 from "@amcharts/amcharts5";
// import * as am5map from "@amcharts/amcharts5/map";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';

// import * as am5plugins_forceDirected from "@amcharts/amcharts5/plugins/forceDirected";

export interface ITreeNodeType {
  value?: number;
  name?: string;
  children?: any[];
}
export default function PieChartWithLegend() {
  // am5.useTheme(am5themes_Animated);
  useLayoutEffect(() => {
    let root = am5.Root.new("PieChartWithLegend");
    root._logo?.dispose();

    let customTheme = am5.Theme.new(root);
    customTheme.rule("Label").set("fontSize", 12);
    customTheme.rule("Label").set("fill", am5.color("#FFFFFF"));
    root.setThemes([am5themes_Animated.new(root), customTheme, am5themes_Responsive.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        // innerRadius: am5.percent(20)
      })
    );
    // var chart = am5.Root.new("chartdiv", am4charts.PieChart3D);
    // let chart = root.container.children.push(
    //     am5.PieChart3D.new(root, {
    //       layout: root.verticalLayout
    //     })
    //   );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false
      })
    );
    series.ticks.template.setAll({
      fill: am5.color("#FFFFFF")
    });
    series.labels.template.setAll({
      text: "{value}",
      radius:-40,
      fontSize:15,
      fontWeight: "600"
    });


    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    // series.data.setAll([
    //   { value: 10, category: "One" },
    //   { value: 9, category: "Two" },
    //   { value: 6, category: "Three" },
    //   { value: 5, category: "Four" },
    //   { value: 4, category: "Five" },
    //   { value: 3, category: "Six" },
    //   { value: 1, category: "Seven" }
    // ]);
    series.data.setAll([
      { category: "QTSC", value: 11 },
      { category: "ZALO-VNPT HCM", value: 30 },
      { category: "ZALO-VNPT HN", value: 16 },
      { category: "VNPT-HN", value: 8 },
      { category: "FPT-HCM", value: 25 },
      { category: "FPT-HN", value: 9 },
      { category: "VIETTEL-HCM", value: 10 },
      { category: "Sing - OVH", value: 2 }
    ]);

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );
    legend.labels.template.setAll({
      text: "{value.percent.formatNumber('#.0')}%"
    });
    legend.labels.template.setAll({
      fontSize: 12,
      text: "{category}",
    });
    legend.markers.template.setAll({
      width: 12,
      height: 12,
    });
    legend.data.setAll(series.dataItems);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return <div id="PieChartWithLegend" style={{ width: "100%", height: "100%" }}></div>;
}
