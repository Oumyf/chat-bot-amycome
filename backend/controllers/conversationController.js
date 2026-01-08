const { Conversation, Message, User } = require('../models');

// Créer une nouvelle conversation
exports.createConversation = async (req, res) => {
  try {
    const { userId, title } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId est requis' });
    }

    const conversation = await Conversation.create({
      userId,
      title: title || 'Nouvelle conversation'
    });

    res.status(201).json({
      message: 'Conversation créée avec succès',
      conversation
    });
  } catch (error) {
    console.error('Erreur createConversation:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la conversation' });
  }
};

// Obtenir toutes les conversations d'un utilisateur
exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.findAll({
      where: { userId },
      include: [
        {
          model: Message,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']],
          attributes: ['content', 'createdAt', 'type']
        }
      ],
      order: [['lastMessageAt', 'DESC']]
    });

    res.json(conversations);
  } catch (error) {
    console.error('Erreur getUserConversations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des conversations' });
  }
};

// Obtenir une conversation par ID avec tous ses messages
exports.getConversationById = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findByPk(id, {
      include: [
        {
          model: Message,
          as: 'messages',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'avatar']
            }
          ],
          order: [['createdAt', 'ASC']]
        }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation non trouvée' });
    }

    res.json(conversation);
  } catch (error) {
    console.error('Erreur getConversationById:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la conversation' });
  }
};

// Mettre à jour une conversation
exports.updateConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isActive } = req.body;

    const conversation = await Conversation.findByPk(id);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation non trouvée' });
    }

    await conversation.update({
      title: title !== undefined ? title : conversation.title,
      isActive: isActive !== undefined ? isActive : conversation.isActive
    });

    res.json({
      message: 'Conversation mise à jour avec succès',
      conversation
    });
  } catch (error) {
    console.error('Erreur updateConversation:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la conversation' });
  }
};

// Supprimer une conversation
exports.deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findByPk(id);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation non trouvée' });
    }

    // Supprimer tous les messages associés
    await Message.destroy({ where: { conversationId: id } });
    
    // Supprimer la conversation
    await conversation.destroy();

    res.json({ message: 'Conversation supprimée avec succès' });
  } catch (error) {
    console.error('Erreur deleteConversation:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la conversation' });
  }
};
