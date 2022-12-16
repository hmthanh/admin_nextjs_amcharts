import dynamic from "next/dynamic";
import Card from "../../components/Card/Card";
import PaddingBox from "../../components/PaddingBox";
import ZCDNLogo from "../Logo";
import TotalSummary from "../ZDNPanel/TotalSummary/TotalSummary";

const BarChart = dynamic(() => import("../../components/Chart/BarChart"), {
  ssr: false
});

const GlobeChart = dynamic(() => import("../../components/Globe/GlobeMap"), {
  ssr: false
});

const DDosByMonthChart = dynamic(() => import("./DDosByMonthChart/DDosByMonthChart"), {
  ssr: false
});

const DDosByDayChart = dynamic(() => import("./DDosByDayChart/DDosByDayChart"), {
  ssr: false
});

export default function ZShieldPanel() {
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

      {/* <!-- h-screen --> */}
      <div className="grid grid-cols-4 gap-4 px-4 pb-4 w-full h-full">
        {/* <!-- ROW 1--> */}
        <div className="col-span-1 ">
          <div className="grid grid-rows gap-4 w-full">
            <div className=" w-full">
              <DDosByMonthChart />
            </div>
            <div className="w-full">
              <DDosByDayChart />
              {/* <AppByDC /> */}
            </div>
          </div>
        </div>

        {/* <!-- ROW 2 --> */}
        <div className="col-span-2 bg-yellow-500">
          <div className=" max-w-fit mx-auto my-auto flex justify-center items-center m-height">
            <PaddingBox>
              <Card>
                {/* <GlobeChart /> */}
                </Card>
            </PaddingBox>
          </div>
        </div>

        {/* <!-- ROW 3 --> */}
        <div className="col-span-1 bg-blue-500">
          <div className="max-w-fit max-h-screen mx-auto justify-center items-center">
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
