"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getArchives, createArchive, deleteArchive, } = require("../controllers/archive.controller");
router.get("/", getArchives);
router.post("/", createArchive);
router.delete("/:archiveId", deleteArchive);
module.exports = router;
