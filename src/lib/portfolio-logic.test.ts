import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  calculateProjectMetrics,
  validateContactForm,
  canTransitionInquiryStatus,
  calculateContrastRatio,
  validateLimeAccentContrast,
  type Project,
} from './portfolio-logic.ts';

const mockProjects: Project[] = [
  {
    id: '1',
    slug: 'amphix',
    title: 'Amphix',
    tagline: 'Plateforme éducative',
    category: 'saas',
    categoryLabel: 'SaaS & Plateforme',
    status: 'in_development',
    statusLabel: 'En développement actif',
    featured: true,
    published: true,
    order: 1,
    description: 'Plateforme de mentorat.',
    coverImage: '/projects/amphix.jpg',
    technologies: ['Laravel', 'React', 'PostgreSQL'],
  },
  {
    id: '2',
    slug: 'amphix-meet',
    title: 'Amphix Meet',
    tagline: 'Visioconférence sécurisée',
    category: 'saas',
    categoryLabel: 'SaaS & Plateforme',
    status: 'prototype',
    statusLabel: 'Prototype architectural',
    featured: false,
    published: true,
    order: 2,
    description: 'Infrastructure visioconférence.',
    coverImage: '/projects/meet.jpg',
    technologies: ['React', 'Laravel', 'LiveKit'],
  },
  {
    id: '3',
    slug: 'draft-project',
    title: 'Projet Secret',
    tagline: 'Non publié',
    category: 'ai',
    categoryLabel: 'IA & Automatisation',
    status: 'prototype',
    statusLabel: 'En conception',
    featured: false,
    published: false,
    order: 3,
    description: 'Expérimentation interne.',
    coverImage: '',
    technologies: ['Python'],
  },
];

test('filterProjects correctly filters by category and published status', () => {
  const publishedOnly = filterProjects(mockProjects, 'all', true);
  assert.equal(publishedOnly.length, 2);
  assert.equal(publishedOnly[0].slug, 'amphix');

  const saasOnly = filterProjects(mockProjects, 'saas', true);
  assert.equal(saasOnly.length, 2);

  const aiOnly = filterProjects(mockProjects, 'ai', false);
  assert.equal(aiOnly.length, 1);
  assert.equal(aiOnly[0].slug, 'draft-project');
});

test('calculateProjectMetrics returns accurate statistics for badges and superscripts', () => {
  const metrics = calculateProjectMetrics(mockProjects);
  assert.equal(metrics.total, 3);
  assert.equal(metrics.publishedCount, 2);
  assert.equal(metrics.draftCount, 1);
  assert.equal(metrics.featuredCount, 1);
  assert.equal(metrics.categoryCounts['saas'], 2);
  assert.equal(metrics.categoryCounts['ai'], undefined);
});

test('validateContactForm checks valid emails and required lengths', () => {
  const validResult = validateContactForm({
    name: 'Sarah Connor',
    email: 'sarah@skynet.com',
    message: 'Bonjour Jehovaly, discutons de notre projet SaaS !',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);

  const invalidResult = validateContactForm({
    name: '',
    email: 'invalid-email',
    message: 'Court',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.message);
});

test('canTransitionInquiryStatus enforces deterministic business workflow', () => {
  assert.equal(canTransitionInquiryStatus('new', 'reviewing'), true);
  assert.equal(canTransitionInquiryStatus('new', 'in_discussion'), true);
  assert.equal(canTransitionInquiryStatus('new', 'completed'), false);
  assert.equal(canTransitionInquiryStatus('accepted', 'completed'), true);
});

test('validateLimeAccentContrast guarantees WCAG AA compliance with dark text', () => {
  // Test #d4f22b (citron vert)
  const contrast = validateLimeAccentContrast('#d4f22b');
  // Lime green on dark (#0a0a0a) must have very high contrast > 10:1 (passes AA and AAA)
  assert.ok(contrast.ratioWithDark >= 10, `Ratio was ${contrast.ratioWithDark}`);
  assert.equal(contrast.passesWcagDark, true);

  // White text on lime green must fail WCAG (prompt forbids white text on lime)
  assert.equal(contrast.passesWcagWhite, false);
});
