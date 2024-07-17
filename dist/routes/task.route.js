"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getTasksCount, getTasks, getTaskById, deleteTask, createTask, editTask, } = require("../controllers/task.controller");
router.get("/", getTasks);
router.get("/count", getTasksCount);
router.get("/:taskId", getTaskById);
router.delete("/:taskId", deleteTask);
router.post("/", createTask);
router.patch("/:taskId", editTask);
module.exports = router;
