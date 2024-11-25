import React from "react";
import TodoCard from "./TodoCard";
import { IoCreate } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { useCards } from '../useCards';

const CardContainer = () => {
  const { cardsQuery, addCardMutation, deleteCardMutation } = useCards();
  const { data: cards, isLoading, isError, error } = cardsQuery;

  // Add a new card
  const handleAddCard = () => {
    addCardMutation.mutate({ title: 'New Card', description: '' });
  };

  // Delete a card
  const handleDeleteCard = (id) => {
    deleteCardMutation.mutate(id);
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (isError) return <div>Error loading cards: {error.message}</div>;

  return (
    <div className="min-h-screen bg-zinc-800 text-white items-center p-4">
      <h1 className="text-3xl text-zinc-400 text-center font-bold mb-8">Todo</h1>
      <button
        className="bg-slate-300 hover:bg-slate-400 hover:shadow-lg text-lg text-black p-4 rounded-full mb-4 opacity-75"
        onClick={handleAddCard}
      >
     <IoAddCircle />
      </button>
      <div className="flex flex-wrap justify-start">
        {cards.map((card) => (
          <TodoCard key={card.id} id={card.id} title={card.title} onDelete={() => handleDeleteCard(card.id)} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
