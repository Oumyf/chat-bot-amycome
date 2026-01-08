const express = require('express');
const router = express.Router();
const directMessageController = require('../controllers/directMessageController');

// Routes messages directs
router.post('/', directMessageController.envoyerMessage);
router.get('/', directMessageController.getAllMessages);
router.get('/user/:userId', directMessageController.getMessagesUtilisateur);
router.get('/conversation/:userId1/:userId2', directMessageController.getConversation);

module.exports = router;
