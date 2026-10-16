import { useEffect, useState } from 'react';
import { useRafThrottle } from './useRafThrottle';

/**
 * Custom hook that tracks scroll progress using requestAnimationFrame
 * @returns Object containing scrollY, progress (0-1), and direction
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [direction, setDirection] = useState<'up' | 'down'>( 'down');
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [documentHeight, setDocumentHeight] = useState<number>(
    document.documentElement.scrollHeight
  );

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll handler using RAF throttle
  const handleScroll = useRafThrottle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollBottom = scrollTop + windowHeight;
    const scrollProgress =
      documentHeight > windowHeight
        ? (scrollBottom / documentHeight) * 100
        : 100;

    setScrollY(scrollTop);
    setProgress(Math.min(Math.max(scrollProgress, 0), 100));
    setDirection(
      scrollTop > (scrollY || 0) ? 'down' : 'up' // Compare with previous scrollY
    );
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct values
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, windowHeight, documentHeight, scrollY]);

  return { scrollY, progress, direction };
}