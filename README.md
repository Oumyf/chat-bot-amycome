# 💬 Mini Système de Chat - AmyCome

Application web de messagerie instantanée permettant l'échange de messages entre utilisateurs avec gestion complète des utilisateurs (CRUD).

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [API Documentation](#-api-documentation)
- [Modèle de données](#-modèle-de-données)
- [Captures d'écran](#-captures-décran)
- [Auteur](#-auteur)

## ✨ Fonctionnalités

### Gestion des utilisateurs (CRUD complet)
- ✅ Créer un nouvel utilisateur
- ✅ Afficher la liste des utilisateurs
- ✅ Modifier un utilisateur existant
- ✅ Supprimer un utilisateur
- ✅ Validation des champs obligatoires

### Système de messagerie
- ✅ Envoyer des messages entre utilisateurs
- ✅ Afficher les conversations en temps réel
- ✅ Auto-refresh des messages (toutes les 3 secondes)
- ✅ Interface intuitive et responsive
- ✅ Messages horodatés

### Interface utilisateur
- ✅ Design moderne et professionnel
- ✅ Alertes élégantes avec SweetAlert2
- ✅ Interface responsive (mobile et desktop)
- ✅ Expérience utilisateur optimisée

## 🛠 Technologies utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web pour Node.js
- **Sequelize** - ORM pour la gestion de la base de données
- **PostgreSQL** - Système de gestion de base de données relationnelle
- **bcrypt** - Hachage des mots de passe
- **dotenv** - Gestion des variables d'environnement
- **CORS** - Gestion des requêtes cross-origin

### Frontend
- **React.js** - Bibliothèque JavaScript pour l'interface utilisateur
- **Axios** - Client HTTP pour les requêtes API
- **SweetAlert2** - Bibliothèque pour les alertes élégantes
- **CSS3** - Styles modernes avec gradients et animations

## 🏗 Architecture

### Structure du projet

```
chat-bot-amycome/
├── backend/
│   ├── config/
│   │   └── database.js           # Configuration de la base de données
│   ├── controllers/
│   │   ├── userController.js     # Logique métier des utilisateurs
│   │   └── directMessageController.js  # Logique métier des messages
│   ├── models/
│   │   ├── User.js               # Modèle Utilisateur
│   │   ├── DirectMessage.js      # Modèle Message
│   │   └── index.js              # Relations entre modèles
│   ├── routes/
│   │   ├── userRoutes.js         # Routes API utilisateurs
│   │   └── directMessageRoutes.js # Routes API messages
│   ├── .env                      # Variables d'environnement
│   ├── package.json              # Dépendances backend
│   └── server.js                 # Point d'entrée du serveur
│
└── frontend/
    ├── public/
    │   └── index.html            # Template HTML
    ├── src/
    │   ├── components/
    │   │   ├── UserList.js       # Liste des utilisateurs
    │   │   ├── UserForm.js       # Formulaire utilisateur
    │   │   ├── ChatBox.js        # Interface de chat
    │   │   ├── MessageList.js    # Affichage des messages
    │   │   └── ChatBox.css       # Styles du chat
    │   ├── services/
    │   │   ├── userService.js    # Service API utilisateurs
    │   │   └── messageService.js # Service API messages
    │   ├── App.js                # Composant principal
    │   ├── App.css               # Styles globaux
    │   └── index.js              # Point d'entrée React
    └── package.json              # Dépendances frontend
```

### Flux de données

```
Frontend (React) 
    ↓ HTTP Requests (Axios)
API REST (Express)
    ↓ ORM (Sequelize)
Base de données (PostgreSQL)
```

## 📦 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- PostgreSQL (v12 ou supérieur)
- npm ou yarn

### 1. Cloner le repository

```bash
git clone https://github.com/Oumyf/chat-bot-amycome.git
cd chat-bot-amycome
```

### 2. Installation du Backend

```bash
cd backend
npm install
```

### 3. Installation du Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Configuration de la base de données

1. Créer une base de données PostgreSQL :

```sql
CREATE DATABASE chat_db;
```

2. Créer le fichier `.env` dans le dossier `backend` :

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chat_db
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Configuration du Frontend

Le frontend est configuré pour communiquer avec le backend sur `http://localhost:3001`.

Pour modifier cette URL, éditez les fichiers :
- `frontend/src/services/userService.js`
- `frontend/src/services/messageService.js`

## 🚀 Utilisation

### Démarrer le Backend

```bash
cd backend
npm start
```

Le serveur démarre sur `http://localhost:3001`

### Démarrer le Frontend

```bash
cd frontend
npm start
```

L'application s'ouvre automatiquement sur `http://localhost:3000`

### Workflow d'utilisation

1. **Créer des utilisateurs** : Cliquez sur "+ Nouvel utilisateur" et remplissez le formulaire
2. **Se connecter** : Cliquez sur un utilisateur pour vous connecter
3. **Sélectionner un destinataire** : Cliquez sur un autre utilisateur pour ouvrir la conversation
4. **Envoyer des messages** : Tapez votre message et cliquez sur "Envoyer"

## 📡 API Documentation

### Endpoints Utilisateurs

#### Créer un utilisateur
```http
POST /api/users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "motdepasse123"
}
```

#### Récupérer tous les utilisateurs
```http
GET /api/users
```

#### Récupérer un utilisateur par ID
```http
GET /api/users/:id
```

#### Modifier un utilisateur
```http
PUT /api/users/:id
Content-Type: application/json

{
  "username": "john_doe_updated",
  "email": "john.new@example.com"
}
```

#### Supprimer un utilisateur
```http
DELETE /api/users/:id
```

### Endpoints Messages

#### Envoyer un message
```http
POST /api/direct-messages
Content-Type: application/json

{
  "expediteur_id": "uuid-expediteur",
  "destinataire_id": "uuid-destinataire",
  "contenu": "Bonjour, comment ça va ?"
}
```

#### Récupérer tous les messages
```http
GET /api/direct-messages
```

#### Récupérer la conversation entre deux utilisateurs
```http
GET /api/direct-messages/conversation/:userId1/:userId2
```

#### Récupérer les messages d'un utilisateur
```http
GET /api/direct-messages/user/:userId
```

### Codes de réponse HTTP

- `200` - OK : Requête réussie
- `201` - Created : Ressource créée avec succès
- `400` - Bad Request : Données invalides
- `404` - Not Found : Ressource non trouvée
- `409` - Conflict : Conflit (ex: email déjà utilisé)
- `500` - Internal Server Error : Erreur serveur

## 🗄 Modèle de données

### Entité Utilisateur (User)

```sql
Users {
  id: UUID (PK)
  username: VARCHAR(50) UNIQUE NOT NULL
  email: VARCHAR(100) UNIQUE NOT NULL
  password: VARCHAR(255) NOT NULL
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

### Entité Message Direct (DirectMessage)

```sql
DirectMessages {
  id: UUID (PK)
  contenu: TEXT NOT NULL
  expediteur_id: UUID (FK → Users.id)
  destinataire_id: UUID (FK → Users.id)
  date_envoi: TIMESTAMP
}
```

### Relations

- Un utilisateur peut **envoyer** plusieurs messages (1:N)
- Un utilisateur peut **recevoir** plusieurs messages (1:N)
- Un message a **un expéditeur** et **un destinataire** (N:1)

## 📸 Captures d'écran

### Interface principale
![Interface principale avec liste des utilisateurs et zone de chat]

### Création d'utilisateur
![Formulaire de création d'utilisateur avec validation]

### Conversation
![Échange de messages entre deux utilisateurs]

## 👨‍💻 Auteur

**Oumy Fall**
- GitHub: [@Oumyf](https://github.com/Oumyf)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !
