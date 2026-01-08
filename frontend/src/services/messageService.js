import axios from 'axios';

const API_URL = 'http://localhost:3001/api/direct-messages';

export const messageService = {
  // Récupérer tous les messages
  getAllMessages: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      throw error;
    }
  },

  // Récupérer la conversation entre deux utilisateurs
  getConversation: async (userId1, userId2) => {
    try {
      const response = await axios.get(`${API_URL}/conversation/${userId1}/${userId2}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la conversation:', error);
      throw error;
    }
  },

  // Récupérer les messages d'un utilisateur
  getMessagesUtilisateur: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages de l\'utilisateur:', error);
      throw error;
    }
  },

  // Envoyer un nouveau message
  sendMessage: async (messageData) => {
    try {
      const response = await axios.post(API_URL, messageData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  }
};

export default messageService;
