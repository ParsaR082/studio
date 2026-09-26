'use client';

import React from 'react';
import { motion, useInView } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  direction = 'up',
  as = 'h1',
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: '-40px 0px -40px 0px',
    amount: 0.2,
  });

  const Component = as as keyof typeof motion;

  return (
    <div ref={ref} className="overflow-hidden inline-block align-bottom">
      <motion.div
        initial={{
          opacity: 0,
          y: direction === 'up' ? '100%' : '-100%',
        }}
        animate={
          isInView
            ? { opacity: 1, y: '0%' }
            : { opacity: 0, y: direction === 'up' ? '-80%' : '80%' }
        }
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
};
