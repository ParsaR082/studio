import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'py-4 bg-[#F5F4F0]/90 backdrop-blur-md border-b border-[#111111]/8'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1540px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo Brand Lockup (Matches Video Geometric Icon) */}
          <div className="flex items-center gap-4">
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

          {/* Action Search Button matching video icon Q */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSearch}
              aria-label="جستجو"
              className="p-2 text-[#111111] hover:text-[#666666] transition-colors cursor-pointer group flex items-center gap-2"
            >
              <Search size={18} className="transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline text-xs font-light text-[#666666] group-hover:text-[#111111]">
                جستجو
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
              className="lg:hidden p-2 text-[#111111] hover:text-[#666666] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Pinned Left Sidebar with 3 Social Icons matching video (t, v, f) */}
      <aside
        aria-label="شبکه‌های اجتماعی استودیو"
        className="fixed bottom-10 left-6 sm:left-10 z-40 hidden md:flex flex-col items-center gap-5 text-[#888888]"
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
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="لینکدین"
          className="text-xs font-light hover:text-[#111111] transition-colors duration-300 hover:-translate-y-0.5"
        >
          IN
        </a>
        <div className="w-[1px] h-8 bg-[#111111]/20 mt-2" />
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#F5F4F0] flex flex-col justify-between px-8 py-24 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-right mt-6">
              <span className="text-xs uppercase tracking-widest text-[#777777]">
                فهرست ناوبری
              </span>
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-right text-3xl font-light text-[#111111] hover:text-[#666666] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <span>{item.label}</span>
                    {item.count && (
                      <span className="text-sm font-normal text-[#888888]">
                        ({item.count})
                      </span>
                    )}
                  </span>
                  <ArrowLeft size={18} className="text-[#888888]" />
                </button>
              ))}
            </div>

            <div className="pt-8 border-t border-[#111111]/10 flex flex-col gap-3 text-right">
              <p className="text-xs text-[#777777] font-light">
                استودیو معماری نو — تهران، لواسان، ارومیه
              </p>
              <p className="text-xs text-[#111111] font-normal" dir="ltr">
                contact@nostudio-arch.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
