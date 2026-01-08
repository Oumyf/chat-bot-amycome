const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Routes messages
router.post('/', messageController.createMessage);
router.get('/conversation/:conversationId', messageController.getConversationMessages);
router.put('/:id/read', messageController.markAsRead);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
