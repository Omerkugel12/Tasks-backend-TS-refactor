// config/db.js
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load env vars

async function connectDB() {
  try {
    await connect(process.env.MONGO_URI as string, {
      // useNewUrlParser: true, // To avoid deprecation warning
      // useUnifiedTopology: true, // To avoid deprecation warning
    });
    console.log("MongoDB connected");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
}

// Export the function
module.exports = connectDB;
