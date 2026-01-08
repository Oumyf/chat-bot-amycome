import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import Swal from 'sweetalert2';

const UserForm = ({ userToEdit, onUserSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        username: userToEdit.username || '',
        email: userToEdit.email || '',
        password: '' // Ne pas pré-remplir le mot de passe
      });
    } else {
      setFormData({ username: '', email: '', password: '' });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (userToEdit) {
        // Mise à jour
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password; // Ne pas envoyer de mot de passe vide
        }
        await userService.updateUser(userToEdit.id, updateData);
      } else {
        // Création
        await userService.createUser(formData);
      }
      setFormData({ username: '', email: '', password: '' });
      onUserSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h2>{userToEdit ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            {userToEdit ? 'Nouveau mot de passe (optionnel) :' : 'Mot de passe :'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!userToEdit}
            disabled={loading}
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <button type="button" onClick={onCancel} disabled={loading} className="btn-secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
