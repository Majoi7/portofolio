import React from 'react';

interface MockupProps {
  slug: string;
  accentColor?: string;
}

export const ProjectMockup: React.FC<MockupProps> = ({ slug, accentColor = '#d4f22b' }) => {
  switch (slug) {
    case 'amphix':
      return (
        <div className="w-full h-full min-h-[260px] bg-gradient-to-br from-[#12151c] to-[#0a0c10] p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
          {/* Subtle glow in corner */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />

          {/* Top Bar of the Mockup */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-neutral-400 font-medium">amphix.site</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
              En développement
            </span>
          </div>

          {/* Mockup Body: Mentor Matching Interface */}
          <div className="my-auto py-4 flex flex-col gap-3 z-10">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                  M1
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Algorithmique &amp; C</div>
                  <div className="text-[10px] text-neutral-400">Mentor IFRI • 4.9 ★ (34 séances)</div>
                </div>
              </div>
              <span
                className="text-xs font-bold px-3 py-1 rounded-md text-[#0a0a0a]"
                style={{ backgroundColor: accentColor }}
              >
                Réserver
              </span>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 opacity-70">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-xs text-neutral-300">
                  M2
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-200">Analyse Mathématique</div>
                  <div className="text-[10px] text-neutral-500">2 créneaux libres ce soir</div>
                </div>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">Disponible</span>
            </div>
          </div>

          {/* Footer stats bar */}
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/[0.05] z-10">
            <span>Laravel REST + React</span>
            <span>Supabase / Postgres</span>
          </div>
        </div>
      );

    case 'amphix-meet':
      return (
        <div className="w-full h-full min-h-[260px] bg-gradient-to-br from-[#0d121b] to-[#06080d] p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
          {/* Top header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[11px] text-neutral-300">Amphix Meet • Salon LiveKit</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
              Chiffré WebRTC
            </span>
          </div>

          {/* Video grid mockup */}
          <div className="grid grid-cols-2 gap-3 my-auto py-2 z-10">
            <div className="aspect-video bg-neutral-900/90 rounded-lg border border-white/10 p-2.5 flex flex-col justify-between relative overflow-hidden shadow">
              <div className="flex justify-between items-center text-[10px] text-neutral-400">
                <span>Mentor (Bénin)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 self-center flex items-center justify-center font-mono text-xs text-neutral-400 border border-white/10">
                CAM 1
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
                <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce delay-75" />
                <span className="w-1 h-1 bg-emerald-400 rounded-full" />
              </div>
            </div>

            <div className="aspect-video bg-neutral-900/90 rounded-lg border border-white/10 p-2.5 flex flex-col justify-between relative shadow">
              <div className="flex justify-between items-center text-[10px] text-neutral-400">
                <span>Étudiant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
              </div>
              <div className="w-12 h-12 rounded-full bg-neutral-800 self-center flex items-center justify-center font-mono text-xs text-neutral-400 border border-white/10">
                CAM 2
              </div>
              <span className="text-[9px] text-neutral-500 font-mono">Micro actif</span>
            </div>
          </div>

          {/* Bottom Bar: Action Controls */}
          <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/[0.05] z-10">
            <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 text-xs shadow">
              🎤
            </div>
            <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 text-xs shadow">
              📹
            </div>
            <div className="w-7 h-7 rounded-full bg-red-600/90 flex items-center justify-center text-white text-xs shadow">
              ✕
            </div>
          </div>
        </div>
      );

    case 'amphix-game':
      return (
        <div className="w-full h-full min-h-[260px] bg-gradient-to-br from-[#191522] to-[#0a0812] p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
          {/* Top Header with Lives & Score */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 z-10">
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
              <span>❤️❤️❤️</span>
              <span className="text-neutral-400 ml-1">3 Vies</span>
            </div>
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white"
            >
              Score: 2 450 pts
            </span>
          </div>

          {/* Question card */}
          <div className="my-auto py-2 z-10">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Équations Différentielles • Q4
            </div>
            <div className="text-sm font-semibold text-white mb-3">
              Solution générale de y&apos;&apos; + 4y = 0 ?
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                className="p-2 rounded-lg text-xs font-mono font-medium flex items-center justify-between border border-[#d4f22b]/50 bg-[#d4f22b]/10 text-white"
              >
                <span>A. C₁ cos(2x) + C₂ sin(2x)</span>
                <span className="text-emerald-400 text-xs">✓</span>
              </div>
              <div className="p-2 rounded-lg text-xs font-mono text-neutral-400 border border-white/5 bg-white/[0.02]">
                <span>B. C₁ e^(2x) + C₂ e^(-2x)</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden z-10">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: '70%', backgroundColor: accentColor }}
            />
          </div>
        </div>
      );

    case 'cv-generator-pro':
    default:
      return (
        <div className="w-full h-full min-h-[260px] bg-gradient-to-br from-[#141818] to-[#090c0c] p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-neutral-300">CV Generator Pro</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
              Export PDF Vectoriel
            </span>
          </div>

          {/* Mini Two-pane Layout */}
          <div className="grid grid-cols-2 gap-3 my-auto py-2 z-10">
            <div className="bg-white/[0.03] rounded-lg border border-white/10 p-2.5 flex flex-col gap-1.5 text-[10px] font-mono text-neutral-400">
              <span className="text-neutral-200 font-semibold">Éditeur IA</span>
              <div className="bg-white/[0.05] p-1.5 rounded text-[9px] text-neutral-300">
                ✨ Reformuler la description de poste...
              </div>
              <div className="h-1 bg-white/10 rounded w-4/5" />
              <div className="h-1 bg-white/10 rounded w-2/3" />
            </div>

            {/* Resume Sheet Preview */}
            <div className="bg-white rounded-md p-2.5 shadow-xl flex flex-col gap-1 text-[8px] text-neutral-800">
              <div className="w-8 h-2 bg-neutral-900 rounded-sm mb-1" />
              <div className="w-full h-1 bg-neutral-300 rounded-sm" />
              <div className="w-4/5 h-1 bg-neutral-300 rounded-sm" />
              <div className="mt-1 pt-1 border-t border-neutral-200 flex gap-1">
                <div className="w-1/2 h-4 bg-neutral-100 rounded-sm" />
                <div className="w-1/2 h-4 bg-neutral-100 rounded-sm" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/[0.05] z-10">
            <span>React + Gemini API</span>
            <span className="text-emerald-400">MVP Opérationnel</span>
          </div>
        </div>
      );
  }
};
