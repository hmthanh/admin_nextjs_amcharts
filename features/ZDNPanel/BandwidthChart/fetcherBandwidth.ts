import { ScriptableContext } from "chart.js";
import { IResponseType } from "../../../helper/IDataType";

const processData = (response: IResponseType) => {
  let labels: number[] = [];
  let values: number[] = [];

  response.data.forEach((item: any) => {
    labels.push(item.date);
    values.push(item.value);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Bandwidth",
        data: values,
        borderWidth: 2.5,
        borderColor: "#5E72E4",
        fill: "start",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 300, 0, 44);
          gradient.addColorStop(1, "rgba(54,162,235,0.3)");
          gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
          gradient.addColorStop(0, "rgba(119,52,169,0)");
          return gradient;
        },
      },
    ],
  };

  return data;
};

export const fetcherBandwidth = async (url: string, init?: RequestInit) => {
  const resData = await fetch(url, init).then((res: Response) => res.json());

  const res: IResponseType = resData;
  let labels: number[] = [];
  let values: number[] = [];

  res.data.forEach((item: any) => {
    labels.push(item.date);
    values.push(item.value);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Bandwidth",
        data: values,
        borderWidth: 2.5,
        borderColor: "#5E72E4",
        fill: "start",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 300, 0, 44);
          gradient.addColorStop(1, "rgba(54,162,235,0.3)");
          gradient.addColorStop(0.2, "rgba(72,72,176,0.1)");
          gradient.addColorStop(0, "rgba(119,52,169,0)");
          return gradient;
        },
      },
    ],
  };

  return data;
};
