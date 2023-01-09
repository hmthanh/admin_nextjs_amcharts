import dynamic from "next/dynamic";
import Card from "../../components/Card/Card";
import PaddingBox from "../../components/PaddingBox";
import ZCDNLogo from "../Logo";
import TotalSummary from "../ZDNPanel/TotalSummary/TotalSummary";
import AlertPanel from "./AlertPanel/AlertPanel";

const GlobeMap = dynamic(() => import("../../components/Globe/GlobeMap"), {
  ssr: false,
});

const BarChart = dynamic(() => import("../../components/Chart/BarChart"), {
  ssr: false,
});

const DDosByMonthChart = dynamic(() => import("./DDosByMonthChart/DDosByMonthChart"), {
  ssr: false,
});

const DDosByDayChart = dynamic(() => import("./DDosByDayChart/DDosByDayChart"), {
  ssr: false,
});

export default function ZShieldPanel() {
  return (
    <div className="flex flex-col w-full h-screen dark">
      {/* <!-- Header --> */}
      {/* <div className="flex flex-row w-full">
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
      </div> */}
      {/* <!-- Header --> */}
      {/* <GlobeMap /> */}
      {/* <!-- h-screen --> */}
      <div className="grid grid-cols-9 gap-4 px-4 pb-4 w-full h-full">
        {/* <!-- COL 1--> */}
        <div className="col-span-3 ">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 w-full h-full">
              <DDosByMonthChart />
            </div>
            <div className="flex-1 w-full h-full">
              <DDosByDayChart />
              {/* <AppByDC /> */}
            </div>
          </div>
        </div>

        {/* <!-- COL 2 --> */}
        <div className="col-span-4">
          <div className="flex content-center h-full">
            <GlobeMap />
          </div>
        </div>

        {/* <!-- COL 3 --> */}
        <div className="col-span-2">
          <div className="w-full h-full">
            <AlertPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
