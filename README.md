# 💬 Chat Application

Real-time messaging application with user management (CRUD) and direct messaging between users.

## Features

- User management: create, read, update, delete
- Direct messaging between users
- Real-time message updates
- Responsive design
- Modern UI with FontAwesome icons

## Tech Stack

**Backend:** Node.js, Express, Sequelize, PostgreSQL  
**Frontend:** React, Axios, SweetAlert2, FontAwesome

## Installation

### Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chat_db
DB_USER=your_user
DB_PASSWORD=your_password
PORT=3001
```

### Frontend
```bash
cd frontend
npm install
```

## Usage

Start backend:
```bash
cd backend
npm start
```

Start frontend:
```bash
cd frontend
npm start
```

Application runs on `http://localhost:3000`

## API Endpoints

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Messages
- `POST /api/direct-messages` - Send message
- `GET /api/direct-messages` - Get all messages
- `GET /api/direct-messages/conversation/:userId1/:userId2` - Get conversation
- `GET /api/direct-messages/user/:userId` - Get user messages

## Database Schema

**Users:** id, username, email, password, created_at  
**DirectMessages:** id, contenu, expediteur_id, destinataire_id, date_envoi

## Author

Oumy Fall - [@Oumyf](https://github.com/Oumyf)

## License

MIT
