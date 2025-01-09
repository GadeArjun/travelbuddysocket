import { useParams } from "react-router-dom";
import "./PlaceInfo.css";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

function PlaceInfo() {
  //
  const { id } = useParams();
  const { searchPlaces, nearestPlaces, position } =
    useContext(UserContext);
  const explorePlace =
    searchPlaces.find((place) => +place.id === +id) ||
    nearestPlaces.find((place) => +place.id === +id);

  function haversine(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    lat1 = lat1 * (Math.PI / 180);
    lon1 = lon1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    lon2 = lon2 * (Math.PI / 180);

    // Difference in coordinates
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    // Haversine formula
    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radius of the Earth in kilometers
    const R = 6371.0;

    // Calculate the distance
    const distance = R * c;

    return `${distance.toFixed(2)} km`;
  }
  const distance = haversine(
    position?.lat,
    position?.lon,
    explorePlace?.coordinates?.lat,
    explorePlace?.coordinates?.lng
  );
  // console.log({ distance });

  return (
    <div className="place-info-container">
      <h1 className="place-info-heading">Place Information</h1>
      <div className="place-info-content">
        <h2 className="place-name">{explorePlace?.name}</h2>
        <p className="place-address">{explorePlace?.address}</p>
        <p className="place-distance">Distance from you: {distance}</p>
      </div>
    </div>
  );
}

export default PlaceInfo;
