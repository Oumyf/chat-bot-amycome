# Script de déploiement GitHub pour Chat AmyCome
# Auteur: Oumy Fall

Write-Host "🚀 Déploiement sur GitHub - Chat AmyCome" -ForegroundColor Cyan
Write-Host "=========================================`n" -ForegroundColor Cyan

# Vérifier si Git est installé
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé. Veuillez installer Git d'abord." -ForegroundColor Red
    exit 1
}

# Naviguer vers le dossier du projet
$projectPath = "C:\Users\USER\Desktop\chat-bot-amycome"
Set-Location $projectPath

Write-Host "📁 Dossier du projet: $projectPath`n" -ForegroundColor Green

# Demander le nom d'utilisateur GitHub
$githubUsername = Read-Host "Entrez votre nom d'utilisateur GitHub (par défaut: Oumyf)"
if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    $githubUsername = "Oumyf"
}

# Demander le nom du repository
$repoName = Read-Host "Entrez le nom du repository (par défaut: chat-bot-amycome)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "chat-bot-amycome"
}

# Vérifier si Git est déjà initialisé
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Initialisation de Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialisé`n" -ForegroundColor Green
} else {
    Write-Host "✅ Git déjà initialisé`n" -ForegroundColor Green
}

# Configurer Git (si pas déjà fait)
$gitName = git config user.name
if ([string]::IsNullOrWhiteSpace($gitName)) {
    $name = Read-Host "Entrez votre nom pour Git"
    $email = Read-Host "Entrez votre email pour Git"
    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "✅ Configuration Git effectuée`n" -ForegroundColor Green
}

# Ajouter tous les fichiers
Write-Host "📦 Ajout des fichiers..." -ForegroundColor Yellow
git add .

# Créer le commit
$commitMessage = Read-Host "Message de commit (par défaut: 'Initial commit: Mini système de chat professionnel')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit: Mini système de chat professionnel"
}

git commit -m "$commitMessage"
Write-Host "✅ Commit créé`n" -ForegroundColor Green

# Vérifier si le remote existe déjà
$remoteExists = git remote -v | Select-String "origin"

if (-not $remoteExists) {
    # Ajouter le remote
    $repoUrl = "https://github.com/$githubUsername/$repoName.git"
    Write-Host "🔗 Liaison au repository: $repoUrl" -ForegroundColor Yellow
    git remote add origin $repoUrl
    Write-Host "✅ Remote ajouté`n" -ForegroundColor Green
} else {
    Write-Host "✅ Remote déjà configuré`n" -ForegroundColor Green
}

# Renommer la branche en main
git branch -M main

# Pousser sur GitHub
Write-Host "⬆️  Push vers GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "`n✅ Projet déployé avec succès sur GitHub!" -ForegroundColor Green
    Write-Host "🌐 Votre repository: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
} catch {
    Write-Host "`n❌ Erreur lors du push. Vérifiez:" -ForegroundColor Red
    Write-Host "   1. Que le repository existe sur GitHub" -ForegroundColor Yellow
    Write-Host "   2. Que vous êtes connecté à GitHub" -ForegroundColor Yellow
    Write-Host "   3. Que vous avez les droits d'accès" -ForegroundColor Yellow
    Write-Host "`n💡 Vous pouvez essayer: git push -u origin main --force" -ForegroundColor Cyan
}

Write-Host "`n📝 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "   1. Visitez votre repository sur GitHub" -ForegroundColor White
Write-Host "   2. Vérifiez que le README.md s'affiche correctement" -ForegroundColor White
Write-Host "   3. Ajoutez des topics au repository (react, nodejs, postgresql, chat)" -ForegroundColor White
Write-Host "   4. Activez GitHub Pages si vous souhaitez héberger la doc" -ForegroundColor White

Read-Host "`nAppuyez sur Entrée pour terminer"
