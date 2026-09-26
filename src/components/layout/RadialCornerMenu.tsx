import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  Home,
  FolderKanban,
  Sparkles,
  Users,
  Compass,
  BookOpen,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CircleMenu, CircleMenuItem } from '@/components/ui/circle-menu';
import { pauseLenis, resumeLenis } from '../../hooks/useLenis';

interface RadialCornerMenuProps {
  onNavigate: (sectionId: string) => void;
  className?: string;
}

export const RadialCornerMenu: React.FC<RadialCornerMenuProps> = ({
  onNavigate,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      pauseLenis();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      resumeLenis();
    }
    return () => {
      resumeLenis();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleItemClick = React.useCallback((sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      onNavigate(sectionId);
    }, 280);
  }, [onNavigate]);

  const menuItems: CircleMenuItem[] = React.useMemo(() => [
    {
      label: 'صفحه نخست',
      icon: <Home size={18} className="text-[#F5F4F0]" />,
      href: '#hero',
      onClick: () => handleItemClick('hero'),
    },
    {
      label: 'پروژه‌ها',
      icon: <FolderKanban size={18} className="text-[#F5F4F0]" />,
      href: '#projects',
      onClick: () => handleItemClick('projects'),
    },
    {
      label: 'روایت معمار',
      icon: <Sparkles size={18} className="text-[#F5F4F0]" />,
      href: '#featured',
      onClick: () => handleItemClick('featured'),
    },
    {
      label: 'معماران',
      icon: <Users size={18} className="text-[#F5F4F0]" />,
      href: '#artists',
      onClick: () => handleItemClick('artists'),
    },
    {
      label: 'استودیو نو',
      icon: <Compass size={18} className="text-[#F5F4F0]" />,
      href: '#studio',
      onClick: () => handleItemClick('studio'),
    },
    {
      label: 'مجله معماری',
      icon: <BookOpen size={18} className="text-[#F5F4F0]" />,
      href: '#journal',
      onClick: () => handleItemClick('journal'),
    },
    {
      label: 'تماس و ارتباط',
      icon: <Mail size={18} className="text-[#F5F4F0]" />,
      href: '#contact',
      onClick: () => handleItemClick('contact'),
    },
  ], [handleItemClick]);

  const modalOverlay = (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="منوی دایره‌ای ناوبری"
          className="fixed inset-0 top-0 left-0 w-screen h-screen min-h-[100dvh] z-[99999] flex items-center justify-center overflow-hidden"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh' }}
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#0E0E0E]/75 backdrop-blur-md cursor-pointer"
          />

          {/* Hint at top of modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="absolute top-10 sm:top-14 pointer-events-none text-center px-4"
          >
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D0CEC7] font-light block">
              فهرست ناوبری استودیو نو
            </span>
            <p className="text-[11px] sm:text-xs text-[#888888] mt-1 font-light">
              جهت جابجایی روی بخش مورد نظر کلیک کنید یا برای بازگشت روی پس‌زمینه ضربه بزنید
            </p>
          </motion.div>

          {/* Radial CircleMenu exactly in center of viewport */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.3, opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              mass: 0.7,
            }}
            className="relative z-10 m-auto flex items-center justify-center"
          >
            <CircleMenu
              items={menuItems}
              isOpen={true}
              onOpenChange={(next) => {
                if (!next) setIsOpen(false);
              }}
              closeIcon={<X size={20} className="text-[#F5F4F0]" />}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Corner Button in Header (Resting State) */}
      <div className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="باز کردن منوی دایره‌ای"
          className="group flex items-center gap-2 p-1.5 pl-3 bg-[#111111] text-[#F5F4F0] rounded-full hover:bg-[#2A2926] active:scale-95 transition-all duration-300 shadow-sm cursor-pointer border border-[#111111]/20"
        >
          <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:rotate-90 duration-300">
            <Menu size={15} />
          </span>
          <span className="text-[11px] font-light tracking-wider">منو</span>
        </button>
      </div>

      {/* Render Modal via React Portal directly into body to escape header transform container */}
      {mounted && typeof document !== 'undefined'
        ? createPortal(modalOverlay, document.body)
        : null}
    </>
  );
};
