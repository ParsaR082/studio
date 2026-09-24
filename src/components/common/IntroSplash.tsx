import React, { useState, useEffect } from 'react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Show splash for 1.1s, then fade out smoothly
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1100);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#111111] text-[#F5F4F0] flex flex-col items-center justify-center transition-opacity duration-700 ease-out pointer-events-none select-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-4 px-6">
        <span className="text-xs uppercase tracking-widest text-[#888888] font-light block">
          آرشیو معماری معاصر
        </span>
        <h1 className="text-4xl sm:text-6xl font-light tracking-tighter text-[#F5F4F0]">
          استودیو معماری نو
        </h1>
        <p className="text-xs sm:text-sm font-light text-[#999999] tracking-wider">
          NO ARCHITECTURE STUDIO · TEHRAN / LAVASAN
        </p>
      </div>

      <div className="absolute bottom-12 text-[11px] text-[#666666] font-light tracking-widest">
        نسخه دیجیتال ۱۴۰۵
      </div>
    </div>
  );
};
