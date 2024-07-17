"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archive_controller_1 = require("../controllers/archive.controller");
const router = (0, express_1.Router)();
router.get("/", archive_controller_1.getArchives);
router.post("/", archive_controller_1.createArchive);
router.delete("/:archiveId", archive_controller_1.deleteArchive);
exports.default = router;
