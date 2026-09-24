import React from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Project } from '../../data/projects';
import { TextAnimate } from '../common/TextAnimate';

interface FeaturedStoryProps {
  project: Project;
  onOpenProject: (project: Project) => void;
}

export const FeaturedStory: React.FC<FeaturedStoryProps> = ({
  project,
  onOpenProject,
}) => {
  const containerRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {
    margin: '-80px 0px -80px 0px',
    amount: 0.2,
  });

  return (
    <section
      ref={containerRef}
      id="featured"
      className="min-h-screen py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t border-[#111111]/8 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-[1540px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Narrative Column matching Video 00:01 (Avatar, Architect, Title, Desc, Button) */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            {/* Author Avatar + Name matching video */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3.5 mb-6"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#DDD] shrink-0 border border-[#111111]/10">
                <img
                  src="/src/assets/images/architect_avatar_1790289615854.jpg"
                  alt="پرهام رحمانی / معمار"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block text-xs font-normal text-[#111111]">
                  پرهام رحمانی
                </span>
                <span className="block text-[11px] font-light text-[#777777]">
                  معمار ارشد و مؤسس استودیو نو
                </span>
              </div>
            </motion.div>

            {/* Category Subtitle matching video "ARCHITECT" */}
            <div className="mb-3">
              <TextAnimate
                animation="slideRight"
                by="word"
                as="span"
                delay={0.15}
                className="text-[11px] uppercase tracking-widest text-[#777777] font-light"
              >
                روایت معمار · ARCHITECT & ESSAY
              </TextAnimate>
            </div>

            {/* Large Bold Editorial Title matching video "CHRISTIAN DE PORTZAMPARC" */}
            <div className="mb-6">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#111111] leading-[1.05]">
                <span className="block font-normal text-2xl sm:text-3xl font-sans tracking-wide mb-1" dir="ltr">
                  <TextAnimate
                    animation="slideLeft"
                    by="character"
                    as="span"
                    delay={0.2}
                    duration={0.65}
                    stagger={0.025}
                  >
                    CHRISTIAN DE PORTZAMPARC
                  </TextAnimate>
                </span>
                <span className="block">
                  <TextAnimate
                    animation="blurIn"
                    by="word"
                    as="span"
                    delay={0.35}
                    duration={0.75}
                  >
                    کریستین دو پورتزامپارک
                  </TextAnimate>
                </span>
              </h2>
            </div>

            {/* Editorial Description matching video narrative */}
            <div className="space-y-4 mb-8 text-[#555555] font-light text-sm sm:text-base leading-relaxed max-w-xl">
              <TextAnimate
                animation="fadeSlide"
                by="word"
                as="p"
                delay={0.45}
                stagger={0.025}
              >
                متولد ۹ می ۱۹۴۴ در کازابلانکا؛ معمار و شهرساز نامدار فرانسوی که در دهه ۱۹۶۰ میلادی، با به چالش کشیدن آرمان‌های صلب مدرنیسم، آزادی ادراک فضا و ارزش‌های شاعرانه ماده را احیا کرد.
              </TextAnimate>
              <p className="text-xs sm:text-sm text-[#777777]" dir="ltr">
                Born on the 9th of May 1944, Christian de Portzamparc had doubts about continuing with architecture while studying in the 1960s, questioning modernist ideas and discipline&apos;s lack of freedom compared to art.
              </p>
            </div>

            {/* Action CTA matching video "READ ARTICLE ○ ←" */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
              transition={{ duration: 0.75, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => onOpenProject(project)}
                className="group inline-flex items-center gap-3.5 text-xs sm:text-sm font-light uppercase tracking-wider text-[#111111] hover:text-[#555555] transition-colors cursor-pointer"
              >
                <span>مطالعه روایت کامل</span>
                <span className="w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center transition-all duration-300 group-hover:bg-[#111111] group-hover:text-[#F5F4F0] group-hover:-translate-x-1">
                  <ArrowLeft size={15} />
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Image Column matching video 00:01 (Rectangular Atrium View) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 60 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.96, y: -50 }
            }
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onOpenProject(project)}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden bg-[#E8E6DE] cursor-pointer group order-1 lg:order-2"
          >
            <img
              src="/src/assets/images/khaneh_noor_arch_1790288924333.jpg"
              alt="معماری رواق و آتریوم نور"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-[#111111]/10 group-hover:bg-transparent transition-colors duration-500" />

            <div className="absolute bottom-6 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#111111] flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Maximize2 size={16} />
            </div>

            <div className="absolute top-6 right-6 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[11px] font-light tracking-wider">
              آتریوم نور · آکسفورد
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
