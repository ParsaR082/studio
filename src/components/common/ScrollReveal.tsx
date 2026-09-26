'use client';

import React from 'react';
import { motion, useInView } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scale?: boolean;
  className?: string;
  staggerChildren?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 45,
  scale = false,
  className = '',
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: '-60px 0px -60px 0px',
    amount: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        scale: scale ? 0.96 : 1,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {
              opacity: 0,
              y: -yOffset * 0.7, // As it exits upward when scrolling down
              scale: scale ? 0.98 : 1,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cinematic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
