import { Schema } from "mongoose";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  body: string;
  todoList: ITodo[];
  isPinned: boolean;
  user: Schema.Types.ObjectId;
}
export interface ITodo {
  _id: string;
  title: string;
  isComplete: boolean;
}
