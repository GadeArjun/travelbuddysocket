const mongoose = require("mongoose");

exports.mongooseConnection = async (url) => {
  try {
    const client = await mongoose.connect(url);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};

