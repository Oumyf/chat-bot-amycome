const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuration pour Neon PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Nécessaire pour Neon
    }
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test de connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à Neon PostgreSQL établie avec succès !');
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error.message);
  }
};

module.exports = { sequelize, testConnection };
