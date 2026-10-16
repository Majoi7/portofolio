import React from 'react';
import { Code, Rocket, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Service } from '../data/portfolioData';

interface ServicesSectionProps {
  services: Service[];
  accentColor?: string;
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  accentColor = '#d4f22b',
  onSelectService,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'rocket':
        return <Rocket className="w-5 h-5 text-amber-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" style={{ color: accentColor }} />;
      case 'layers':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'code':
      default:
        return <Code className="w-5 h-5 text-emerald-400" />;
    }
  };

  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <div className="mb-14">
        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
          <span style={{ color: accentColor }}>02</span>
          <span>Services &amp; Expertises</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Ce que je peux concevoir pour votre projet
        </h3>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
          Des interventions ciblées où j&apos;allie logique de conception produit, développement rigoureux et souci du détail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeServices.map((service) => (
          <div
            key={service.id}
            className="group relative rounded-[28px] bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/20 p-8 flex flex-col justify-between transition-all duration-300 shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6">
                {getIcon(service.icon)}
              </div>

              <h4 className="text-xl font-display font-semibold text-white tracking-tight mb-2">
                {service.title}
              </h4>
              <p className="text-xs font-mono text-neutral-400 mb-4">
                {service.tagline}
              </p>
              <p className="text-sm text-[#bdbdbd] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Deliverables list */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Livrables concrets :
                </span>
                {service.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 bg-neutral-500" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                Idéal pour : <strong className="text-white font-medium">{service.targetAudience}</strong>
              </span>

              <button
                onClick={() => onSelectService(service.title)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-neutral-200 cursor-pointer"
              >
                <span>Demander un devis</span>
                <ArrowRight className="w-3.5 h-3.5" style={{ color: accentColor }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
