import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useCards } from "../useCards";

const TodoCard = ({ id, title: initialTitle}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [isUpdating, setIsUpdating] = useState(false);


  // Access deletCardMutation from useCards
  const { deleteCardMutation } = useCards();


  // Function to update the card title
  const handleUpdateTitle = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:5001/api/cards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }
    } catch (error) {
      console.error("Error updating card:", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Auto-update title when it changes
  useEffect(() => {
    if (title !== initialTitle) {
      const timeout = setTimeout(handleUpdateTitle, 500); // Debounce API call
      return () => clearTimeout(timeout); // Cleanup previous timeout on re-render
    }
  }, [title, initialTitle]); // Dependencies

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 max-w-md w-fit m-2">
      {/* Card Title */}
      <input
        type="text"
        className="bg-transparent border-b border-gray-500 text-md w-full focus:outline-none mb-4"
        placeholder="Title.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isUpdating}
      />

      {/* Todo List */}
      <TodoList cardId={id}/>

      {/* Delete Card Button */}

      <button
        className="bg-red-600 hover:bg-red-700 text-white justify-items-center py-2 px-4 rounded-md mt-4 w-full"
        onClick={() => deleteCardMutation.mutate(id)}
      >
        <RiDeleteBin5Fill />
      </button>
 
    </div>
  );
};

export default TodoCard;
