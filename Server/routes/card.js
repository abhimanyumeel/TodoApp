const express = require('express');
const { createCard, getCards, deleteCard } = require('../controllers/cardController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:id', deleteCard);

module.exports = router;
