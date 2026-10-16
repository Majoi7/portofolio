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

export const INITIAL_PROJECTS: Project[] = [];

export const INITIAL_TECHNOLOGIES: Technology[] = [];

export const INITIAL_SERVICES: Service[] = [];

export const INITIAL_INQUIRIES: ClientInquiry[] = [];