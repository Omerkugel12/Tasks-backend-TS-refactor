"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.deleteTask = deleteTask;
exports.createTask = createTask;
exports.editTask = editTask;
const task_model_1 = __importDefault(require("../models/task.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
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
async function getTasks(req, res) {
    try {
        const tasks = await task_model_1.default.find({ user: req.userId });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.log(error);
        console.log("task.controller, getTasks. Error while getting tasks");
        res.status(500).json({ mesagge: error.mesagge });
    }
}
async function getTaskById(req, res) {
    const { taskId } = req.params;
    try {
        const task = await task_model_1.default.findOne({ _id: taskId, user: req.userId });
        if (!task) {
            console.log(`task.controller, getTaskById. task not found with id: ${taskId}`);
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            console.log(`task.controller, getTaskById. task not found with id: ${taskId}`);
            return res.status(404).json({ message: "Task not found" });
        }
        console.log(`task.controller, getTaskById. Error while getting task with id: ${taskId}`, error.name);
        res.status(500).json({ message: error.mesagge });
    }
}
async function deleteTask(req, res) {
    const { taskId } = req.params;
    try {
        const deletedTask = await task_model_1.default.findOneAndDelete({
            _id: taskId,
            user: req.userId,
        });
        if (!deletedTask) {
            console.log(`tasks-controller, deleteTask. Task not found with id: ${taskId}`);
            return res.status(404).json({ message: "Task not found" });
        }
        // Update the user's task array
        await user_model_1.default.findByIdAndUpdate(req.userId, {
            $pull: { tasks: taskId }, // Remove the task id from the user's products array
        });
        res.status(200).json({ message: "Task deleted" });
    }
    catch (err) {
        console.log(err);
        console.log(`tasks-controller, deleteTask. Error while deleting task with id: ${taskId}`);
        res.status(500).json({ message: err.message });
    }
}
async function createTask(req, res) {
    try {
        const newTask = new task_model_1.default(req.body);
        newTask.user = req.userId;
        const savedTask = await newTask.save();
        await user_model_1.default.findByIdAndUpdate(req.userId, {
            $push: { tasks: savedTask._id },
        });
        res.status(201).json(savedTask);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            console.log(`task.controller, addTask. ${error.mesage} `);
            return res.status(400).json({ message: error.mesage });
        }
        console.log(error);
        console.log("task.controller, addTask. Error while creating Task");
        res.status(500).json({ message: "Server error while creating Task" });
    }
}
async function editTask(req, res) {
    const { taskId } = req.params;
    try {
        const updatedTask = await task_model_1.default.findOneAndUpdate({
            _id: taskId,
            user: req.userId,
        }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) {
            console.log(`tasks-controller, editTask. Task not found with id: ${taskId}`);
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            console.log(`task.controller, editTask. ${error.mesage} `);
            return res.status(400).json({ message: error.mesage });
        }
        console.log("task.controller, editTask. Error while editing Task");
        res.status(500).json({ message: "Server error while editing Task" });
    }
}
