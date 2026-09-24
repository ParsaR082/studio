import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const cardRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, {
    margin: '-60px 0px -60px 0px',
    amount: 0.2,
  });

  // Calculate stagger delay based on column position (0, 1, 2)
  const colIndex = index % 3;
  const delay = colIndex * 0.12;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 55, scale: 0.97 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: -40, scale: 0.98 }
      }
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onSelect(project)}
      className="group flex flex-col cursor-pointer"
    >
      {/* 1:1 Square Image Container matching video 00:03 */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#E8E6DE] mb-6">
        <img
          src={project.heroImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Scrim on Hover */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

        {/* Index counter */}
        <div className="absolute top-4 right-4 text-[11px] font-light text-white/90 drop-shadow-sm px-2 py-0.5 bg-black/30 backdrop-blur-sm">
          {project.id}
        </div>
      </div>

      {/* Category Subtitle matching video (e.g. EXHIBITIONS / INTERVIEWS / INSTALLATION) */}
      <div className="mb-2">
        <span className="text-[11px] font-light uppercase tracking-widest text-[#777777]">
          {project.category} · {project.location}
        </span>
      </div>

      {/* Title in bold editorial style matching video 00:03 */}
      <h3 className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#555555] transition-colors duration-300 leading-snug mb-3">
        {project.title}
      </h3>

      {/* Short descriptive excerpt */}
      <p className="text-xs sm:text-sm font-light text-[#666666] line-clamp-2 leading-relaxed mb-6">
        {project.tagline}
      </p>

      {/* Button with circular arrow matching video "READ ARTICLE ○ ←" */}
      <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#111111]/8">
        <span className="text-[11px] font-light text-[#888888]">{project.year}</span>
        <div className="inline-flex items-center gap-2.5 text-xs font-light uppercase tracking-wider text-[#111111] group-hover:text-[#555555] transition-colors">
          <span>مشاهده اثر</span>
          <span className="w-7 h-7 rounded-full border border-[#111111] flex items-center justify-center transition-all duration-300 group-hover:bg-[#111111] group-hover:text-white group-hover:-translate-x-1">
            <ArrowLeft size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};
