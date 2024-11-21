import React, { useState } from "react";
import TodoCard from "./TodoCard";
import { IoCreate } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";

const CardContainer = () => {
  const [cards, setCards] = useState([]);

  // Add a new card
  const addCard = () => {
    setCards([...cards, { id: Date.now() }]);
  };

  // Delete a card
  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-800 text-white items-center p-4">
      <h1 className="text-3xl text-zinc-400 text-center font-bold mb-8">Todo</h1>
      <button
        className="bg-slate-300 hover:bg-slate-400 hover:shadow-lg text-lg text-black p-4 rounded-full mb-4 opacity-75"
        onClick={addCard}
      >
     <IoAddCircle />
      </button>
      <div className="flex flex-wrap justify-start">
        {cards.map((card) => (
          <TodoCard key={card.id} id={card.id} onDelete={deleteCard} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
