import { ObjectId } from "mongoose";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  body: string;
  todoList: ITodo[];
  isPinned: boolean;
  user: ObjectId | string | undefined;
}
export interface ITodo {
  _id: string;
  title: string;
  isComplete: boolean;
}
