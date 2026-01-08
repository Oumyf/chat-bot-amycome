const { sequelize } = require('../config/database');
const User = require('./User');
const Message = require('./Message');
const Conversation = require('./Conversation');
const DirectMessage = require('./DirectMessage');

// Relations entre les modèles

// Un utilisateur peut avoir plusieurs conversations
User.hasMany(Conversation, { foreignKey: 'userId', as: 'conversations' });
Conversation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Une conversation peut avoir plusieurs messages
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });

// Un message appartient à un utilisateur
User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relations pour DirectMessage (messages directs entre utilisateurs)
User.hasMany(DirectMessage, { foreignKey: 'expediteur_id', as: 'messagesEnvoyes' });
User.hasMany(DirectMessage, { foreignKey: 'destinataire_id', as: 'messagesRecus' });

DirectMessage.belongsTo(User, { foreignKey: 'expediteur_id', as: 'expediteur' });
DirectMessage.belongsTo(User, { foreignKey: 'destinataire_id', as: 'destinataire' });

module.exports = {
  sequelize,
  User,
  Message,
  Conversation,
  DirectMessage
};
