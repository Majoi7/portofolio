import { Project, ClientInquiry } from '../lib/portfolio-logic';

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'ai' | 'design';
  categoryLabel: string;
  color: string;
  iconName: string; // key for custom SVG or Lucide
  visible: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  targetAudience: string;
  icon: string;
  active: boolean;
  order: number;
}

export interface SiteSettings {
  wordmark: string;
  name: string;
  title: string;
  heroTagline: string;
  copyrightYear: number;
  accentColor: string;
  location: string;
  email: string;
  whatsappNumber: string;
  githubUrl: string;
  playIntroAnimation: boolean;
  portraitActive: boolean;
}

export const INITIAL_SETTINGS: SiteSettings = {
  wordmark: 'Jeho',
  name: 'Jehovaly Majoi DJIMADJO',
  title: 'Développeur Full-Stack, SaaS & IA',
  heroTagline: 'Développeur Full-Stack au Bénin, je conçois des produits numériques — SaaS, applications web, IA — qui donnent vie aux idées.',
  copyrightYear: 2026,
  accentColor: '#d4f22b', // vert citron vidéo #d4f22b
  location: 'Bénin, Afrique de l\'Ouest',
  email: 'contact@jehovaly.dev',
  whatsappNumber: '+229 97 00 00 00',
  githubUrl: 'https://github.com',
  playIntroAnimation: true,
  portraitActive: true,
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'amphix',
    title: 'Amphix',
    tagline: 'Plateforme éducative & écosystème de mentorat universitaire',
    category: 'saas',
    categoryLabel: 'SaaS & Plateforme',
    status: 'in_development',
    statusLabel: 'En développement actif',
    featured: true,
    published: true,
    order: 1,
    description: 'Projet entrepreneurial visant à faciliter l\'accès à l\'accompagnement pédagogique, réservation de séances avec des mentors, paiements et messagerie.',
    coverImage: 'amphix-cover',
    technologies: ['Laravel', 'React', 'PostgreSQL', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://amphix.site',
    caseStudy: {
      context: 'Né d\'un constat à l\'université (IFRI, Bénin) : de nombreux étudiants éprouvent des difficultés dans certaines matières fondamentales sans accès aisé à un mentorat structuré ou à des cours de renforcement fiables.',
      problem: 'Manque de centralisation pour trouver des pairs ou aînés qualifiés, absence de gestion sécurisée des disponibilités, réservations informelles et paiements désorganisés.',
      objectives: [
        'Connecter étudiants et mentors qualifiés via une interface moderne et fluide',
        'Automatiser la prise de rendez-vous et la confirmation des créneaux',
        'Garantir un flux financier transparent pour les retraits des mentors',
        'Intégrer une messagerie instantanée et un tableau de bord d\'administration complet'
      ],
      solution: 'Une plateforme web progressive bâtie en architecture découplée (frontend React rapide + backend robuste Laravel) avec gestion des rôles (Étudiants, Mentors, Admins).',
      architecture: 'Frontend React 19 + Vite + Tailwind CSS. Backend Laravel API REST avec authentification sécurisée par tokens, gestion transactionnelle des réservations et persistance PostgreSQL/Supabase.',
      keyFeatures: [
        'Espaces personnalisés distincts pour étudiants et tuteurs',
        'Catalogue d\'offres d\'accompagnement avec filtres thématiques',
        'Moteur de réservation calendaire synchronisé',
        'Gestion des portefeuilles virtuels et demandes de retraits des mentors',
        'Système de notifications et messagerie interne'
      ],
      challenges: [
        'Gestion rigoureuse de la concurrence sur les créneaux horaires',
        'Gestion sécurisée des états de paiement et validation côté serveur',
        'Expérience mobile irréprochable pour les étudiants naviguant sur smartphone'
      ],
      currentState: 'Architecture backend et modules d\'authentification et de réservation conçus. Développement actif des flux de paiement et perfectionnement de l\'expérience utilisateur.',
      nextSteps: [
        'Intégration complète de la passerelle de paiement mobile money locale',
        'Déploiement en beta fermée auprès des étudiants de l\'IFRI',
        'Lancement de la phase pilote'
      ]
    }
  },
  {
    id: 'proj-2',
    slug: 'amphix-meet',
    title: 'Amphix Meet',
    tagline: 'Infrastructure visioconférence & communication temps réel',
    category: 'saas',
    categoryLabel: 'Audio & Vidéo Temps Réel',
    status: 'prototype',
    statusLabel: 'Prototype architectural',
    featured: true,
    published: true,
    order: 2,
    description: 'Service de visioconférence sécurisée avec intégration LiveKit Cloud, respectant le principe strict de secrets et tokens générés côté serveur.',
    coverImage: 'amphix-meet-cover',
    technologies: ['React', 'Laravel', 'LiveKit', 'TypeScript', 'WebRTC'],
    caseStudy: {
      context: 'Amphix nécessitait un canal de visioconférence sur mesure pour les séances de mentorat individuel ou collectif sans dépendre de liens externes (Google Meet ou Zoom).',
      problem: 'Garantir une transmission audio/vidéo fluide avec une latence minimale tout en protégeant hermétiquement les clés d\'API et en gérant les permissions d\'accès aux salles.',
      objectives: [
        'Architecture WebRTC server-authoritative',
        'Zéro clé secrète exposée dans le bundle frontend',
        'Qualité adaptative selon la bande passante'
      ],
      solution: 'Un backend Laravel qui authentifie l\'utilisateur, valide ses droits sur la séance réservée, et génère un jeton JWT LiveKit éphémère et signé. Le client React initialise la connexion LiveKit SDK.',
      architecture: 'Client React WebRTC connecté au cloud LiveKit via JWT signés par l\'API Laravel. Stockage PostgreSQL pour l\'historique des séances.',
      keyFeatures: [
        'Salons de mentorat privés chiffrés',
        'Partage d\'écran et tableau blanc collaboratif',
        'Contrôle des flux audio/vidéo et gestion des participants',
        'Reconnexion automatique en cas de perturbation réseau'
      ],
      challenges: [
        'Optimisation de l\'encodage vidéo sur connexions mobiles à débit variable',
        'Cycle de vie des tokens d\'accès et expiration en temps réel'
      ],
      currentState: 'Prototype architectural validé en environnement de développement local avec génération de tokens sécurisée.',
      nextSteps: [
        'Finalisation du composant de chat pendant la visioconférence',
        'Intégration directe dans le workflow des réservations d\'Amphix'
      ]
    }
  },
  {
    id: 'proj-3',
    slug: 'amphix-game',
    title: 'Amphix Game',
    tagline: 'Quiz éducatif interactif en mathématiques & sciences',
    category: 'game',
    categoryLabel: 'Quiz & Jeux Interactifs',
    status: 'in_development',
    statusLabel: 'En test',
    featured: false,
    published: true,
    order: 3,
    description: 'Quiz stimulant centré sur les suites, séries et équations différentielles avec classements en direct, vies et mécaniques de progression ludiques.',
    coverImage: 'amphix-game-cover',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Supabase'],
    caseStudy: {
      context: 'Les matières scientifiques (analyse mathématique, équations différentielles) sont souvent jugées austères. Le projet explore comment la ludification augmente l\'engagement.',
      problem: 'Comment motiver les révisions d\'analyse mathématique tout en maintenant une rigueur scientifique irréprochable.',
      objectives: [
        'Concevoir des mécaniques de jeu motivantes (vies, multiplicateurs de score, séries de succès)',
        'Offrir un retour immédiat avec explications détaillées des solutions',
        'Créer une émulation positive via un classement en direct'
      ],
      solution: 'Une application React ultra-réactive avec animations Framer Motion soignées, synchronisation d\'état Supabase et moteur de quiz modulaire.',
      architecture: 'React + TypeScript + Tailwind CSS avec state management optimiste, stockage des questions et classements sur Supabase.',
      keyFeatures: [
        'Questions à choix multiples et saisie de valeurs numériques',
        'Catégories spécialisées : Suites numériques, Séries entières, Équations différentielles',
        'Système de points, vies et chronomètre dynamique',
        'Tableau d\'honneur des meilleurs scores'
      ],
      challenges: [
        'Rendu propre des formules mathématiques sans dégradation des performances',
        'Anti-triche sur les scores soumis'
      ],
      currentState: 'Moteur de quiz fonctionnel avec banque initiale de questions mathématiques. Tests utilisateurs en cours.',
      nextSteps: [
        'Mode multijoueur synchrone en face à face',
        'Génération de nouvelles questions assistée par modèle IA'
      ]
    }
  },
  {
    id: 'proj-4',
    slug: 'cv-generator-pro',
    title: 'CV Generator Pro',
    tagline: 'Générateur de CV moderne assisté par intelligence artificielle',
    category: 'tool',
    categoryLabel: 'Outils & SaaS',
    status: 'mvp',
    statusLabel: 'MVP',
    featured: false,
    published: true,
    order: 4,
    description: 'Outil de productivité permettant aux étudiants et professionnels de composer un CV percutant avec modèles contemporains et suggestions de rédaction assistées par IA.',
    coverImage: 'cv-generator-cover',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'PDF Export'],
    caseStudy: {
      context: 'De nombreux étudiants en fin de cursus manquent de repères pour formuler leurs compétences et valoriser leurs projets techniques.',
      problem: 'Mises en page souvent décalées sous traitements de texte classiques et difficulté à rédiger des descriptions synthétiques orientées impact.',
      objectives: [
        'Générer des documents esthétiques conformes aux standards de recrutement',
        'Fournir une assistance rédactionnelle pour peaufiner les descriptions de projets',
        'Exportation PDF haute fidélité sans décalage de mise en page'
      ],
      solution: 'Interface en deux volets (saisie guidée à gauche, aperçu haute fidélité en temps réel à droite) avec intégration de modèles d\'IA pour reformuler les puces d\'expérience.',
      architecture: 'Application web React avec moteur de génération de styles CSS imprimables et connecteur API IA sécurisé.',
      keyFeatures: [
        'Modèles de mise en page modernes et lisibles',
        'Aperçu en temps réel avec zoom interactif',
        'Reformulation et optimisation des compétences par IA',
        'Export vectoriel PDF propre'
      ],
      challenges: [
        'Fidélité absolue entre l\'aperçu écran et le rendu d\'impression PDF',
        'Guidage ergonomique sans surcharger l\'utilisateur'
      ],
      currentState: 'MVP opérationnel avec 3 modèles de CV et export fonctionnel.',
      nextSteps: [
        'Ajout de modèles spécialisés profils créatifs et développeurs',
        'Analyse de concordance avec offres d\'emploi'
      ]
    }
  }
];

export const INITIAL_TECHNOLOGIES: Technology[] = [
  { id: 'tech-1', name: 'React', category: 'frontend', categoryLabel: 'Frontend', color: '#61DAFB', iconName: 'react', visible: true, order: 1 },
  { id: 'tech-2', name: 'TypeScript', category: 'frontend', categoryLabel: 'Frontend', color: '#3178C6', iconName: 'typescript', visible: true, order: 2 },
  { id: 'tech-3', name: 'Tailwind CSS', category: 'frontend', categoryLabel: 'Frontend', color: '#06B6D4', iconName: 'tailwind', visible: true, order: 3 },
  { id: 'tech-4', name: 'Laravel', category: 'backend', categoryLabel: 'Backend', color: '#FF2D20', iconName: 'laravel', visible: true, order: 4 },
  { id: 'tech-5', name: 'PHP', category: 'backend', categoryLabel: 'Backend', color: '#777BB4', iconName: 'php', visible: true, order: 5 },
  { id: 'tech-6', name: 'Node.js', category: 'backend', categoryLabel: 'Backend', color: '#5FA04E', iconName: 'nodejs', visible: true, order: 6 },
  { id: 'tech-7', name: 'PostgreSQL', category: 'database', categoryLabel: 'Base de données', color: '#4169E1', iconName: 'postgresql', visible: true, order: 7 },
  { id: 'tech-8', name: 'Supabase', category: 'database', categoryLabel: 'BaaS & Real-Time', color: '#3ECF8E', iconName: 'supabase', visible: true, order: 8 },
  { id: 'tech-9', name: 'Vite', category: 'tools', categoryLabel: 'Outillage', color: '#646CFF', iconName: 'vite', visible: true, order: 9 },
  { id: 'tech-10', name: 'Figma', category: 'design', categoryLabel: 'Design & UI/UX', color: '#F24E1E', iconName: 'figma', visible: true, order: 10 },
  { id: 'tech-11', name: 'Python', category: 'backend', categoryLabel: 'Langage & Data', color: '#3776AB', iconName: 'python', visible: true, order: 11 },
  { id: 'tech-12', name: 'Git & GitHub', category: 'tools', categoryLabel: 'Versionnement', color: '#F05032', iconName: 'git', visible: true, order: 12 },
  { id: 'tech-13', name: 'LiveKit', category: 'tools', categoryLabel: 'Temps réel', color: '#2563EB', iconName: 'livekit', visible: true, order: 13 },
  { id: 'tech-14', name: 'Intelligence Artificielle', category: 'ai', categoryLabel: 'IA & Prompts', color: '#d4f22b', iconName: 'ai', visible: true, order: 14 }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'serv-1',
    title: 'Développement Web & Applications Full-Stack',
    tagline: 'Des interfaces modernes reliées à des architectures backends solides',
    description: 'Conception et développement d\'applications sur-mesure combinant interfaces React ultra-rapides et APIs Laravel/Node.js structurées, sécurisées et évolutives.',
    deliverables: [
      'Frontend réactif, moderne et accessible (React, Tailwind CSS, TypeScript)',
      'Backend sécurisé, API REST ou GraphQL documentée',
      'Base de données relationnelle modélisée (PostgreSQL, Supabase, MySQL)',
      'Architecture propre avec gestion des rôles et autorisations'
    ],
    targetAudience: 'Entreprises, fondateurs et équipes recherchant une solution technique pérenne.',
    icon: 'code',
    active: true,
    order: 1
  },
  {
    id: 'serv-2',
    title: 'Conception & Lancement de MVP / Produits SaaS',
    tagline: 'Transformer une idée en un produit utilisable par de vrais utilisateurs',
    description: 'De la phase d\'idéation à la mise en ligne du produit minimum viable (MVP) : définition du périmètre essentiel, expérience utilisateur fluide et logique métier fonctionnelle.',
    deliverables: [
      'Cadrage du scope MVP pour maximiser la vitesse de mise sur le marché',
      'Système d\'authentification, rôles utilisateurs et gestion des profils',
      'Tableaux de bord d\'administration complets',
      'Préparation aux passerelles de paiement et notifications'
    ],
    targetAudience: 'Porteurs de projets et entrepreneurs voulant tester rapidement leur proposition de valeur.',
    icon: 'rocket',
    active: true,
    order: 2
  },
  {
    id: 'serv-3',
    title: 'Intégration d\'IA & Automatisation de Processus',
    tagline: 'Exploiter les technologies d\'IA pour décupler la valeur des produits',
    description: 'Intégration de modèles de langage (LLMs), traitement intelligent de documents, assistants ciblés et flux d\'automatisation connectés à vos applications.',
    deliverables: [
      'Intégration d\'APIs d\'intelligence artificielle sécurisées côté serveur',
      'Conception de prompts robustes et traitement structuré de données',
      'Automatisations de tâches récurrentes et intégrations inter-services',
      'Génération dynamique de contenus et synthèse'
    ],
    targetAudience: 'Organisations cherchant à automatiser des flux ou à enrichir leurs outils existants.',
    icon: 'sparkles',
    active: true,
    order: 3
  },
  {
    id: 'serv-4',
    title: 'Audit UI/UX & Refonte d\'Expérience Produit',
    tagline: 'Élever la qualité perçue et la conversion de vos applications',
    description: 'Amélioration de l\'ergonomie, des micro-interactions, de la clarté visuelle et de l\'accessibilité pour offrir une expérience digne des standards internationaux.',
    deliverables: [
      'Revue d\'utilisabilité et identification des frictions d\'usage',
      'Mise en place de Design Systems cohérents et réutilisables',
      'Animations de transition et micro-interactions discrètes et soignées',
      'Optimisation de la vitesse de chargement et conformité mobile'
    ],
    targetAudience: 'Applications nécessitant un saut de qualité visuelle et une meilleure rétention.',
    icon: 'layers',
    active: true,
    order: 4
  }
];

export const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq-1',
    name: 'Cabinet d\'Innovation Numérique',
    email: 'partenaire@innov-africa.com',
    company: 'InnovAfrica Group',
    projectType: 'SaaS & Plateforme',
    budget: '1 500 € - 3 000 €',
    message: 'Bonjour Jehovaly, nous avons découvert le projet Amphix. Nous aimerions échanger sur le développement d\'une plateforme éducative similaire avec modules de paiement.',
    status: 'reviewing',
    createdAt: '2026-10-15T14:30:00Z',
    notes: 'Profil intéressant, vérifier disponibilité pour appel découverte.'
  }
];
