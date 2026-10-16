import React, { useEffect, useRef, useState } from 'react';
import { Shield } from 'lucide-react';

interface HeroProps {
  wordmark?: string;
  projectCount?: number;
  copyrightYear?: number;
  onNavigate?: (id: string) => void;
  onReplay?: () => void;
  onOpenAdmin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  wordmark = 'Jeho',
  projectCount = 4,
  copyrightYear = 2026,
  onNavigate = () => {},
  onReplay = () => {},
  onOpenAdmin = () => {},
}) => {
  const haloRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [portraitSrc, setPortraitSrc] = useState<string | null>(() => {
    try {
      return localStorage.getItem('jeho_portrait_custom') || null;
    } catch {
      return null;
    }
  });

  // Halo pointermove parallax effect (exact math from user script)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return;

    const halo = haloRef.current;
    if (!halo) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 40;
      ty = (e.clientY / window.innerHeight - 0.5) * 30;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      halo.style.setProperty('--hx', `${cx.toFixed(2)}px`);
      halo.style.setProperty('--hy', `${cy.toFixed(2)}px`);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPortraitSrc(dataUrl);
        try {
          localStorage.setItem('jeho_portrait_custom', dataUrl);
        } catch {
          // LocalStorage quota fallback
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear() || copyrightYear;
  const formattedCount = projectCount > 0 ? String(projectCount).padStart(2, '0') : null;

  return (
    <>
      <main className="hero">
        <h1 className="sr">Jehovaly Majoi Djimadjo — développeur Full-Stack, SaaS et IA</h1>
        
        {/* Halo with dynamic mouse move parallax */}
        <div ref={haloRef} className="halo" aria-hidden="true" />

        {/* Portrait image with screen blend mode and mask */}
        <img
          className="portrait"
          id="portrait"
          src={portraitSrc || undefined}
          alt="Portrait Jehovaly Majoi Djimadjo"
          hidden={!portraitSrc}
        />

        {/* Top Navigation */}
        <header className="nav">
          <a
            className="logo fx"
            href="#"
            onClick={(e) => handleNavClick(e, 'hero')}
            aria-label="Jeho, accueil"
            style={{ ['--i' as any]: 0 }}
          >
            {wordmark}<b>*</b>
          </a>

          <div className="nav-r">
            <nav className="links" aria-label="Navigation principale">
              <a
                className="fx"
                style={{ ['--i' as any]: 1 }}
                href="#projects"
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                <span className="roll">
                  <span className="in">
                    <span>Projets</span>
                    <span aria-hidden="true">Projets</span>
                  </span>
                </span>
                {formattedCount && <sup id="count">{formattedCount}</sup>}
              </a>

              <a
                className="fx"
                style={{ ['--i' as any]: 2 }}
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
              >
                <span className="roll">
                  <span className="in">
                    <span>Services</span>
                    <span aria-hidden="true">Services</span>
                  </span>
                </span>
              </a>

              <a
                className="fx"
                style={{ ['--i' as any]: 3 }}
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                <span className="roll">
                  <span className="in">
                    <span>À propos</span>
                    <span aria-hidden="true">À propos</span>
                  </span>
                </span>
              </a>

              <a
                className="fx"
                style={{ ['--i' as any]: 4 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                <span className="roll">
                  <span className="in">
                    <span>Contact</span>
                    <span aria-hidden="true">Contact</span>
                  </span>
                </span>
              </a>
            </nav>

            <a
              className="pill fx"
              style={{ ['--i' as any]: 5 }}
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              <i />
              <span className="roll">
                <span className="in">
                  <span>Parlons de votre projet</span>
                  <span aria-hidden="true">Parlons de votre projet</span>
                </span>
              </span>
            </a>
          </div>
        </header>

        {/* Bottom Block: Wordmark & Copy */}
        <div className="bottom">
          <div>
            <p className="copy fx">
              ©<span id="yr">{currentYear}</span>
            </p>
            <p className="word" aria-hidden="true">
              <span className="line">
                <span>{wordmark}</span>
              </span>
              <span className="line">
                <span className="ast">*</span>
              </span>
            </p>
          </div>

          <div className="info fx">
            <p>
              Développeur Full-Stack au Bénin, je conçois et développe des produits numériques — SaaS, applications web, IA — qui donnent vie aux idées.
            </p>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>
              <span className="roll">
                <span className="in">
                  <span>Découvrir mes projets</span>
                  <span aria-hidden="true">Découvrir mes projets</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </main>

      {/* Floating Control Toolbar (exact buttons from user's demo) */}
      <div className="demo">
        <button type="button" id="replay" onClick={onReplay}>
          Rejouer l’animation
        </button>
        <button
          type="button"
          id="addph"
          onClick={() => fileInputRef.current?.click()}
        >
          {portraitSrc ? 'Changer ma photo' : 'Ajouter ma photo (aperçu)'}
        </button>
        <button
          type="button"
          onClick={onOpenAdmin}
          className="flex items-center gap-1.5"
          title="Ouvrir l'espace d'administration"
        >
          <Shield className="w-3 h-3 text-[#d4f22b]" />
          <span>Admin</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          id="ph"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};
