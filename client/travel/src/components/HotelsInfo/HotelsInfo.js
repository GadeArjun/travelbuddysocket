import React, { useContext, useEffect, useState } from "react";
import "./HotelsInfo.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";

function HotelsInfo({ setHotelNames }) {
  const [hotelsInfo, setHoteslInfo] = useState([]);
  const [updatedHotelsInfo, setUpdatedHoteslInfo] = useState([]);
  const { id } = useParams();
  const { nearestPlaces  , searchPlaces} = useContext(UserContext);
  const explorePlace =
    searchPlaces.find((place) => +place.id === +id) ||
    nearestPlaces.find((place) => +place.id === +id);

  const explorePlacePosition = {
    lat: explorePlace?.coordinates?.lat,
    lon: explorePlace?.coordinates?.lng,
  };

  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["tourism"="hotel"](around:3000,${explorePlacePosition?.lat},${explorePlacePosition?.lon});way["tourism"="hotel"](around:3000,${explorePlacePosition?.lat},${explorePlacePosition?.lon});relation["tourism"="hotel"](around:3000,${explorePlacePosition?.lat},${explorePlacePosition?.lon}););out body;`;

  useEffect(() => {
    async function getHoteslInfo() {
      try {
        const responce = await axios.get(overpassUrl);
        setHoteslInfo(responce.data.elements);
        // console.log(responce.data.elements);
        // console.log({ hotelsInfo });

        const filteredHotels = hotelsInfo.filter(
          (hotel) => Object.keys(hotel.tags).length >= 6
        );
        setHotelNames(filteredHotels);
        setUpdatedHoteslInfo(filteredHotels);
        // console.log({ updatedHotelsInfo });
      } catch (err) {
        console.log({err});
      }
    }

    getHoteslInfo();
  }, [hotelsInfo, setHotelNames, overpassUrl, updatedHotelsInfo]);

  // console.log({ updatedHotelsInfo });

  return (
    <>
      <div className="hotel-info-heading">
        <h1>HOTEL INFORMATION</h1>
      </div>
      <div className="container">
        {updatedHotelsInfo.length !== 0 ? (
          updatedHotelsInfo.map((hotel, index) => {
            const tags = hotel.tags;
            return (
              <div className="card" key={index}>
                <h2>{tags.name}</h2>
                <p>
                  <strong>Address : </strong>
                  {tags["addr:housenumber"]},{tags["addr:street"]},
                  {tags["addr:city"]} ,{tags["addr:postcode"]}
                </p>
                <p>
                  <strong>Phone : </strong>
                  <a href={`tel:${tags.phone ? tags.phone : ""}`}>
                    {tags.phone ? tags.phone : "Not Avilable"}{" "}
                  </a>
                </p>
                <p>
                  <strong>Email : </strong>
                  <a href={`mailto:${tags.email ? tags.email : ""}`}>
                    {tags.email ? tags.email : "Not Available"}
                  </a>
                </p>
                <p>
                  <strong>Website : </strong>
                  <a
                    href={tags.website ? tags.website : ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tags.website ? tags.website : "Not Available"}
                  </a>
                </p>
                <p>
                  <strong>Rooms : </strong> {tags.rooms ? tags.rooms : " --- "}
                </p>

                <p>
                  <strong>Social : </strong>{" "}
                  <a
                    href={
                      tags["contact:facebook"] ? tags["contact:facebook"] : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                  ,
                  <a
                    href={
                      tags["contact:instagram"] ? tags["contact:instagram"] : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  ,{" "}
                  <a
                    href={
                      tags["contact:twitter"] ? tags["contact:twitter"] : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </p>
              </div>
            );
          })
        ) : (
          <h2 className="na">Not Available !</h2>
        )}
      </div>
    </>
  );
}

export default HotelsInfo;

// https://overpass-api.de/api/interpreter?data=[out:json];(node["tourism"="hotel"](around:1000,18.51392,73.8525184);way["tourism"="hotel"](around:1000,18.51392,73.8525184);relation["tourism"="hotel"](around:1000,18.51392,73.8525184););out body;

// const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["tourism"="hotel"](around:1000,${lat},${lon});way["tourism"="hotel"](around:1000,${lat},${lon});relation["tourism"="hotel"](around:1000,${lat},${lon}););out body;`;
