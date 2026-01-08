import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const MessageList = ({ messages, currentUser, selectedUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  if (!currentUser || !selectedUser) {
    return (
      <div className="message-list-empty">
        <p>Sélectionnez un utilisateur pour commencer à chatter</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      <div className="chat-header">
        <h3>
          <FontAwesomeIcon icon={faComments} /> Conversation avec {selectedUser.username}
        </h3>
      </div>
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>Aucun message. Commencez la conversation !</p>
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.expediteur_id === currentUser.id;
            return (
              <div 
                key={message.id} 
                className={`message ${isCurrentUser ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  <p>{message.contenu}</p>
                  <span className="message-time">{formatTime(message.date_envoi)}</span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
