import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

export const userService = {
  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  createUser: async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }
};

export default userService;