import TimeSeriesChart from "./TimeSeriesChart";

export default function BandwidthChart() {
  return (
    <div
      className="p-6 box-container half-reponsive-panel"
    >
      <TimeSeriesChart />
    </div>
  );
}

// h-[calc(calc(100vh-2rem)/2)]