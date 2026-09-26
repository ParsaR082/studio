'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { HeaderSearch } from './HeaderSearch';
import { RadialCornerMenu } from './RadialCornerMenu';
import { Project } from '../../data/projects';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: (initialQuery?: string) => void;
  onSelectProject?: (project: Project) => void;
  visible?: boolean;
}

const NAV_ITEMS: ReadonlyArray<{ id: string; label: string; count?: string }> = [
  { id: 'projects', label: 'پروژه‌ها', count: '۹' },
  { id: 'featured', label: 'روایت منتخب' },
  { id: 'studio', label: 'استودیو' },
  { id: 'journal', label: 'مجله معمارانه' },
  { id: 'contact', label: 'تماس' },
] as const;

const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onSelectProject,
  visible = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollRaf = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      scrollRaf.current = null;
      const next = window.scrollY > 20;
      setScrolled((current) => (current === next ? current : next));
    };

    const handleScroll = () => {
      if (scrollRaf.current !== null) return;
      scrollRaf.current = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRaf.current !== null) window.cancelAnimationFrame(scrollRaf.current);
      scrollRaf.current = null;
    };
  }, []);

  const handleNavClick = (id: string) => {
    setExpanded(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          !visible ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100 translate-y-0'
        } ${
          scrolled || expanded
            ? 'py-3 sm:py-4 bg-[#102B2B]/95 backdrop-blur-md border-b border-[#A4E0D6]/20 shadow-lg shadow-black/30'
            : 'py-4 sm:py-6 bg-[#102B2B]/90 backdrop-blur-sm border-b border-[#A4E0D6]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo Lockup */}
            <div className="shrink-0">
              <button
                onClick={() => handleNavClick('hero')}
                className="flex items-center gap-3.5 group cursor-pointer text-right"
              >
                {/* Geometric Architectural Icon (Monochrome) */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 border border-white/40 flex items-center justify-center transition-transform group-hover:scale-105 duration-300 bg-[#A4E0D6]/10 rounded-md">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#FF6B1A]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-light tracking-tight text-white group-hover:text-[#FF9A56] transition-colors">
                    استودیو معماری نو
                  </span>
                  <span className="text-[9px] tracking-widest text-zinc-400 uppercase font-light -mt-0.5" dir="ltr">
                    NOUVEAU STUDIO
                  </span>
                </div>
              </button>
            </div>

            {/* Mobile Hamburger / Close Button */}
            <div className="flex md:hidden items-center gap-2">
              <HeaderSearch
                onOpenFullSearch={onOpenSearch}
                onSelectProject={onSelectProject}
              />
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="تغییر وضعیت منو"
                className="p-2 text-[#A4E0D6] hover:text-white rounded-lg hover:bg-[#A4E0D6]/15 transition-colors cursor-pointer"
              >
                {expanded ? (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex md:items-center md:justify-center gap-6 lg:gap-10">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm font-light tracking-wide transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeSection === item.id
                      ? 'text-[#FF9A56] font-medium'
                      : 'text-[#A4E0D6] hover:text-[#FF9A56]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#A4E0D6]/15 text-[#A4E0D6] font-mono -translate-y-0.5">
                      {item.count}
                    </span>
                  )}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-gradient-to-r from-[#FF9A56] via-[#FF6B1A] to-[#FF9A56]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Desktop Action Button with Monochrome Gradient Border */}
            <div className="hidden md:flex items-center gap-3">
              <HeaderSearch
                onOpenFullSearch={onOpenSearch}
                onSelectProject={onSelectProject}
              />

              <div className="relative inline-flex items-center justify-center group cursor-pointer">
                {/* Monochrome Silver/Gray Outer Gradient Border */}
                <div className="absolute transition-all duration-300 rounded-full -inset-px bg-gradient-to-r from-[#FF9A56] via-[#FF6B1A] to-[#FF9A56] group-hover:shadow-lg group-hover:shadow-[#FF6B1A]/20 opacity-75 group-hover:opacity-100" />
                <button
                  onClick={() => handleNavClick('contact')}
                  className="relative inline-flex items-center justify-center px-5 py-2 text-xs sm:text-sm font-normal text-[#102B2B] bg-[#FF6B1A] hover:bg-[#FF9A56] border border-transparent rounded-full transition-colors cursor-pointer gap-2"
                >
                  <span>درخواست مشاوره</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#A4E0D6]" />
                </button>
              </div>

              {/* Radial Quick Menu */}
              <RadialCornerMenu onNavigate={handleNavClick} />
            </div>
          </div>

          {/* Mobile Collapsible Navigation Menu */}
          <AnimatePresence>
            {expanded && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col pt-6 pb-6 space-y-4 border-t border-[#A4E0D6]/20 mt-4">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-right text-base font-light transition-colors py-2 px-3 rounded-lg flex items-center justify-between ${
                        activeSection === item.id
                          ? 'text-white bg-[#A4E0D6]/15 font-normal'
                          : 'text-[#A4E0D6] hover:text-[#FF9A56] hover:bg-[#A4E0D6]/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.count && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#A4E0D6]/15 text-[#A4E0D6] font-mono">
                          {item.count}
                        </span>
                      )}
                    </button>
                  ))}

                  {/* Mobile Action Button with Monochrome Gradient */}
                  <div className="pt-2">
                    <div className="relative inline-flex items-center justify-center w-full group">
                      <div className="absolute transition-all duration-300 rounded-full -inset-px bg-gradient-to-r from-[#FF9A56] via-[#FF6B1A] to-[#FF9A56] group-hover:shadow-lg group-hover:shadow-[#FF6B1A]/20" />
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="relative inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white bg-black border border-transparent rounded-full hover:bg-zinc-900 transition-colors gap-2"
                      >
                        <span>درخواست مشاوره اختصاصی</span>
                        <ArrowLeft className="w-4 h-4 text-[#A4E0D6]" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Pinned Left Sidebar with Social Icons */}
      <aside
        aria-label="شبکه‌های اجتماعی استودیو"
        className={`fixed bottom-10 left-6 sm:left-10 z-40 hidden md:flex flex-col items-center gap-5 text-zinc-400 transition-opacity duration-700 ${
          !visible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="اینستاگرام استودیو نو"
          className="text-xs font-light hover:text-white transition-colors duration-300 hover:-translate-y-0.5"
        >
          IG
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تلگرام استودیو"
          className="text-xs font-light hover:text-white transition-colors duration-300 hover:-translate-y-0.5"
        >
          TG
        </a>
        <div className="w-[1px] h-8 bg-[#A4E0D6]/25 mt-2" />
      </aside>
    </>
  );
};

export default React.memo(Header);
