import React, { useContext, useEffect, useState } from "react";
import "./TripForm.css";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import axios from "axios";

function TripForm({ hotelNames, setFillForm }) {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const { id } = useParams();
  const { nearestPlaces, searchPlaces, setUserData, userData } =
    useContext(UserContext);
  const explorePlace =
    searchPlaces.find((place) => +place.id === +id) ||
    nearestPlaces.find((place) => +place.id === +id);
  const navigate = useNavigate();

  const [bookTrip, setBookTrip] = useState(false);

  function handelBookTripBtn() {
    setBookTrip(!bookTrip);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // console.log({ userData });

      const tripFormData = {
        user_email: userData?.user_email,
        user_name: userData?.user_name,
        destination: explorePlace?.name,
        hotel_name: selectedHotel,
        no_of_guests: guests,
        check_in_date: checkIn,
        check_out_date: checkOut,
      };
      // console.log({ tripFormData });

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/trip`,
        { body: tripFormData }
      );

      alert(response.data.message);
      setBookTrip(false);
      setFillForm(true);
      alert(
        `Your trip to ${explorePlace?.name} is booked ${
          selectedHotel ? "at" : ""
        } ${selectedHotel} for ${guests} guest(s) from ${checkIn} to ${checkOut}.`
      );
    } catch (error) {
      alert("Error while creating trip");
      console.log(error);
    }
  };

  useEffect(() => {
    async function authenticatingUser(token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (err) {
        // console.log({ err });
      }
    }

    const token = localStorage.getItem("travel_buddy_token");

    if (!token || token === undefined || token === null) {
      navigate("/signup");
    } else {
      authenticatingUser(token);
    }
  }, [navigate, setUserData]);
  // console.log({ userData });

  return (
    <>
      <div className="button-container">
        <button className="responsive-button" onClick={handelBookTripBtn}>
          Book Your Trip
        </button>
      </div>
      <div
        className={`${
          bookTrip ? "trip-form-container" : "trip-form-container-dissable"
        }`}
      >
        <h2 className="form-title">Trip Booking</h2>
        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              value={explorePlace?.name}
              readOnly
              className="input-field"
            />
          </div>

          {hotelNames.length !== 0 ? (
            <div className="form-group">
              <label htmlFor="hotel">Select Hotel:</label>
              <select
                id="hotel"
                className="input-field"
                value={selectedHotel}
                onChange={(e) => setSelectedHotel(e.target.value)}
                required
              >
                <option value="">Select Hotel</option>
                {hotelNames?.map((hotel, index) => (
                  <option key={index} value={hotel.tags.name}>
                    {hotel.tags.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}

          <div className="form-group">
            <label htmlFor="guests">Number of Guests:</label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="check-in">Check-in Date:</label>
            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="check-out">Check-out Date:</label>
            <input
              type="date"
              id="check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Book Trip
          </button>
        </form>
      </div>
    </>
  );
}

export default TripForm;
