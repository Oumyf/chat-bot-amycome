# Backend Chatbot AmyCome

Backend Node.js/Express pour application de chatbot avec Neon PostgreSQL.

## 🚀 Configuration rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration Neon PostgreSQL

1. Créez un compte sur [Neon](https://neon.tech)
2. Créez un nouveau projet
3. Copiez l'URL de connexion fournie par Neon
4. Mettez à jour le fichier `.env` avec votre URL de connexion :

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/chatbot?sslmode=require
```

### 3. Variables d'environnement

Créez un fichier `.env` à la racine du projet (utilisez `.env.example` comme modèle) :

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=votre_url_neon_postgresql
JWT_SECRET=votre_cle_secrete
CORS_ORIGIN=http://localhost:4200
```

### 4. Démarrage du serveur

**Mode développement (avec rechargement automatique) :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

Le serveur démarre sur `http://localhost:3001`

## 📚 Structure du projet

```
backend/
├── config/
│   └── database.js          # Configuration Neon PostgreSQL
├── controllers/
│   ├── userController.js
│   ├── conversationController.js
│   └── messageController.js
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Conversation.js
│   └── Message.js
├── routes/
│   ├── userRoutes.js
│   ├── conversationRoutes.js
│   └── messageRoutes.js
├── .env                     # Variables d'environnement
├── .env.example            # Exemple de configuration
├── server.js               # Point d'entrée
└── package.json
```

## 🔌 API Endpoints

### Utilisateurs (`/api/users`)

- `POST /api/users` - Créer un utilisateur
- `POST /api/users/login` - Connexion
- `POST /api/users/:id/logout` - Déconnexion
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/:id` - Détails d'un utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Conversations (`/api/conversations`)

- `POST /api/conversations` - Créer une conversation
- `GET /api/conversations/user/:userId` - Conversations d'un utilisateur
- `GET /api/conversations/:id` - Détails d'une conversation
- `PUT /api/conversations/:id` - Mettre à jour une conversation
- `DELETE /api/conversations/:id` - Supprimer une conversation

### Messages (`/api/messages`)

- `POST /api/messages` - Créer un message (génère automatiquement une réponse du bot)
- `GET /api/messages/conversation/:conversationId` - Messages d'une conversation
- `PUT /api/messages/:id/read` - Marquer comme lu
- `DELETE /api/messages/:id` - Supprimer un message

## 💡 Exemples d'utilisation

### Créer un utilisateur

```javascript
POST http://localhost:3001/api/users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Créer une conversation

```javascript
POST http://localhost:3001/api/conversations
Content-Type: application/json

{
  "userId": "uuid-de-l-utilisateur",
  "title": "Ma conversation"
}
```

### Envoyer un message

```javascript
POST http://localhost:3001/api/messages
Content-Type: application/json

{
  "content": "Bonjour, comment allez-vous ?",
  "conversationId": "uuid-de-la-conversation",
  "userId": "uuid-de-l-utilisateur",
  "type": "user"
}
```

Le bot répondra automatiquement avec un message de type "bot".

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM pour PostgreSQL
- **Neon PostgreSQL** - Base de données serverless
- **bcrypt** - Hachage des mots de passe
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Variables d'environnement

## 🔒 Sécurité

- Les mots de passe sont automatiquement hachés avec bcrypt
- CORS configuré pour autoriser uniquement le frontend
- SSL/TLS requis pour la connexion à Neon
- Variables sensibles dans `.env` (non versionnées)

## 📝 Notes

- La base de données est automatiquement synchronisée au démarrage
- Le bot génère des réponses automatiques basiques (à améliorer avec une IA)
- Les UUID sont utilisés comme identifiants primaires
- Support des métadonnées JSONB pour les messages
