import React from 'react';
import { ArrowUp, Play, Shield, Github } from 'lucide-react';

interface FooterProps {
  copyrightYear?: number;
  wordmark?: string;
  accentColor?: string;
  onReplayIntro: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  copyrightYear = 2026,
  wordmark = 'Jeho',
  accentColor = '#d4f22b',
  onReplayIntro,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#050505] text-[#8a8a8a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand signature & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
          <div className="flex items-center gap-1 font-display font-bold text-white text-base">
            <span>{wordmark}</span>
            <span style={{ color: accentColor }}>*</span>
          </div>
          <span>•</span>
          <span>©{copyrightYear} Jehovaly Majoi DJIMADJO. Tous droits réservés.</span>
          <span>•</span>
          <span className="text-neutral-400">Bénin • Développeur Full-Stack</span>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-4 text-xs">
          {/* Replay Intro Animation Button */}
          <button
            onClick={onReplayIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Rejouer l'animation d'ouverture de la vidéo"
          >
            <Play className="w-3 h-3 text-[#d4f22b]" />
            <span>Rejouer l'intro</span>
          </button>

          {/* Admin Dashboard Entry */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <Shield className="w-3 h-3" />
            <span>Admin Dashboard</span>
          </button>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Retourner en haut"
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
