import { ScriptableContext } from "chart.js";
import { fetcher } from "../../../helper/fetcher";
import { IResponseType } from "../../../helper/IDataType";
import useSWR from "swr";

export function useBandwidthData() {
  // Fetch data
  const { data, error, isLoading } = useSWR("http://10.90.85.9:19040/stats?a=ZDNBandwidth&domain=zadn&minute=1440", fetcher);
  if (data == undefined || error) {
    return { data, error, isLoading };
  }
  // **************** PROCESSING DATA ****************
  let labels: number[] = [];
  let values: number[] = [];
  const res: IResponseType = data;
  if (res) {
    res.data.forEach((item: any) => {
      labels.push(item.date);
      values.push(item.value);
    });
  }

  const chartData = {
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
  // **************** PROCESSING DATA ****************

  return {
    data: chartData,
    isLoading,
    error: error,
  };
}
