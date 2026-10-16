/**
 * Pure domain logic for Jehovaly DJIMADJO Portfolio & Admin
 * Decoupled from React DOM for deterministic testing and zero-regression reliability.
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'saas' | 'web' | 'ai' | 'game' | 'tool';
  categoryLabel: string;
  status: 'production' | 'in_development' | 'prototype' | 'mvp';
  statusLabel: string;
  featured: boolean;
  published: boolean;
  order: number;
  description: string;
  coverImage: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: {
    context: string;
    problem: string;
    objectives: string[];
    solution: string;
    architecture: string;
    keyFeatures: string[];
    challenges: string[];
    currentState: string;
    nextSteps: string[];
  };
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'reviewing' | 'in_discussion' | 'accepted' | 'declined' | 'completed' | 'archived';
  createdAt: string;
  notes?: string;
}

/**
 * Filter and sort projects based on active filter and publication state
 */
export function filterProjects(
  projects: Project[],
  categoryFilter: string,
  onlyPublished = true
): Project[] {
  return projects
    .filter((p) => (!onlyPublished || p.published) && (categoryFilter === 'all' || p.category === categoryFilter))
    .sort((a, b) => a.order - b.order);
}

/**
 * Computes counts for navigation superscripts and dashboard stats
 */
export function calculateProjectMetrics(projects: Project[]) {
  const published = projects.filter((p) => p.published);
  const byCategory: Record<string, number> = {};

  for (const p of published) {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  }

  return {
    total: projects.length,
    publishedCount: published.length,
    draftCount: projects.length - published.length,
    featuredCount: published.filter((p) => p.featured).length,
    categoryCounts: byCategory,
  };
}

/**
 * Validates contact form submission
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const trimmedName = data.name.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'Le nom doit comporter au moins 2 caractères.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
    errors.email = 'Veuillez renseigner une adresse email valide.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage || trimmedMessage.length < 10) {
    errors.message = 'Votre message doit contenir au moins 10 caractères.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * State machine for client inquiry statuses
 */
export const ALLOWED_STATUS_TRANSITIONS: Record<ClientInquiry['status'], ClientInquiry['status'][]> = {
  new: ['reviewing', 'in_discussion', 'declined', 'archived'],
  reviewing: ['in_discussion', 'accepted', 'declined', 'archived'],
  in_discussion: ['accepted', 'declined', 'archived'],
  accepted: ['completed', 'archived'],
  declined: ['archived'],
  completed: ['archived'],
  archived: ['new', 'reviewing'],
};

export function canTransitionInquiryStatus(
  current: ClientInquiry['status'],
  target: ClientInquiry['status']
): boolean {
  if (current === target) return true;
  return ALLOWED_STATUS_TRANSITIONS[current]?.includes(target) ?? false;
}

/**
 * Color luminance and WCAG AA contrast calculator (ratio >= 4.5 for normal text, >= 3.0 for large/bold text)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const sanitized = hex.replace(/^#/, '');
  if (!/^[0-9A-Fa-f]{6}$/.test(sanitized)) return null;
  const num = parseInt(sanitized, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;

  const lum1 = relativeLuminance(rgb1);
  const lum2 = relativeLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function validateLimeAccentContrast(accentHex: string): {
  ratioWithDark: number;
  passesWcagDark: boolean;
  ratioWithWhite: number;
  passesWcagWhite: boolean;
} {
  const ratioDark = calculateContrastRatio(accentHex, '#0a0a0a');
  const ratioWhite = calculateContrastRatio(accentHex, '#ffffff');

  return {
    ratioWithDark: Math.round(ratioDark * 100) / 100,
    passesWcagDark: ratioDark >= 4.5,
    ratioWithWhite: Math.round(ratioWhite * 100) / 100,
    passesWcagWhite: ratioWhite >= 4.5,
  };
}
