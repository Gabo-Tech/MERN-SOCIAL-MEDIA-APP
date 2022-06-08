const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const cluster = "<clusterName>";
const authSource = "<authSource>";
const authMechanism = "<authMechanism>";
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const uri = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected succesfully.");
  } catch (error) {
    console.error(error);
    throw new Error("Unable to reach database...");
  }
};

const client = new MongoClient(uri);
async function dbConnection1() {
  try {
    await client.connect();
    const database = client.db("<dbName>");
    const ratings = database.collection("<collName>");
    const cursor = ratings.find();
    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
};
// run().catch(console.dir);
module.exports = {
  dbConnection,
};

