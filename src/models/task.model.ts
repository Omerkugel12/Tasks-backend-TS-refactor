import mongoose, { model, Schema } from "mongoose";
import { ITask, ITodo } from "../types/taskTypes";

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  todoList: [todoSchema],
  isPinned: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
