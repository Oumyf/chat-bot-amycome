import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import messageService from '../services/messageService';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './ChatBox.css';

const ChatBox = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && selectedUser) {
      loadMessages();
      // Rafraîchir les messages toutes les 3 secondes
      const interval = setInterval(loadMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [currentUser, selectedUser]);

  const loadMessages = async () => {
    if (!currentUser || !selectedUser) return;
    
    try {
      const data = await messageService.getConversation(currentUser.id, selectedUser.id);
      setMessages(data);
    } catch (err) {
      console.error('Erreur lors du chargement des messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !selectedUser) return;

    setLoading(true);
    try {
      const messageData = {
        expediteur_id: currentUser.id,
        destinataire_id: selectedUser.id,
        contenu: newMessage.trim()
      };
      
      await messageService.sendMessage(messageData);
      setNewMessage('');
      await loadMessages();
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de l\'envoi du message'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="chat-box">
        <div className="chat-empty">
          <p>Veuillez vous connecter pour utiliser le chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-box">
      <MessageList 
        messages={messages} 
        currentUser={currentUser} 
        selectedUser={selectedUser}
      />
      {selectedUser && (
        <form onSubmit={handleSendMessage} className="message-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            disabled={loading}
            className="message-input"
          />
          <button type="submit" disabled={loading || !newMessage.trim()} className="send-button">
            <FontAwesomeIcon icon={faPaperPlane} /> {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatBox;
