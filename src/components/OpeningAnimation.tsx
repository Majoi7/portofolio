import React, { useEffect, useRef } from 'react';

interface OpeningAnimationProps {
  onComplete?: () => void;
  accentColor?: string;
  forcePlay?: boolean;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({
  onComplete,
  forcePlay = false,
}) => {
  const lastRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const b = document.body;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer: NodeJS.Timeout;

    const play = () => {
      clearTimeout(timer);
      b.classList.remove('play', 'done');
      // Trigger DOM reflow to restart CSS keyframe animations
      void b.offsetWidth;
      b.classList.add('play');

      if (reduce) {
        b.classList.add('done');
        onComplete?.();
        return;
      }

      // Safety timeout at 4.4s as in user script
      timer = setTimeout(() => {
        b.classList.add('done');
        onComplete?.();
      }, 4400);
    };

    const handleAnimationEnd = (e: AnimationEvent) => {
      // When the last panel finishes its clip animation
      if (e.target === lastRef.current) {
        b.classList.add('done');
        onComplete?.();
      }
    };

    const lastEl = lastRef.current;
    if (lastEl) {
      lastEl.addEventListener('animationend', handleAnimationEnd as EventListener);
    }

    play();

    return () => {
      clearTimeout(timer);
      if (lastEl) {
        lastEl.removeEventListener('animationend', handleAnimationEnd as EventListener);
      }
    };
  }, [forcePlay, onComplete]);

  return (
    <div className="loader" aria-hidden="true">
      <i className="p u" style={{ ['--d' as any]: '.75s' }} />
      <i className="p u" style={{ ['--d' as any]: '1s' }} />
      <i className="p u" style={{ ['--d' as any]: '1.45s' }} />
      <i className="p l" style={{ ['--d' as any]: '.25s' }} />
      <i className="p r" style={{ ['--d' as any]: '.5s' }} />
      <i className="p r" style={{ ['--d' as any]: '.95s' }} />
      <i className="p d" style={{ ['--d' as any]: '.85s' }} />
      <i className="p d" style={{ ['--d' as any]: '1.2s' }} />
      <i
        ref={lastRef}
        id="last"
        className="p d"
        style={{ ['--d' as any]: '1.6s' }}
      />
    </div>
  );
};
