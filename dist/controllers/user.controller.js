"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
const user_model_1 = __importDefault(require("../models/user.model"));
async function getUserById(req, res) {
    try {
        const user = await user_model_1.default.findById(req.userId);
        if (!user) {
            console.log("user.controller, getUserById. User not found with id: ${req.userId}");
            return res.status(404).json({ message: "user not found" });
        }
        const { password, ...userWithoutPassword } = user._doc;
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        if (error.name === "CastError") {
            console.log(`user.controller, getUserById. User not found with id: ${req.userId}`);
            return res.status(404).json({ message: "User not found" });
        }
        console.log(`user.controller, getUserById. Error while getting user with id: ${req.userId}`, error.name);
        res.status(500).json({ message: error.mesagge });
    }
}
