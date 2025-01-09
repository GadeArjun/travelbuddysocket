import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

function UserContextProvider({ children }) {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [nearestPlaces, setNearestPlaces] = useState([]);
  const [searchPlaces, setSearchPlaces] = useState([]);
  const [userData, setUserData] = useState(null);
  // user daata

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
        console.log({ err });
      }
    }
    const token = localStorage.getItem("travel_buddy_token");
    if (!(!token || token === undefined || token === null)) {
      authenticatingUser(token);
    }
  }, [setUserData]);

  function getLocation() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          // console.log(position.coords.latitude);
          setPosition({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        });
      } else {
        console.log("Turn on location for better suggetions");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getLocation();
  }, []);

  // gett nearest places

  useEffect(() => {
    async function getNearestPlaces(position) {
      try {
        if (position.lon && position.lat) {
          console.log("Start");

          const response = await axios.get(
            ` https://api.geoapify.com/v2/places?lat=${position.lat}&lon=${position.lon}&categories=tourism&apiKey=c1ccc4f7a40347439f5a0dcee6568964`
          );

          console.log("end", response.data);

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

          setNearestPlaces(places);
        } else {
          if (userData) {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/search?city=${userData?.city}&format=json`
            );
            const position = { lat: response.data.lat, lon: response.data.lon };
            getNearestPlaces(position);
          }
        }
      } catch (err) {
        console.log({ err });
      }
    }
    getNearestPlaces(position);
  }, [position, userData]);

  return (
    <UserContext.Provider
      value={{
        position,
        setPosition,
        nearestPlaces,
        setNearestPlaces,
        userData,
        setUserData,
        searchPlaces,
        setSearchPlaces,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
