import { ScriptableContext } from "chart.js";
import { fetcher } from "../../../helper/fetcher";
import { IResponseType } from "../../../helper/IDataType";
import useSWR from "swr";

interface ISummaryType {
  Application: number;
  Cluster: number;
  "DNS Record": number;
  Production: number;
  Server: number;
  Subdomain: number;
}

export function useSummary() {
  // Fetch data
  const { data, error, isLoading } = useSWR(
    "http://10.90.85.9:19040/stats?a=ZDNOverall&totalProduct=true&totalApp=true&totalCluster=true&totalServer=true&totalDNSRecord=true&totalSubdomain=true",
    fetcher,
  );

  let summary: ISummaryType = { Application: 0, Cluster: 0, "DNS Record": 0, Production: 0, Server: 0, Subdomain: 0 };
  if (data) {
    summary = data.data;
    // console.log("summary", summary);
  }

  return { data: summary, error, isLoading };
}
