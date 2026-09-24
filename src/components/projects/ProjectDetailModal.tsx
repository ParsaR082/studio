import React, { useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, Share2, Check } from 'lucide-react';
import { Project, PROJECTS } from '../../data/projects';
import { pauseLenis, resumeLenis } from '../../hooks/useLenis';
import { TextAnimate } from '../common/TextAnimate';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const [copied, setCopied] = React.useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Pause Lenis so it does not intercept wheel events inside the modal
    pauseLenis();

    // Prevent body background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Reset modal scroll to top when opening or switching project
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

      {/* Main Content Area */}
      <div className="max-w-[1540px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-32">
        {/* Project Header */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-widest text-[#777777] font-light mb-4">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.location}</span>
            <span>·</span>
            <span>سال تکمیل: {project.year}</span>
          </div>

          <div className="mb-6">
            <TextAnimate
              animation="slideUp"
              by="word"
              as="h1"
              duration={0.9}
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-[#111111] leading-[0.95]"
            >
              {project.title}
            </TextAnimate>
          </div>

          <TextAnimate
            animation="blurIn"
            by="word"
            as="p"
            delay={0.2}
            className="text-xl sm:text-2xl font-light text-[#444444] max-w-3xl leading-relaxed"
          >
            {project.tagline}
          </TextAnimate>
        </div>

        {/* Large Hero Image */}
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8] overflow-hidden bg-[#E5E3DB] mb-20">
          <img
            src={project.heroImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
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
              <p className="text-xl sm:text-2xl font-light text-[#111111] leading-snug">
                {project.description}
              </p>
            </div>

            <p className="text-base text-[#555555]">
              {project.concept}
            </p>

            <div className="pt-6 border-t border-[#111111]/8">
              <span className="text-xs uppercase tracking-widest text-[#888888] font-light block mb-3">
                پالت مصالح و بافت
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#222222]">
                {project.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/40" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Data Sheet */}
          <div className="lg:col-span-5 p-8 bg-[#EFEFEA] border border-[#111111]/8">
            <h3 className="text-sm font-normal text-[#111111] uppercase tracking-wider mb-6 pb-3 border-b border-[#111111]/10">
              شناسنامه فنی پروژه
            </h3>

            <dl className="space-y-4 text-xs sm:text-sm font-light">
              <div className="flex justify-between py-2 border-b border-[#111111]/6">
                <dt className="text-[#777777]">معمار مسئول</dt>
                <dd className="text-[#111111] font-normal">{project.architect}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-[#111111]/6">
                <dt className="text-[#777777]">موقعیت</dt>
                <dd className="text-[#111111] font-normal">{project.location}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-[#111111]/6">
                <dt className="text-[#777777]">سال ساخت</dt>
                <dd className="text-[#111111] font-normal">{project.year}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-[#111111]/6">
                <dt className="text-[#777777]">زیربنا</dt>
                <dd className="text-[#111111] font-normal">{project.area}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-[#111111]/6">
                <dt className="text-[#777777]">وضعیت</dt>
                <dd className="text-[#111111] font-normal">{project.status}</dd>
              </div>
              {project.specs.map((spec, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-[#111111]/6">
                  <dt className="text-[#777777]">{spec.label}</dt>
                  <dd className="text-[#111111] font-normal">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Editorial Photo Gallery */}
        <div className="mb-28">
          <span className="text-xs uppercase tracking-widest text-[#888888] font-light block mb-8">
            روایت تصویری و زوایای تکمیلی
          </span>

          <div className="space-y-12">
            {/* Gallery Image 1: Asymmetrical 2 Column */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 aspect-[16/10] overflow-hidden bg-[#E5E3DB]">
                <img
                  src={project.gallery[0] || project.heroImage}
                  alt={`${project.title} - تصویر ۱`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-4 p-4 text-xs font-light text-[#666666] leading-relaxed">
                <p>
                  نورپردازی طبیعی در ساعات مختلف روز موجب دگرگونی پویای بافت سطوح سنگین شده و احساس عمق را در کالبد معماری تشدید می‌کند.
                </p>
              </div>
            </div>

            {/* Gallery Image 2: Dual Balanced */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[4/3] overflow-hidden bg-[#E5E3DB]">
                <img
                  src={project.secondaryImage}
                  alt={`${project.title} - تصویر ۲`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden bg-[#E5E3DB]">
                <img
                  src={project.gallery[1] || project.heroImage}
                  alt={`${project.title} - تصویر ۳`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Next & Previous Project Navigation Footer */}
        <div className="pt-16 border-t border-[#111111]/15 flex flex-col sm:flex-row items-center justify-between gap-8">
          <button
            onClick={() => onSelectProject(prevProject)}
            className="group flex items-center gap-4 text-right cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-[#111111]/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
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
            onClick={() => onSelectProject(nextProject)}
            className="group flex items-center gap-4 text-left cursor-pointer"
          >
            <div className="text-right">
              <span className="block text-xs text-[#888888] font-light">پروژه بعدی</span>
              <span className="text-lg font-light text-[#111111] group-hover:text-[#555555] transition-colors">
                {nextProject.title}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#111111]/20 flex items-center justify-center transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={16} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
