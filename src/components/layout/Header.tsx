import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RadialCornerMenu } from './RadialCornerMenu';
import { HeaderSearch } from './HeaderSearch';
import { Project } from '../../data/projects';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: (initialQuery?: string) => void;
  onSelectProject?: (project: Project) => void;
  visible?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onSelectProject,
  visible = true,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'projects', label: 'پروژه‌ها', count: '۹' },
    { id: 'featured', label: 'روایت منتخب' },
    { id: 'artists', label: 'معماران' },
    { id: 'studio', label: 'استودیو' },
    { id: 'journal', label: 'مجله' },
    { id: 'contact', label: 'تماس' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          !visible ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100 translate-y-0'
        } ${
          scrolled
            ? 'py-3 sm:py-4 bg-[#F5F4F0]/90 backdrop-blur-md border-b border-[#111111]/8'
            : 'py-4 sm:py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1540px] mx-auto px-[var(--page-gutter)] flex items-center justify-between">
          {/* Logo Brand Lockup (Matches Video Geometric Icon) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-3.5 group cursor-pointer text-right"
            >
              {/* Geometric Architectural Icon from Video */}
              <div className="w-8 h-8 border-[1.5px] border-[#111111] flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#111111]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-light tracking-tight text-[#111111]">
                  استودیو نو
                </span>
                <span className="text-[9px] tracking-widest text-[#777777] uppercase font-light -mt-0.5">
                  ARCHITECTURE
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links with Count Badge matching video 'PROJECTS 9' */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 text-xs uppercase tracking-wider font-light transition-colors duration-300 cursor-pointer flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? 'text-[#111111] font-normal'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <span>{item.label}</span>
                {item.count && (
                  <span className="text-[10px] font-normal text-[#999999] -translate-y-1">
                    {item.count}
                  </span>
                )}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 right-0 left-0 h-[1px] bg-[#111111]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Search with Liquid GooeyInput & Radial Corner Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <HeaderSearch
              onOpenFullSearch={onOpenSearch}
              onSelectProject={onSelectProject}
            />

            {/* Radial Circle Menu in Header Corner */}
            <RadialCornerMenu onNavigate={handleNavClick} />
          </div>
        </div>
      </header>

      {/* Pinned Left Sidebar with 3 Social Icons matching video (t, v, f) */}
      <aside
        aria-label="شبکه‌های اجتماعی استودیو"
        className={`fixed bottom-10 left-6 sm:left-10 z-40 hidden md:flex flex-col items-center gap-5 text-[#888888] transition-opacity duration-700 ${
          !visible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="اینستاگرام استودیو نو"
          className="text-xs font-light hover:text-[#111111] transition-colors duration-300 hover:-translate-y-0.5"
        >
          IG
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تلگرام استودیو"
          className="text-xs font-light hover:text-[#111111] transition-colors duration-300 hover:-translate-y-0.5"
        >
          TG
        </a>
        <div className="w-[1px] h-8 bg-[#111111]/20 mt-2" />
      </aside>
    </>
  );
};
