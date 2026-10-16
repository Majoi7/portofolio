import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Layers, Cpu, Compass } from 'lucide-react';
import { Project } from '../lib/portfolio-logic';
import { ProjectMockup } from './ProjectMockups';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  accentColor?: string;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  accentColor = '#d4f22b',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const cs = project.caseStudy;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Étude de cas détaillée : ${project.title}`}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex justify-center p-3 sm:p-6 md:p-10 animate-fadeIn"
    >
      {/* Centered Narrow Case Study Column (~780 - 840px as in video frame 00:04) */}
      <div className="relative w-full max-w-3xl bg-[#090b0e] border border-white/[0.1] rounded-[32px] p-6 sm:p-10 text-white shadow-2xl my-auto">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          aria-label="Fermer l'étude de cas"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Category */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10"
              style={{ color: accentColor }}
            >
              {project.categoryLabel}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              • {project.statusLabel}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-base text-neutral-300 mt-2 font-normal">
            {project.tagline}
          </p>
        </div>

        {/* Hero Rounded Cover Banner (radius ~28px) */}
        <div className="w-full aspect-video rounded-[28px] overflow-hidden border border-white/[0.08] mb-10 shadow-lg">
          <ProjectMockup slug={project.slug} accentColor={accentColor} />
        </div>

        {/* Technologies Pills */}
        <div className="mb-10 pb-6 border-b border-white/[0.08]">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
            Technologies &amp; Architecture
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study Sections with Video Frame 00:04/00:05 Format */}
        {cs && (
          <div className="space-y-10 text-sm leading-relaxed text-[#bdbdbd]">
            {/* 01 Contexte & Problème */}
            <div>
              <div className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-2">
                <span className="font-mono text-sm" style={{ color: accentColor }}>01</span>
                <span>Contexte &amp; Problème initial</span>
              </div>
              <p className="mb-3">{cs.context}</p>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-neutral-300">
                <span className="font-semibold text-white">Le problème identifié : </span>
                {cs.problem}
              </div>
            </div>

            {/* 02 Objectifs & Solution */}
            <div>
              <div className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-2">
                <span className="font-mono text-sm" style={{ color: accentColor }}>02</span>
                <span>Objectifs &amp; Solution développée</span>
              </div>
              <p className="mb-4">{cs.solution}</p>
              <ul className="space-y-2">
                {cs.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 03 Architecture technique */}
            <div>
              <div className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-2">
                <span className="font-mono text-sm" style={{ color: accentColor }}>03</span>
                <span>Architecture technique &amp; Décisions</span>
              </div>
              <p className="p-4 rounded-2xl bg-[#050505] border border-white/[0.08] font-mono text-xs text-neutral-300">
                {cs.architecture}
              </p>
            </div>

            {/* 04 Fonctionnalités clés */}
            <div>
              <div className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-2">
                <span className="font-mono text-sm" style={{ color: accentColor }}>04</span>
                <span>Fonctionnalités principales</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cs.keyFeatures.map((feat, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                    <span className="text-white font-medium block mb-1">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 05 Défis & État actuel */}
            <div>
              <div className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-2">
                <span className="font-mono text-sm" style={{ color: accentColor }}>05</span>
                <span>Défis rencontrés &amp; État actuel</span>
              </div>
              <p className="mb-3">{cs.currentState}</p>
              <div className="space-y-1.5">
                {cs.challenges.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                    <span className="text-amber-400">⚡</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 06 Prochaines étapes */}
            <div>
              <div className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-2">
                <span className="font-mono text-sm" style={{ color: accentColor }}>06</span>
                <span>Prochaines évolutions</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300">
                {cs.nextSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* External Verified Links if applicable */}
        <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#0a0a0a] transition-transform hover:scale-105"
                style={{ backgroundColor: accentColor }}
              >
                <span>Visiter {project.title}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code source</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Fermer l'étude de cas (Échap)
          </button>
        </div>
      </div>
    </div>
  );
};
