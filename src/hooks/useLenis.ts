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

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isCoarsePointer,
      wheelMultiplier: 0.9,
      autoResize: true,
      syncTouch: false,
    });

    globalLenis = lenis;

    let animationFrameId: number | null = null;
    let running = true;

    const stopFrameLoop = () => {
      running = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    const startFrameLoop = () => {
      if (running && animationFrameId === null) {
        animationFrameId = requestAnimationFrame(raf);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopFrameLoop();
      } else {
        running = true;
        startFrameLoop();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startFrameLoop();

    return () => {
      stopFrameLoop();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
};
