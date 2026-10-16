/**
 * Portfolio personnel & Studio — Jehovaly Majoi DJIMADJO
 * Reproduction exacte du Hero et de l'Animation selon la spécification de l'utilisateur
 * @license Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { usePortfolioStore } from './hooks/usePortfolioStore';
import { Project } from './lib/portfolio-logic';

// Lazy load components for code splitting
// Note: Most components have named exports, so we need to extract the named export
// PageLoader has a default export, so we can use regular lazy
const OpeningAnimation = lazy(() => import('./components/OpeningAnimation').then(module => ({ default: module.OpeningAnimation })));
const Hero = lazy(() => import('./components/Hero').then(module => ({ default: module.Hero })));
const SiteBIntro = lazy(() => import('./components/SiteBIntro').then(module => ({ default: module.SiteBIntro })));
const TechMarquee = lazy(() => import('./components/TechMarquee').then(module => ({ default: module.TechMarquee })));
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid').then(module => ({ default: module.ProjectsGrid })));
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal').then(module => ({ default: module.CaseStudyModal })));
const ServicesSection = lazy(() => import('./components/ServicesSection').then(module => ({ default: module.ServicesSection })));
const AboutSection = lazy(() => import('./components/AboutSection').then(module => ({ default: module.AboutSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const PageLoader = lazy(() => import('./components/PageLoader'));

export default function App() {
  const store = usePortfolioStore();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [contactPrefilledService, setContactPrefilledService] = useState('');

  // Show loading state while data is being fetched from Supabase
  if (store.isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full border-4 border-[#d4f22b] border-t-transparent w-12 h-12 mx-auto mb-4"></div>
          <p>Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  const publishedProjects = store.projects.filter((p) => p.published);
  const activeServices = store.services.filter((s) => s.active);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setContactPrefilledService(serviceTitle);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#d4f22b] selection:text-[#050505] antialiased">
      <Suspense fallback={<PageLoader />}>
        {/* 1. Exact Opening Animation (3x3 grid loader clip-path specification) */}
        <OpeningAnimation
          accentColor={store.settings.accentColor}
        />

        <main>
          {/* 2. Exact Hero Section (Hero, Halo, Portrait, Nav, Roll text, Wordmark Jeho*, Copy, Demo controls) */}
          <Hero
            wordmark={store.settings.wordmark}
            projectCount={publishedProjects.length}
            copyrightYear={store.settings.copyrightYear}
            onNavigate={scrollToSection}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />

          {/* 3. Site B Intro: Centered Headline, Avatar & Outline Button */}
          <SiteBIntro
            accentColor={store.settings.accentColor}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* 4. Tool Band: Infinite masked marquee with official brand SVG icons */}
          <TechMarquee technologies={store.technologies} />

          {/* 5. Case Studies / Projects: Staggered 2-column grid with ~28px radius and invert arrow button */}
          <ProjectsGrid
            projects={store.projects}
            accentColor={store.settings.accentColor}
            onSelectProject={(project) => setSelectedCaseStudy(project)}
          />

          {/* 6. Services & Offerings with concrete deliverables */}
          <ServicesSection
            services={store.services}
            accentColor={store.settings.accentColor}
            onSelectService={handleSelectService}
          />

          {/* 7. About Section: IFRI, practical product building philosophy */}
          <AboutSection
            accentColor={store.settings.accentColor}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* 8. Contact Form: functional, validated, records inquiries in admin + WhatsApp */}
          <ContactSection
            accentColor={store.settings.accentColor}
            whatsappNumber={store.settings.whatsappNumber}
            email={store.settings.email}
            prefilledProjectType={contactPrefilledService}
            onInquirySubmitted={(inquiry) => {
              store.addInquiry(inquiry);
            }}
          />
        </main>

        {/* 9. Footer with replay animation shortcut, admin and copyright */}
        <Footer
          copyrightYear={store.settings.copyrightYear}
          wordmark={store.settings.wordmark}
          accentColor={store.settings.accentColor}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 10. Case Study Modal (matching video frame 00:04/00:05 layout) */}
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          accentColor={store.settings.accentColor}
        />

        {/* 11. Full-featured Private Admin Dashboard (Modules A through L) */}
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          isAuthenticated={store.isAdminAuthenticated}
          onLogin={store.loginAdmin}
          onLogout={store.logoutAdmin}
          settings={store.settings}
          projects={store.projects}
          technologies={store.technologies}
          services={store.services}
          inquiries={store.inquiries}
          onUpdateSettings={store.updateSettings}
          onAddProject={store.addProject}
          onUpdateProject={store.updateProject}
          onDeleteProject={store.deleteProject}
          onToggleProjectPublished={store.toggleProjectPublished}
          onToggleProjectFeatured={store.toggleProjectFeatured}
          onToggleTechVisible={store.toggleTechVisible}
          onToggleServiceActive={store.toggleServiceActive}
          onUpdateInquiryStatus={store.updateInquiryStatus}
          onUpdateInquiryNotes={store.updateInquiryNotes}
          onDeleteInquiry={store.deleteInquiry}
          onResetDefaults={store.resetToDefaults}
        />
      </Suspense>
    </div>
  );
}
