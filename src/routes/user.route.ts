import { Router } from "express";
import { getUserById } from "../controllers/user.controller";

const router = Router();

router.get("/", getUserById);

export default router;
