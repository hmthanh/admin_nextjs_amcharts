import dynamic from "next/dynamic";
import Card from "../../components/Card/Card";
// import TimeSeries from "../../components/Chart/TimeSeries";
import PaddingBox from "../../components/PaddingBox";
import AppByDC from "./AppByDC/AppByDC";
import ServerByDC from "./ServerByDC";
import EdgeSeverStatistic from "./EdgeSeverStatistic/ServerStatistic";
import EdgeSeverUsage from "./EdgeSeverUsage/EdgeSeverUsage";
import ZCDNLogo from "../Logo";
// import StackedChart from "./StackedChart";
// import TotalSummary from "./TotalSummary/TotalSummary";

// const GlobeMap = dynamic(() => import("../../components/Globe/GlobeMap"), {
//   ssr: false
// });
// const PieChart = dynamic(() => import("../../components/Chart/PieChart"), {
//   ssr: false
// });
const BandwidthChart = dynamic(() => import("./BandwidthChart/BandwidthChart"), {
  ssr: false
});

const DataUsageChart = dynamic(() => import("./DataUsageChart/DataUsageChart"), {
  ssr: false
});

// const StackedChart = dynamic(() => import("./StackedChart"), {
//   ssr: false
// });

const TotalSummary = dynamic(() => import("./TotalSummary/TotalSummary"), {
  ssr: false
});

// const TotalSummary = dynamic(() => import("./TotalSummary/TotalSummary"), {
//   ssr: false
// });

// const TimeSeriesChart = dynamic(() => import("../../components/Chart/TimeSeriesChart"), {
//   ssr: false
// });
// const TimeSeries = dynamic(() => import("../../components/Chart/TimeSeries"), {
//   ssr: false
// });

{
  /* <TimeSeries /> */
}
{
  /* <TimeSeriesChart /> */
}
{
  /* <DirectedTree/> */
}
{
  /* <GlobeMap/> */
}
export default function ZDNPanel() {
  return (
    <div className="flex flex-col w-full h-screen dark">
      {/* <!-- Header --> */}
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
      {/* <!-- Header --> */}

      {/* <!-- Body --> */}
      <div className="grid grid-cols-4 w-full h-full">
        <div className="col-span-1 h-full">
          <div className="grid grid-rows gap-4 py-3 w-full h-full">
            <div className=" w-full h-full">
              <PaddingBox>
                <Card>
                  <ServerByDC />
                </Card>
              </PaddingBox>
            </div>
            <div className="w-full h-full">
              <PaddingBox>
                <Card>
                  <AppByDC />
                </Card>
              </PaddingBox>
            </div>
          </div>
        </div>
        <div className="col-span-2 h-full">
          <div className="grid grid-rows gap-4 py-3 w-full h-full">
            <div className="w-full h-full">
              <PaddingBox>
                <Card>
                  <DataUsageChart />
                </Card>
              </PaddingBox>
            </div>
            <div className="w-full h-full">
              <PaddingBox>
                <Card>
                  <BandwidthChart />
                </Card>
              </PaddingBox>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="grid grid-rows gap-4 py-3 w-full h-full">
            <div className=" w-full h-full">
              <PaddingBox>
                <Card>
                  <EdgeSeverStatistic />
                </Card>
              </PaddingBox>
            </div>
            <div className="w-full h-full">
              <PaddingBox>
                <Card>
                  <EdgeSeverUsage />
                </Card>
              </PaddingBox>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Body --> */}
    </div>
  );
}
