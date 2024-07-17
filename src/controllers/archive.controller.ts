import Archive from "../models/archive.model";
import User from "../models/user.model";
import { Response } from "express";
import { CustomRequest } from "../types/userTypes";

export async function getArchives(req: CustomRequest, res: Response) {
  try {
    const archives = await Archive.find({ user: req.userId });
    res.status(200).json(archives);
  } catch (error: any) {
    console.log(error);
    console.log("archive.controller, getArchive. Error while getting archives");
    res.status(500).json({ mesagge: error.mesagge });
  }
}
export async function createArchive(req: CustomRequest, res: Response) {
  try {
    const newArchive = new Archive(req.body);
    newArchive.user = req.userId;
    const savedArchive = await newArchive.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { archive: savedArchive._id },
    });

    res.status(201).json(savedArchive);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      console.log(`archive.controller, createArchive. ${error.mesage} `);
      return res.status(400).json({ message: error.mesage });
    }
    console.log(error);
    console.log(
      "archive.controller, createArchive. Error while creating archive"
    );
    res.status(500).json({ message: "Server error while creating Task" });
  }
}
export async function deleteArchive(req: CustomRequest, res: Response) {
  const { archiveId } = req.params;
  try {
    const deletedArchive = await Archive.findOneAndDelete({
      _id: archiveId,
      user: req.userId,
    });

    if (!deleteArchive) {
      console.log(
        `archive.controller, deleteArchive. archive not found with id: ${archiveId}`
      );
      return res.status(404).json({ message: "Archive not found" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { archive: archiveId }, // Remove the task id from the user's products array
    });
    res.status(200).json({ message: "Archive deleted" });
  } catch (error: any) {
    console.log(error);
    console.log(
      `archive.controller, deleteArchive. Error while deleting archive with id: ${archiveId}`
    );
    res.status(500).json({ message: error.message });
  }
}
