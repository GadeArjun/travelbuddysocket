import React, { useEffect, useState } from "react";
import "./ExploreMore.css";
import PlaceInfo from "../../components/PlaceInfo/PlaceInfo";
import HotelsInfo from "../../components/HotelsInfo/HotelsInfo";
// import FlightInfo from "../../components/AirFlightInfo/FlightInfo";
import TripForm from "../../components/TripForm/TripForm";
import ChatWithOther from "../../components/ChatWithOther/ChatWithOther";

function ExploreMore() {
  const [hotelNames, setHotelNames] = useState([]);
  const [fillForm, setFillForm] = useState(false);
  // console.log({ hotelNames });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="explore-more-places-container">
      <PlaceInfo />

      <HotelsInfo setHotelNames={setHotelNames} />
      {/* <FlightInfo /> */}
      <ChatWithOther fillForm={fillForm} />

      <TripForm setFillForm={setFillForm} hotelNames={hotelNames} />
    </div>
  );
}

export default ExploreMore;
