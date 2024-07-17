import { Schema } from "mongoose";

export interface IActivity {
  _id: string;
  operation: string;
  description: string;
  user: Schema.Types.ObjectId;
}
