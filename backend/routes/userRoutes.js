const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes utilisateurs
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/:id/logout', userController.logout);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
