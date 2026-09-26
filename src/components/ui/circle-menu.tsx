'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONSTANTS = {
  itemSize: 50,
  containerSize: 270,
  openStagger: 0.02,
  closeStagger: 0.07,
};

const STYLES: Record<string, Record<string, string>> = {
  trigger: {
    container:
      'rounded-full flex items-center bg-[#111111] text-[#F5F4F0] justify-center cursor-pointer outline-none ring-0 hover:scale-105 transition-all duration-200 z-50 shadow-2xl border border-white/15',
    active: 'bg-[#111111] text-[#F5F4F0]',
  },
  item: {
    container:
      'rounded-full flex items-center justify-center absolute bg-[#1E1D1B] text-[#F5F4F0] border border-white/20 hover:border-white/60 hover:bg-[#2A2926] shadow-xl cursor-pointer transition-colors',
    label:
      'text-[11px] font-light tracking-wide text-white bg-black/85 px-2.5 py-0.5 rounded backdrop-blur-md whitespace-nowrap absolute top-full left-1/2 -translate-x-1/2 mt-2 pointer-events-none shadow-lg',
  },
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
  const theta = (2 * Math.PI * i) / n - Math.PI / 2;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
};

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
  totalItems: number;
  isOpen: boolean;
  onClick?: () => void;
}

const MenuItem = ({
  icon,
  label,
  href,
  index,
  totalItems,
  isOpen,
  onClick,
}: MenuItemProps) => {
  const { x, y } = pointOnCircle(index, totalItems, CONSTANTS.containerSize / 2);
  const [hovering, setHovering] = useState(false);

  return (
    <a
      href={href}
      className={STYLES.item.container}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.button
        type="button"
        animate={{
          x: isOpen ? x : 0,
          y: isOpen ? y : 0,
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.4,
        }}
        whileHover={{
          scale: 1.15,
          transition: {
            duration: 0.15,
            delay: 0,
          },
        }}
        transition={{
          delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
          type: 'spring',
          stiffness: 300,
          damping: 26,
        }}
        style={{
          height: CONSTANTS.itemSize,
          width: CONSTANTS.itemSize,
        }}
        className={STYLES.item.container}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {icon}
        {hovering && <p className={STYLES.item.label}>{label}</p>}
      </motion.button>
    </a>
  );
};

export interface MenuTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemsLength: number;
  closeAnimationCallback: () => void;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

const MenuTrigger = ({
  setIsOpen,
  isOpen,
  itemsLength,
  closeAnimationCallback,
  openIcon,
  closeIcon,
}: MenuTriggerProps) => {
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  const scaleTransition = Array.from({ length: itemsLength - 1 })
    .map((_, index) => index + 1)
    .reduce((acc, _, index) => {
      const increasedValue = index * 0.12;
      acc.push(1 + increasedValue);
      return acc;
    }, [] as number[]);

  const closeAnimation = async () => {
    shakeAnimation.start({
      translateX: [0, 2, -2, 0, 2, -2, 0],
      transition: {
        duration: CONSTANTS.closeStagger,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
    for (let i = 0; i < scaleTransition.length; i++) {
      await animate.start({
        height: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2
        ),
        width: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2
        ),
        backgroundColor: `color-mix(in srgb, var(--foreground) ${Math.max(
          100 - i * 10,
          40
        )}%, var(--background))`,
        transition: {
          duration: CONSTANTS.closeStagger / 2,
          ease: 'linear',
        },
      });
      if (i !== scaleTransition.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, CONSTANTS.closeStagger * 1000));
      }
    }

    shakeAnimation.stop();
    shakeAnimation.start({
      translateX: 0,
      transition: {
        duration: 0,
      },
    });

    animate.start({
      height: CONSTANTS.itemSize,
      width: CONSTANTS.itemSize,
      backgroundColor: 'var(--foreground)',
      transition: {
        duration: 0.15,
        ease: 'backInOut',
      },
    });
  };

  return (
    <motion.div animate={shakeAnimation} className="z-50">
      <motion.button
        type="button"
        animate={animate}
        style={{
          height: CONSTANTS.itemSize,
          width: CONSTANTS.itemSize,
        }}
        className={cn(STYLES.trigger.container, isOpen && STYLES.trigger.active)}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            closeAnimationCallback();
            closeAnimation();
          } else {
            setIsOpen(true);
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.span
              key="menu-close"
              initial={{
                opacity: 0,
                filter: 'blur(8px)',
                rotate: -90,
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                filter: 'blur(8px)',
                rotate: 90,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {closeIcon}
            </motion.span>
          ) : (
            <motion.span
              key="menu-open"
              initial={{
                opacity: 0,
                filter: 'blur(8px)',
                rotate: 90,
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                filter: 'blur(8px)',
                rotate: -90,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {openIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export interface CircleMenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

export interface CircleMenuProps {
  items: CircleMenuItem[];
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const CircleMenu = ({
  items,
  openIcon = <Menu size={20} className="text-[#F5F4F0]" />,
  closeIcon = <X size={20} className="text-[#F5F4F0]" />,
  isOpen: controlledIsOpen,
  onOpenChange,
  className,
}: CircleMenuProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (next: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(next);
    }
    onOpenChange?.(next);
  };

  const animate = useAnimationControls();

  const closeAnimationCallback = async () => {
    await animate.start({
      rotate: -360,
      filter: 'blur(1px)',
      transition: {
        duration: CONSTANTS.closeStagger * (items.length + 2),
        ease: 'linear',
      },
    });
    await animate.start({
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0,
      },
    });
  };

  return (
    <div
      style={{
        width: CONSTANTS.containerSize,
        height: CONSTANTS.containerSize,
      }}
      className={cn('relative flex items-center justify-center place-self-center', className)}
    >
      <MenuTrigger
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemsLength={items.length}
        closeAnimationCallback={closeAnimationCallback}
        openIcon={openIcon}
        closeIcon={closeIcon}
      />
      <motion.div
        animate={animate}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        {items.map((item, index) => (
          <div
            key={`menu-item-wrap-${index}`}
            className={isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
          >
            <MenuItem
              icon={item.icon}
              label={item.label}
              href={item.href}
              index={index}
              totalItems={items.length}
              isOpen={isOpen}
              onClick={item.onClick}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
