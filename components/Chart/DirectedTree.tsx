import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { useEffect } from "react";
// import * as am5plugins_forceDirected from "@amcharts/amcharts5/plugins/forceDirected";

export interface ITreeNodeType {
  value?: number;
  name?: string;
  children?: any[];
}
// export function generateLevel(data: ITreeNodeType, name: string, level: number, maxLevels: number, maxNodes: number, maxValue: number) {
//   for (var i = 0; i < Math.ceil(maxNodes * Math.random()) + 1; i++) {
//     let nodeName = name + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
//     let child: ITreeNodeType;
//     if (level < maxLevels) {
//       child = {
//         name: nodeName + level,
//         children: [],
//       };

//       if (level > 0 && Math.random() < 0.5) {
//         child.value = Math.round(Math.random() * maxValue);
//       } else {
//         child.children = [];
//         generateLevel(child, nodeName + i, level + 1, maxLevels, maxNodes, maxValue);
//       }
//     } else {
//       child = {
//         name: name + i,
//         value: Math.round(Math.random() * maxValue),
//         children: [],
//       };
//     }
//     data.children?.push(child);
//   }

//   level++;
//   return data;
// }

export const dataTree = {
  name: "ZDN",
  value: 0,
  x: am5.percent(50),
  y: am5.percent(50),
  children: [
    {
      name: "Zing MP3",
      value: 33,
      // image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/ZingMP3logo.svg/2560px-ZingMP3logo.svg.png",
      image: "../../public/zingmp3.svg",
      children: [
        { children: [], name: "Quang\nTrung", value: 1 },
        { children: [], name: "FPTHN", value: 7 },
        { children: [], name: "Zalo\nVNPTHN", value: 14 },
        { children: [], name: "VNPTHN", value: 7 },
        { children: [], name: "Zalo\nVNPTHCM", value: 28 },
        { children: [], name: "FPTHCM", value: 17 },
      ],
    },
    {
      name: "Zalo",
      value: 34,
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png",
      children: [
        { children: [], name: "Viettel\nHCM", value: 10 },
        { children: [], name: "Quang\nTrung", value: 12 },
        { children: [], name: "FPTHN", value: 7 },
        { children: [], name: "Zalo\nVNPTHN", value: 13 },
        { children: [], name: "VNPTHN", value: 7 },
        { children: [], name: "Zalo\nVNPTHCM", value: 24 },
        { children: [], name: "FPTHCM", value: 25 },
      ],
    },
    {
      name: "Adtima",
      value: 35,
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_firefox.svg",
      children: [
        { children: [], name: "Quang\nTrung", value: 1 },
        { children: [], name: "FPTHN", value: 6 },
        { children: [], name: "Zalo\nVNPTHN", value: 12 },
        { children: [], name: "VNPTHN", value: 6 },
        { children: [], name: "Zalo\nVNPTHCM", value: 18 },
        { children: [], name: "FPTHCM", value: 15 },
      ],
    },
    {
      name: "CMS",
      value: 48,
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_ie.svg",
      children: [
        { children: [], name: "Quang\nTrung", value: 3 },
        { children: [], name: "Singapore\nOVH", value: 1 },
        { children: [], name: "FPTHN", value: 9 },
        { children: [], name: "Zalo\nVNPTHN", value: 11 },
        { children: [], name: "Zalo\nVNPTHCM", value: 16 },
        { children: [], name: "FPTHCM", value: 9 },
      ],
    },
    {
      name: "Báo Mới",
      value: 31,
      image:
        "data:image/png;base64,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",
      children: [
        { children: [], name: "Quang\nTrung\n(4)", value: 1 },
        { children: [], name: "FPTHN\n(4)", value: 7 },
        { children: [], name: "Zalo\nVNPTHN\n(4)", value: 13 },
        { children: [], name: "VNPTHN\n(4)", value: 6 },
        { children: [], name: "Zalo\nVNPTHCM\n(4)", value: 23 },
        { children: [], name: "FPTHCM\n(4)", value: 19 },
      ],
    },
    {
      name: "Zing News",
      value: 32,
      image: "https://static-znews.zingcdn.me/images/logo-zing-home.svg",
      children: [
        { children: [], name: "Singapore\nOVH", value: 2 },
        { children: [], name: "Quang\nTrung", value: 4 },
        { children: [], name: "FPTHN", value: 9 },
        { children: [], name: "Zalo\nVNPTHN", value: 15 },
        { children: [], name: "VNPTHN", value: 5 },
        { children: [], name: "Zalo\nVNPTHCM", value: 23 },
        { children: [], name: "FPTHCM", value: 19 },
      ],
    },
  ],
};

export default function DirectedTree() {
  // am5.useTheme(am5themes_Animated);
  useEffect(() => {
    let root = am5.Root.new("DirectedTree");
    root._logo?.dispose();

    let customTheme = am5.Theme.new(root);
    customTheme
      .rule("ColorSet")
      .set("colors", [
        am5.color(0x374151),
        // am5.color(0xef4444),
        am5.color(0x22c55e),
        am5.color(0x3b82f6),
        am5.color(0xa855f7),
        // am5.color(0xec4899),
        am5.color(0xf43f5e),
        am5.color(0xf97316),
        // am5.color(0x06b6d4),
        am5.color(0xd946ef),
      ]);

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root), customTheme]);

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      }),
    );

    let series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        // singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 2,
        // topDepth: 1,
        maxRadius: 30,
        minRadius: 30,
        // minRadius: am5.percent(10),
        nodePadding: 10,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        centerStrength: 0.5,
        xField: "x",
        yField: "y",
        // draggable: false,
      }),
    );
    let tooltip = am5.Tooltip.new(root, {
      background: am5.Rectangle.new(root, {
        fill: am5.color(0xff5599),
        fillOpacity: 0.2,
      }),
    });
    tooltip.label.setAll({ fill: am5.color("#fff") });
    series.labels.template.setAll({
      fontSize: 11,
      fill: am5.color("#fff"),
      tooltip: tooltip,
    });
    // series.labels.template.set("forceHidden", true);

    // **************** NODE ****************
    series.nodes.template.setAll({
      toggleKey: "none",
      cursorOverStyle: "default",
    });
    series.circles.template.setAll({
      shadowColor: am5.Color.fromCSS("rgb(0 0 0 / 5%)"),
      shadowBlur: 1,
      shadowOffsetX: 1,
      shadowOffsetY: 2
    });
    series.nodes.each((node: am5hierarchy.LinkedHierarchyNode) => {
      node.show();
      // node.
      node.eachChildren((childNode: am5.Sprite) => {
        childNode.show();
      });
    });
    // series.circles.template.set("forceHidden", true);
    // series.outerCircles.template.set("forceHidden", true);
    // series.nodes.template.setup = function (target) {
    //   let icon = target.children.push(
    //     am5.Picture.new(root, {
    //       width: 70,
    //       height: 70,
    //       centerX: am5.percent(50),
    //       centerY: am5.percent(50),
    //       src: "https://assets.codepen.io/t-160/star.svg",
    //     }),
    //   );
    // };
    // Add an ellipsis to node
    // series.nodes.template.setup = function (target) {
    //   target.events.once("dataitemchanged", function (ev) {
    //     let target = ev.target;
    //     target?.dataItem?.on("circle" as any, function (circle) {
    //       circle.on("radius", function (radius: any, circle: any) {
    //         let ellipsis = circle.getPrivate("customData");
    //         if (ellipsis) {
    //           ellipsis.setAll({
    //             radiusX: circle.get("radius"),
    //             radiusY: circle.get("radius") * 0.6,
    //           });
    //         } else {
    //           ellipsis = target.children.unshift(
    //             am5.Ellipse.new(root, {
    //               radiusX: circle.get("radius"),
    //               radiusY: circle.get("radius") * 0.6,
    //               centerX: am5.percent(50),
    //               centerY: am5.percent(50),
    //               fill: circle.get("fill"),
    //             }),
    //           );
    //           circle.setPrivate("customData", ellipsis);
    //         }
    //       });
    //     });
    //   });
    // };
    // series.nodes.template.setAll();
    // **************** NODE ****************

    // Disable circles
    // series.circles.template.set("forceHidden", true);
    // series.outerCircles.template.set("forceHidden", true);

    // // ... except for central node
    // series.circles.template.adapters.add("forceHidden", function (forceHidden, target) {
    //   return target.dataItem.get("depth") == 0 ? false : forceHidden;
    // });

    // // Set up labels
    // series.labels.template.setAll({
    //   fill: am5.color("#fff"),
    //   y: 5,
    //   // y: am5.percent(10),
    //   oversizedBehavior: "none",
    // });

    // // Use adapter to leave central node label centered
    // series.labels.template.adapters.add("y", function (y, target) {
    //   return target.dataItem.get("depth") == 0 ? 0 : y;
    // });
    // series.circles.template.set("forceHidden", true);
    // series.outerCircles.template.set("forceHidden", true);
    // series.circles.template.adapters.add("forceHidden", function (forceHidden, target) {
    //   // console.log("depth", target);
    //   // return target?.dataItem?.get("depth" as any) == 1 ? forceHidden : false;
    //   // return false;
    // });
    // series.labels.template.adapters.add("forceHidden", function (forceHidden, target:am5.Label) {
    //   // return target?.dataItem?.get("depth" as any) == 1 ? forceHidden: false;
    //   return false;series.circles.template.adapters.add("forceHidden", function (forceHidden, target) {
    //   // console.log("depth", target);
    //   // return target?.dataItem?.get("depth" as any) == 1 ? forceHidden : false;
    //   // return false;
    // });
    // });

    // Use template.setup function to prep up node with an image
    // series.nodes.template.setup = function (target) {
    //   target.events.on("dataitemchanged", function (ev) {
    //     const dataObj = ev?.target?.dataItem?.dataContext as any;
    //     if (dataObj) {
    //       // console.log("target.series?.labels", target.series?.labels);
    //       // target.series?.labels.template.set("forceHidden", true);
    //       // let abc: Children<am5.Sprite> = target.children;
    //       target.children.push(
    //         am5.Picture.new(root, {
    //           width: 35,
    //           height: 35,
    //           centerX: am5.percent(50),
    //           centerY: am5.percent(50),
    //           src: dataObj.image,
    //         }),
    //       );
    //     }
    //     // series.labels.template.set("forceHidden", true);
    //   });
    // };

    // var icon = series.nodes.template.chi
    // (am5.Sprite);
    // icon.propertyFields.path = "path";
    // icon.horizontalCenter = "middle";
    // icon.verticalCenter = "middle";
    // Generate and set data
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data

    // let data: ITreeNodeType = {
    //   name: "ZDN",
    //   children: [],
    // };
    // generateLevel(data, "", 0, maxLevels, maxNodes, maxValue);
    // console.log("data", JSON.stringify(data));

    // data = treeServerBYDC;
    // series.nodes.template.expandAll = false;
    // series.circles.template.set("forceHidden", true);
    // series.outerCircles.template.set("forceHidden", true);
    // series.nodes.template.setup = function(target) {
    //   console.log(target.get("depth" as any))
    //   // if ()
    //   target.events.once("dataitemchanged", function(ev) {
    //     let target = ev.target;
    //     target?.dataItem?.on("circle" as any, function(circle) {
    //       circle.on("radius", function(radius:any, circle:any) {
    //         let ellipsis = circle.getPrivate("customData");
    //         if (ellipsis) {
    //           ellipsis.setAll({
    //             radiusX: circle.get("radius"),
    //             radiusY: circle.get("radius") * 0.6
    //           });
    //         }
    //         else {
    //           ellipsis = target.children.unshift(am5.Ellipse.new(root, {
    //             active:true,
    //             centerX: am5.percent(50),
    //             centerY: am5.percent(50),
    //             radiusX: circle.get("radius"),
    //             radiusY: circle.get("radius") * 0.6,
    //             fill: circle.get("fill")
    //           }));
    //           circle.setPrivate("customData", ellipsis);
    //         }
    //       })
    //     })
    //   });
    // }

    // series.data.setAll([data]);
    series.data.setAll([dataTree]);
    series.set("selectedDataItem", series.dataItems[0]);
    // series.set("selectedDataItem", series.dataItems[0]);
    // series.set("selectedDataItem", series.dataItems[0]);

    // Make stuff animate on load
    series.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return <div id="DirectedTree" style={{ width: "100%", height: "100%" }}></div>;
}
