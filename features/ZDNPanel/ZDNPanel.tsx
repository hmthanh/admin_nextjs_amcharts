import dynamic from "next/dynamic";
import ZCDNLogo from "../Logo";
import AppByDC from "./StatsAppByDC/StatsAppByDC";
import EdgeSeverStatistic from "./EdgeSeverStatistic/ServerStatistic";
import EdgeSeverUsage from "./EdgeSeverUsage/EdgeSeverUsage";
import ServerByDC from "./StatsServerByDC/StatsServerByDC";
// import VietnamMap from "";

const VietnamMap = dynamic(() => import("./VietnamMap/VietnamMap"), {
  ssr: false,
});

// const PieChart = dynamic(() => import("../../components/Chart/PieChart"), {
//   ssr: false
// });
const BandwidthChart = dynamic(() => import("./SeriesBandwidthChart/SeriesBandwidthChart"), {
  ssr: false,
});

const DataUsageChart = dynamic(() => import("./SeriesDataUsageChart/SeriesDataUsageChart"), {
  ssr: false,
});

// const StackedChart = dynamic(() => import("./StackedChart"), {
//   ssr: false
// });

const TotalSummary = dynamic(() => import("./TotalSummary/TotalSummary"), {
  ssr: false,
});
export default function ZDNPanel() {
  return (
    <div className="flex flex-col w-full h-screen dark">
      {/* <!-- Header --> */}
      <div className="flex-none">
        <div className="flex flex-row w-full">
          <div className="basic-1/4">
            <div className="flex zdn-logo w-[250px] h-full align-text-bottom gap-2 p-2">
              <div className="logo  flex justify-center align-middle flex-wrap content-center">
                <ZCDNLogo />
              </div>
              <div className="flex flex-col align-middle justify-center h-full ">
                <div className="logo text-xl font-bold">ZCDN Dashboard</div>
                <div className="logo uppercase text-sm font-semibold">Zalo Control System</div>
              </div>
            </div>
          </div>
          <div className="basic-3/4 flex-auto p-3">
            <TotalSummary />
          </div>
        </div>
      </div>

      {/* <!-- Header --> */}

      {/* <!-- Body --> */}
      <div className="flex-auto h-[calc(100vh - 2rem)]">
        <div className="grid grid-cols-11 gap-4 px-4 pb-4 w-full h-full">
          <div className="col-span-4">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 w-full h-full">{/* <DataUsageChart /> */}</div>
              <div className="flex-1 w-full h-full">{/* <BandwidthChart /> */}</div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex h-full">
              <div className="flex-1 w-full h-full">
                {/* <ServerByDC /> */}
                <VietnamMap />
              </div>
              {/* <div className="flex-1 w-full h-full">
                <AppByDC />
              </div> */}
            </div>
          </div>

          <div className="col-span-4">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 w-full h-full">{/* <EdgeSeverStatistic /> */}</div>
              <div className="flex-1 w-full h-full">{/* <EdgeSeverUsage /> */}</div>
            </div>
          </div>
        </div>
      </div>

      {/* <ServerByDC /> */}
      {/* <AppByDC /> */}
      {/* <!-- Body --> */}
    </div>
  );
}
