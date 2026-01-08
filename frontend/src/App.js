import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ChatBox from './components/ChatBox';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [refreshUsers, setRefreshUsers] = useState(0);

  const handleSelectUser = (user) => {
    if (!currentUser) {
      setCurrentUser(user);
      Swal.fire({
        icon: 'success',
        title: 'Connecté !',
        text: `Connecté en tant que ${user.username}`,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      setSelectedUser(user);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedUser(null);
  };

  const handleShowUserForm = () => {
    setUserToEdit(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setShowUserForm(true);
  };

  const handleUserSaved = () => {
    setShowUserForm(false);
    setUserToEdit(null);
    setRefreshUsers(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowUserForm(false);
    setUserToEdit(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>
          <FontAwesomeIcon icon={faComments} /> Chat App
        </h1>
        {currentUser && (
          <div className="current-user-info">
            <span>Connecté : <strong>{currentUser.username}</strong></span>
            <button onClick={handleLogout} className="btn-logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
            </button>
          </div>
        )}
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <button onClick={handleShowUserForm} className="btn-add-user">
              <FontAwesomeIcon icon={faUserPlus} /> Nouvel utilisateur
            </button>
          </div>
          <UserList 
            key={refreshUsers}
            onSelectUser={handleSelectUser}
            currentUser={currentUser}
            onEditUser={handleEditUser}
          />
        </aside>

        <main className="main-content">
          {showUserForm ? (
            <UserForm 
              userToEdit={userToEdit}
              onUserSaved={handleUserSaved}
              onCancel={handleCancel}
            />
          ) : (
            <ChatBox 
              currentUser={currentUser}
              selectedUser={selectedUser}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
