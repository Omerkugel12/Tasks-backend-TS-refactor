import mongoose, { model, Schema } from "mongoose";
import { IActivity } from "../types/activityTypes";

const activitySchema = new Schema<IActivity>(
  {
    operation: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Activity = model<IActivity>("Activity", activitySchema);
export default Activity;
