import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project, filterProjects } from '../lib/portfolio-logic';
import { ProjectMockup } from './ProjectMockups';

interface ProjectsGridProps {
  projects: Project[];
  accentColor?: string;
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  accentColor = '#d4f22b',
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'saas', label: 'SaaS & Plateformes' },
    { id: 'game', label: 'Quiz & Jeux' },
    { id: 'tool', label: 'Outils & Productivité' },
  ];

  const filtered = filterProjects(projects, activeCategory, true);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header with Video Frame 00:03 Superscript Label */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <span style={{ color: accentColor }}>01</span>
            <span>Case Studies</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Projets sélectionnés &amp; réalisations
          </h3>
        </div>

        {/* Functional Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#050505] shadow-md font-semibold'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Staggered Grid (as seen in video frame 00:03) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filtered.map((project, index) => {
          // Stagger right column on desktop (even index = left, odd = right offset)
          const isStaggered = index % 2 === 1;

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group flex flex-col cursor-pointer transition-all duration-300 ${
                isStaggered ? 'md:translate-y-8' : ''
              }`}
            >
              {/* Card Surface: Rounded ~28px as specified */}
              <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-white/[0.08] group-hover:border-white/25 bg-[#0a0c10] shadow-xl transition-all duration-500">
                {/* Visual Mockup */}
                <ProjectMockup slug={project.slug} accentColor={accentColor} />

                {/* Corner Quick-Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-[#050505]/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Footer underneath (as seen in video frame 00:03) */}
              <div className="flex items-center justify-between pt-4 px-2">
                <div>
                  <h4 className="text-base sm:text-lg font-display font-semibold text-white tracking-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
                    <span>{project.tagline}</span>
                    <span>•</span>
                    <span
                      className="font-mono text-[11px] font-medium"
                      style={{ color: accentColor }}
                    >
                      {project.statusLabel}
                    </span>
                  </div>
                </div>

                {/* 40px Circular Outline Button with Arrow (Inverts on hover as in video) */}
                <div
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#050505] group-hover:scale-105 shadow-sm"
                  aria-label={`Voir l'étude de cas pour ${project.title}`}
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
