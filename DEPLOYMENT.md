# 🚀 Guide de Déploiement GitHub

## Préparation du projet

### 1. Initialiser Git dans le projet

```bash
cd C:\Users\USER\Desktop\chat-bot-amycome
git init
```

### 2. Ajouter tous les fichiers

```bash
git add .
```

### 3. Créer le premier commit

```bash
git commit -m "Initial commit: Mini système de chat avec CRUD utilisateurs et messagerie"
```

## Création du repository GitHub

### 1. Sur GitHub.com

1. Connectez-vous à votre compte GitHub (@Oumyf)
2. Cliquez sur le bouton "+" en haut à droite
3. Sélectionnez "New repository"
4. Nommez votre repository : `chat-bot-amycome`
5. Ajoutez une description : "Mini système de chat avec gestion utilisateurs (CRUD) et messagerie instantanée - React + Node.js + PostgreSQL"
6. Choisissez "Public" ou "Private"
7. **NE COCHEZ PAS** "Initialize with README" (on l'a déjà)
8. Cliquez sur "Create repository"

### 2. Lier le repository local à GitHub

```bash
git remote add origin https://github.com/Oumyf/chat-bot-amycome.git
git branch -M main
git push -u origin main
```

## Structure recommandée des commits

### Commits par fonctionnalité

```bash
# Backend
git add backend/
git commit -m "feat(backend): Add user CRUD API with validation"

git add backend/models/DirectMessage.js backend/controllers/directMessageController.js
git commit -m "feat(backend): Add direct messaging system between users"

# Frontend
git add frontend/src/components/
git commit -m "feat(frontend): Add user management UI with SweetAlert2"

git add frontend/src/components/ChatBox.js frontend/src/components/MessageList.js
git commit -m "feat(frontend): Add real-time chat interface"

# Documentation
git add README.md
git commit -m "docs: Add comprehensive project documentation"
```

## Fichiers à exclure (déjà dans .gitignore)

✅ Le .gitignore créé exclut automatiquement :
- `node_modules/` (dépendances npm)
- `.env` (variables d'environnement sensibles)
- `build/` et `dist/` (fichiers compilés)
- Fichiers IDE et OS

## Mettre à jour le repository

Après chaque modification :

```bash
git add .
git commit -m "Description de vos changements"
git push origin main
```

## Bonnes pratiques de commit

### Format des messages de commit

```
type(scope): description courte

[description détaillée optionnelle]

[footer optionnel]
```

### Types de commit

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, CSS
- `refactor`: Refactoring du code
- `test`: Ajout de tests
- `chore`: Maintenance

### Exemples

```bash
git commit -m "feat(chat): Add message timestamp display"
git commit -m "fix(auth): Fix password validation regex"
git commit -m "docs: Update installation instructions"
git commit -m "style(ui): Improve professional color scheme"
```

## Protéger les branches

### Créer une branche de développement

```bash
git checkout -b develop
git push -u origin develop
```

### Travailler avec des branches

```bash
# Créer une nouvelle feature
git checkout -b feature/nouvelle-fonctionnalite

# Faire vos modifications
git add .
git commit -m "feat: Add nouvelle fonctionnalite"

# Pousser la branche
git push -u origin feature/nouvelle-fonctionnalite

# Créer une Pull Request sur GitHub
# Puis fusionner après review
```

## Configuration du README sur GitHub

Le README.md sera automatiquement affiché sur la page principale de votre repository.

Pour ajouter des badges :

```markdown
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-90%25-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
```

## Configurer GitHub Pages (optionnel)

Pour héberger la documentation :

1. Allez dans Settings > Pages
2. Sélectionnez la branche `main`
3. Choisissez le dossier `/docs` ou root
4. Votre site sera disponible sur : `https://oumyf.github.io/chat-bot-amycome/`

## Commandes Git utiles

```bash
# Voir l'état des fichiers
git status

# Voir l'historique
git log --oneline

# Annuler le dernier commit (garder les modifications)
git reset --soft HEAD~1

# Voir les différences
git diff

# Voir les branches
git branch -a

# Changer de branche
git checkout nom-branche

# Mettre à jour depuis GitHub
git pull origin main
```

## Checklist avant de pousser

- [ ] Code testé et fonctionnel
- [ ] Variables sensibles dans .env (pas dans le code)
- [ ] .gitignore configuré
- [ ] README à jour
- [ ] Commits avec messages descriptifs
- [ ] Pas de `console.log()` inutiles

## Ressources

- [Documentation Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

📝 **Note**: N'oubliez pas de créer un fichier `.env.example` pour documenter les variables d'environnement nécessaires (sans les valeurs sensibles).
