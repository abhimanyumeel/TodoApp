import React, { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useActivities from "../useActivities"; // Adjust the import path if necessary

const TodoList = ({ cardId }) => {
  const [newActivity, setNewActivity] = useState("");  // State for the new activity
  const { activities, isLoading, error, addActivity, toggleCompletion, deleteActivity } = useActivities(cardId);


  console.log("Card ID is passed to useActivities:", cardId);
  // Handle adding a new activity
  const handleAddActivity = () => {
    if (newActivity.trim() !== "") {
      addActivity({ text: newActivity, cardId });  // Call the addActivity mutation
      setNewActivity("");  // Clear input field
    }
  };

  // Handle activity completion toggle
  const handleToggleCompletion = (activityId) => {
    toggleCompletion(activityId);  // Call the toggleCompletion mutation
  };

  // Handle activity deletion
  const handleDeleteActivity = (activityId) => {
    deleteActivity({ activityId, cardId });  // Call the deleteActivity mutation
  };

  // Show loading or error message if needed
  if (isLoading) {
    return <div>Loading activities...</div>;
  }

  if(error?.response?.status === 404) {
    return <div>No activities found for this card</div>
  }

  if (error) {
    return <div>Error loading activities: {error.message}</div>;
  }

  return (
    <div>
      {/* Activities List */}
      <div className="space-y-2">
        {activities?.map((activity) => (
          <div
            key={activity.id}
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
                onChange={() => handleToggleCompletion(activity.id)}  // Toggle activity completion
              />
            </div>
            <button
              className="opacity-0 hover:opacity-100 text-red-500 text-sm hover:underline"
              onClick={() => handleDeleteActivity(activity.id)}  // Delete activity
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
          onChange={(e) => setNewActivity(e.target.value)}  // Update activity input state
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm p-2 rounded-r-md"
          onClick={handleAddActivity}  // Add new activity
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;
