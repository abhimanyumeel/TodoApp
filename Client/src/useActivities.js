import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


// Fetch activities for a specific card by cardId
const fetchActivities = async (cardId) => {
  const response = await axios.get(`http://localhost:5001/api/activities/card/${cardId}`);
  return response.data;
};
  
// Add a new activity to the card
const createActivity = async ({ text, cardId }) => {
    const response = await axios.post('http://localhost:5001/api/activities', {text,cardId});
    return response.data;
};

// Toggle activity completion
const toggleActivityCompletion = async (activityId) => {
    const response = await axios.put(`http://localhost:5001/api/activities/${activityId}/toggle`);
    return response.data;
  };
  
  // Delete an activity
  const deleteActivity = async ({ activityId, cardId }) => {
    await axios.delete(`http://localhost:5001/api/activities/${activityId}/${cardId}`);
  };
  
  const useActivities = (cardId) => {
    const queryClient = useQueryClient();
  
    // Fetch activities for the specific card
    const { data: activities, error, isLoading } = useQuery({
        queryKey: ['activities', cardId],
        queryFn: () => fetchActivities(cardId),
        enabled: !!cardId, // Ensure this query only runs if cardId exists
      });

      console.log('Activities fetched:', activities);
      console.log('Error:', error);
      console.log('Is loading:', isLoading);
  
    // Mutation to add a new activity
    const { mutate: addActivity } = useMutation({
        mutationFn: createActivity,
        onSuccess: () => {
          // Invalidate and refetch activities for the current card
          queryClient.invalidateQueries(['activities', cardId]);
        },
      });
  
    // Mutation to toggle activity completion
    const { mutate: toggleCompletion } = useMutation({
        mutationFn: toggleActivityCompletion,
        onSuccess: () => {
          queryClient.invalidateQueries(['activities', cardId]);
        },
      });
  
    // Mutation to delete an activity
    const { mutate: deleteActivityMutation } = useMutation({
        mutationFn: deleteActivity,
        onSuccess: () => {
          queryClient.invalidateQueries(['activities', cardId]);
        },
      });
  
    return {
      activities,
      isLoading,
      error,
      addActivity,
      toggleCompletion,
      deleteActivity: deleteActivityMutation,
    };
  };
  
  export default useActivities;