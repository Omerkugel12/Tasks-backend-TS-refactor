"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_model_1 = __importDefault(require("../models/activity.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
async function getActivities(req, res) {
    try {
        const activities = await activity_model_1.default.find({ user: req.userId });
        res.status(200).json(activities);
    }
    catch (error) {
        console.log(error);
        console.log("activity.controller, getActivities. Error while getting activities");
        res.status(500).json({ mesagge: error.mesagge });
    }
}
async function postActivity(req, res) {
    try {
        const newActivity = new activity_model_1.default(req.body);
        newActivity.user = req.userId;
        const savedActivity = await newActivity.save();
        await user_model_1.default.findByIdAndUpdate(req.userId, {
            $push: { activity: savedActivity._id },
        });
        res.status(200).json(savedActivity);
    }
    catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            console.log(`activity.controller, postActivity. ${error.mesage} `);
            return res.status(400).json({ message: error.mesage });
        }
        console.log(error);
        console.log("activity.controller, postActivity. Error while creating activity");
        res.status(500).json({ message: "Server error while creating Task" });
    }
}
module.exports = { getActivities, postActivity };
