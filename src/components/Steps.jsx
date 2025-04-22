export default function Steps() {
  return (
    <div className="container my-4 text-center">
      <h3 className="mb-5">Three simple steps to get your service</h3>
      <div className="d-flex justify-content-around">
        <div className="flex-fill mx-3">
          <img
            src="https://img.icons8.com/color/96/search--v1.png"
            alt="Select County"
            className="mb-3"
          />
          <h5>Select Your County</h5>
          <p>Choose your county to find service providers near you</p>
        </div>
        <div className="flex-fill mx-3">
          <img
            src="https://img.icons8.com/color/96/worker-beard.png"
            alt="Choose Provider"
            className="mb-3"
          />
          <h5>Choose a Provider</h5>
          <p>
            Choose between an electrician and plumber
          </p>
        </div>
        <div className="flex-fill mx-3">
          <img
            src="https://img.icons8.com/color/96/calendar--v1.png"
            alt="Book"
            className="mb-3"
          />
          <h5>Book</h5> 
          <p>Book your appointment</p>
        </div>
      </div>
    </div>
  );
}
