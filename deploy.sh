#!/bin/bash

# 🚀 Script de déploiement TransportPro
# Ce script automatise le déploiement sur GitHub et Vercel

echo "🚚 TransportPro - Script de déploiement"
echo "======================================="

# Vérifier si nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : Ce script doit être exécuté depuis le dossier transport-platform"
    exit 1
fi

# Vérifier si git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation de Git..."
    git init
    git add .
    git commit -m "🚚 Initial commit: TransportPro - Plateforme moderne de gestion de transporteurs"
fi

# Demander le nom d'utilisateur GitHub
echo ""
read -p "📝 Entrez votre nom d'utilisateur GitHub : " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Nom d'utilisateur GitHub requis"
    exit 1
fi

# Configurer l'origine GitHub
echo "🔗 Configuration de l'origine GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/$GITHUB_USERNAME/transport-platform.git

# Renommer la branche en main
echo "🌿 Renommage de la branche en main..."
git branch -M main

# Pousser le code
echo "⬆️  Poussée du code vers GitHub..."
echo "📝 Note : Vous devrez peut-être entrer vos identifiants GitHub"
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code poussé avec succès vers GitHub !"
    echo "🔗 Repository : https://github.com/$GITHUB_USERNAME/transport-platform"
    echo ""
    echo "🚀 Prochaines étapes :"
    echo "1. Créer un projet Supabase sur https://supabase.com"
    echo "2. Exécuter le fichier supabase-schema.sql dans l'éditeur SQL"
    echo "3. Déployer sur Vercel : https://vercel.com"
    echo "4. Configurer les variables d'environnement dans Vercel"
    echo ""
    echo "📖 Consultez GITHUB_DEPLOY.md pour les instructions détaillées"
else
    echo "❌ Erreur lors de la poussée vers GitHub"
    echo "💡 Assurez-vous que :"
    echo "   - Le repository transport-platform existe sur GitHub"
    echo "   - Vous avez les permissions d'écriture"
    echo "   - Vos identifiants GitHub sont corrects"
fi