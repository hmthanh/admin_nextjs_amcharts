import dynamic from "next/dynamic";
import Card from "../../components/Card/Card";
// import TimeSeries from "../../components/Chart/TimeSeries";
import PaddingBox from "../../components/PaddingBox";
import AppByDC from "./AppByDC/AppByDC";
import ServerByDC from "./ServerByDC";
import EdgeSeverStatistic from "./EdgeSeverStatistic/ServerStatistic";
import EdgeSeverUsage from "./EdgeSeverUsage/EdgeSeverUsage";
import ZCDNLogo from "../Logo";

// const PieChart = dynamic(() => import("../../components/Chart/PieChart"), {
//   ssr: false
// });
const BandwidthChart = dynamic(() => import("./BandwidthChart/BandwidthChart"), {
  ssr: false,
});

const DataUsageChart = dynamic(() => import("./DataUsageChart/DataUsageChart"), {
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
        <div className="grid grid-cols-4 gap-4 px-4 pb-4 w-full h-full">
          <div className="col-span-1">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 w-full h-full">
                <ServerByDC />
              </div>
              <div className="flex-1 w-full h-full">
                <AppByDC />
              </div>
            </div>
          </div>
          <div className="col-span-2">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 w-full h-full">
              <DataUsageChart />
            </div>
            <div className="flex-1 w-full h-full">
              <BandwidthChart />
            </div>
          </div>
        </div>

          <div className="col-span-1">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 w-full h-full">
                {/* <ServerByDC /> */}
                <EdgeSeverStatistic />
              </div>
              <div className="flex-1 w-full h-full">
                {/* <AppByDC /> */}
                <EdgeSeverUsage />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* <!-- Body --> */}
    </div>
  );
}
