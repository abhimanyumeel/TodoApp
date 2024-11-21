import React, { useState } from "react";
import TodoList from "./TodoList";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const TodoCard = ({ id, onDelete }) => {
  const [title, setTitle] = useState("");

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 max-w-md w-fit m-2">
      {/* Card Title */}
      <input
        type="text"
        className="bg-transparent border-b border-gray-500 text-md w-full focus:outline-none mb-4"
        placeholder="Title.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Todo List */}
      <TodoList />

      {/* Delete Card Button */}

      <button
        className="bg-red-600 hover:bg-red-700 text-white justify-items-center py-2 px-4 rounded-md mt-4 w-full"
        onClick={() => onDelete(id)}
      >
        <RiDeleteBin5Fill />
      </button>
 
    </div>
  );
};

export default TodoCard;
