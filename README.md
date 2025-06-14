# TransportPro - Plateforme de Gestion de Transporteurs

Une plateforme moderne de gestion automatisée des demandes de transport avec scan email intelligent et interface dédiée pour administrateurs et transporteurs.

## 🚀 Fonctionnalités

### Module de Scan Email Automatique
- ✅ Connexion sécurisée aux boîtes mail (IMAP/POP3)
- ✅ Extraction intelligente des données TRADIFRET
- ✅ Validation et correction manuelle
- ✅ Historique des extractions

### Gestion des Demandes
- ✅ Assignment automatique aux transporteurs
- ✅ Système de délais paramétrables
- ✅ Notifications en temps réel
- ✅ Suivi des réponses (acceptation/refus)

### Interface Administrateur
- ✅ Dashboard avec statistiques temps réel
- ✅ Gestion complète des demandes
- ✅ Gestion des transporteurs
- ✅ Analytics avancés avec graphiques

### Interface Transporteur
- ✅ Dashboard personnalisé
- ✅ Gestion des demandes assignées
- ✅ Calendrier des livraisons
- ✅ Statistiques de performance

## 🛠 Stack Technique

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI Components**: Headless UI, Lucide React
- **Charts**: Recharts
- **State Management**: Zustand
- **Déploiement**: Vercel + Supabase

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase
- Compte Vercel (pour le déploiement)

### 1. Cloner le projet
```bash
git clone <repository-url>
cd transport-platform
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration Supabase

#### Créer un projet Supabase
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter l'URL et la clé API

#### Configurer la base de données
1. Dans le dashboard Supabase, aller dans "SQL Editor"
2. Exécuter le script `supabase-schema.sql`

### 4. Configuration des variables d'environnement

Copier `.env.local` et remplir :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Configuration (pour le scan email)
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Google Maps API (optionnel)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# App Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 5. Lancer en développement
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🚀 Déploiement sur Vercel

### 1. Préparer le déploiement
```bash
# Build de production
npm run build

# Tester le build
npm start
```

### 2. Déployer sur Vercel

#### Option A: Via CLI Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... autres variables
```

#### Option B: Via GitHub
1. Pusher le code sur GitHub
2. Connecter le repository à Vercel
3. Configurer les variables d'environnement dans le dashboard Vercel
4. Déployer automatiquement

## 👥 Utilisation

### Accès Administrateur
- URL: `/admin`
- Fonctionnalités:
  - Dashboard avec KPIs
  - Gestion des demandes
  - Gestion des transporteurs
  - Configuration du scan email
  - Analytics et rapports

### Accès Transporteur
- URL: `/transporter`
- Fonctionnalités:
  - Dashboard personnel
  - Demandes assignées
  - Acceptation/Refus des demandes
  - Calendrier des livraisons
  - Statistiques de performance

## 🔧 Configuration Avancée

### Scan Email
1. Configurer les paramètres IMAP dans `.env.local`
2. Ajuster la fréquence de scan dans l'interface admin
3. Personnaliser les templates d'extraction

### Notifications
- Configuration des emails automatiques
- Paramétrage des délais par transporteur
- Personnalisation des templates

## 🔒 Sécurité

- **Authentification**: Supabase Auth avec 2FA
- **Autorisation**: Row Level Security (RLS)
- **HTTPS**: Forcé en production
- **RGPD**: Conformité intégrée

## 📊 Monitoring

### Métriques clés
- Temps de réponse des transporteurs
- Taux d'acceptation
- Volume de demandes
- Performance du scan email

---

**TransportPro** - Révolutionnez votre gestion de transport ! 🚚✨
