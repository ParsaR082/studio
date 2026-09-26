import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, X } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Article, ARTICLES } from '../../data/articles';
import { TextAnimate } from '../common/TextAnimate';

const JournalSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    margin: '-80px 0px -80px 0px',
    amount: 0.15,
  });

  return (
    <section
      ref={sectionRef}
      id="journal"
      className="py-16 sm:py-24 lg:py-36 px-[var(--page-gutter)] border-t border-[#111111]/8 overflow-hidden"
    >
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="mb-3">
              <TextAnimate
                animation="slideRight"
                by="word"
                as="span"
                className="text-[11px] uppercase tracking-widest text-[#777777] font-light"
              >
                گاهنامه و تأملات نظری · مجله معماری نو
              </TextAnimate>
            </div>
            <TextAnimate
              animation="slideUp"
              by="word"
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#111111]"
            >
              مجله و دیدگاه‌ها
            </TextAnimate>
          </div>
          <p className="text-sm font-light text-[#666666] max-w-md leading-relaxed">
            جستارهایی پیرامون نظریه معماری، رفتار مصالح، ادراک فضا و خوانش معاصر از اقلیم ایران.
          </p>
        </div>

        {/* Featured First Article + 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Main Lead Article */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -40, scale: 0.99 }
            }
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActiveArticle(ARTICLES[0])}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="architectural-media aspect-[16/10] overflow-hidden bg-[#E5E3DB] mb-6 relative">
              <img
                src={ARTICLES[0].coverImage}
                alt={ARTICLES[0].title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="architectural-media w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[11px] font-light px-3 py-1">
                جستار ویژه
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#777777] font-light mb-3">
              <span>{ARTICLES[0].category}</span>
              <span>·</span>
              <span>{ARTICLES[0].date}</span>
              <span>·</span>
              <span>زمان خواندن: {ARTICLES[0].readTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-light text-[#111111] group-hover:text-[#555555] transition-colors leading-snug mb-3">
              {ARTICLES[0].title}
            </h3>

            <p className="text-sm sm:text-base font-light text-[#555555] leading-relaxed mb-4">
              {ARTICLES[0].excerpt}
            </p>

            <span className="inline-flex items-center gap-2 text-xs font-light text-[#111111]">
              مطالعه متن کامل مقاله
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1.5" />
            </span>
          </motion.div>

          {/* Secondary Articles Stack */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {ARTICLES.slice(1).map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -30 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.3 + idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActiveArticle(article)}
                className="group cursor-pointer border-t border-[#111111]/8 pt-6"
              >
                <div className="flex items-center gap-2 text-xs text-[#777777] font-light mb-2">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#555555] transition-colors mb-2 leading-snug">
                  {article.title}
                </h4>

                <p className="text-xs sm:text-sm font-light text-[#666666] line-clamp-2 leading-relaxed mb-3">
                  {article.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-xs font-light text-[#111111]">
                  ادامه جستار
                  <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#F5F4F0] p-6 sm:p-12 lg:p-20 animate-in fade-in duration-300"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-12 pb-4 border-b border-[#111111]/10">
              <span className="text-xs text-[#777777] font-light">
                مجله استودیو نو · {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-2 text-xs font-light text-[#111111] hover:text-[#777777] cursor-pointer"
              >
                <span>بستن مقاله</span>
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#777777] font-light mb-4">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {activeArticle.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {activeArticle.readTime}</span>
              <span>·</span>
              <span>نگارش: {activeArticle.author}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#111111] leading-tight mb-8">
              {activeArticle.title}
            </h1>

            <div className="architectural-media aspect-[16/9] overflow-hidden bg-[#E5E3DB] mb-12">
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="architectural-media w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 text-base sm:text-lg font-light text-[#333333] leading-relaxed mb-16">
              {activeArticle.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-8 border-t border-[#111111]/10 flex justify-between items-center">
              <span className="text-xs text-[#777777] font-light">استودیو معماری نو</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs font-light text-[#111111] hover:text-[#666666] cursor-pointer"
              >
                بازگشت به فهرست مقالات ←
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(JournalSection);
