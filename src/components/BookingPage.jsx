import React, { useState, useEffect } from "react";
import Booking from "./Booking";
import NavBar from "./NavBar";
import SampleProviders from "./SampleProviders";

function BookingPage() {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const services = ["Plumber", "Electrician"];
  const timeSlots = ["8-10 AM", "11-1 PM", "2-4 PM"];

  useEffect(() => {
    fetch("http://localhost:4000/counties")
      .then((res) => res.json())
      .then((data) => setCounties(data))
      .catch((err) => console.error("Error fetching counties:", err));
  }, []);

  return (
    <div className="container my-4">
      <NavBar />
      <SampleProviders />
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

        <div className="col-md-6">
          <label>Choose Time Slot:</label>
          <select
            className="form-control"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label>Choose Date:</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      <Booking
        county={selectedCounty}
        service={selectedService}
        time={selectedTime}
        date={selectedDate}
      />
    </div>
  );
}

export default BookingPage;
