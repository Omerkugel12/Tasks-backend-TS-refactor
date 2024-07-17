const express = require("express");
const router = express.Router();
const {
  getArchives,
  createArchive,
  deleteArchive,
} = require("../controllers/archive.controller");

router.get("/", getArchives);
router.post("/", createArchive);
router.delete("/:archiveId", deleteArchive);

module.exports = router;
