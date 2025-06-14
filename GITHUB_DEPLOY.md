# 🚀 Guide de Déploiement GitHub

## 📋 Instructions pour déployer sur GitHub

### 1. Créer le repository sur GitHub

1. Aller sur [github.com](https://github.com)
2. Cliquer sur "New repository" (bouton vert)
3. Remplir les informations :
   - **Repository name** : `transport-platform`
   - **Description** : `🚚 TransportPro - Plateforme moderne de gestion de transporteurs avec Next.js, TypeScript, Tailwind CSS et Supabase`
   - **Public** ou **Private** (selon votre préférence)
   - ❌ **NE PAS** cocher "Add a README file" (nous en avons déjà un)
   - ❌ **NE PAS** ajouter .gitignore (nous en avons déjà un)
4. Cliquer sur "Create repository"

### 2. Pousser le code local vers GitHub

Une fois le repository créé, GitHub vous donnera des instructions. Utilisez celles-ci :

```bash
# Aller dans le dossier du projet
cd transport-platform

# Ajouter l'origine GitHub (remplacez YOUR_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/YOUR_USERNAME/transport-platform.git

# Renommer la branche principale en main (optionnel, selon vos préférences)
git branch -M main

# Pousser le code
git push -u origin main
```

### 3. Alternative : Utiliser GitHub CLI

Si vous avez GitHub CLI installé :

```bash
# Créer le repository et pousser en une commande
gh repo create transport-platform --public --description "🚚 TransportPro - Plateforme moderne de gestion de transporteurs" --push
```

## 🚀 Déploiement sur Vercel

### Option 1 : Via l'interface Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "New Project"
4. Importer le repository `transport-platform`
5. Configurer les variables d'environnement :
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
6. Cliquer sur "Deploy"

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Configurer les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 📊 Configuration Supabase

### 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter l'URL et la clé API

### 2. Configurer la base de données

1. Dans le dashboard Supabase, aller dans "SQL Editor"
2. Exécuter le contenu du fichier `supabase-schema.sql`

### 3. Configurer l'authentification

1. Dans "Authentication" > "Settings"
2. Configurer les providers souhaités
3. Ajouter l'URL de votre site Vercel dans "Site URL"

## 🔧 Variables d'environnement

Créer un fichier `.env.local` avec :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optionnel : Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📝 Après le déploiement

1. **Tester l'application** avec les comptes de test :
   - Admin : `admin@transportpro.com` / `admin123`
   - Transporteur : `transporteur@transportpro.com` / `transport123`

2. **Configurer le domaine personnalisé** (optionnel) dans Vercel

3. **Activer les analytics** Vercel pour le monitoring

## 🎉 Votre application sera accessible à :

- **URL Vercel** : `https://transport-platform-your-username.vercel.app`
- **Domaine personnalisé** : Si configuré

---

**TransportPro est maintenant déployé et prêt à l'emploi ! 🚚✨**