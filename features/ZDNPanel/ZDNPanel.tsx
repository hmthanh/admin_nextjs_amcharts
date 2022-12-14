import dynamic from "next/dynamic";
import Card from "../../components/Card/Card";
// import TimeSeries from "../../components/Chart/TimeSeries";
import PaddingBox from "../../components/PaddingBox";
import AppByDC from "./AppByDC/AppByDC";
import ServerByDC from "./ServerByDC";
import EdgeSeverStatistic from "./EdgeSeverStatistic/ServerStatistic";
import EdgeSeverUsage from "./EdgeSeverUsage/EdgeSeverUsage";
// import StackedChart from "./StackedChart";
// import TotalSummary from "./TotalSummary/TotalSummary";

// const GlobeMap = dynamic(() => import("../../components/Globe/GlobeMap"), {
//   ssr: false
// });
// const PieChart = dynamic(() => import("../../components/Chart/PieChart"), {
//   ssr: false
// });

// const DirectedTree = dynamic(() => import("../../components/Chart/DirectedTree"), {
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

                  {/* <TimeSeries /> */}
                  {/* <TimeSeriesChart /> */}
                  {/* <DirectedTree/> */}
                  {/* <GlobeMap/> */}
export default function ZDNPanel() {
  return (
    <div className="block w-full h-screen dark">
      {/* <!-- h-screen --> */}
      <div className="w-full bg-slate-600 h-[15vh] flex">
        <div className="flex-none">
          <div className="zdn-logo bg-green-400 w-[250px] h-full justify-center text-center">
            <div className="logo">ZDN Logo</div>
          </div>
        </div>
        <div className="flex-auto">
          <TotalSummary />
        </div>
      </div>
      {/* <!-- row --> */}
      <div className="grid grid-cols-4 w-full h-full">
        <div className="col-span-1">
          <div className="grid grid-rows gap-4 py-3 w-full">
            <div className=" w-full">
              <PaddingBox>
                <Card>
                  <ServerByDC />
                </Card>
              </PaddingBox>
            </div>
            <div className="w-full">
              <PaddingBox>
                <Card>
                  <AppByDC />
                </Card>
              </PaddingBox>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-rows gap-4 py-3 w-full">
            <div className="w-full ">
              <PaddingBox>
                <Card>
                  <DataUsageChart />
                </Card>
              </PaddingBox>
            </div>
            <div className="w-full ">
              <PaddingBox>
                <Card>
                  <BandwidthChart />
                </Card>
              </PaddingBox>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows gap-4 py-3 w-full">
            <div className=" w-full">
              <PaddingBox>
                <Card>
                  <EdgeSeverStatistic/>
                </Card>
              </PaddingBox>
            </div>
            <div className="w-full">
              <PaddingBox>
                <Card>
                  <EdgeSeverUsage/>
                </Card>
              </PaddingBox>
            </div>
          </div>
        </div>
        {/* <!-- <div className="col-span-2  h-[50vh]">
        <div className="max-w-fit max-h-screen mx-auto justify-center items-center w-full h-full">
          <Card>
            <DataUsageChart />
          </Card>
        </div>
      </div>
      <div className=" h-[50vh]">
        <div
          className=" max-w-fit mx-auto my-auto flex justify-center items-center"
        >
          <Card>
            <PieChart />
            <ServerStats />
          </Card>
        </div>
      </div> --> */}
        {/* <!-- row -->
    <!-- <div className="col-span-2  h-[50vh]">
        <div className="max-w-fit max-h-screen mx-auto justify-center items-center w-full h-full">
          <Card>
            <BandwidthChart />
          </Card>
        </div>
      </div>
      <div className=" h-[50vh]">
        <div className="max-w-fit max-h-screen mx-auto justify-center items-center w-full h-full">
          <Card>
            <StackedChart />
          </Card>
        </div>
      </div> --> */}
      </div>

      {/* <!-- <Card>
    <PieChart/>
  </Card> -->
  <!-- <Card>
    <PieChart />
  </Card/> --> */}
    </div>
  );
}
