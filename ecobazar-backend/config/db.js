import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns"; 

dotenv.config(); 

dns.setServers(["8.8.8.8", "8.8.4.4"]); 

const mongoURI = process.env.MONGO_URI 

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000 
})
  .then(() => {
    console.log("MongoDB Cloud Connection Success !!! 🚀🔥");
  })
  .catch((err) => {
    console.log("Database Connection Error !!! ❌", err.message);
  });

const db = mongoose.connection;
export default db;
