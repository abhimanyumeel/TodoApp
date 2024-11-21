import React, { useState } from "react";
import TodoList from "./TodoList";

const TodoCard = ({ id, onDelete }) => {
  const [title, setTitle] = useState("");

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4 max-w-md w-full m-2">
      {/* Card Title */}
      <input
        type="text"
        className="bg-transparent border-b border-gray-500 text-lg w-full focus:outline-none mb-4"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Todo List */}
      <TodoList />

      {/* Delete Card Button */}
      <button
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-4 w-full"
        onClick={() => onDelete(id)}
      >
        Delete Card
      </button>
    </div>
  );
};

export default TodoCard;
