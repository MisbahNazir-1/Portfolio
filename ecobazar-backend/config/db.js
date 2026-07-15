import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI is missing in environment variables!");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB Cloud Connection Success !!! 🚀🔥");
    return mongoose.connection;
  } catch (err) {
    console.error("Database Connection Error !!! ❌", err.message);
    throw err;
  }
};

export default connectDB;
