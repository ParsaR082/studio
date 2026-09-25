import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Project } from '../../data/projects';
import { TextAnimate } from '../common/TextAnimate';

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
    margin: '-80px 0px -80px 0px',
    amount: 0.25,
  });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-12 px-[var(--page-gutter)] flex flex-col justify-between overflow-hidden"
    >
      {/* Top Meta Details */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1540px] w-full mx-auto flex flex-wrap gap-y-2 items-start sm:items-center justify-between text-[10px] sm:text-xs tracking-normal sm:tracking-widest text-[#777777] font-light z-10"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#111111] font-normal">استودیو معماری نو</span>
          <span>·</span>
          <span>آرشیو آثار معاصر ۱۴۰۵ — ۱۳۹۶</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>تهران / لواسان</span>
          <span>·</span>
          <span>مونوگراف منتخب شماره ۰۱</span>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-[1540px] w-full mx-auto my-auto py-8 sm:py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center z-10">
        {/* Left/Center Text Column (Right in RTL) */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Main Title Matching Video: AMBITIOUS + TextAnimate character & word animations */}
          <div className="mb-6">
            <h1 className="text-[clamp(2.35rem,8vw,8.25rem)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.25rem] font-light text-[#111111] leading-none font-display">
              <span className="block font-normal tracking-wide text-3xl sm:text-5xl lg:text-7xl font-sans mb-1" dir="ltr">
                <TextAnimate
                  animation="slideLeft"
                  by="character"
                  as="span"
                  delay={0.15}
                  duration={0.65}
                  stagger={0.035}
                >
                  AMBITIOUS
                </TextAnimate>
              </span>
              <span className="block font-light text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#333333] leading-[1.2] mt-1 sm:mt-2">
                <TextAnimate
                  animation="slideUp"
                  by="word"
                  as="span"
                  delay={0.35}
                  duration={0.85}
                  stagger={0.06}
                >
                  نوآفرینی در سکوت و ماده.
                </TextAnimate>
              </span>
            </h1>
          </div>

          {/* Description Paragraph with BlurIn TextAnimate */}
          <div className="max-w-2xl mb-10">
            <div className="flex items-start gap-4">
              <span className="w-8 h-[1px] bg-[#111111] mt-3.5 shrink-0 hidden sm:block" />
              <div className="space-y-3">
                <TextAnimate
                  animation="blurIn"
                  by="word"
                  as="p"
                  delay={0.5}
                  duration={0.75}
                  stagger={0.03}
                  className="text-sm sm:text-base lg:text-lg text-[#444444] font-light leading-relaxed font-body"
                >
                  بازخوانی جسورانه ساختارهای کهن‌الگویی در تطابق با بستر طبیعی، کاربری و رفتار مصالح؛ آفرینش حس نوآوری از دل راهبردی بی‌زمان.
                </TextAnimate>
              </div>
            </div>
          </div>

          {/* Action CTA Button matching video circular outline arrow */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6"
          >
            <button
              onClick={() => onSelectProject(featuredProject)}
              className="group inline-flex items-center gap-3.5 text-xs sm:text-sm font-light uppercase tracking-wider text-[#111111] hover:text-[#555555] transition-colors cursor-pointer"
            >
              <span>مشاهده پروژه</span>
              <span className="w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center transition-all duration-300 group-hover:bg-[#111111] group-hover:text-[#F5F4F0] group-hover:-translate-x-1">
                <ArrowLeft size={15} />
              </span>
            </button>

            <button
              onClick={onExploreProjects}
              className="text-xs text-[#777777] hover:text-[#111111] transition-colors cursor-pointer font-light underline-offset-4 hover:underline"
            >
              آرشیو کامل پروژه‌ها (۹ اثر)
            </button>
          </motion.div>
        </div>
      </div>

      {/* Sweeping Curved Architectural Facade from Bottom-Right Corner matching video */}
      <motion.div
        initial={{ opacity: 0, x: 120, y: 120, scale: 0.92 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, scale: 1 }
            : { opacity: 0, x: 80, y: 80, scale: 0.95 }
        }
        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onSelectProject(featuredProject)}
        className="architectural-media absolute -bottom-8 -left-12 sm:bottom-0 sm:left-0 w-[72vw] sm:w-[48vw] lg:w-[42vw] max-w-[680px] aspect-[16/10] overflow-hidden pointer-events-auto cursor-pointer group z-0"
      >
        <img
          src="/src/assets/images/curved_facade_sweep_1790289600522.jpg"
          alt="نمای منحنی معماری معاصر"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-6 right-6 text-white text-[11px] font-light opacity-0 group-hover:opacity-100 transition-opacity">
          بررسی اثر منتخب ←
        </div>
      </motion.div>

      {/* Hero Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1540px] w-full mx-auto pt-4 sm:pt-6 border-t border-[#111111]/8 flex flex-wrap gap-3 items-start sm:items-center justify-between text-[10px] sm:text-xs font-light text-[#777777] z-10"
      >
        <div className="flex items-center gap-6">
          <span>رویکرد: فرم پیراسته و احترام به ژئومتری بستر</span>
        </div>
        <div className="flex items-center gap-2">
          <span>جهت مرور روایت‌ها به پایین اسکرول کنید</span>
          <span className="animate-bounce">↓</span>
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);
