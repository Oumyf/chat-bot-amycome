const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DirectMessage = sequelize.define('DirectMessage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  expediteur_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  destinataire_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  date_envoi: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'direct_messages',
  timestamps: true,
  createdAt: 'date_envoi',
  updatedAt: false
});

module.exports = DirectMessage;
