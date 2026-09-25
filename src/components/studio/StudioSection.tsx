import React from 'react';
import { motion, useInView } from 'motion/react';
import { TextAnimate } from '../common/TextAnimate';

const StudioSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    margin: '-80px 0px -80px 0px',
    amount: 0.15,
  });

  const principles = [
    {
      number: '۰۱',
      title: 'سکوت در برابر هیاهو',
      description:
        'ما معتقدیم معماری خوب نیازی به خودنمایی فرمال ندارد؛ بلکه با پناه دادن به روح انسان و حذف پیرایه‌های مازاد، بستری برای زیست آرام پدید می‌آورد.',
    },
    {
      number: '۰۲',
      title: 'صداقت ذاتی مصالح',
      description:
        'بتن باید بتن بماند و سنگ باید سنگینی و بافت باستانی خود را فریاد بزند. از هرگونه پوشش دروغین و تزئینات فریبنده پرهیز می‌کنیم.',
    },
    {
      number: '۰۳',
      title: 'نور به مثابه مصالح سازه‌ای',
      description:
        'نور خورشید در فلات ایران صرفاً یک پدیده روشنایی نیست؛ بلکه ابزاری هندسی برای کالبدبخشی به زمان، تغییر مقیاس فضا و ایجاد عمق معنوی است.',
    },
  ];

  const recognitions = [
    { year: '۱۴۰۴', title: 'رتبه نخست جایزه ملی معماری معاصر ایران', project: 'خانه نور' },
    { year: '۱۴۰۳', title: 'نامزد نهایی جایزه بین‌المللی معماری خاورمیانه', project: 'اقامتگاه کوهستان' },
    { year: '۱۴۰۲', title: 'رتبه دوم جایزه معمار (بخش تک‌واحدی)', project: 'خانه بتن' },
    { year: '۱۴۰۱', title: 'تقدیر ویژه هیئت داوران پاویون پایداری', project: 'پاویون باد یزد' },
  ];

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t border-[#111111]/8 overflow-hidden"
    >
      <div className="max-w-[1540px] mx-auto">
        {/* Studio Header */}
        <div className="mb-20">
          <span className="text-[11px] uppercase tracking-widest text-[#777777] font-light block mb-3">
            درباره استودیو · هویت و رویکرد
          </span>
          <div className="mb-8">
            <TextAnimate
              animation="scaleUp"
              by="word"
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#111111]"
            >
              استودیو
            </TextAnimate>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
            <div className="lg:col-span-7">
              <TextAnimate
                animation="slideUp"
                by="word"
                as="p"
                delay={0.1}
                stagger={0.03}
                className="text-2xl sm:text-3xl font-light text-[#111111] leading-relaxed"
              >
                استودیو معماری نو، کارگاهی مستقل برای خلق فضاهای معاصر، مبتنی بر زمینه‌گرایی انتقادی، ادراک حسی و درک عمیق از جغرافیا و مصالح بومی است.
              </TextAnimate>
            </div>
            <p className="lg:col-span-5 text-sm sm:text-base font-light text-[#555555] leading-relaxed">
              از سال ۱۳۹۶، فعالیت ما بر خلق پروژه‌های مسکونی، ویلایی و فرهنگی متمرکز بوده است. در هر پروژه، تلاش می‌کنیم تا پرسشی معمارانه مطرح کنیم و پاسخی پیراسته از جنس نور و سنگ بیابیم.
            </p>
          </div>
        </div>

        {/* Large Workspace Photo with Scale Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 50 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.98, y: -40 }
          }
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/8] sm:aspect-[21/9] overflow-hidden bg-[#E5E3DB] mb-24"
        >
          <img
            src="/src/assets/images/studio_workspace_arch_1790288945406.jpg"
            alt="فضای کار و آتلیه طراحی استودیو نو"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="architectural-media w-full h-full object-cover"
          />
          <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md text-white text-xs font-light tracking-wide">
            آتلیه طراحی و ساخت ماکت‌های مفهومی — تهران
          </div>
        </motion.div>

        {/* Principles 3-Column Grid */}
        <div className="mb-28">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[11px] uppercase tracking-widest text-[#888888] font-light block mb-10"
          >
            اصول بنیادین تفکر استودیو
          </motion.span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {principles.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 45 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -30 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.35 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col border-t border-[#111111]/10 pt-6"
              >
                <span className="text-xs font-light text-[#888888] mb-3">{item.number}</span>
                <div className="mb-4">
                  <TextAnimate
                    animation="blurIn"
                    by="word"
                    as="h3"
                    className="text-xl sm:text-2xl font-light text-[#111111]"
                  >
                    {item.title}
                  </TextAnimate>
                </div>
                <p className="text-sm font-light text-[#555555] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recognitions & Collaborations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-16 border-t border-[#111111]/8"
        >
          <div className="lg:col-span-4">
            <span className="text-[11px] uppercase tracking-widest text-[#888888] font-light block mb-2">
              دست‌آوردها
            </span>
            <h3 className="text-2xl font-light text-[#111111]">
              جوایز و نشان‌های ملی و بین‌المللی
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {recognitions.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[#111111]/8 gap-2"
              >
                <div>
                  <span className="text-base text-[#111111] font-light block">
                    {item.title}
                  </span>
                  <span className="text-xs text-[#777777] font-light">
                    پروژه: {item.project}
                  </span>
                </div>
                <span className="text-xs font-light text-[#555555]">{item.year}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(StudioSection);
