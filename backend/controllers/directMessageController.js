const DirectMessage = require('../models/DirectMessage');
const User = require('../models/User');
const { Op } = require('sequelize');

// Envoyer un message
exports.envoyerMessage = async (req, res) => {
  try {
    const { expediteur_id, destinataire_id, contenu } = req.body;

    // Validation
    if (!expediteur_id || !destinataire_id || !contenu) {
      return res.status(400).json({ 
        error: 'expediteur_id, destinataire_id et contenu sont requis' 
      });
    }

    // Vérifier que les utilisateurs existent
    const expediteur = await User.findByPk(expediteur_id);
    const destinataire = await User.findByPk(destinataire_id);

    if (!expediteur) {
      return res.status(404).json({ error: 'Expéditeur non trouvé' });
    }

    if (!destinataire) {
      return res.status(404).json({ error: 'Destinataire non trouvé' });
    }

    // Créer le message
    const message = await DirectMessage.create({
      expediteur_id,
      destinataire_id,
      contenu
    });

    // Récupérer le message avec les infos des utilisateurs
    const messageComplet = await DirectMessage.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'expediteur',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'destinataire',
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    res.status(201).json({
      message: 'Message envoyé avec succès',
      data: messageComplet
    });
  } catch (error) {
    console.error('Erreur envoyerMessage:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
};

// Afficher tous les messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await DirectMessage.findAll({
      include: [
        {
          model: User,
          as: 'expediteur',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'destinataire',
          attributes: ['id', 'username', 'email']
        }
      ],
      order: [['date_envoi', 'DESC']]
    });

    res.json(messages);
  } catch (error) {
    console.error('Erreur getAllMessages:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
};

// Afficher les messages d'un utilisateur (envoyés et reçus)
exports.getMessagesUtilisateur = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await DirectMessage.findAll({
      where: {
        [Op.or]: [
          { expediteur_id: userId },
          { destinataire_id: userId }
        ]
      },
      include: [
        {
          model: User,
          as: 'expediteur',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'destinataire',
          attributes: ['id', 'username', 'email']
        }
      ],
      order: [['date_envoi', 'DESC']]
    });

    res.json(messages);
  } catch (error) {
    console.error('Erreur getMessagesUtilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
};

// Afficher la conversation entre deux utilisateurs
exports.getConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    const messages = await DirectMessage.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { expediteur_id: userId1 },
              { destinataire_id: userId2 }
            ]
          },
          {
            [Op.and]: [
              { expediteur_id: userId2 },
              { destinataire_id: userId1 }
            ]
          }
        ]
      },
      include: [
        {
          model: User,
          as: 'expediteur',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'destinataire',
          attributes: ['id', 'username', 'email']
        }
      ],
      order: [['date_envoi', 'ASC']]
    });

    res.json(messages);
  } catch (error) {
    console.error('Erreur getConversation:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la conversation' });
  }
};
