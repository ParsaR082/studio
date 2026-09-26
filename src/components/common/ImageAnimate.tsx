'use client';

import React from 'react';
import { motion, useInView } from 'motion/react';

export type ImageAnimationType =
  | 'curtainUp'
  | 'curtainLeft'
  | 'curtainRight'
  | 'blurScale'
  | 'clipReveal';

interface ImageAnimateProps {
  src: string;
  alt: string;
  animation?: ImageAnimationType;
  className?: string;
  imgClassName?: string;
  delay?: number;
  duration?: number;
  hoverZoom?: boolean;
  curtainColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ImageAnimateComponent: React.FC<ImageAnimateProps> = ({
  src,
  alt,
  animation = 'curtainUp',
  className = '',
  imgClassName = '',
  delay = 0,
  duration = 0.95,
  hoverZoom = true,
  curtainColor = '#E8E6DE',
  children,
  onClick,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    margin: '-60px 0px -60px 0px',
    amount: 0.2,
  });

  // Curtain wipe motion
  const getCurtainAnimation = () => {
    switch (animation) {
      case 'curtainLeft':
        return {
          initial: { x: '0%' },
          animate: isInView ? { x: '-101%' } : { x: '0%' },
        };
      case 'curtainRight':
        return {
          initial: { x: '0%' },
          animate: isInView ? { x: '101%' } : { x: '0%' },
        };
      case 'curtainUp':
      default:
        return {
          initial: { y: '0%' },
          animate: isInView ? { y: '-101%' } : { y: '0%' },
        };
    }
  };

  const curtainMotion = getCurtainAnimation();

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`architectural-media relative overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Underlying Animated Image */}
      <motion.div
        initial={
          animation === 'blurScale'
            ? { opacity: 0, scale: 1.14, filter: 'blur(14px)' }
            : { opacity: 0.4, scale: 1.12 }
        }
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }
            : {
                opacity: 0.4,
                scale: 1.08,
                filter: animation === 'blurScale' ? 'blur(8px)' : 'blur(0px)',
              }
        }
        transition={{
          duration,
          delay: delay + 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            hoverZoom ? 'hover:scale-105' : ''
          } ${imgClassName}`}
        />
      </motion.div>

      {/* Sliding Architectural Curtain Wipe (for curtain animations) */}
      {(animation === 'curtainUp' || animation === 'curtainLeft' || animation === 'curtainRight') && (
        <motion.div
          initial={curtainMotion.initial}
          animate={curtainMotion.animate}
          transition={{
            duration: duration * 0.95,
            delay,
            ease: [0.76, 0, 0.24, 1], // Architectural wipe curve
          }}
          style={{ backgroundColor: curtainColor }}
          className="absolute inset-0 z-10 pointer-events-none"
        />
      )}

      {/* Children overlays (tags, badges, captions, icons) */}
      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: delay + duration * 0.5 }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export const ImageAnimate = React.memo(ImageAnimateComponent);
export default ImageAnimate;
