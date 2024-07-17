"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config/db.js
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load env vars
async function connectDB() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGO_URI, {
        // useNewUrlParser: true, // To avoid deprecation warning
        // useUnifiedTopology: true, // To avoid deprecation warning
        });
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
}
// Export the function
module.exports = connectDB;
