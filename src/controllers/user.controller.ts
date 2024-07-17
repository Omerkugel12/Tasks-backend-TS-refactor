import User from "../models/user.model";
import { Response } from "express";
import { CustomRequest } from "../types/userTypes";

export async function getUserById(req: CustomRequest, res: Response) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      console.log(
        "user.controller, getUserById. User not found with id: ${req.userId}"
      );
      return res.status(404).json({ message: "user not found" });
    }

    const { password, ...userWithoutPassword } = user._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error: any) {
    if (error.name === "CastError") {
      console.log(
        `user.controller, getUserById. User not found with id: ${req.userId}`
      );
      return res.status(404).json({ message: "User not found" });
    }
    console.log(
      `user.controller, getUserById. Error while getting user with id: ${req.userId}`,
      error.name
    );
    res.status(500).json({ message: error.mesagge });
  }
}
