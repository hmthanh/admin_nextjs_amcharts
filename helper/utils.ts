import colorLib, { Color, RGBA } from "@kurkle/color";
import { Series } from "./IDataType";

export function getGradient(
  ctx: { createLinearGradient: (arg0: number, arg1: any, arg2: number, arg3: any) => any },
  chartArea: { right: number; left: number; bottom: number; top: number },
  gradient: any, //{ addColorStop: (arg0: number, arg1: string) => void }
  width: number,
  height: number
) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(1, "rgba(54,162,235,0.3)");
    gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
    gradient.addColorStop(0, "rgba(119,52,169,0)");
  }

  return gradient;
}

export function getArcGradient(
  ctx: { createLinearGradient: (arg0: number, arg1: any, arg2: number, arg3: any) => any },
  chartArea: { right: number; left: number; bottom: number; top: number },
  gradient: { addColorStop: (arg0: number, arg1: string) => void },
  width: number,
  height: number
) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    // gradient.addColorStop(1, "rgba(54,162,235,0.3)");
    // gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
    // gradient.addColorStop(0, "rgba(119,52,169,0)");
  }

  return gradient;
}

const COLORS = ["#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236", "#166a8f", "#00a950", "#58595b", "#8549ba"];

export function color(index: number) {
  return COLORS[index % COLORS.length];
}

export function transparentize(value: string | number[] | Color | RGBA, opacity: number) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === undefined) {
    return "";
  }
  if (bytes === 0) return "0";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "Kilobyte",
    "Megabyte",
    "Gigabyte",
    "Terabyte",
    "Petabyte",
    "Exabyte",
    "Zettabyte",
    "Yottabyte"
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  if (i >= 0) {
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  } else {
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " "; // + sizes[i];
  }
};

export const formatBytesPerSeconds = (bytes: number, decimals = 2) => {
  if (bytes === undefined) {
    return "";
  }
  if (bytes === 0) return "0";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bps", "KBps", "MBps", "GBps", "TBps", "Pbps", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  if (i >= 0) {
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  } else {
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " "; // + sizes[i];
  }
};

export const convertChartDataType = (series: Series[]) => {
  const labels: number[] = [];
  const values: number[] = [];
  series.forEach((item: Series) => {
    labels.push(item.date);
    values.push(item.value);
  });
  return [labels, values];
};

/**
 * Find the closest smaller number in an array
 * @param time Ascendingly sorted array
 */
export const waitFor = (time: number) => new Promise((res) => setTimeout(res, time));

/**
 * Find the closest smaller number in an array
 * @param arr Ascendingly sorted array
 * @param value Value to check against
 */
export function smallerClosestValue(arr: number[], value: number) {
  let prevVal = arr[0];

  for (const val of arr) {
    if (val > value) return prevVal;
    if (val == value) return val;
    prevVal = val;
  }

  return arr[arr.length - 1];
}

export function randint(lower: number, upper: number) {
  if (lower > upper) [lower, upper] = [upper, lower];

  return lower + Math.floor((upper - lower) * Math.random());
}

export function getCurrentTime() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
}
