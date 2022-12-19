import * as am5 from "@amcharts/amcharts5";
// import * as am5map from "@amcharts/amcharts5/map";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { useLayoutEffect } from "react";
import { treeServerBYDC } from "../../features/ZDNPanel/faker";
// import * as am5plugins_forceDirected from "@amcharts/amcharts5/plugins/forceDirected"; 

export interface ITreeNodeType {
  value?: number;
  name?: string;
  children?: any[];
}
export function generateLevel(
  data: ITreeNodeType,
  name: string,
  level: number,
  maxLevels: number,
  maxNodes: number,
  maxValue: number
) {
  for (var i = 0; i < Math.ceil(maxNodes * Math.random()) + 1; i++) {
    let nodeName = name + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
    let child: ITreeNodeType;
    if (level < maxLevels) {
      child = {
        name: nodeName + level,
        children: []
      };

      if (level > 0 && Math.random() < 0.5) {
        child.value = Math.round(Math.random() * maxValue);
      } else {
        child.children = [];
        generateLevel(child, nodeName + i, level + 1, maxLevels, maxNodes, maxValue);
      }
    } else {
      child = {
        name: name + i,
        value: Math.round(Math.random() * maxValue),
        children: []
      };
    }
    data.children?.push(child);
  }

  level++;
  return data;
}

export default function DirectedTree() {
  // am5.useTheme(am5themes_Animated);
  useLayoutEffect(() => {
    let root = am5.Root.new("DirectedTree");
    root._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );

    let series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 2,
        maxRadius: 25,
        minRadius: 15,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        centerStrength: 0.5,
      
        draggable: false
      })
    );
    series.nodes.each((node) => {
      node.show();
      node.eachChildren((childNode) => {
        childNode.show()
      })
    })

    // Generate and set data
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
    let maxLevels = 1;
    let maxNodes = 10;
    let maxValue = 100;

    let data: ITreeNodeType = {
      name: "ZDN",
      children: []
    };
    generateLevel(data, "", 0, maxLevels, maxNodes, maxValue);
    // console.log("data", JSON.stringify(data));

    // data = treeServerBYDC;
    // series.nodes.template.expandAll = false;

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);
    series.set("selectedDataItem", series.dataItems[0]);

    // Make stuff animate on load
    series.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return <div id="DirectedTree" style={{ width: "100%", height: "100%" }}></div>;
}
