import React, { useState } from 'react';
import { Technology } from '../data/portfolioData';
import { TechIcon } from './TechIcons';

interface TechMarqueeProps {
  technologies: Technology[];
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ technologies }) => {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  const visibleTechs = technologies
    .filter((t) => t.visible)
    .sort((a, b) => a.order - b.order);

  // Duplicate list to achieve continuous seamless infinite scroll
  const marqueeList = [...visibleTechs, ...visibleTechs];

  return (
    <div className="w-full py-8 overflow-hidden relative">
      {/* Container with Edge Gradient Mask (Faded Borders) */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative w-full overflow-hidden mask-marquee py-3">
          <div className="animate-marquee flex items-center gap-3 sm:gap-4">
            {marqueeList.map((tech, idx) => (
              <div
                key={`${tech.id}-${idx}`}
                onClick={() => setSelectedTech(tech)}
                className="group relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/25 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-sm"
                title={`${tech.name} (${tech.categoryLabel})`}
              >
                {/* Authentic Tech Icon */}
                <TechIcon name={tech.iconName} className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-105" />

                {/* Floating tooltip on hover (desktop) */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 px-2 py-0.5 rounded bg-neutral-900 border border-white/10 text-[10px] font-mono text-neutral-300 whitespace-nowrap shadow-xl">
                  {tech.name} • {tech.categoryLabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / Tap Info Drawer if tapped on small screen */}
      {selectedTech && (
        <div className="sm:hidden mt-2 text-center text-xs text-neutral-400 animate-fadeIn">
          <span className="font-semibold text-white">{selectedTech.name}</span> — {selectedTech.categoryLabel}
        </div>
      )}
    </div>
  );
};
