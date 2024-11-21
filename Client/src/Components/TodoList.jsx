import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

const TodoList = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");

  // Add a new activity
  const addActivity = () => {
    if (newActivity.trim() !== "") {
      setActivities([...activities, { text: newActivity, completed: false }]);
      setNewActivity("");
    }
  };

  // Toggle activity completion
  const toggleCompletion = (index) => {
    const updatedActivities = activities.map((activity, idx) =>
      idx === index ? { ...activity, completed: !activity.completed } : activity
    );
    setActivities(updatedActivities);
  };

  // Delete an activity
  const deleteActivity = (index) => {
    const updatedActivities = activities.filter((_, idx) => idx !== index);
    setActivities(updatedActivities);
  };

  return (
    <div>
      {/* Activities List */}
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-700 p-2 rounded-md"
          >
            <div className="flex items-center">
              <span
                className={`${
                  activity.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {activity.text}
              </span>

              <input
                type="checkbox"
                className="mr-2 ml-4"
                checked={activity.completed}
                onChange={() => toggleCompletion(index)}
              />
            </div>
            <button
              className="opacity-0 hover:opacity-100 text-red-500 text-sm hover:underline"
              onClick={() => deleteActivity(index)}
            >
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>

      {/* Add Activity Section */}
      <div className="mt-2 flex items-center">
        <input
          type="text"
          className="bg-transparent text-white rounded-l-md p-2 w-full focus:outline-none"
          placeholder="new activity.."
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm p-2 rounded-r-md"
          onClick={addActivity}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;
