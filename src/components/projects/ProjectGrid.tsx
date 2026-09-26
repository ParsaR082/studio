'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { Project, PROJECTS } from '../../data/projects';
import { TextAnimate } from '../common/TextAnimate';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ['همه', 'مسکونی', 'ویلایی', 'فرهنگی'] as const;

const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    margin: '-60px 0px -60px 0px',
    amount: 0.1,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'همه'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Reset to the first three projects whenever the category changes.
  useEffect(() => {
    setIsExpanded(false);
  }, [activeCategory]);

  const visibleProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, 3);

  const handleToggleProjects = () => {
    if (isExpanded) {
      setIsExpanded(false);
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
      return;
    }

    setIsExpanded(true);
  };

  // Warm the first visible project images during idle time so image decoding does not
  // compete with the first flip-card interaction when the section enters the viewport.
  useEffect(() => {
    const urls = PROJECTS.slice(0, 3).map((project) => project.heroImage);
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const preload = () => {
      urls.forEach((src) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = src;
        void image.decode().catch(() => undefined);
      });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(preload, { timeout: 3000 });
    } else {
      timeoutId = setTimeout(preload, 2200);
    }

    return () => {
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-14 sm:py-24 lg:py-36 px-[var(--page-gutter)] border-t border-[#102B2B]/10 bg-[#EAF3EF] overflow-hidden"
    >
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header matching video 00:03 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <div className="mb-3">
              <TextAnimate
                animation="slideRight"
                by="word"
                as="span"
                className="text-[11px] uppercase tracking-widest text-[#42635F] font-light"
              >
                مجموعه آثار و مقالات تحلیلی · ARCHIVE & ARTICLES
              </TextAnimate>
            </div>
            <TextAnimate
              animation="slideUp"
              by="word"
              as="h2"
              duration={0.85}
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#102B2B]"
            >
              پروژه‌ها و مقالات
            </TextAnimate>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto pb-3 scrollbar-none max-w-full -mx-1 px-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-wider font-light transition-all duration-300 relative py-1 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-[#102B2B] font-normal'
                    : 'text-[#FF9A56] hover:text-[#102B2B]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span
                    layoutId="projectGridFilterIndicator"
                    className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-[#102B2B]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid: show three projects initially, then reveal the full archive. */}
        <div
          className={`overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? 'max-h-[10000px]' : 'max-h-[1750px]'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 md:gap-x-8 xl:gap-x-12 gap-y-10 sm:gap-y-14 lg:gap-y-20">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        </div>

        {/* Expand / collapse control */}
        {filteredProjects.length > 3 && (
          <motion.button
            type="button"
            onClick={handleToggleProjects}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'بستن فهرست پروژه‌ها' : 'مشاهده همه پروژه‌ها'}
            className="group mx-auto mt-10 sm:mt-16 flex flex-col items-center gap-3 text-[#102B2B] cursor-pointer"
          >
            <span className="text-[11px] font-light tracking-[0.18em] uppercase transition-colors group-hover:text-[#FF6B1A]">
              {isExpanded ? 'بستن پروژه‌ها' : 'مشاهده همه پروژه‌ها'}
            </span>
            <span className="w-11 h-11 rounded-full border border-[#102B2B]/30 flex items-center justify-center transition-all duration-500 group-hover:border-[#FF6B1A] group-hover:bg-[#FF6B1A] group-hover:text-[#102B2B]">
              <motion.span
                animate={{ y: isExpanded ? -2 : 2, rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </motion.span>
            </span>
          </motion.button>
        )}

        {/* Grid Footer Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-[#102B2B]/8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#42635F] font-light gap-4"
        >
          <span>نمایش {isExpanded ? filteredProjects.length : Math.min(3, filteredProjects.length)} از {filteredProjects.length} اثر معاصر</span>
          <span>استودیو نو — کلیه حقوق معماری محفوظ است.</span>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ProjectGrid);
