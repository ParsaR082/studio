import React, { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { Project, PROJECTS } from '../../data/projects';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    margin: '-60px 0px -60px 0px',
    amount: 0.1,
  });

  const categories = ['همه', 'مسکونی', 'ویلایی', 'فرهنگی'];

  const filteredProjects =
    activeCategory === 'همه'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t border-[#111111]/8 overflow-hidden"
    >
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header matching video 00:03 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#777777] font-light block mb-3">
              مجموعه آثار و مقالات تحلیلی · ARCHIVE & ARTICLES
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#111111]">
              پروژه‌ها و مقالات
            </h2>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-wider font-light transition-all duration-300 relative py-1 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-[#111111] font-normal'
                    : 'text-[#888888] hover:text-[#111111]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span
                    layoutId="projectGridFilterIndicator"
                    className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-[#111111]"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3-Column Editorial Grid matching video 00:03 - 00:04 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-16 lg:gap-y-20">
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
          className="mt-20 pt-8 border-t border-[#111111]/8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] font-light gap-4"
        >
          <span>نمایش {filteredProjects.length} اثر معاصر در گرید ۳ ستونه</span>
          <span>استودیو نو — کلیه حقوق معماری محفوظ است.</span>
        </motion.div>
      </div>
    </section>
  );
};
