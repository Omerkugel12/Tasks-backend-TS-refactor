const express = require("express");
const router = express.Router();

const {
  getTasksCount,
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  editTask,
} = require("../controllers/task.controller");

router.get("/", getTasks);
router.get("/count", getTasksCount);
router.get("/:taskId", getTaskById);
router.delete("/:taskId", deleteTask);
router.post("/", createTask);
router.patch("/:taskId", editTask);

module.exports = router;
