import React, { useEffect, useState } from "react";

function Booking({ county, service }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (county && service) {
      fetch("http://localhost:4000/serviceProviders") //fetching service providers
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

  //POST Request - Adding bookings to db.json
  const handleBook = async (provider) => {
    const bookingTime = new Date().toLocaleString();
    alert(
      `Booked ${provider.name} (${provider.phone}) in ${provider.county} at ${bookingTime}`
    );
    try {
      return await fetch("http://localhost:4000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          providerName: provider.name,
          county: provider.county,
          time: bookingTime,
        })
      });
    } catch (error) {
      throw new Error(error);
    } finally {
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
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Booking;
