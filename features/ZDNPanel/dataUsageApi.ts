import { IBandwidthType } from "../../helper/IDataType";

export function dataUsageApi() {
  async () => {
    const response = await fetch("http://10.90.85.9:19040/stats?a=ZDNDataUsage&domain=zadn&day=30");
    // IBandwidthType
    return await response.json();
  };
}
