import React, { useContext, useEffect, useState } from "react";
import "./FlightInfo.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";

function FlightInfo() {
  const [flightInfo, setFlightInfo] = useState([]);

  const { id } = useParams();
  const { nearestPlaces, position } = useContext(UserContext);
  const explorePlace = nearestPlaces.find((place) => +place.id === +id);

  const explorePlacePosition = {
    lat: explorePlace?.coordinates?.lat,
    lon: explorePlace?.coordinates?.lng,
  };
  useEffect(() => {
    async function getFlightDetails() {
      try {
        console.log("satasdagfm afnvcjlxn");
        const depature_responce = await axios.get(
          `https://api.aviationstack.com/v1/airports?access_key=8a5b0833c1bdb0869ae5898aa5a11369&lat=${position.lat}&lon=${position.lon}`
        );

        const dept_iata_code = depature_responce?.data[0]?.iata_code;

        const arrival_responce = await axios.get(
          `https://api.aviationstack.com/v1/airports?access_key=8a5b0833c1bdb0869ae5898aa5a11369&lat=${explorePlacePosition.lat}&lon=${explorePlacePosition.lon}`
        );
        const arr_iata_code = arrival_responce?.data[0]?.iata_code;

        const flight_details_responce = await axios.get(
          `https://api.aviationstack.com/v1/flights?access_key=8a5b0833c1bdb0869ae5898aa5a11369&dep_iata=${dept_iata_code}&arr_iata=${arr_iata_code}`
        );

        console.log({ flight_details_responce });
        setFlightInfo(flight_details_responce.data);
      } catch (err) {
        console.log(err);
      }
    }

    getFlightDetails();
  }, [position, explorePlacePosition]);
  console.log({ flightInfo });

  return <div>Flight Info</div>;
}

export default FlightInfo;
