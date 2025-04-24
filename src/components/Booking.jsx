import React, { useEffect, useState } from "react";

export default function Booking({ county, service }) {
  const [providers, setProviders] = useState([]);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [activeBookingCardId, setActiveBookingCardId] = useState(null);
  const [cardSpecificData, setCardSpecificData] = useState({});
  const [minDate] = useState(new Date().toISOString().split("T")[0]);
  const [bookingError, setBookingError] = useState(null);
  const [showProviderCards, setShowProviderCards] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/serviceProviders")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) => p.county === county && p.service === service
        );
        setProviders(filtered);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, [county, service]);

  const handleDateChange = (providerId, date) => {
    setCardSpecificData((prev) => ({
      ...prev,
      [providerId]: { ...prev[providerId], date },
    }));
  };

  const handleTimeChange = (providerId, time) => {
    setCardSpecificData((prev) => ({
      ...prev,
      [providerId]: { ...prev[providerId], time },
    }));
  };

  const handleBook = (provider) => {
    const selected = cardSpecificData[provider.id];
    if (!selected?.date || !selected?.time) {
      setBookingError("Please select a valid date and time.");
      return;
    }
    setBookingError(null);

    const bookingData = {
      providerId: provider.id,
      providerName: provider.name,
      service: provider.service,
      county: county,
      bookingDate: selected.date,
      timeSlot: selected.time,
      bookingTime: new Date().toLocaleString(),
    };

    fetch("http://localhost:4000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((confirmation) => {
        setSelectedBookingDetails(confirmation);
        setShowProviderCards(false);
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
        setBookingError(error.message);
      });
  };

  const handleCancelBooking = (booking) => {
    fetch(`http://localhost:4000/bookings/${booking.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSelectedBookingDetails(null);
        setShowProviderCards(true);
      })
      .catch((err) => console.error("Error cancelling booking:", err));
  };

  const timeSlots = ["8-10 AM", "11-1 PM", "2-4 PM"];

  return (
    <div className="mt-4">
      {bookingError && <div className="alert alert-danger">{bookingError}</div>}

      {showProviderCards && (
        <>
          <h4 className="mb-3">
            Available {service}s in {county}
          </h4>

          <div className="row">
            {providers.map((provider) => (
              <div className="col-md-4 mb-4" key={provider.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5>{provider.name}</h5>
                      <p>
                        <strong>Service:</strong> {provider.service}
                      </p>
                      <p>
                        <strong>Charge:</strong> KES {provider.price}
                      </p>
                      <p>
                        <strong>Phone:</strong> {provider.phone}
                      </p>
                    </div>

                    {activeBookingCardId === provider.id ? (
                      <div className="mb-2">
                        <input
                          type="date"
                          className="form-control mb-2"
                          value={cardSpecificData[provider.id]?.date || ""}
                          min={minDate}
                          onChange={(e) =>
                            handleDateChange(provider.id, e.target.value)
                          }
                        />
                        <select
                          className="form-select"
                          value={cardSpecificData[provider.id]?.time || ""}
                          onChange={(e) =>
                            handleTimeChange(provider.id, e.target.value)
                          }
                        >
                          <option value="">Select Time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => handleBook(provider)}
                        >
                          Confirm Booking
                        </button>
                        <button
                          className="btn btn-secondary mt-2 ms-2"
                          onClick={() => setActiveBookingCardId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-outline-primary mt-2"
                        onClick={() => setActiveBookingCardId(provider.id)}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedBookingDetails && (
        <div className="card shadow-sm p-3 mt-4">
          <h3>Booking Confirmation</h3>
          <p>
            <strong>Service Provider:</strong>{" "}
            {selectedBookingDetails.providerName}
          </p>
          <p>
            <strong>Service Type:</strong> {selectedBookingDetails.service}
          </p>
          <p>
            <strong>Charge:</strong> KES{" "}
            {
              providers.find((p) => p.id === selectedBookingDetails.providerId)
                ?.price
            }
          </p>
          <p>
            <strong>Date:</strong> {selectedBookingDetails.bookingDate}
          </p>
          <p>
            <strong>Time Slot:</strong> {selectedBookingDetails.timeSlot}
          </p>
          <button
            className="btn btn-danger"
            onClick={() => handleCancelBooking(selectedBookingDetails)}
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
}
