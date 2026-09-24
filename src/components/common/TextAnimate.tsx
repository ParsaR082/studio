import React from 'react';
import { motion, useInView, Variants } from 'motion/react';

export type AnimationType =
  | 'blurIn'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'fadeSlide';

export type SplitBy = 'word' | 'character' | 'line';

interface TextAnimateProps {
  children: string;
  animation?: AnimationType;
  by?: SplitBy;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  animation = 'blurIn',
  by = 'word',
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 0.65,
  stagger = 0.04,
  once = false,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    margin: '-50px 0px -50px 0px',
    amount: 0.2,
    once,
  });

  // Break text down according to `by`
  const segments = React.useMemo(() => {
    if (!children) return [];
    if (by === 'character') {
      return Array.from(children);
    }
    if (by === 'line') {
      return children.split('\n');
    }
    // Default by 'word'
    return children.split(' ');
  }, [children, by]);

  // Define animation variants for each animation type
  const getVariants = (): { container: Variants; item: Variants } => {
    switch (animation) {
      case 'blurIn':
        return {
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
            exit: {
              opacity: 0,
              transition: {
                staggerChildren: stagger * 0.5,
                staggerDirection: -1,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              filter: 'blur(14px)',
              y: 12,
              scale: 0.94,
            },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              scale: 1,
              transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: {
              opacity: 0,
              filter: 'blur(10px)',
              y: -14,
              transition: {
                duration: duration * 0.6,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          },
        };

      case 'slideUp':
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
            exit: {
              transition: {
                staggerChildren: stagger * 0.4,
                staggerDirection: -1,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              y: '105%',
            },
            visible: {
              opacity: 1,
              y: '0%',
              transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: {
              opacity: 0,
              y: '-80%',
              transition: {
                duration: duration * 0.6,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          },
        };

      case 'slideLeft':
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
            exit: {},
          },
          item: {
            hidden: {
              opacity: 0,
              x: 25,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: {
              opacity: 0,
              x: -20,
              transition: { duration: duration * 0.5 },
            },
          },
        };

      case 'slideRight':
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
            exit: {},
          },
          item: {
            hidden: {
              opacity: 0,
              x: -25,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: {
              opacity: 0,
              x: 20,
              transition: { duration: duration * 0.5 },
            },
          },
        };

      case 'scaleUp':
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
            exit: {},
          },
          item: {
            hidden: {
              opacity: 0,
              scale: 0.8,
              filter: 'blur(8px)',
            },
            visible: {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: {
              opacity: 0,
              scale: 0.9,
              transition: { duration: duration * 0.5 },
            },
          },
        };

      case 'fadeSlide':
      default:
        return {
          container: {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delay,
              },
            },
            exit: {},
          },
          item: {
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: {
              opacity: 0,
              y: -15,
              transition: { duration: duration * 0.5 },
            },
          },
        };
    }
  };

  const { container, item } = getVariants();

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        ref={containerRef}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'exit'}
        className="inline-flex flex-wrap"
        style={{ direction: 'inherit' }}
      >
        {segments.map((seg, idx) => (
          <span
            key={idx}
            className={`inline-block ${
              animation === 'slideUp' ? 'overflow-hidden' : ''
            }`}
          >
            <motion.span
              variants={item}
              className="inline-block whitespace-pre"
            >
              {seg}
              {by === 'word' && idx < segments.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
