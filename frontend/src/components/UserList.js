import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserList = ({ onSelectUser, currentUser, onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await userService.deleteUser(id);
        await Swal.fire('Supprimé !', 'L\'utilisateur a été supprimé.', 'success');
        loadUsers();
      } catch (err) {
        await Swal.fire('Erreur', 'Erreur lors de la suppression', 'error');
      }
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list">
      <h2>Utilisateurs</h2>
      <div className="users-container">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`user-item ${currentUser?.id === user.id ? 'active' : ''}`}
            onClick={() => onSelectUser(user)}
          >
            <div className="user-info">
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
            <div className="user-actions">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEditUser(user);
                }}
                className="btn-edit"
                title="Modifier"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(user.id);
                }}
                className="btn-delete"
                title="Supprimer"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
