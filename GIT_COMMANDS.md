# 🎯 Commandes rapides pour GitHub

## Premier push sur GitHub

```powershell
# 1. Naviguer vers le projet
cd C:\Users\USER\Desktop\chat-bot-amycome

# 2. Initialiser Git
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Premier commit
git commit -m "Initial commit: Mini système de chat professionnel"

# 5. Lier au repository GitHub (remplacez par votre URL)
git remote add origin https://github.com/Oumyf/chat-bot-amycome.git

# 6. Renommer la branche en main
git branch -M main

# 7. Pousser sur GitHub
git push -u origin main
```

## Mises à jour ultérieures

```powershell
# Après avoir modifié des fichiers
git add .
git commit -m "Description de vos modifications"
git push
```

## Vérifier l'état

```powershell
# Voir les fichiers modifiés
git status

# Voir l'historique
git log --oneline --graph

# Voir les différences
git diff
```

## Configuration initiale Git (une seule fois)

```powershell
git config --global user.name "Oumy Fall"
git config --global user.email "votre.email@example.com"
```

## En cas de problème

```powershell
# Annuler les modifications non commitées
git checkout .

# Voir les repositories distants
git remote -v

# Mettre à jour depuis GitHub
git pull origin main
```
