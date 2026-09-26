'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicOpeningProps {
  onComplete: () => void;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'loading' | 'revealing' | 'done'>('loading');

  useEffect(() => {
    // Progress counter animation from 0 to 100
    const duration = 1400; // ms
    const interval = 25; // ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    // Trigger curtain reveal stage
    const revealTimer = setTimeout(() => {
      setStage('revealing');
    }, 1600);

    // Complete and remove
    const finishTimer = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 2400);

    return () => {
      clearInterval(timer);
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('revealing');
    setTimeout(() => {
      setStage('done');
      onComplete();
    }, 400);
  };

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <div
        onClick={handleSkip}
        className="fixed inset-0 z-[99999] pointer-events-auto cursor-pointer select-none overflow-hidden bg-[#0E0E0E]"
      >
          {/* Top Shutter Half */}
          <motion.div
            initial={{ y: '0%' }}
            animate={stage === 'revealing' ? { y: '-100%' } : { y: '0%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#0E0E0E] border-b border-[#222222]"
          />

          {/* Bottom Shutter Half */}
          <motion.div
            initial={{ y: '0%' }}
            animate={stage === 'revealing' ? { y: '100%' } : { y: '0%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0E0E0E] border-t border-[#222222]"
          />

          {/* Center Stage Content (Fades out just before shutters open) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={stage === 'revealing' ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-[#F5F4F0] z-20 pointer-events-none"
          >
            {/* Top Corner Technical Coordinates */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#666666]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#444444] rounded-full animate-ping" />
                <span>LAT 35°48&apos;N // LONG 51°39&apos;E</span>
              </div>
              <div>NO STUDIO · MONOGRAPH 1405</div>
            </div>

            {/* Center Monogram & Brand Typography */}
            <div className="flex flex-col items-center justify-center text-center my-auto">
              {/* Minimal Architectural Square Glyph */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-12 h-12 border border-[#444444] flex items-center justify-center mb-8"
              >
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[13px] border-b-[#F5F4F0]" />
              </motion.div>

              {/* Title with BlurIn & Character tracking */}
              <motion.div
                initial={{ filter: 'blur(16px)', opacity: 0, y: 15 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F4F0] mb-3">
                  استودیو معماری نو
                </h1>
              </motion.div>

              <motion.div
                initial={{ filter: 'blur(10px)', opacity: 0 }}
                animate={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#888888] font-light">
                  NO ARCHITECTURE STUDIO · TEHRAN / LAVASAN
                </p>
              </motion.div>

              {/* Progress Line */}
              <div className="w-48 sm:w-64 h-[1px] bg-[#222222] mt-10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 right-0 bg-[#F5F4F0]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Corner Metrics & Skip Hint */}
            <div className="flex items-center justify-between text-xs font-mono text-[#666666]">
              <div className="flex items-center gap-3">
                <span className="text-[#A5A4A0] tabular-nums font-normal">
                  {Math.round(progress).toString().padStart(2, '0')}%
                </span>
                <span>·</span>
                <span className="font-sans text-[11px] text-[#666666]">بارگذاری شیت‌های معماری</span>
              </div>
              <div className="font-sans text-[11px] text-[#777777] hover:text-[#AAAAAA] transition-colors pointer-events-auto">
                کلیک جهت رد کردن اینترو [SKIP]
              </div>
            </div>
          </motion.div>
        </div>
    </AnimatePresence>
  );
};
