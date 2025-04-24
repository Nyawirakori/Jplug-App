import React, { useState, useEffect } from "react";
import Booking from "./Booking";
import NavBar from "./NavBar";
import Steps from "./Steps";

function BookingPage() {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [showProviders, setShowProviders] = useState(false);

  const services = ["Plumber", "Electrician"];

  useEffect(() => {
    fetchCounties();
    if (selectedCounty && selectedService) setShowProviders(true);
    else setShowProviders(false);
  }, [selectedCounty, selectedService]);

  function fetchCounties() {
    fetch("http://localhost:4000/counties")
      .then((res) => res.json())
      .then((data) => setCounties(data))
      .catch((error) => {
        console.error("Error fetching counties:", error);
      });
  }

  const resetAll = () => {
    setSelectedCounty("");
    setSelectedService("");
    setShowProviders(false);
  };

  return (
    <>
    <NavBar />
    <div className="container">
     <Steps />
      <h2 className="text-center mb-4">Book a Service Provider</h2>

      {/* Booking Filter Section */}
      <div className="card shadow-sm p-4">
        <div className="row align-items-end">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Service Type</label>
            <div className="d-flex gap-2">
              {services.map((s) => (
                <button
                  key={s}
                  className={`btn ${
                    selectedService === s
                      ? "btn-success"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => setSelectedService(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label fw-bold">Select County</label>
            <select
              className="form-select"
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
            >
              <option value="">Select</option>
              {counties.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={resetAll}
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

  
      {showProviders && (
        <Booking county={selectedCounty} service={selectedService} />
      )}
    </div>
    </>
  );
}

export default BookingPage;
