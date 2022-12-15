import dynamic from "next/dynamic";
import Head from "next/head";
import CarouselLeft from "../components/CarouselControl/CarouselLeft";
import CarouselRight from "../components/CarouselControl/CarouselRight";
import ZDNPanel from "../features/ZDNPanel/ZDNPanel";
import ZShieldPanel from "../features/ZShieldPanel/ZShieldPanel";
import styles from "../styles/Home.module.css";

const GlobeMap = dynamic(() => import("../components/Globe/GlobeMap"), {
  ssr: false
});


// import TimeSeriesChart from "../components/Chart/TimeSeriesChart";
// import DataUsageChart from "../features/ZDNPanel/DataUsageChart";
/* <DirectedTree /> */
/* <BarChart />
        <StackedColumnChart />
        <StackedBarChart />
        <GlobeMap /> */
/* <TimeSeriesChart /> */
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ZCDN Landing Page</title>
        <meta name="description" content="ZCDN Landing Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dark dark:bg-slate-900">
        <div
          id="carouselExampleIndicators"  
          className="carousel slide relative
    text-base antialiased font-normal text-left leading-default dark:bg-slate-950 dark:bg-slate-900 dark:text-white"
          data-bs-ride="carousel"
        >
          {/* <CarouselLeft /> */}
          <div className="carousel-inner relative w-full overflow-hidden">
            <div className="carousel-item active relative float-left w-full">
              <div className="block w-full h-screen">
                <ZDNPanel />
              </div>
            </div>
            {/* <div className="carousel-item active relative float-left w-full h-screen">
              <div className="block w-full h-screen">
                <div className="panel-full">
                <ZShieldPanel />
                  </div>
              </div>
            </div> */}
            {/* <div className="carousel-item float-left w-full h-screen">
              <div className="block w-full h-screen">
                <div className="panel-full">
                  <DNSPanel />
                </div>
              </div>
            </div> */}
          </div>
          {/* <CarouselRight /> */}
        </div>
      </div>
    </div>
  );
}
