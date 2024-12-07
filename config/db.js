import mongoose from "mongoose";

export async function config() {
  const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
}
