const { Activity } = require("../models"); // Import the Activity model

// Get all activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: require("../models").Card, // If you want to include associated Card details
        attributes: ['id', 'title'], // Modify this to include the fields you want from Card
      }
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve activities", error });
  }
};

// Get all activities for a specific card by cardId
exports.getActivitiesByCardId = async (req, res) => {
  const { cardId } = req.params;

  try {
    const activities = await Activity.findAll({
      where: { cardId }, // Filter by cardId
    });

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: "No activities found for this card" });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve activities by cardId", error });
  }
};

// Create a new activity
exports.createActivity = async (req, res) => {
  const { text, cardId } = req.body; // Expecting text and cardId in the request body

  if (!text || !cardId) {
    return res.status(400).json({ message: "Activity text and cardId are required" });
  }

  try {
    const newActivity = await Activity.create({
      text,
      completed: false, // Default to false
      cardId,
    });
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: "Failed to create activity", error });
  }
};

// Toggle completion status of an activity
exports.toggleActivityCompletion = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Toggle the completed status
    activity.completed = !activity.completed;
    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle activity completion", error });
  }
};

// Delete an activity by activityId and cardId
exports.deleteActivity = async (req, res) => {
  const { id, cardId } = req.params;

  try {
    const activity = await Activity.findOne({
      where: { id, cardId }, // Ensure both activityId and cardId match
    });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found in the specified card" });
    }

    // Delete the activity
    await activity.destroy();
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete activity", error });
  }
};
