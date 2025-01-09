import React from "react";
import "./SinglePlaceCard.css";
import { Link } from "react-router-dom";

function SinglePlaceCard({ place, position }) {
  return (
    <div className="place-card">
      {/* <img src={place.image} alt={place.name} className="place-card__image" /> */}
      <div className="place-card__info">
        <h2 className="place-card__name">{place.name}</h2>
        <p className="place-card__description">
          <strong>Address : </strong> {place.address}
        </p>
        <Link to={`/explore-place-more/${place.id}`}>
          <button className="place-card__button">Explore More</button>
        </Link>
      </div>
    </div>
  );
}

export default SinglePlaceCard;
