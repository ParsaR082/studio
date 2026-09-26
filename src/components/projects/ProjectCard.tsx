'use client';

import React, { useState } from 'react';
import { ArrowLeft, RotateCw, Maximize2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Project } from '../../data/projects';
import { TextAnimate } from '../common/TextAnimate';
import FlipCard from '../common/FlipCard';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

const ProjectCardComponent: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, {
    margin: '-60px 0px -60px 0px',
    amount: 0.2,
  });

  const colIndex = index % 3;
  const delay = colIndex * 0.12;

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
      className="group flex flex-col"
    >
      {/* Interactive 3D FlipCard from React Bits */}
      <div className="w-full mb-4 sm:mb-6 relative [perspective:1100px]">
        <FlipCard
          width="100%"
          height="clamp(300px, 30vw, 360px)"
          radius={12}
          axis="y"
          draggable
          tilt
          tiltMax={10}
          glare
          glareOpacity={0.22}
          hoverScale={1.02}
          perspective={1100}
          background="#0B1C1C"
          color="#F4F8F3"
          shadow
          shadowColor="#000000"
          shadowOpacity={0.35}
          flipped={flipped}
          onFlipChange={setFlipped}
          ariaLabel={`کارت سه‌بعدی ${project.title}`}
          front={
            <div className="architectural-media relative w-full h-full overflow-hidden bg-[#A4E0D6]">
              <img
                src={project.heroImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="architectural-media w-full h-full object-cover select-none"
              />

              {/* Gradient Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              {/* Top Tags */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest text-white/95 px-2.5 py-1 bg-black/45 backdrop-blur-md border border-[#A4E0D6]/20 rounded-sm">
                  {project.id}
                </span>
                <span className="text-[10px] font-light text-[#F4F8F3]/80 px-2 py-1 bg-black/35 backdrop-blur-md rounded-sm">
                  {project.category}
                </span>
              </div>

              {/* Bottom Flip Affordance Hint */}
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-[#F4F8F3]/90">
                <div className="flex flex-col">
                  <span className="text-xs font-light text-[#F4F8F3]/70">
                    {project.location}
                  </span>
                  <span className="text-sm font-normal tracking-wide">
                    {project.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-light text-[#F4F8F3]/85 px-2.5 py-1 rounded bg-[#A4E0D6]/20 backdrop-blur-md border border-[#A4E0D6]/30">
                  <RotateCw size={12} className="animate-spin-slow" />
                  <span>چرخش کارت</span>
                </div>
              </div>
            </div>
          }
          back={
            <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between bg-[#0B1C1C] text-[#F4F8F3] border border-[#A4E0D6]/20">
              {/* Back Header */}
              <div className="flex items-center justify-between border-b border-[#A4E0D6]/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#6A7F7C]">
                    شیت فنی پروژه {project.id}
                  </span>
                  <span>·</span>
                  <span className="text-[10px] text-[#A4E0D6]">{project.year}</span>
                </div>
                <button
                  type="button"
                  data-no-flip="true"
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(false);
                  }}
                  className="flex items-center gap-1 text-[11px] text-[#6A7F7C] hover:text-[#FF9A56] transition-colors cursor-pointer z-30 relative"
                >
                  <RotateCw size={11} />
                  <span>بازگشت</span>
                </button>
              </div>

              {/* Back Project Specs */}
              <div className="my-auto space-y-2 sm:space-y-3 text-right min-h-0">
                <h4 className="text-lg sm:text-xl font-light tracking-tight text-white">
                  {project.title}
                </h4>
                <p className="text-xs text-[#6A7F7C] font-light line-clamp-3 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/8 text-xs font-light">
                  <div>
                    <span className="block text-[10px] text-[#5B7470]">زیربنا</span>
                    <span className="text-[#A4E0D6] font-normal">{project.area}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#5B7470]">مکان</span>
                    <span className="text-[#A4E0D6] font-normal">{project.location}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#5B7470]">سازه و معمار</span>
                    <span className="text-[#A4E0D6] font-normal">{project.architect}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#5B7470]">وضعیت</span>
                    <span className="text-[#A4E0D6] font-normal">{project.status}</span>
                  </div>
                </div>
              </div>

              {/* Back Action CTA Button */}
              <button
                type="button"
                data-no-flip="true"
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                className="w-full py-2.5 px-4 bg-white text-[#102B2B] hover:bg-[#A4E0D6] active:scale-[0.98] transition-all rounded text-xs font-light tracking-wide flex items-center justify-center gap-2 cursor-pointer z-30 relative"
              >
                <span>مشاهده پرونده کامل اثر</span>
                <Maximize2 size={13} />
              </button>
            </div>
          }
        />
      </div>

      {/* Category Subtitle with TextAnimate */}
      <div className="mb-2">
        <TextAnimate
          animation="slideRight"
          by="word"
          as="span"
          delay={delay + 0.1}
          className="text-[11px] font-light uppercase tracking-widest text-[#5B7470]"
        >
          {`${project.category} · ${project.location}`}
        </TextAnimate>
      </div>

      {/* Title with TextAnimate slideUp by word */}
      <div className="mb-3">
        <button
          onClick={() => onSelect(project)}
          className="text-right cursor-pointer group-hover:text-[#5B7470] transition-colors"
        >
          <TextAnimate
            animation="slideUp"
            by="word"
            as="h3"
            delay={delay + 0.15}
            duration={0.7}
            className="text-xl sm:text-2xl font-light text-[#102B2B] leading-snug"
          >
            {project.title}
          </TextAnimate>
        </button>
      </div>

      {/* Short descriptive excerpt with blurIn */}
      <div className="mb-6 line-clamp-2">
        <TextAnimate
          animation="blurIn"
          by="word"
          as="p"
          delay={delay + 0.25}
          duration={0.65}
          className="text-xs sm:text-sm font-light text-[#5B7470] leading-relaxed"
        >
          {project.tagline}
        </TextAnimate>
      </div>

      {/* Button with circular arrow */}
      <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#102B2B]/8">
        <span className="text-[11px] font-light text-[#6A7F7C]">{project.year}</span>
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-2.5 text-xs font-light uppercase tracking-wider text-[#102B2B] hover:text-[#5B7470] transition-colors cursor-pointer"
        >
          <span>مشاهده جزئیات</span>
          <span className="w-7 h-7 rounded-full border border-[#102B2B] flex items-center justify-center transition-all duration-300 group-hover:bg-[#102B2B] group-hover:text-[#FF9A56] group-hover:-translate-x-1">
            <ArrowLeft size={12} />
          </span>
        </button>
      </div>
    </motion.article>
  );
};

export const ProjectCard = React.memo(ProjectCardComponent);
export default ProjectCard;
