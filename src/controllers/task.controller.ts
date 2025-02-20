import Task from "../models/task.model";
import User from "../models/user.model";
import { Response } from "express";
import { CustomRequest } from "../types/userTypes";

// export const getTasksCount = async (req: CustomRequest, res: Response) => {
//   try {
//     const count = await Task.countDocuments({ user: req.userId });
//     res.status(200).json(count);
//   } catch (error: any) {
//     console.log(error);
//     console.log(
//       "task.controller, getTasksCount. Error while getting tasks count"
//     );
//     res.status(500).json({ mesagge: error.mesagge });
//   }
// };

export async function getTasks(req: CustomRequest, res: Response) {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);
  } catch (error: any) {
    console.log(error);
    console.log("task.controller, getTasks. Error while getting tasks");
    res.status(500).json({ mesagge: error.mesagge });
  }
}

export async function getTaskById(req: CustomRequest, res: Response) {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ _id: taskId, user: req.userId });
    if (!task) {
      console.log(
        `task.controller, getTaskById. task not found with id: ${taskId}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(task);
  } catch (error: any) {
    console.log(error);
    if (error.name === "CastError") {
      console.log(
        `task.controller, getTaskById. task not found with id: ${taskId}`
      );
      return res.status(404).json({ message: "Task not found" });
    }
    console.log(
      `task.controller, getTaskById. Error while getting task with id: ${taskId}`,
      error.name
    );
    res.status(500).json({ message: error.mesagge });
  }
}

export async function deleteTask(req: CustomRequest, res: Response) {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: req.userId,
    });

    if (!deletedTask) {
      console.log(
        `tasks-controller, deleteTask. Task not found with id: ${taskId}`
      );
      return res.status(404).json({ message: "Task not found" });
    }
    // Update the user's task array
    await User.findByIdAndUpdate(req.userId, {
      $pull: { tasks: taskId }, // Remove the task id from the user's products array
    });
    res.status(200).json({ message: "Task deleted" });
  } catch (err: any) {
    console.log(err);
    console.log(
      `tasks-controller, deleteTask. Error while deleting task with id: ${taskId}`
    );
    res.status(500).json({ message: err.message });
  }
}

export async function createTask(req: CustomRequest, res: Response) {
  try {
    const newTask = new Task(req.body);
    newTask.user = req.userId;
    const savedTask = await newTask.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { tasks: savedTask._id },
    });

    res.status(201).json(savedTask);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      console.log(`task.controller, addTask. ${error.mesage} `);
      return res.status(400).json({ message: error.mesage });
    }
    console.log(error);
    console.log("task.controller, addTask. Error while creating Task");
    res.status(500).json({ message: "Server error while creating Task" });
  }
}

export async function editTask(req: CustomRequest, res: Response) {
  const { taskId } = req.params;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: taskId,
        user: req.userId,
      },
      req.body,

      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTask) {
      console.log(
        `tasks-controller, editTask. Task not found with id: ${taskId}`
      );
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error: any) {
    console.log(error);
    if (error.name === "ValidationError") {
      console.log(`task.controller, editTask. ${error.mesage} `);
      return res.status(400).json({ message: error.mesage });
    }
    console.log("task.controller, editTask. Error while editing Task");
    res.status(500).json({ message: "Server error while editing Task" });
  }
}
