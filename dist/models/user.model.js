"use strict";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
    archive: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Archive", default: [] },
    ],
    activity: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Activity", default: [] },
    ],
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
module.exports = User;
