const express = require("express");
const router = express.Router();
const {
  getActivities,
  postActivity,
} = require("../controllers/activity.controller");

router.get("/", getActivities);
router.post("/", postActivity);

module.exports = router;
