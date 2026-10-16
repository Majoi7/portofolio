import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SiteBIntroProps {
  onContactClick: () => void;
  accentColor?: string;
}

export const SiteBIntro: React.FC<SiteBIntroProps> = ({
  onContactClick,
  accentColor = '#d4f22b',
}) => {
  return (
    <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
      {/* Small Creator Avatar & Salutation (as seen in video frame 00:02) */}
      <div className="flex items-center gap-3 mb-6 animate-fadeIn">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-neutral-900 shadow-inner flex items-center justify-center">
          {/* Avatar representation */}
          <span className="font-display font-bold text-base text-white">JD</span>
          <div
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#050505]"
            style={{ backgroundColor: accentColor }}
          />
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-neutral-300">
          <span>👋 Salut, je suis Jehovaly !</span>
        </div>
      </div>

      {/* 3-line Headline in clean grotesque font, tight letter-spacing */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-[1.15] max-w-4xl mb-8">
        Développeur Full-Stack avec une vraie sensibilité produit &amp; SaaS dans mon ADN.
        <span className="block text-neutral-400 font-normal text-2xl sm:text-3xl md:text-4xl mt-3">
          Basé au Bénin • Étudiant à l'IFRI.
        </span>
      </h2>

      {/* Pill outline button: "Collaborer avec moi →" (Video frame 00:02 "Hire Me →") */}
      <button
        onClick={onContactClick}
        className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/25 hover:border-white text-white font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-[#050505] cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>Collaborer avec moi</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};
