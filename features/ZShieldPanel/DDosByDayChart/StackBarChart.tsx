import { useEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5xy from "@amcharts/amcharts5/xy";

export default function StackBarChart() {
  useEffect(() => {
    let root = am5.Root.new("StackBarChart");
    root._logo?.dispose();

    let customTheme = am5.Theme.new(root);
    customTheme
      .rule("ColorSet")
      .set("colors", [am5.color(0xef4444), am5.color(0x22c55e), am5.color(0x3b82f6), am5.color(0xa855f7), am5.color(0xec4899), am5.color(0xfacc15), am5.color(0xd946ef)]);
    customTheme.rule("Grid").setAll({ stroke: am5.color(0xffffff), strokeWidth: 1, strokeOpacity: 0.2 });

    // customTheme.rule("Label").set("fontSize", 14);
    customTheme.rule("Label").set("fill", am5.color("#FFF"));
    root.setThemes([am5themes_Animated.new(root), customTheme, am5themes_Responsive.new(root)]);

    let data = [
      {
        name: "Zing News",
        steps: 89,
        pictureSettings: {
          src: "data:image/jpeg;base64,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",
          // src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg",
        },
      },
      {
        name: "SGGP",
        steps: 17,
        pictureSettings: {
          src: "data:image/jpeg;base64,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",
        },
      },
      {
        name: "Báo Mới",
        steps: 45,
        pictureSettings: {
          src: "data:image/png;base64,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",
        },
      },
      {
        name: "Zalo",
        steps: 12,
        pictureSettings: {
          src: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png",
        },
      },
      {
        name: "Báo Pháp Luật",
        steps: 81,
        pictureSettings: {
          src: "https://play-lh.googleusercontent.com/T7gfXPDI4iFZvvq-ei3E0QDWCODWMBAsU5MhU3n0Ul2rxYzW3UDJX98B1oK21sqe4g=w240-h480-rw",
        },
      },
      {
        name: "Tiền Phong",
        steps: 43,
        pictureSettings: {
          src: "data:image/png;base64,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",
          // src: "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg",
        },
      },
      {
        name: "Thanh Niên",
        steps: 78,
        pictureSettings: {
          src: "https://play-lh.googleusercontent.com/mZNbcBXV4vNBnoL07Ox3bUDA_EbgTAg7HlHeawFnK5BRkZxXkkl8wF2vvJldgEq3dMI",
        },
      },
  
    ];

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 20,
      }),
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: yRenderer,
        paddingRight: 40,
      }),
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("strokeDasharray", [3]);

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: xRenderer,
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Income",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "steps",
        categoryYField: "name",
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          pointerOrientation: "vertical",
          labelText: "{valueX}",
        }),
      }),
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 8,
      cornerRadiusTR: 8,
      cornerRadiusBL: 8,
      cornerRadiusTL: 8,
      maxHeight: 50,
      fillOpacity: 0.8,
    });

    let currentlyHovered:any;

    series.columns.template.events.on("pointerover", function (e) {
      handleHover(e.target.dataItem);
    });

    series.columns.template.events.on("pointerout", function (e) {
      handleOut();
    });

    function handleHover(dataItem:any) {
      if (dataItem && currentlyHovered != dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        let bullet = dataItem.bullets[0];
        bullet.animate({
          key: "locationX",
          to: 1,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    function handleOut() {
      if (currentlyHovered) {
        let bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: "locationX",
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    let circleTemplate:any = am5.Template.new({});

    series.bullets.push(function (root:am5.Root, series:am5.Series, dataItem:any) {
      let bulletContainer = am5.Container.new(root, {});
      let circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 25,
          },
          circleTemplate,
        ),
      );

      let maskCircle = bulletContainer.children.push(am5.Circle.new(root, { radius: 25 }));

      // only containers can be masked, so we add image to another container
      let imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle,
        }),
      );

      // not working
      let image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "pictureSettings",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 50,
          height: 50,
        }),
      );

      return am5.Bullet.new(root, {
        locationX: 0,
        sprite: bulletContainer,
      });
    });

    // heatrule
    series.set("heatRules", [
      {
        dataField: "valueX",
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: series.columns.template,
        key: "fill",
      },
      {
        dataField: "valueX",
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: circleTemplate,
        key: "fill",
      },
    ]);

    series.data.setAll(data);
    yAxis.data.setAll(data);

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    cursor.events.on("cursormoved", function () {
      let dataItem = series.get("tooltip" as any).dataItem;
      if (dataItem) {
        handleHover(dataItem);
      } else {
        handleOut();
      }
    });

    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return <div id="StackBarChart" style={{ width: "100%", height: "100%" }}></div>;
}
