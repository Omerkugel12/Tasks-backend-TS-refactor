import { Router } from "express";
import {
  getArchives,
  createArchive,
  deleteArchive,
} from "../controllers/archive.controller";

const router = Router();

router.get("/", getArchives);
router.post("/", createArchive);
router.delete("/:archiveId", deleteArchive);

export default router;
