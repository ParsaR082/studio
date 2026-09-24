import { useEffect } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export const getLenis = () => globalLenis;

export const pauseLenis = () => {
  if (globalLenis) {
    globalLenis.stop();
  }
};

export const resumeLenis = () => {
  if (globalLenis) {
    globalLenis.start();
  }
};

export const useLenis = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoResize: true,
    });

    globalLenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
};
