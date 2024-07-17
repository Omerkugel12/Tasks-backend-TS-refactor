import express from "express";
const router = express.Router();
const {
  getActivities,
  postActivity,
} = require("../controllers/activity.controller");

router.get("/", getActivities);
router.post("/", postActivity);

module.exports = router;
