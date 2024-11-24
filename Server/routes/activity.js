const express = require("express");
const router = express.Router();
const {
  getActivities,
  getActivitiesByCardId,
  createActivity,
  toggleActivityCompletion,
  deleteActivity,
} = require("../controllers/activityController");

// Get all activities
router.get("/", getActivities);

// Get all activities for a specific card by cardId
router.get("/card/:cardId", getActivitiesByCardId);

// Create a new activity
router.post("/", createActivity);

// Toggle the completion status of an activity
router.put("/:id/toggle", toggleActivityCompletion);

// Delete an activity by ID
router.delete("/:id/:cardId", deleteActivity);

module.exports = router;
