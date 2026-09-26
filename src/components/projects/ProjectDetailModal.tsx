'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, PROJECTS } from '../../data/projects';
import { pauseLenis, resumeLenis } from '../../hooks/useLenis';
import { TextAnimate } from '../common/TextAnimate';
import { ImageAnimate } from '../common/ImageAnimate';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Pause Lenis so it does not intercept wheel events inside the modal
    pauseLenis();

    // Prevent body background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Reset modal scroll to top when opening
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handleNext();
      if (e.key === 'ArrowRight') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      resumeLenis();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // When changing projects while modal is open, scroll container to top
  useEffect(() => {
    if (project && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project?.id]);

  if (!project) return null;

  // Find next and previous project
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  const handlePrev = () => {
    setDirection(-1);
    onSelectProject(prevProject);
  };

  const handleNext = () => {
    setDirection(1);
    onSelectProject(nextProject);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const specsList = [
    { label: 'معمار مسئول', value: project.architect },
    { label: 'موقعیت', value: project.location },
    { label: 'سال ساخت', value: project.year },
    { label: 'زیربنا', value: project.area },
    { label: 'وضعیت', value: project.status },
    ...project.specs,
  ];

  return (
    <div
      ref={scrollContainerRef}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#F5F4F0] text-[#111111] animate-in fade-in duration-300"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-50 w-full bg-[#F5F4F0]/95 backdrop-blur-md border-b border-[#111111]/8 px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-light text-[#666666]">
          <span className="font-normal text-[#111111]">{project.title}</span>
          <span>·</span>
          <span>پروژه شماره {project.id}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            aria-label="اشتراک‌گذاری پیوند اثر"
            className="flex items-center gap-2 text-xs font-light text-[#666666] hover:text-[#111111] transition-colors p-2 cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-700" /> : <Share2 size={14} />}
            <span className="hidden sm:inline">{copied ? 'کپی شد' : 'اشتراک'}</span>
          </button>

          <button
            onClick={onClose}
            aria-label="بستن پرونده معماری"
            className="flex items-center gap-2 text-xs font-light text-[#111111] hover:text-[#666666] transition-colors p-2 cursor-pointer border border-[#111111]/15 rounded-full px-3 py-1"
          >
            <span>بستن</span>
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Main Content Area with Smooth Cross-Project Transition */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.id}
          custom={direction}
          variants={{
            enter: (dir: number) => ({
              opacity: 0,
              x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
              filter: 'blur(8px)',
            }),
            center: {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: (dir: number) => ({
              opacity: 0,
              x: dir > 0 ? -80 : dir < 0 ? 80 : 0,
              filter: 'blur(8px)',
              transition: {
                duration: 0.35,
                ease: [0.76, 0, 0.24, 1],
              },
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          className="max-w-[1540px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-32"
        >
          {/* Project Header with Animated Typography */}
          <div className="mb-14">
            <div className="mb-4">
              <TextAnimate
                key={`meta-${project.id}`}
                animation="slideRight"
                by="word"
                as="div"
                className="flex flex-wrap items-center gap-4 text-xs tracking-widest text-[#777777] font-light"
              >
                {`${project.category} · ${project.location} · سال تکمیل: ${project.year}`}
              </TextAnimate>
            </div>

            <div className="mb-6">
              <TextAnimate
                key={`title-${project.id}`}
                animation="slideUp"
                by="word"
                as="h1"
                duration={0.9}
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-[#111111] leading-[1.15] font-display"
              >
                {project.title}
              </TextAnimate>
            </div>

            <TextAnimate
              key={`tagline-${project.id}`}
              animation="blurIn"
              by="word"
              as="p"
              delay={0.2}
              duration={0.7}
              className="text-lg sm:text-xl lg:text-2xl font-light text-[#444444] max-w-3xl leading-relaxed font-body"
            >
              {project.tagline}
            </TextAnimate>
          </div>

          {/* Large Hero Image with Curtain Wipe Animation */}
          <div className="architectural-media w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8] overflow-hidden bg-[#E5E3DB] mb-20">
            <ImageAnimate
              key={`hero-${project.id}`}
              src={project.heroImage}
              alt={project.title}
              animation="curtainUp"
              curtainColor="#D6D3C8"
              duration={1.1}
              className="w-full h-full"
            />
          </div>

          {/* Split Editorial Narrative & Technical Data */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 items-start">
            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-8 text-base sm:text-lg text-[#333333] font-light leading-relaxed">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#888888] font-light block mb-3">
                  بیانیه و تفکر طراحی
                </span>
                <TextAnimate
                  key={`desc-${project.id}`}
                  animation="blurIn"
                  by="word"
                  as="p"
                  className="text-xl sm:text-2xl font-light text-[#111111] leading-snug"
                >
                  {project.description}
                </TextAnimate>
              </div>

              <TextAnimate
                key={`concept-${project.id}`}
                animation="fadeSlide"
                by="word"
                as="p"
                delay={0.15}
                className="text-base text-[#555555]"
              >
                {project.concept}
              </TextAnimate>

              <div className="pt-6 border-t border-[#111111]/8">
                <span className="text-xs uppercase tracking-widest text-[#888888] font-light block mb-3">
                  پالت مصالح و بافت
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#222222]">
                  {project.materials.map((mat, i) => (
                    <motion.li
                      key={`${project.id}-mat-${i}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/40" />
                      <span>{mat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Data Sheet with Full Fluid Animation & Accent Line */}
            <motion.div
              key={`tech-card-${project.id}`}
              initial={{ opacity: 0, y: 40, scale: 0.97, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 p-8 bg-[#EFEFEA] border border-[#111111]/10 relative overflow-hidden"
            >
              {/* Top Accent Expanding Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 right-0 left-0 h-[2px] bg-[#111111] origin-right"
              />

              <div className="mb-6 pb-3 border-b border-[#111111]/10 flex items-center justify-between">
                <TextAnimate
                  key={`tech-title-${project.id}`}
                  animation="slideUp"
                  by="word"
                  as="h3"
                  className="text-sm font-normal text-[#111111] uppercase tracking-wider"
                >
                  شناسنامه فنی پروژه
                </TextAnimate>
                <span className="text-[11px] font-mono text-[#888888]">
                  REV. {project.id}
                </span>
              </div>

              <dl className="space-y-4 text-xs sm:text-sm font-light">
                {specsList.map((item, idx) => (
                  <motion.div
                    key={`${project.id}-spec-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex justify-between py-2 border-b border-[#111111]/6"
                  >
                    <dt className="text-[#777777]">{item.label}</dt>
                    <dd className="text-[#111111] font-normal">{item.value}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* Editorial Photo Gallery with ImageAnimate */}
          <div className="mb-28">
            <span className="text-xs uppercase tracking-widest text-[#888888] font-light block mb-8">
              روایت تصویری و زوایای تکمیلی
            </span>

            <div className="space-y-12">
              {/* Gallery Image 1: Asymmetrical 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="architectural-media md:col-span-8 aspect-[16/10] overflow-hidden bg-[#E5E3DB]">
                  <ImageAnimate
                    key={`gal1-${project.id}`}
                    src={project.gallery[0] || project.heroImage}
                    alt={`${project.title} - تصویر ۱`}
                    animation="curtainLeft"
                    curtainColor="#DEDCD3"
                    className="w-full h-full"
                  />
                </div>
                <div className="md:col-span-4 p-4 text-xs font-light text-[#666666] leading-relaxed">
                  <TextAnimate
                    key={`caption-${project.id}`}
                    animation="blurIn"
                    by="word"
                    as="p"
                  >
                    نورپردازی طبیعی در ساعات مختلف روز موجب دگرگونی پویای بافت سطوح سنگین شده و احساس عمق را در کالبد معماری تشدید می‌کند.
                  </TextAnimate>
                </div>
              </div>

              {/* Gallery Image 2 & 3: Dual Balanced */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="architectural-media aspect-[4/3] overflow-hidden bg-[#E5E3DB]">
                  <ImageAnimate
                    key={`gal2-${project.id}`}
                    src={project.secondaryImage}
                    alt={`${project.title} - تصویر ۲`}
                    animation="curtainUp"
                    curtainColor="#D6D3C8"
                    className="w-full h-full"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden bg-[#E5E3DB]">
                  <ImageAnimate
                    key={`gal3-${project.id}`}
                    src={project.gallery[1] || project.heroImage}
                    alt={`${project.title} - تصویر ۳`}
                    animation="curtainRight"
                    curtainColor="#D6D3C8"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Next & Previous Project Navigation Footer */}
          <div className="pt-16 border-t border-[#111111]/15 flex flex-col sm:flex-row items-center justify-between gap-8">
            <button
              onClick={handlePrev}
              className="group flex items-center gap-4 text-right cursor-pointer p-2 rounded-lg hover:bg-black/[0.02] transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-[#111111]/20 flex items-center justify-center transition-all duration-300 group-hover:border-[#111111] group-hover:translate-x-1 group-hover:bg-[#111111] group-hover:text-white">
                <ArrowRight size={16} />
              </div>
              <div>
                <span className="block text-xs text-[#888888] font-light">پروژه قبلی</span>
                <span className="text-lg font-light text-[#111111] group-hover:text-[#555555] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </button>

            <button
              onClick={handleNext}
              className="group flex items-center gap-4 text-left cursor-pointer p-2 rounded-lg hover:bg-black/[0.02] transition-colors"
            >
              <div className="text-right">
                <span className="block text-xs text-[#888888] font-light">پروژه بعدی</span>
                <span className="text-lg font-light text-[#111111] group-hover:text-[#555555] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#111111]/20 flex items-center justify-center transition-all duration-300 group-hover:border-[#111111] group-hover:-translate-x-1 group-hover:bg-[#111111] group-hover:text-white">
                <ArrowLeft size={16} />
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default React.memo(ProjectDetailModal);
