import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import UserContext from "../../Context/UserContext";
import MultiplePlaceCard from "../MultiplePlaceCard/MultiplePlaceCard";

function Search() {
  const [placeName, setPlaceName] = useState("");
  const { searchPlaces, setSearchPlaces } = useContext(UserContext);
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const handlePlaceNameInput = (event) => {
    setPlaceName(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      // console.log("Enter key pressed!");
      // console.log(
      //   `https://nominatim.openstreetmap.org/search?city=${placeName.replace(
      //     " ",
      //     "-"
      //   )}&format=json`
      // );

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${placeName}&format=json`
      );

      const lat = response?.data[0]?.lat;
      const lon = response?.data[0]?.lon;

      // console.log({ lat, lon });
      setPosition({ lat, lon });
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getNearestPlaces(position) {
      try {
        if (position.lon && position.lat) {
          const response = await axios.get(
            `https://api.geoapify.com/v2/places?lat=${position.lat}&lon=${position.lon}&categories=tourism&apiKey=c1ccc4f7a40347439f5a0dcee6568964`
          );

          const places = response.data.features.map((feature, index) => ({
            id: index + 1,
            name: feature.properties.name || feature.properties.address_line1,
            address:
              feature.properties.address_line1 +
                " " +
                feature.properties.address_line2 || "No address available",
            coordinates: {
              lat: feature.geometry.coordinates[1],
              lng: feature.geometry.coordinates[0],
            },
          }));

          setSearchPlaces(places);
        }
      } catch (err) {
        console.log({ err });
      }
    }
    // console.log({ position });

    getNearestPlaces(position);
  }, [position, setSearchPlaces]);
  // console.log({ nearestPlaces });

  return (
    <div className="search-bar-main-container">
      <div className="search-bar">
        <input
          type="text"
          name="place-name"
          id="place-name"
          onInput={handlePlaceNameInput}
          onKeyDown={handleKeyDown}
          value={placeName}
        />
        <span className="search-icon">🔍</span>
      </div>
      <MultiplePlaceCard
        title={"Search Result..."}
        places={searchPlaces}
        position={position}
        loading={loading}
      />
    </div>
  );
}

export default Search;
