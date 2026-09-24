import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Project } from '../../data/projects';
import { TextAnimate } from '../common/TextAnimate';
import { ImageAnimate } from '../common/ImageAnimate';

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

  const colIndex = index % 3;
  const delay = colIndex * 0.12;

  // Alternate image curtain direction for dynamic rhythm
  const curtainAnimation =
    colIndex === 0 ? 'curtainUp' : colIndex === 1 ? 'curtainLeft' : 'curtainRight';

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: -35, scale: 0.99 }
      }
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onSelect(project)}
      className="group flex flex-col cursor-pointer"
    >
      {/* 1:1 Square Image with Special Curtain Wipe & Zoom Animation */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#E8E6DE] mb-6">
        <ImageAnimate
          src={project.heroImage}
          alt={project.title}
          animation={curtainAnimation}
          delay={delay}
          duration={0.9}
          curtainColor="#DEDBD2"
          className="w-full h-full"
        >
          {/* Index Counter overlay */}
          <div className="absolute top-4 right-4 text-[11px] font-light text-white/95 px-2 py-0.5 bg-black/40 backdrop-blur-sm">
            {project.id}
          </div>
        </ImageAnimate>
      </div>

      {/* Category Subtitle with TextAnimate */}
      <div className="mb-2">
        <TextAnimate
          animation="slideRight"
          by="word"
          as="span"
          delay={delay + 0.1}
          className="text-[11px] font-light uppercase tracking-widest text-[#777777]"
        >
          {`${project.category} · ${project.location}`}
        </TextAnimate>
      </div>

      {/* Title with TextAnimate slideUp by word */}
      <div className="mb-3">
        <TextAnimate
          animation="slideUp"
          by="word"
          as="h3"
          delay={delay + 0.15}
          duration={0.7}
          className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#555555] transition-colors duration-300 leading-snug"
        >
          {project.title}
        </TextAnimate>
      </div>

      {/* Short descriptive excerpt with blurIn */}
      <div className="mb-6 line-clamp-2">
        <TextAnimate
          animation="blurIn"
          by="word"
          as="p"
          delay={delay + 0.25}
          duration={0.65}
          className="text-xs sm:text-sm font-light text-[#666666] leading-relaxed"
        >
          {project.tagline}
        </TextAnimate>
      </div>

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
