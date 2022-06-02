const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected succesfully.");
  } catch (error) {
    console.error(error);
    throw new Error("Unable to reach database...");
  }
};

module.exports = {
  dbConnection,
};