const { TripData } = require("../models/userTripData");

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    console.log(req.body);
    const trip_details = req.body;
    console.log(trip_details.body);

    const newTrip = new TripData(trip_details.body);
    await newTrip.save();
    console.log({ newTrip });

    res
      .status(201)
      .json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    console.log({ error });

    res.status(400).json({ error: error.message });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await TripData.find({});
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ err_msg: "Error while getting trip data" });
  }
};
