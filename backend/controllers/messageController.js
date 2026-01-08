const { Message, Conversation, User } = require('../models');

// Créer un nouveau message
exports.createMessage = async (req, res) => {
  try {
    const { content, conversationId, userId, type } = req.body;

    if (!content || !conversationId || !userId) {
      return res.status(400).json({ error: 'content, conversationId et userId sont requis' });
    }

    // Vérifier que la conversation existe
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation non trouvée' });
    }

    // Créer le message
    const message = await Message.create({
      content,
      conversationId,
      userId,
      type: type || 'user'
    });

    // Mettre à jour la conversation
    await conversation.update({
      lastMessageAt: new Date()
    });

    // Récupérer le message avec les relations
    const messageWithRelations = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar']
        }
      ]
    });

    // Si c'est un message utilisateur, générer une réponse du bot
    let botResponse = null;
    if (type === 'user' || !type) {
      botResponse = await generateBotResponse(content, conversationId, conversation.userId);
    }

    res.status(201).json({
      message: 'Message créé avec succès',
      userMessage: messageWithRelations,
      botMessage: botResponse
    });
  } catch (error) {
    console.error('Erreur createMessage:', error);
    res.status(500).json({ error: 'Erreur lors de la création du message' });
  }
};

// Générer une réponse automatique du bot
async function generateBotResponse(userMessage, conversationId, userId) {
  try {
    // Logique simple de réponse (vous pouvez intégrer une IA ici)
    let botReply = '';
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      botReply = 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
    } else if (lowerMessage.includes('comment') && lowerMessage.includes('vas')) {
      botReply = 'Je vais bien, merci ! Et vous ?';
    } else if (lowerMessage.includes('merci')) {
      botReply = 'De rien ! N\'hésitez pas si vous avez d\'autres questions.';
    } else if (lowerMessage.includes('aide') || lowerMessage.includes('help')) {
      botReply = 'Je suis là pour vous aider ! Posez-moi vos questions et je ferai de mon mieux pour y répondre.';
    } else if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye')) {
      botReply = 'Au revoir ! À bientôt !';
    } else {
      botReply = `J'ai bien reçu votre message : "${userMessage}". Comment puis-je vous aider davantage ?`;
    }

    // Créer le message du bot
    const botMessage = await Message.create({
      content: botReply,
      conversationId,
      userId, // Vous pouvez créer un utilisateur spécial "bot" si nécessaire
      type: 'bot'
    });

    // Mettre à jour la conversation
    await Conversation.update(
      { lastMessageAt: new Date() },
      { where: { id: conversationId } }
    );

    return await Message.findByPk(botMessage.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar']
        }
      ]
    });
  } catch (error) {
    console.error('Erreur generateBotResponse:', error);
    return null;
  }
}

// Obtenir tous les messages d'une conversation
exports.getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.findAll({
      where: { conversationId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar']
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.json(messages);
  } catch (error) {
    console.error('Erreur getConversationMessages:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
};

// Marquer un message comme lu
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }

    await message.update({ isRead: true });

    res.json({
      message: 'Message marqué comme lu',
      data: message
    });
  } catch (error) {
    console.error('Erreur markAsRead:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
  }
};

// Supprimer un message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }

    await message.destroy();

    res.json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteMessage:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du message' });
  }
};
