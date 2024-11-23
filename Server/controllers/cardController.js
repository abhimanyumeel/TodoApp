const { Card, Activity } = require('../models');

exports.createCard = async (req, res) => {
  const { title } = req.body;
  try {
    const card = await Card.create({ title, userId: req.user.id });
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: 'Error creating card' });
  }
};

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.findAll({ where: { userId: req.user.id }, include: [Activity] });
    res.json(cards);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching cards' });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    await Card.destroy({ where: { id: req.params.id, userId: req.user.id } });
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting card' });
  }
};
