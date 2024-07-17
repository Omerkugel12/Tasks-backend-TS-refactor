import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../types/userTypes";

const userSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
