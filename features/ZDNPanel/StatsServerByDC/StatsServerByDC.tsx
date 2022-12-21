import dynamic from "next/dynamic";
// import PieChart from "../../components/Chart/PieChart";
const DirectedTree = dynamic(() => import("../../../components/Chart/DirectedTree"), {
  ssr: false,
});

export default function ServerByDC() {
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
  return (
    <div className="box-container h-full">
      <DirectedTree />
    </div>
  );
}
