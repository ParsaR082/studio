import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import GooeyInput from '@/components/ui/gooey-input';
import { PROJECTS, Project } from '../../data/projects';

interface HeaderSearchProps {
  onOpenFullSearch: (initialQuery?: string) => void;
  onSelectProject?: (project: Project) => void;
  className?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  onOpenFullSearch,
  onSelectProject,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close live results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter projects live
  const matchingProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    ).slice(0, 4);
  }, [query]);

  const handleSelectResult = (project: Project) => {
    setIsExpanded(false);
    setQuery('');
    onSelectProject?.(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onOpenFullSearch(query);
      setIsExpanded(false);
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Liquid Gooey Input Control */}
      <div dir="ltr" className="flex items-center">
        <GooeyInput
          placeholder="جستجو در آثار..."
          value={query}
          onValueChange={(val) => setQuery(val)}
          onOpenChange={(open) => setIsExpanded(open)}
          onKeyDown={handleKeyDown}
          collapsedWidth={98}
          expandedWidth={230}
          expandedOffset={46}
          gooeyBlur={4}
          classNames={{
            trigger:
              'bg-[#111111] text-[#F5F4F0] border border-white/10 shadow-md hover:bg-[#201F1D] text-xs font-light tracking-wide',
            bubbleSurface:
              'bg-[#111111] text-[#F5F4F0] border border-white/10 shadow-md',
            input: 'text-xs text-[#F5F4F0] placeholder:text-[#888888] font-light',
          }}
        />
      </div>

      {/* Live Search Quick Popover */}
      <AnimatePresence>
        {isExpanded && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            dir="rtl"
            className="absolute top-full mt-3 right-0 w-[300px] sm:w-[340px] bg-[#1A1917]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-3 z-50 text-right overflow-hidden"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-2 text-[11px] text-[#A09E96] font-light">
              <span>نتایج سریع جستجو ({matchingProjects.length})</span>
              <span className="text-[10px] text-[#777777]">کلید Enter برای آرشیو کامل</span>
            </div>

            {/* Results Items */}
            {matchingProjects.length > 0 ? (
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto">
                {matchingProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => handleSelectResult(project)}
                    className="w-full text-right p-2 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10">
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="truncate">
                        <span className="block text-xs font-normal text-white group-hover:text-[#EAE8E0] truncate">
                          {project.title}
                        </span>
                        <span className="block text-[10px] text-[#999999] truncate font-light">
                          {project.category} · {project.location}
                        </span>
                      </div>
                    </div>
                    <ArrowLeft size={13} className="text-[#888888] group-hover:text-white shrink-0 group-hover:-translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-[#888888] font-light">
                موردی منطبق با «{query}» یافت نشد
              </div>
            )}

            {/* Bottom Action CTA: Open Full Search Modal */}
            <button
              type="button"
              onClick={() => {
                onOpenFullSearch(query);
                setIsExpanded(false);
              }}
              className="mt-2 pt-2 border-t border-white/10 w-full py-1.5 px-2 flex items-center justify-between text-[11px] text-[#C6C4BC] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 font-light">
                <ExternalLink size={12} />
                <span>مشاهده پرونده‌ها در آرشیو جامع آثار</span>
              </span>
              <span className="text-[10px] text-[#777777]">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
