import { Router } from "express";
import {
  // getTasksCount,
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  editTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);
// router.get("/count", getTasksCount);
router.get("/:taskId", getTaskById);
router.delete("/:taskId", deleteTask);
router.post("/", createTask);
router.patch("/:taskId", editTask);

export default router;
