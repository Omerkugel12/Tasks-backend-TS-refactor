import { ObjectId } from "mongoose";

export interface IActivity {
  _id: string;
  operation: string;
  description: string;
  user: ObjectId | string | undefined;
}
