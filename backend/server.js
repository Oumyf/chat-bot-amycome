const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const directMessageRoutes = require('./routes/directMessageRoutes');
const { sequelize } = require('./models');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/direct-messages', directMessageRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Chatbot AmyCome fonctionnelle !',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      messages: '/api/messages',
      conversations: '/api/conversations',
      directMessages: '/api/direct-messages'
    }
  });
});

// Route de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Test de connexion et synchronisation DB
const startServer = async () => {
  try {
    // Tester la connexion
    await testConnection();
    
    // Synchroniser les modèles avec la base de données
    // force: false ne réinitialise pas la DB, alter: true met à jour la structure
    await sequelize.sync({ force: false, alter: false });
    console.log('✅ Modèles synchronisés avec Neon PostgreSQL');
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Frontend CORS: ${process.env.CORS_ORIGIN || 'http://localhost:4200'}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();
