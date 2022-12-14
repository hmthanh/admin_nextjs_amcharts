export default function Home() {
  return (
    <div className="dark dark:bg-slate-900">
      <div
        id="carouselExampleIndicators"
        className="carousel slide relative
    text-base antialiased font-normal text-left leading-default dark:bg-slate-950 dark:bg-slate-900 dark:text-white"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />
        </div>
        <div className="carousel-inner relative w-full overflow-hidden">
          {/* <!-- <div className="carousel-item active relative float-left w-full">
        <div className="block w-full h-screen">
          <TrafficPanel />
        </div>
      </div> --> */}
          <div className="carousel-item active relative float-left w-full h-screen">
            <div className="block w-full h-screen">
              <div className="panel-full">{/* <DdosPanel /> */}</div>
            </div>
          </div>
          {/* <!-- <div className="carousel-item float-left w-full h-screen">
        <div className="block w-full h-screen">
          <div className="panel-full">
            <DNSPanel />
          </div>
        </div>
      </div> --> */}
        </div>

        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
