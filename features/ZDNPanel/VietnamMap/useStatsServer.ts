import useSWR from "swr";
import { fetcher } from "../../../helper/fetcher";


export function useStatsServer() {
  // Fetch data
  const { data, error, isLoading } = useSWR(
    "http://10.90.85.9:19040/stats?a=ZDNProductDistribution&productids=34,31,32,33,48,35",
    fetcher,
  );

  let statsServer = {};
  if (data) {
    statsServer = data.data;
    // console.log("usestatsServer", data.data);
    // console.log("statsServer", statsServer);
  }

  return { data: statsServer, error, isLoading };
}
