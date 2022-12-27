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
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_chrome.svg",
      children: [
        { children: [], name: "Quang Trung", value: 1 },
        { children: [], name: "FPTHN", value: 7 },
        { children: [], name: "Zalo VNPTHN", value: 14 },
        { children: [], name: "VNPTHN", value: 7 },
        { children: [], name: "Zalo VNPTHCM", value: 28 },
        { children: [], name: "FPTHCM", value: 17 },
      ],
    },
    {
      name: "Zalo",
      value: 34,
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_chrome.svg",
      children: [
        { children: [], name: "Viettel HCM", value: 10 },
        { children: [], name: "Quang Trung", value: 12 },
        { children: [], name: "FPTHN", value: 7 },
        { children: [], name: "Zalo VNPTHN", value: 13 },
        { children: [], name: "VNPTHN", value: 7 },
        { children: [], name: "Zalo VNPTHCM", value: 24 },
        { children: [], name: "FPTHCM", value: 25 },
      ],
    },
    {
      name: "Adtima",
      value: 35,
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_firefox.svg",
      children: [
        { children: [], name: "Quang Trung", value: 1 },
        { children: [], name: "FPTHN", value: 6 },
        { children: [], name: "Zalo VNPTHN", value: 12 },
        { children: [], name: "VNPTHN", value: 6 },
        { children: [], name: "Zalo VNPTHCM", value: 18 },
        { children: [], name: "FPTHCM", value: 15 },
      ],
    },
    {
      name: "CMS",
      value: 48,
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_ie.svg",
      children: [
        { children: [], name: "Quang Trung", value: 3 },
        { children: [], name: "Singapore\nOVH", value: 1 },
        { children: [], name: "FPTHN", value: 9 },
        { children: [], name: "Zalo VNPTHN", value: 11 },
        { children: [], name: "Zalo VNPTHCM", value: 16 },
        { children: [], name: "FPTHCM", value: 9 },
      ],
    },
    {
      name: "Báo Mới",
      value: 31,
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_safari.svg",
      children: [
        { children: [], name: "Quang Trung", value: 1 },
        { children: [], name: "FPTHN", value: 7 },
        { children: [], name: "Zalo VNPTHN", value: 13 },
        { children: [], name: "VNPTHN", value: 6 },
        { children: [], name: "Zalo VNPTHCM", value: 23 },
        { children: [], name: "FPTHCM", value: 19 },
      ],
    },
    {
      name: "Zing News",
      value: 32,
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg",
      children: [
        { children: [], name: "Singapore\nOVH", value: 2 },
        { children: [], name: "Quang Trung", value: 4 },
        { children: [], name: "FPTHN", value: 9 },
        { children: [], name: "Zalo VNPTHN", value: 15 },
        { children: [], name: "VNPTHN", value: 5 },
        { children: [], name: "Zalo VNPTHCM", value: 23 },
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

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

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
        maxRadius: 20,
        minRadius: 15,
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

    // series.nodes.each((node) => {
    //   node.show();
    //   node.eachChildren((childNode) => {
    //     childNode.show();
    //   });
    // });

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
    //   //y: am5.percent(10),
    //   oversizedBehavior: "none",
    // });

    // // Use adapter to leave central node label centered
    // series.labels.template.adapters.add("y", function (y, target) {
    //   return target.dataItem.get("depth") == 0 ? 0 : y;
    // });

    // Use template.setup function to prep up node with an image
    series.nodes.template.setup = function (target) {
      target.events.on("dataitemchanged", function (ev) {
        const dataObj = ev?.target?.dataItem?.dataContext as any;
        if (dataObj) {
          target.children.push(
            am5.Picture.new(root, {
              width: 25,
              height: 25,
              centerX: am5.percent(50),
              centerY: am5.percent(50),
              src: dataObj.image,
            }),
          );
        }
      });
    };

    // Generate and set data
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
    let maxLevels = 1;
    let maxNodes = 10;
    let maxValue = 100;

    // let data: ITreeNodeType = {
    //   name: "ZDN",
    //   children: [],
    // };
    // generateLevel(data, "", 0, maxLevels, maxNodes, maxValue);
    // console.log("data", JSON.stringify(data));

    // data = treeServerBYDC;
    // series.nodes.template.expandAll = false;

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
