const { User } = require('../models');

// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }

    // Créer l'utilisateur
    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur createUser:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    res.json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erreur getUserById:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, avatar, status } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.update({
      username: username || user.username,
      email: email || user.email,
      avatar: avatar || user.avatar,
      status: status || user.status
    });

    res.json({
      message: 'Utilisateur mis à jour avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur updateUser:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.destroy();

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteUser:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const isValidPassword = await user.verifyPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Mettre à jour le statut et lastSeen
    await user.update({
      status: 'online',
      lastSeen: new Date()
    });

    res.json({
      message: 'Connexion réussie',
      user
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.update({
      status: 'offline',
      lastSeen: new Date()
    });

    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur logout:', error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
};
