import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Fetch cards
const fetchCards = async () => {
  const response = await axios.get('http://localhost:5001/api/cards');

  if(!response.status === 200) {
    throw new Error('Failed to fetch cards');
  }
  return response.data;
};

export const useCards = () => {
  const queryClient = useQueryClient();

  // Fetch all cards
  const cardsQuery = useQuery({
    queryKey: ['cards'], //Unique identifier for the query
    queryFn: fetchCards, // Function to fetch data
   });

  // Add a new card
  const addCardMutation = useMutation({
    mutationFn: async (newCard) => {
      const response = await axios.post('http://localhost:5001/api/cards', newCard);
      
      if(!response.status === 201){
        throw new Error('Failed to create a new card');
      }
      return response.data;
    },
    
      onSuccess: () => {
        queryClient.invalidateQueries(['cards']); // Refresh card data after adding
      },
    }
  );

  // Delete a card
  const deleteCardMutation = useMutation({
    mutationFn: async (id) => {
        try{
      const response = await axios.delete(`http://localhost:5001/api/cards/${id}`);
      console.log("Delete response:", response.data);
        }catch (error){
            console.error("Error deleting card", error.response?.data || error.message);
            throw error;
        }
    },
     
    
      onSuccess: () => {
        queryClient.invalidateQueries(['cards']); // Refresh card data after deleting
      },
    }
  );

  return {
    cardsQuery,
    addCardMutation,
    deleteCardMutation,
  };
};
