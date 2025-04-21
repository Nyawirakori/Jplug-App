import "./App.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Booking from "./components/Booking";
import React, { useState, useEffect } from "react";
import Steps from "./components/Steps";

export default function App() {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const services = ["Plumber", "Electrician"];

  //fetching counties from db.json
  useEffect(() => {
    fetch("http://localhost:4000/counties")
      .then((res) => res.json())
      .then((data) => setCounties(data))
      .catch((err) => console.error("Error fetching counties:", err));
  }, []);
  return (
    <div className="container my-4">
      <NavBar />
      <Header />
      <Steps />
      <h2 className="text-center mb-4">Book a Service Provider</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <label>Choose County:</label>
          <select
            className="form-control"
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
          >
            <option value="">Select County</option>
            {counties.map((county) => (
              <option key={county.id} value={county.name}>
                {county.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label>Choose Service:</label>
          <select
            className="form-control"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select Service</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Booking county={selectedCounty} service={selectedService} />
    </div>
  );
}

