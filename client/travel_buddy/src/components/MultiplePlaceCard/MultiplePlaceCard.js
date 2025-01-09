import React from "react";
import "./MultiplePlaceCard.css";
import SinglePlaceCard from "../SinglePlaceCard/SinglePlaceCard";

function MultiplePlaceCard({ loading, title, places, position }) {
  return (
    <div className="multiple-place-card-container">
      <h1 className="nearest-places">
        <span>{title}</span>
      </h1>
      <div className="multiple-place-cards">
        {!loading ? (
          places.length !== 0 ? (
            places.map((place, index) => {
              return (
                <SinglePlaceCard
                  position={position}
                  place={place}
                  key={index}
                />
              );
            })
          ) : (
            <center className="location-suggetion">
              <h1>
                <span>Places are loading...</span>
              </h1>
            </center>
          )
        ) : (
          <center>
            <h1 style={{ color: "orangered" }}>Loading...</h1>
          </center>
        )}
      </div>
    </div>
  );
}

export default MultiplePlaceCard;
