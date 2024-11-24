const { Card, Activity } = require('../models');

const createCard = async (req, res) => {
  const { title } = req.body;

  //Validate input
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required'});
  }

  try {
    // create a new card without associating it with a user
    const card = await Card.create({ title });
    res.status(201).json({ message: 'Card created successfully', card});
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Error creating card' });
  }
};

const getCards = async (req, res) => {
  try {
    // Fetch all cards, including associated activities
    const cards = await Card.findAll({ 
      include: [{
        model: Activity,
        as: 'activities', // Ensure this alias matches your association
        attributes: ['id', 'text', 'completed'],
    },
  ],
 });
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Error fetching cards' });
  }
};

const deleteCard = async (req, res) => {
  try {

    const card = await Card.findOne({ where: { id: req.params.id }});
    
    if(!card){
        return res.status(404).json({ error: 'Card not found'});
    }
    
    // Delete the card
    await Card.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Card deleted  successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Error deleting card' });
  }
};

module.exports = {
    createCard,
    getCards,
    deleteCard,
};
