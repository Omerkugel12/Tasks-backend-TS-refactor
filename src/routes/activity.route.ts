import { Router } from "express";
import {
  getActivities,
  postActivity,
} from "../controllers/activity.controller";

const router = Router();

router.get("/", getActivities);
router.post("/", postActivity);

export default router;
