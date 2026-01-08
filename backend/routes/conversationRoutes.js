const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Routes conversations
router.post('/', conversationController.createConversation);
router.get('/user/:userId', conversationController.getUserConversations);
router.get('/:id', conversationController.getConversationById);
router.put('/:id', conversationController.updateConversation);
router.delete('/:id', conversationController.deleteConversation);

module.exports = router;
