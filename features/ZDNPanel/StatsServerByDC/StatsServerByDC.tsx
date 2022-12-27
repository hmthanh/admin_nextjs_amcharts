import dynamic from "next/dynamic";

import ErrorPanel from "../../../components/ErrorPanel/ErrorPanel";
import LoadingPanel from "../../../components/LoadingPanel/LoadingPanel";
import { useStatsServer } from "../VietnamMap/useStatsServer";

const DirectedTree = dynamic(() => import("../../../components/Chart/DirectedTree"), {
  ssr: false,
});

export default function ServerByDC() {
  const { data, error, isLoading } = useStatsServer();

  // const [chartData, setChartData] = useState({
  //   labels: ["QTSC", "ZALO-VNPT HCM", "ZALO-VNPT HN", "VNPT-HN", "FPT-HCM", "FPT-HN", "VIETTEL-HCM", "Sing - OVH"],
  //   datasets: [
  //     {
  //       label: "Servers",
  //       data: [11, 30, 16, 8, 25, 9, 10, 2],
  //       borderColor: "#212D63",
  //       backgroundColor: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#676767"]
  //     }
  //   ]
  // });

  // useEffect(() => {
  //   setChartData({
  //     labels: ["QTSC", "ZALO-VNPT HCM", "ZALO-VNPT HN", "VNPT-HN", "FPT-HCM", "FPT-HN", "VIETTEL-HCM", "Sing - OVH"],
  //     datasets: [
  //       {
  //         label: "Servers",
  //         data: [11, 30, 16, 8, 25, 9, 10, 2],
  //         borderColor: "#212D63",
  //         backgroundColor: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#676767"]
  //       }
  //     ]
  //   });
  // }, []);
  if (error)
    return (
      <div className="p-6 box-container half-reponsive-panel">
        <ErrorPanel />
      </div>
    );
  if (isLoading)
    return (
      <div className="p-6 box-container half-reponsive-panel">
        <LoadingPanel />
      </div>
    );
  if (data) {
  }
  return (
    <div className="box-container h-full">
      <DirectedTree />
    </div>
  );
}
