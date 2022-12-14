export default function CarouselRight() {
  return (
    <>
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
    </>
  );
}
