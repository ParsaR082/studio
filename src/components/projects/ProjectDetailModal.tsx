'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Share2, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, PROJECTS } from '../../data/projects';
import { pauseLenis, resumeLenis } from '../../hooks/useLenis';
import { TextAnimate } from '../common/TextAnimate';
import { ImageAnimate } from '../common/ImageAnimate';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onConsultation?: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onConsultation,
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

  // When changing projects while modal is open, scroll container to top smoothly
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
    <motion.div
      ref={scrollContainerRef}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      initial={{ opacity: 0, y: 35, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: 25,
        scale: 0.985,
        transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] },
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#F4F8F3] text-[#102B2B]"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Top Floating Control Bar with Deep Teal & Tangerine Palette */}
      <div className="sticky top-0 z-50 w-full bg-[#102B2B]/95 backdrop-blur-md border-b border-[#A4E0D6]/20 px-4 sm:px-8 lg:px-14 py-3.5 flex items-center justify-between shadow-lg shadow-black/25">
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-light text-[#A4E0D6]">
          <span className="font-normal text-white text-sm tracking-wide">{project.title}</span>
          <span className="text-[#FF9A56]">·</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B1A]/15 text-[#FF9A56] border border-[#FF6B1A]/30 font-mono text-[10px]">
            پروژه {project.id}
          </span>
          <span className="hidden md:inline text-zinc-400">|</span>
          <span className="hidden md:inline text-zinc-300 font-light">{project.location}</span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleShare}
            aria-label="اشتراک‌گذاری پیوند اثر"
            className="flex items-center gap-1.5 text-xs font-light text-[#A4E0D6] hover:text-[#FF9A56] hover:bg-[#A4E0D6]/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-[#A4E0D6]" /> : <Share2 size={14} />}
            <span className="hidden sm:inline">{copied ? 'کپی شد' : 'اشتراک'}</span>
          </button>

          <button
            onClick={onClose}
            aria-label="بستن پرونده معماری"
            className="flex items-center gap-2 text-xs font-normal text-[#102B2B] bg-[#FF6B1A] hover:bg-[#FF9A56] active:scale-95 transition-all px-4 py-1.5 rounded-full cursor-pointer shadow-sm hover:shadow-[#FF6B1A]/20"
          >
            <span>بستن</span>
            <X size={14} />
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
              x: dir > 0 ? 60 : dir < 0 ? -60 : 0,
              filter: 'blur(6px)',
            }),
            center: {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              },
            },
            exit: (dir: number) => ({
              opacity: 0,
              x: dir > 0 ? -60 : dir < 0 ? 60 : 0,
              filter: 'blur(6px)',
              transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
              },
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          className="max-w-[1540px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-32"
        >
          {/* Project Header with Animated Typography */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102B2B] text-[#A4E0D6] border border-[#A4E0D6]/25 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A]" />
                <span>{project.category}</span>
              </span>

              <span className="text-xs text-[#5B7470] font-light">
                {project.location}
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B1A]/10 text-[#FF6B1A] border border-[#FF6B1A]/25 text-xs font-mono">
                سال تکمیل: {project.year}
              </span>
            </div>

            <div className="mb-4">
              <TextAnimate
                key={`title-${project.id}`}
                animation="slideUp"
                by="word"
                as="h1"
                duration={0.85}
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-[#102B2B] leading-[1.15] font-display"
              >
                {project.title}
              </TextAnimate>
            </div>

            {/* Tangerine Decorative Architectural Accent Bar */}
            <div className="h-[2px] w-24 bg-gradient-to-r from-[#FF6B1A] via-[#FF9A56] to-transparent rounded-full mb-6" />

            <TextAnimate
              key={`tagline-${project.id}`}
              animation="blurIn"
              by="word"
              as="p"
              delay={0.15}
              duration={0.7}
              className="text-lg sm:text-xl lg:text-2xl font-light text-[#102B2B]/80 max-w-3xl leading-relaxed font-body"
            >
              {project.tagline}
            </TextAnimate>
          </div>

          {/* Large Hero Image with Architectural Curtain Wipe */}
          <div className="architectural-media relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#102B2B]/10 shadow-2xl shadow-[#102B2B]/10 bg-[#102B2B] mb-20">
            <ImageAnimate
              key={`hero-${project.id}`}
              src={project.heroImage}
              alt={project.title}
              animation="curtainUp"
              curtainColor="#102B2B"
              duration={1.05}
              className="w-full h-full"
            />

            {/* Floating Glassmorphism Spec Pill on Hero */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2 rounded-xl bg-[#102B2B]/85 backdrop-blur-md border border-[#A4E0D6]/25 text-xs text-[#F4F8F3] flex items-center gap-3 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-pulse" />
              <span className="font-light">{project.area} زیربنا</span>
              <span className="text-[#A4E0D6]">·</span>
              <span className="text-[#A4E0D6] font-light">{project.status}</span>
            </div>
          </div>

          {/* Split Editorial Narrative & Technical Data */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 items-start">
            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-8 text-base sm:text-lg text-[#102B2B] font-light leading-relaxed">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#FF6B1A] font-medium flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A]" />
                  <span>بیانیه و تفکر طراحی</span>
                </span>
                <TextAnimate
                  key={`desc-${project.id}`}
                  animation="blurIn"
                  by="word"
                  as="p"
                  className="text-xl sm:text-2xl font-light text-[#102B2B] leading-snug"
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
                className="text-base text-[#102B2B]/75 leading-relaxed"
              >
                {project.concept}
              </TextAnimate>

              <div className="pt-6 border-t border-[#102B2B]/10">
                <span className="text-xs uppercase tracking-widest text-[#FF6B1A] font-medium flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A]" />
                  <span>پالت مصالح و بافت</span>
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#102B2B]">
                  {project.materials.map((mat, i) => (
                    <motion.li
                      key={`${project.id}-mat-${i}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.45 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#102B2B]/10 hover:border-[#FF6B1A]/40 transition-colors shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FF6B1A] shrink-0" />
                      <span>{mat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Data Sheet with Deep Teal & Tangerine Accent */}
            <motion.div
              key={`tech-card-${project.id}`}
              initial={{ opacity: 0, y: 40, scale: 0.97, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 p-7 sm:p-9 bg-[#102B2B] text-[#F4F8F3] border border-[#A4E0D6]/20 rounded-2xl relative overflow-hidden shadow-2xl"
            >
              {/* Top Accent Expanding Line in Tangerine & Apricot Gradient */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-[#FF6B1A] via-[#FF9A56] to-[#A4E0D6] origin-right"
              />

              <div className="mb-6 pb-3 border-b border-[#A4E0D6]/20 flex items-center justify-between">
                <TextAnimate
                  key={`tech-title-${project.id}`}
                  animation="slideUp"
                  by="word"
                  as="h3"
                  className="text-sm font-normal text-white uppercase tracking-wider"
                >
                  شناسنامه فنی پروژه
                </TextAnimate>
                <span className="text-[11px] font-mono text-[#FF9A56] bg-[#FF9A56]/10 px-2.5 py-0.5 rounded-full border border-[#FF9A56]/25">
                  REV. {project.id}
                </span>
              </div>

              <dl className="space-y-3.5 text-xs sm:text-sm font-light">
                {specsList.map((item, idx) => (
                  <motion.div
                    key={`${project.id}-spec-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + idx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex justify-between py-2 border-b border-[#A4E0D6]/15"
                  >
                    <dt className="text-[#A4E0D6]">{item.label}</dt>
                    <dd className="text-white font-normal">{item.value}</dd>
                  </motion.div>
                ))}
              </dl>

              {/* Consultation Callout inside Data Sheet */}
              {onConsultation && (
                <div className="mt-8 pt-4 border-t border-[#A4E0D6]/20">
                  <button
                    onClick={onConsultation}
                    className="w-full py-3 px-4 rounded-xl bg-[#FF6B1A] hover:bg-[#FF9A56] text-[#102B2B] text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[#FF6B1A]/20"
                  >
                    <Sparkles size={14} />
                    <span>سفارش طراحی بر اساس این الگو</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Editorial Photo Gallery with ImageAnimate */}
          <div className="mb-24 sm:mb-28">
            <span className="text-xs uppercase tracking-widest text-[#FF6B1A] font-medium flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A]" />
              <span>روایت تصویری و زوایای تکمیلی</span>
            </span>

            <div className="space-y-12">
              {/* Gallery Image 1: Asymmetrical 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="architectural-media md:col-span-8 aspect-[16/10] overflow-hidden rounded-2xl border border-[#102B2B]/10 shadow-lg bg-[#102B2B]">
                  <ImageAnimate
                    key={`gal1-${project.id}`}
                    src={project.gallery[0] || project.heroImage}
                    alt={`${project.title} - تصویر ۱`}
                    animation="curtainLeft"
                    curtainColor="#102B2B"
                    className="w-full h-full"
                  />
                </div>
                <div className="md:col-span-4 p-4 border-r-2 border-[#FF6B1A] text-xs font-light text-[#102B2B]/80 leading-relaxed">
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
                <div className="architectural-media aspect-[4/3] overflow-hidden rounded-2xl border border-[#102B2B]/10 shadow-lg bg-[#102B2B]">
                  <ImageAnimate
                    key={`gal2-${project.id}`}
                    src={project.secondaryImage}
                    alt={`${project.title} - تصویر ۲`}
                    animation="curtainUp"
                    curtainColor="#102B2B"
                    className="w-full h-full"
                  />
                </div>
                <div className="architectural-media aspect-[4/3] overflow-hidden rounded-2xl border border-[#102B2B]/10 shadow-lg bg-[#102B2B]">
                  <ImageAnimate
                    key={`gal3-${project.id}`}
                    src={project.gallery[1] || project.heroImage}
                    alt={`${project.title} - تصویر ۳`}
                    animation="curtainRight"
                    curtainColor="#102B2B"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Next & Previous Project Navigation Footer */}
          <div className="pt-12 sm:pt-16 border-t border-[#102B2B]/15 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            <button
              onClick={handlePrev}
              className="group flex items-center gap-4 text-right cursor-pointer p-3 rounded-2xl hover:bg-black/[0.03] transition-colors w-full sm:w-auto"
            >
              <div className="w-11 h-11 rounded-full border border-[#102B2B]/20 text-[#102B2B] flex items-center justify-center transition-all duration-300 group-hover:border-[#FF6B1A] group-hover:bg-[#FF6B1A] group-hover:text-[#102B2B] group-hover:translate-x-1 shrink-0">
                <ArrowRight size={17} />
              </div>
              <div>
                <span className="block text-xs text-[#FF6B1A] font-light">پروژه قبلی</span>
                <span className="text-base sm:text-lg font-light text-[#102B2B] group-hover:text-[#FF6B1A] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </button>

            {onConsultation && (
              <button
                onClick={onConsultation}
                className="hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102B2B] text-[#A4E0D6] hover:text-white border border-[#A4E0D6]/20 text-xs font-light transition-all hover:bg-[#102B2B]/90 cursor-pointer"
              >
                <span>درخواست مشاوره اختصاصی</span>
                <ArrowLeft size={13} className="text-[#FF6B1A]" />
              </button>
            )}

            <button
              onClick={handleNext}
              className="group flex items-center gap-4 text-left cursor-pointer p-3 rounded-2xl hover:bg-black/[0.03] transition-colors w-full sm:w-auto justify-end sm:justify-start"
            >
              <div className="text-right">
                <span className="block text-xs text-[#FF6B1A] font-light">پروژه بعدی</span>
                <span className="text-base sm:text-lg font-light text-[#102B2B] group-hover:text-[#FF6B1A] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-11 h-11 rounded-full border border-[#102B2B]/20 text-[#102B2B] flex items-center justify-center transition-all duration-300 group-hover:border-[#FF6B1A] group-hover:bg-[#FF6B1A] group-hover:text-[#102B2B] group-hover:-translate-x-1 shrink-0">
                <ArrowLeft size={17} />
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default React.memo(ProjectDetailModal);
