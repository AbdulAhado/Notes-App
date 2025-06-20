// import mongoose from "mongoose";
//  const connectToDb = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/noteApp')
//     } catch (error) {
//         console.error("Error connecting to the database:", error);
//         throw error; // Re-throw the error to be handled by the caller
        
//     }
//  }

//  export default connectToDb

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    throw error;
  }
};

export default connectToDb;
