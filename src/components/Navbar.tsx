import React, { useState } from 'react';
import { Menu, X, Shield, Globe } from 'lucide-react';

interface NavbarProps {
  projectCount: number;
  serviceCount: number;
  accentColor?: string;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  projectCount,
  serviceCount,
  accentColor = '#d4f22b',
  onOpenAdmin,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Accueil', count: undefined },
    { id: 'projects', label: 'Projets', count: projectCount > 0 ? projectCount : undefined },
    { id: 'services', label: 'Services', count: serviceCount > 0 ? serviceCount : undefined },
    { id: 'about', label: 'À propos', count: undefined },
    { id: 'contact', label: 'Contact', count: undefined },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo: Jeho* */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="group flex items-center gap-0.5 text-2xl font-bold tracking-tight text-white focus:outline-none cursor-pointer"
          aria-label="Accueil Jehovaly DJIMADJO"
        >
          <span className="font-display">Jeho</span>
          <span
            className="text-2xl font-extrabold inline-block transition-transform duration-300 group-hover:rotate-45"
            style={{ color: accentColor }}
          >
            *
          </span>
        </button>

        {/* Desktop Navigation Links with real numerical superscripts */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="group text-sm font-medium text-[#f5f5f5]/80 hover:text-white transition-colors cursor-pointer py-1 flex items-baseline gap-1"
            >
              <span className="text-roll">
                <span className="text-roll-inner">
                  <span>{link.label}</span>
                  <span className="text-white font-semibold">{link.label}</span>
                </span>
              </span>
              {link.count !== undefined && (
                <sup
                  className="text-[10px] font-semibold tracking-tighter"
                  style={{ color: accentColor }}
                >
                  {link.count}
                </sup>
              )}
            </button>
          ))}
        </nav>

        {/* Right side CTA & Admin entry */}
        <div className="hidden md:flex items-center gap-4">
          {/* Admin shortcut button */}
          <button
            onClick={onOpenAdmin}
            title="Espace Administration privé"
            className="p-2 rounded-full text-[#8a8a8a] hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-white/20"
            aria-label="Ouvrir l'administration"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* White pill button: "Parlons de votre projet" with lime dot */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-[#0a0a0a] font-medium text-xs tracking-tight shadow-md hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            {/* Pulsing lime green dot */}
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-roll">
              <span className="text-roll-inner">
                <span>Parlons de votre projet</span>
                <span className="font-semibold">Prendre contact →</span>
              </span>
            </span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAdmin}
            aria-label="Accéder à l'administration"
            className="p-2 text-[#8a8a8a] hover:text-white rounded-lg"
          >
            <Shield className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="p-2 text-white hover:text-neutral-300 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/[0.08] px-6 py-8 flex flex-col gap-6 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="flex items-center justify-between text-lg font-medium text-[#f5f5f5] py-2 border-b border-white/[0.05]"
              >
                <span>{link.label}</span>
                {link.count !== undefined && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] font-bold"
                    style={{ color: accentColor }}
                  >
                    {link.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleLinkClick('contact')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#0a0a0a] font-semibold text-sm shadow-lg mt-2 cursor-pointer"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            Parlons de votre projet
          </button>
        </div>
      )}
    </header>
  );
};
