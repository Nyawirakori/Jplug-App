import React, { useEffect, useState } from "react";

function Booking({ county, service, time, date }) {
  const [providers, setProviders] = useState([]);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  useEffect(() => {
    if (county && service) {
      fetch("http://localhost:4000/serviceProviders")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (p) => p.county === county && p.service === service
          );
          setProviders(filtered);
        })
        .catch((err) => console.error("Error fetching providers:", err));
    } else {
      setProviders([]);
    }
  }, [county, service]);

  const handleBook = async (provider) => {
    const bookingTime = new Date().toLocaleString();

    if (!time || !date) {
      setBookingConfirmation({
        error: "Please select both a time slot and a date.",
      });
      return;
    }

    setBookingConfirmation({
      providerName: provider.name,
      phone: provider.phone,
      county: provider.county,
      timeSlot: time,
      bookingDate: date,
      bookingTime: bookingTime,
    });

    try {
      await fetch("http://localhost:4000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          providerName: provider.name,
          county: provider.county,
          timeSlot: time,
          bookingDate: date,
          bookingTime: bookingTime,
        }),
      });
    } catch (error) {
      console.error(error);
      setBookingConfirmation({
        error: "Failed to complete booking. Please try again.",
      });
    }
  };

  return (
    <div>
      {county && service ? (
        providers.length > 0 ? (
          <div className="row">
            {providers.map((provider) => (
              <div key={provider.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{provider.name}</h5>
                    <p className="card-text">
                      <strong>Phone:</strong> {provider.phone}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBook(provider)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>
            No {service.toLowerCase()}s available in {county}.
          </p>
        )
      ) : null}

      {bookingConfirmation && (
        <div className="mt-4">
          {bookingConfirmation.error ? (
            <div className="alert alert-danger">
              {bookingConfirmation.error}
            </div>
          ) : (
            <div className="card border-success">
              <div className="card-body">
                <h5 className="card-title text-success">Booking Confirmed!</h5>
                <p className="card-text">
                  <strong>Provider:</strong> {bookingConfirmation.providerName}
                  <br />
                  <strong>Phone:</strong> {bookingConfirmation.phone}
                  <br />
                  <strong>County:</strong> {bookingConfirmation.county}
                  <br />
                  <strong>Date:</strong> {bookingConfirmation.bookingDate}
                  <br />
                  <strong>Time Slot:</strong> {bookingConfirmation.timeSlot}
                  <br />
                  <strong>Booked At:</strong> {bookingConfirmation.bookingTime}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Booking;
