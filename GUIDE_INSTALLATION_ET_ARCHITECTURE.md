# 🚀 Guide d'Installation, Architecture & Tests en Local
### Portfolio Personnel & Studio — Jehovaly Majoi DJIMADJO

Ce document détaille **la méthode de construction**, **l'architecture technique**, les **instructions pas à pas pour installer et exécuter le projet sur votre machine locale**, ainsi que les **procédures de tests automatisés et manuels**.

---

## 📑 Sommaire
1. [Présentation du projet](#1-présentation-du-projet)
2. [Comment le projet a été construit (Architecture & Choix)](#2-comment-le-projet-a-été-construit)
3. [Prérequis techniques](#3-prérequis-techniques)
4. [Installation pas à pas en local](#4-installation-pas-à-pas-en-local)
5. [Commandes de lancement et de test](#5-commandes-de-lancement-et-de-test)
6. [Parcours de vérification & Tests manuels](#6-parcours-de-vérification--tests-manuels)
7. [Structure détaillée des fichiers](#7-structure-détaillée-des-fichiers)
8. [Administration privée & Accès](#8-administration-privée--accès)

---

## 1. Présentation du projet

Ce projet est la plateforme personnelle et le portfolio professionnel de **Jehovaly Majoi DJIMADJO**, développeur Full-Stack au Bénin, étudiant à l'IFRI, créateur de produits SaaS et solutions IA.

Il concilie deux univers visuels et fonctionnels complémentaires issus de la vidéo de référence :
- **Site A (Hero signature)** : Fond noir pur (`#050505`), animation d'ouverture asymétrique vert citron (`#d4f22b`), silhouette en profil avec éclairage de contour néon citron, wordmark géant **« Jeho* »** à astérisque citron, navigation avec chiffres en exposants réels, bouton rond globe et citation percutante.
- **Site B (Expérience studio & Études de cas)** : Titre éditorial en 3 lignes, bandeau d'outils rotatif avec logos officiels couleur, grille de projets en 2 colonnes décalées (cartes aux coins arrondis de 28px, statuts réels), modale d'étude de cas approfondie (Amphix, Amphix Meet, Amphix Game, CV Generator Pro), section services, parcours à l'IFRI et formulaire de contact fonctionnel.
- **Dashboard Admin complet** : Interface privée sécurisée par code d'accès (`jeho2026`) permettant de gérer les projets, les demandes clients, les services, les technologies et les tokens graphiques (avec vérificateur de contraste WCAG AA/AAA en direct).

---

## 2. Comment le projet a été construit

### 2.1 Choix de la stack technique
- **Framework UI** : **React 19** avec hooks fonctionnels.
- **Bundler & Dev Server** : **Vite 8** avec compilation ultra-rapide en ESM natif.
- **Typage & Rigueur** : **TypeScript 5.8** configuré en mode strict sans `any` masqué.
- **Styles & Design System** : **Tailwind CSS v4** avec directives `@theme` et tokens CSS natifs.
- **Animations & Micro-interactions** : **Motion (Framer Motion v12)** et CSS keyframes optimisés par GPU (`transform` et `opacity` uniquement).
- **Iconographie** : **Lucide React** pour les icônes d'interface et **SVGs officiels aux couleurs d'origine** pour les marques de technologies (Devicon / Simple Icons).
- **Test Runner** : **`node:test`** natif (Node 22+) pour des tests unitaires exécutables en moins de 300 millisecondes sans dépendances lourdes.

### 2.2 Principes d'architecture logicielle
1. **Découplage de la logique métier (`src/lib/portfolio-logic.ts`)** :
   Toutes les fonctions pures (filtrage des projets, calcul des métriques et compteurs d'exposants pour la barre de navigation, validation des formulaires de contact, machine à états des demandes clients et formules de contraste colorimétrique WCAG) sont isolées des composants React. Elles sont ainsi testables unitairement de manière déterministe.
2. **Magasin d'état persistant (`src/hooks/usePortfolioStore.ts`)** :
   Un hook personnalisé synchronise automatiquement l'état avec le `localStorage` du navigateur. Toute modification effectuée dans l'espace d'administration (changement du wordmark, ajout d'une note interne sur une demande de prospect, masquage d'une technologie) est immédiatement persistée et visible sur le site sans redémarrage.
3. **Respect strict des règles d'honnêteté** :
   Aucun chiffre inventé, aucun diplôme ou faux avis client n'est inséré. Les statuts des projets indiquent exactement la réalité : *En développement actif* pour Amphix, *Prototype architectural* pour Amphix Meet, *En test* pour Amphix Game, et *MVP* pour CV Generator Pro.
4. **Accessibilité & Performance (Zero-Jank)** :
   - Présence d'un `h1` sémantique pour les lecteurs d'écran et moteurs de recherche.
   - Respect de `prefers-reduced-motion` : l'animation d'ouverture et le bandeau rotatif se figent pour les utilisateurs sensibles au mouvement.
   - Ratio de contraste : le vert citron `#d4f22b` est obligatoirement associé à du texte sombre `#0a0a0a`, garantissant un ratio de contraste supérieur à **11:1** (dépasse les normes WCAG AA et AAA).

---

## 3. Prérequis techniques

Pour exécuter et tester le projet en local, assurez-vous d'avoir installé :
- **Node.js** : version **20.x** ou **22.x** recommandée (vérifiez avec `node -v`).
- **npm** : version **9.x** ou supérieure (ou **bun** / **pnpm**).
- **Git** : pour cloner et versionner le projet.
- **Un navigateur moderne** : Google Chrome, Chromium, Firefox ou Safari.

---

## 4. Installation pas à pas en local

### Étape 1 : Cloner ou télécharger le dépôt
```bash
git clone <url-du-depot>
cd <nom-du-dossier>
```

### Étape 2 : Installer les dépendances
Exécutez la commande suivante à la racine du projet :
```bash
npm install
```
*Toutes les dépendances (React 19, Vite, Tailwind CSS v4, Motion, Lucide, Express, TypeScript) seront installées dans `node_modules`.*

### Étape 3 : Configurer les variables d'environnement (facultatif pour le local)
Le fichier `.env.example` contient les clés optionnelles :
```bash
cp .env.example .env
```
*Note : Le projet fonctionne immédiatement en local sans clé externe requise.*

---

## 5. Commandes de lancement et de test

Le fichier `package.json` fournit des scripts prêts à l'emploi :

| Commande | Action | Description |
|---|---|---|
| `npm run dev` | **Démarrer en local** | Lance le serveur de développement Vite sur `http://localhost:3000` avec rechargement instantané. |
| `npm test` | **Tests unitaires** | Exécute la suite de tests automatisés via `node:test` (validation, filtres, statuts, WCAG). |
| `npm run lint` | **Contrôle TypeScript** | Valide l'ensemble du typage statique (`tsc --noEmit`) sans générer d'erreurs. |
| `npm run build` | **Build de production** | Compile et minifie l'application dans le dossier `dist/`. |
| `npm run preview` | **Aperçu du build** | Prévisualise localement le livrable compilé de production. |

### Démarrage immédiat :
```bash
npm run dev
```
Ouvrez ensuite votre navigateur sur **`http://localhost:3000`**.

---

## 6. Parcours de vérification & Tests manuels

Une fois l'application lancée sur `http://localhost:3000`, vous pouvez vérifier les points suivants :

### 1. Animation d'ouverture (Site A)
- À l'arrivée sur le site, l'écran vert citron s'ouvre par des volets asymétriques pour révéler le Hero noir pur.
- Vous pouvez rejouer cette animation à tout moment en cliquant sur le bouton **« Rejouer l'intro »** présent dans le pied de page (Footer).
- Elle respecte le réglage système `prefers-reduced-motion`.

### 2. Hero & Typographie
- Vérifiez la présence du wordmark géant **« Jeho* »** avec l'astérisque citron.
- Observez le halo vert citron diffus sur le bord gauche de l'écran.
- Sur grand écran, la silhouette avec éclairage de contour néon se découpe derrière le mot-symbole.
- En bas à droite, le badge `IFRI • Cotonou, Bénin`, l'icône globe et la signature sont cliquables.

### 3. Navigation haute & Chiffres en exposants réels
- Dans l'en-tête, observez les liens `Projets⁴` et `Services⁴`.
- Les petits chiffres en exposant correspondent au nombre exact d'éléments publiés (si un projet passe en brouillon dans l'admin, l'exposant se met à jour automatiquement).
- Le bouton blanc en pilule **« Parlons de votre projet »** fait défiler la page de façon fluide jusqu'au formulaire de contact.

### 4. Bandeau technologique rotatif (Site B)
- Les tuiles de 44px avec coins arrondis de 12px défilent de manière continue avec un masque de fondu sur les côtés.
- Survoler une tuile met l'animation en pause et affiche le nom officiel et la catégorie de la technologie.
- Sur mobile, un tap tactile affiche la technologie sélectionnée.

### 5. Grille de projets & Études de cas
- Les cartes sont disposées sur 2 colonnes avec un décalage vertical asymétrique.
- Cliquez sur les filtres de catégorie (*Tous, SaaS & Plateformes, Quiz & Jeux, Outils*).
- Cliquez sur une carte (ex. **Amphix**) : une modale haute fidélité s'ouvre avec les 6 sections d'étude de cas (Contexte, Problème, Objectifs, Architecture technique, Défis, Évolutions et liens externes). Appuyez sur `Échap` ou le bouton de fermeture pour quitter.

### 6. Formulaire de contact
- Essayez d'envoyer un formulaire vide : les messages d'erreur s'affichent sous les champs obligatoires.
- Saisissez un nom, un email valide et un message de plus de 10 caractères puis validez : un écran de confirmation s'affiche et la demande est **enregistrée dans le Dashboard Admin**.

### 7. Dashboard Admin privé (Modules A à L)
- Cliquez sur l'icône de bouclier dans la barre de navigation ou sur **« Admin Dashboard »** dans le footer.
- Saisissez le code d'accès : **`jeho2026`** et validez.
- **Onglet Vue d'ensemble** : visualisez les compteurs de projets, technologies et demandes reçues.
- **Onglet Projets** : basculez un projet de *Publié* à *Brouillon* ou marquez-le comme *Mis en avant*.
- **Onglet Demandes Clients** : retrouvez le message envoyé depuis le formulaire, changez son statut (*Nouvelle → À examiner → En discussion → Acceptée*) et ajoutez des notes internes privées.
- **Onglet Tokens & Réglages** : personnalisez le wordmark, modifiez la couleur d'accent (un calcul de contraste WCAG s'effectue en direct pour garantir la lisibilité).

---

## 7. Structure détaillée des fichiers

```
├── .env.example                     # Exemple de variables d'environnement
├── index.html                       # Entry point HTML avec balises SEO, OG et polices Google
├── metadata.json                    # Métadonnées de l'application AI Studio
├── package.json                     # Scripts npm, dépendances et devDependencies
├── tsconfig.json                    # Configuration TypeScript strict
├── vite.config.ts                   # Configuration Vite avec plugin Tailwind v4 et React
├── GUIDE_INSTALLATION_ET_ARCHITECTURE.md # Ce guide complet
│
├── src/
│   ├── main.tsx                     # Point d'entrée React 19
│   ├── App.tsx                      # Composant racine orchestrant l'application
│   ├── index.css                    # Directives Tailwind v4, variables CSS & keyframes
│   │
│   ├── lib/
│   │   ├── portfolio-logic.ts       # Logique métier pure (filtres, stats, WCAG, validation)
│   │   └── portfolio-logic.test.ts  # Tests unitaires natifs exécutés par node:test
│   │
│   ├── data/
│   │   └── portfolioData.ts         # Données initiales authentiques (Amphix, Meet, Game, CV)
│   │
│   ├── hooks/
│   │   └── usePortfolioStore.ts     # Magasin d'état persistant avec synchronisation LocalStorage
│   │
│   └── components/
│       ├── OpeningAnimation.tsx     # Animation d'ouverture à volets asymétriques citron
│       ├── Navbar.tsx               # Navigation avec exposants réels et pilule blanche
│       ├── Hero.tsx                 # Hero Site A (halo citron, wordmark Jeho*, silhouette)
│       ├── SiteBIntro.tsx           # Intro Site B (avatar, salutation, titre 3 lignes)
│       ├── TechMarquee.tsx          # Bandeau de technologies en défilement infini
│       ├── TechIcons.tsx            # Bibliothèque vectorielle des logos officiels
│       ├── ProjectsGrid.tsx         # Grille 2 colonnes décalées avec cartes 28px
│       ├── ProjectMockups.tsx       # Maquettes vectorielles d'écrans pour chaque projet
│       ├── CaseStudyModal.tsx       # Vue détaillée d'étude de cas (format vidéo 00:04)
│       ├── ServicesSection.tsx      # Présentation des 4 expertises et livrables
│       ├── AboutSection.tsx         # Biographie honnête (IFRI Bénin, valeurs produit)
│       ├── ContactSection.tsx       # Formulaire de contact validé + WhatsApp
│       ├── Footer.tsx               # Pied de page avec raccourcis et relecture intro
│       └── AdminDashboard.tsx       # Espace privé sécurisé (gestion complète A à L)
```

---

## 8. Administration privée & Accès

- **Lien d'accès** : Icône bouclier 🛡️ dans la barre de navigation haute ou lien dans le pied de page.
- **Code secret par défaut** : `jeho2026` *(ou `admin2026`)*.
- **Capacités** :
  - Suivi des demandes de devis et prospects avec historique des statuts.
  - Ajout, modification, publication et réorganisation des projets.
  - Activation ou désactivation des tuiles technologiques du bandeau rotatif.
  - Ajustement des textes clés et vérification continue de l'accessibilité des couleurs.
  - Bouton de réinitialisation sécurisé pour restaurer les données d'origine en un clic.

---

*Développé avec rigueur et passion pour Jehovaly Majoi DJIMADJO — Cotonou, Bénin.*
