import React from 'react';
import { CheckCircle2, GraduationCap, Compass, Code2 } from 'lucide-react';

interface AboutSectionProps {
  accentColor?: string;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  accentColor = '#d4f22b',
  onContactClick,
}) => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading and Identity Signature */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <span style={{ color: accentColor }}>03</span>
            <span>À propos de moi</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight mb-6">
            L&apos;apprentissage par la pratique et l&apos;amour des produits bien conçus.
          </h3>

          <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/[0.08] mb-6">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Signature &amp; Philosophie
            </div>
            <blockquote className="text-lg font-display font-medium text-white italic">
              « Je transforme des idées en expériences numériques utiles. »
            </blockquote>
          </div>

          <div className="space-y-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-neutral-300" />
              <span>Étudiant à l'IFRI • Bénin (Informatique &amp; Web)</span>
            </div>
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-neutral-300" />
              <span>Langues : Français (courant) • Anglais (intermédiaire)</span>
            </div>
            <div className="flex items-center gap-3">
              <Code2 className="w-4 h-4 text-neutral-300" />
              <span>Piliers : Full-Stack • SaaS • Intégration IA • Temps Réel</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Values */}
        <div className="lg:col-span-7 space-y-6 text-[#bdbdbd] text-sm sm:text-base leading-relaxed">
          <p>
            Je m&apos;appelle <strong className="text-white">Jehovaly Majoi DJIMADJO</strong>. Étudiant en informatique au Bénin, j&apos;ai choisi de ne pas attendre la fin de mon cursus universitaire pour concevoir des applications et bâtir de véritables projets numériques.
          </p>

          <p>
            Mon approche est résolument orientée vers le concret : comprendre un besoin réel, explorer les meilleures technologies adaptées (React, Laravel, TypeScript, Supabase, LiveKit), concevoir une interface épurée et intuitive, et itérer jusqu&apos;à obtenir un produit solide et agréable à utiliser.
          </p>

          <p>
            La création de plateformes comme <span className="text-white font-medium">Amphix</span> (mentorat académique), <span className="text-white font-medium">Amphix Meet</span> (visioconférence sécurisée avec WebRTC) ou encore <span className="text-white font-medium">Amphix Game</span> témoigne de cette volonté permanente : explorer des domaines exigeants tout en livrant du code propre, maintenable et sécurisé.
          </p>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="font-semibold text-white block mb-1 text-sm">Curiosité &amp; Autonomie</span>
              <p className="text-xs text-neutral-400">
                Capacité à apprendre rapidement de nouveaux frameworks, protocoles ou API pour résoudre des défis techniques.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="font-semibold text-white block mb-1 text-sm">Sens du Produit</span>
              <p className="text-xs text-neutral-400">
                Une vision au-delà de la technique : expérience utilisateur, flux de conversion et utilité concrète pour l'utilisateur final.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onContactClick}
              className="px-6 py-3 rounded-full bg-white text-[#050505] font-semibold text-xs tracking-wide hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Échanger sur votre projet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
