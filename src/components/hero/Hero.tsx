'use client';

import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Project } from '../../data/projects';

interface HeroProps {
  featuredProject: Project;
  onSelectProject: (project: Project) => void;
  onExploreProjects: () => void;
}

const Hero: React.FC<HeroProps> = ({
  featuredProject,
  onSelectProject,
  onExploreProjects,
}) => {
  const containerRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {
    margin: '-60px 0px -60px 0px',
    amount: 0.2,
  });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-[#102B2B] text-white flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      {/* Monochromatic Architectural Ambient Lighting */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#A4E0D6]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#FF6B1A]/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        <div className="grid items-center max-w-6xl grid-cols-1 mx-auto gap-y-12 lg:grid-cols-5 gap-x-12 xl:gap-x-16">
          {/* Text & Content Column (3 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto text-center lg:text-right lg:max-w-none lg:col-span-3"
          >
            {/* Monochromatic Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#A4E0D6]/10 border border-[#A4E0D6]/20 text-xs text-[#A4E0D6] font-light mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>استودیو طراحی و معماری معاصر نو</span>
              <span className="text-[#FF9A56]/70">·</span>
              <span className="text-[#A4E0D6]/80">مونوگراف ۱۴۰۵</span>
            </div>

            {/* Major Editorial Headline with Gray/Silver Gradient */}
            <h1 className="text-3xl font-light text-white sm:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.25] tracking-tight">
              <span className="text-[#F4F8F3]">آفرینش فضا در تلاقی</span>{' '}
              <span className="block mt-2 text-[#FF9A56] font-normal">
                نور، سکوت و ماده
              </span>
            </h1>

            {/* Descriptive Architectural Narrative */}
            <p className="mt-6 text-base font-light text-[#A4E0D6] sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-body">
              ما در استودیو معماری نو، فرم‌ها را بر پایه گفتگوی عمیق میان نور خورشید، خلوص مصالح و بستر طبیعی بازتعریف می‌کنیم؛ خلق فضاهایی معاصر، آرامش‌بخش و شاعرانه که کیفیت زیستن را به سطحی والاتر ارتقا می‌بخشند.
            </p>

            {/* Action CTA Buttons (Monochrome Palette) */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-[#102B2B] transition-all duration-300 rounded-full bg-[#FF6B1A] hover:bg-[#FF9A56] hover:shadow-lg hover:shadow-[#FF6B1A]/20 hover:scale-[1.02] cursor-pointer group"
              >
                <span>مشاهده پروژه‌ها و آثار</span>
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-black" />
              </button>

              <button
                onClick={() => onSelectProject(featuredProject)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-light text-[#A4E0D6] hover:text-[#FF9A56] transition-all duration-300 rounded-full bg-[#A4E0D6]/10 border border-[#A4E0D6]/25 hover:border-white/30 hover:bg-[#A4E0D6]/15 cursor-pointer"
              >
                <span>روایت پروژه برگزیده</span>
              </button>
            </div>

            {/* Supporting Trust & Metric Subtext (Monochrome) */}
            <div className="mt-8 pt-6 border-t border-[#A4E0D6]/20 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#A4E0D6]/80 font-light">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">۱۵+</span>
                <span>سال سابقه طراحی معماری</span>
              </div>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">۹</span>
                <span>پروژه شاخص ویلایی و معاصر</span>
              </div>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-[#A4E0D6]">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" />
                <span>مشاوره تخصصی و ارزیابی سایت</span>
              </div>
            </div>
          </motion.div>

          {/* Architectural Image Showcase Column (2 Cols, order-first on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 lg:order-first"
          >
            <div
              onClick={() => onSelectProject(featuredProject)}
              className="relative group cursor-pointer max-w-sm sm:max-w-md mx-auto lg:max-w-none"
            >
              {/* Subtle Monochromatic Ambient Glow Behind Showcase */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FF6B1A]/20 via-[#A4E0D6]/5 to-[#102B2B]/30] rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-700" />

              {/* Architectural Frame Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#A4E0D6]/25 bg-[#0B1C1C] shadow-2xl shadow-black/80 aspect-[4/5]">
                <img
                  src="/src/assets/images/arch_hero_facade_1790423177098.jpg"
                  alt="ویلای معاصر استودیو معماری نو"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Gradient Shadow for Card Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Floating Architectural Badge at Bottom (Monochrome) */}
                <div className="absolute bottom-4 right-4 left-4 sm:bottom-5 sm:right-5 sm:left-5 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-[#A4E0D6]/20 text-right transition-colors group-hover:bg-black/85">
                  <div className="flex items-center justify-between text-xs text-[#A4E0D6] font-light mb-1">
                    <span>اثر برگزیده استودیو</span>
                    <span className="font-mono text-[11px] text-[#A4E0D6]/80">۱۴۰۵</span>
                  </div>
                  <div className="text-sm sm:text-base font-normal text-white">
                    ویلای صخره و سکوت · لواسان
                  </div>
                  <div className="text-[11px] text-[#A4E0D6] font-light mt-0.5 flex items-center justify-between">
                    <span>۸۵۰ مترمربع | بتن نمایان، شیشه و استخر بازتابی</span>
                    <span className="text-zinc-200 text-[10px] group-hover:underline">
                      مشاهده جزئیات ←
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
