const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5, // Assuming a 1-5 star rating system
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

exports.Feedback = mongoose.model("Feedback", FeedbackSchema);
