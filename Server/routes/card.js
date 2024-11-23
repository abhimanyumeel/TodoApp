const express = require('express');
const { createCard, getCards, deleteCard } = require('../controllers/cardController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createCard);
router.get('/', authenticate, getCards);
router.delete('/:id', authenticate, deleteCard);

module.exports = router;
