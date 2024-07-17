"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArchives = getArchives;
exports.createArchive = createArchive;
exports.deleteArchive = deleteArchive;
const archive_model_1 = __importDefault(require("../models/archive.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
async function getArchives(req, res) {
    try {
        const archives = await archive_model_1.default.find({ user: req.userId });
        res.status(200).json(archives);
    }
    catch (error) {
        console.log(error);
        console.log("archive.controller, getArchive. Error while getting archives");
        res.status(500).json({ mesagge: error.mesagge });
    }
}
async function createArchive(req, res) {
    try {
        const newArchive = new archive_model_1.default(req.body);
        newArchive.user = req.userId;
        const savedArchive = await newArchive.save();
        await user_model_1.default.findByIdAndUpdate(req.userId, {
            $push: { archive: savedArchive._id },
        });
        res.status(201).json(savedArchive);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            console.log(`archive.controller, createArchive. ${error.mesage} `);
            return res.status(400).json({ message: error.mesage });
        }
        console.log(error);
        console.log("archive.controller, createArchive. Error while creating archive");
        res.status(500).json({ message: "Server error while creating Task" });
    }
}
async function deleteArchive(req, res) {
    const { archiveId } = req.params;
    try {
        const deletedArchive = await archive_model_1.default.findOneAndDelete({
            _id: archiveId,
            user: req.userId,
        });
        if (!deleteArchive) {
            console.log(`archive.controller, deleteArchive. archive not found with id: ${archiveId}`);
            return res.status(404).json({ message: "Archive not found" });
        }
        await user_model_1.default.findByIdAndUpdate(req.userId, {
            $pull: { archive: archiveId }, // Remove the task id from the user's products array
        });
        res.status(200).json({ message: "Archive deleted" });
    }
    catch (error) {
        console.log(error);
        console.log(`archive.controller, deleteArchive. Error while deleting archive with id: ${archiveId}`);
        res.status(500).json({ message: error.message });
    }
}
