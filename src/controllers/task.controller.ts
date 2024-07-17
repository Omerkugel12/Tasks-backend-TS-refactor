const Task = require("../models/task.model");
const User = require("../models/user.model");

async function getTasksCount(req, res) {
  try {
    const count = await Task.countDocuments({ user: req.userId });
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    console.log(
      "task.controller, getTasksCount. Error while getting tasks count"
    );
    res.status(500).json({ mesagge: error.mesagge });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    console.log(
      "task.controller, getTasksCount. Error while getting tasks count"
    );
    res.status(500).json({ mesagge: error.mesagge });
  }
}

async function getTaskById(req, res) {
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
  } catch (error) {
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

async function deleteTask(req, res) {
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
  } catch (err) {
    console.log(err);
    console.log(
      `tasks-controller, deleteTask. Error while deleting task with id: ${taskId}`
    );
    res.status(500).json({ message: err.message });
  }
}

async function createTask(req, res) {
  try {
    const newTask = new Task(req.body);
    newTask.user = req.userId;
    const savedTask = await newTask.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { tasks: savedTask._id },
    });

    res.status(201).json(savedTask);
  } catch (error) {
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
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      console.log(`task.controller, editTask. ${error.mesage} `);
      return res.status(400).json({ message: error.mesage });
    }
    console.log("task.controller, editTask. Error while editing Task");
    res.status(500).json({ message: "Server error while editing Task" });
  }
}

module.exports = {
  getTasksCount,
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  editTask,
};
