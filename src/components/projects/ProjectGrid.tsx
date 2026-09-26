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

  const filteredProjects = useMemo(() => {
    return activeCategory === 'همه'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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
      className="py-16 sm:py-24 lg:py-36 px-[var(--page-gutter)] border-t border-[#102B2B]/8 overflow-hidden"
    >
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header matching video 00:03 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
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
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-3 scrollbar-none max-w-full -mx-1 px-1">
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

        {/* 3-Column Editorial Grid matching video 00:03 - 00:04 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 md:gap-x-8 xl:gap-x-12 gap-y-10 sm:gap-y-14 lg:gap-y-20">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={onSelectProject}
            />
          ))}
        </div>

        {/* Grid Footer Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-[#102B2B]/8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#42635F] font-light gap-4"
        >
          <span>نمایش {filteredProjects.length} اثر معاصر</span>
          <span>استودیو نو — کلیه حقوق معماری محفوظ است.</span>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ProjectGrid);
