import dynamic from "next/dynamic";
import Card from "../../components/Card/Card";
import PaddingBox from "../../components/PaddingBox";

const BarChart = dynamic(() => import("../../components/Chart/BarChart"), {
  ssr: false
});

const GlobeChart = dynamic(() => import("../../components/Globe/GlobeMap"), {
  ssr: false
});

export default function ZShieldPanel() {
  return (
    <div className="block w-full h-screen bg-state-500">
      {/* <div className="col-span-1">
        <div className="grid grid-cols-2 w-full">
          <div>
            <BarChart />
          </div>
        </div>
      </div> */}

      {/* <!-- h-screen --> */}
      <div className="grid grid-cols-4 w-full h-full">
        {/* <!-- ROW 1--> */}
        <div className="col-span-1">
          <div className="grid grid-rows gap-4 py-3 w-full">
            <div className=" w-full">
              <PaddingBox>
                <Card>{/* <ServerByDC /> */}</Card>
              </PaddingBox>
            </div>
            <div className="w-full">
              <PaddingBox>
                <Card>{/* <AppByDC /> */}</Card>
              </PaddingBox>
            </div>
          </div>
        </div>

        {/* <!-- ROW 2 --> */}
        <div className="col-span-2">
          <div className=" max-w-fit mx-auto my-auto flex justify-center items-center m-height">
            <PaddingBox>
              <Card>
                <GlobeChart />
              </Card>
            </PaddingBox>
          </div>
        </div>

        {/* <!-- ROW 3 --> */}
        <div className="col-span-1">
          <div className="max-w-fit max-h-screen mx-auto justify-center items-center">
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
