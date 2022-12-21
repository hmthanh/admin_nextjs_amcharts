import { ScriptableContext } from "chart.js";
import { fetcher } from "../../../helper/fetcher";
import { IResponseType } from "../../../helper/IDataType";
import useSWR from "swr";

export function useDataUsage() {
  // Fetch data
  const { data, error, isLoading } = useSWR("http://10.90.85.9:19040/stats?a=ZDNDataUsage&domain=zadn&day=30", fetcher);
  if (data == undefined || error) {
    return { data, error, isLoading };
  }
  // **************** PROCESSING DATA ****************
  const res: IResponseType = data;
  let labels: number[] = [];
  let values: number[] = [];
  res.data.forEach((item: any) => {
    labels.push(item.date);
    values.push(item.value);
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Bandwidth",
        data: values,
        borderWidth: 5,
        borderColor: "#16BDE4",
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
  // **************** PROCESSING DATA ****************

  return {
    data: chartData,
    isLoading,
    error: error,
  };
}
