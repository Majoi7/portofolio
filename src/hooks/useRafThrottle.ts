import { useEffect, useRef } from 'react';

/**
 * Custom hook that throttles a function using requestAnimationFrame
 * @param callback The function to throttle
 * @returns A throttled version of the callback
 */
export function useRafThrottle<T extends (...args: any[]) => void>(
  callback: T
): (...args: Parameters<T>) => void {
  const frame = useRef<number | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null);

  useEffect(() => {
    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    lastArgs.current = args;

    if (frame.current === null) {
      frame.current = requestAnimationFrame(() => {
        if (lastArgs.current) {
          callback(...lastArgs.current);
          lastArgs.current = null;
        }
        frame.current = null;
      });
    }
  };
}