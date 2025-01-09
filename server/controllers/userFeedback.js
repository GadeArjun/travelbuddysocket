const { Feedback } = require("../models/userFeedback");

exports.createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
