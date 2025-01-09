const express = require("express");
const { getAllTrips, createTrip } = require("../controllers/userTripData");

const tripRouter = express.Router();

exports.tripRouter = tripRouter
  .post("/trip", createTrip)
  .get("/trips", getAllTrips);
