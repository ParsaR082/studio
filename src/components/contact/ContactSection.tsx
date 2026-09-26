'use client';

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { TextAnimate } from '../common/TextAnimate';

const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'مسکونی تک‌واحدی',
    location: '',
    message: '',
  });

  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    margin: '-80px 0px -80px 0px',
    amount: 0.15,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t border-[#111111]/8 bg-[#F5F4F0] overflow-hidden"
    >
      <div className="max-w-[1540px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column (Studio Direct Contact Information) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#777777] font-light block mb-3">
                آغاز همکاری و سفارش طرح
              </span>
              <div className="mb-8">
                <TextAnimate
                  animation="blurIn"
                  by="word"
                  as="h2"
                  className="text-4xl sm:text-6xl font-light tracking-tight text-[#111111]"
                >
                  تماس با استودیو
                </TextAnimate>
              </div>
              <p className="text-base sm:text-lg font-light text-[#555555] leading-relaxed mb-12">
                برای گفت‌وگو پیرامون ایده‌ها، استعلام امکان‌سنجی پروژه‌ها یا بازدید از بسترهای ساخت، مشتاقانه پذیرای مکاتبه شما هستیم.
              </p>

              <div className="space-y-8 text-sm font-light">
                <div>
                  <span className="text-xs text-[#888888] block mb-1">مکاتبه مستقیم با آتلیه</span>
                  <a
                    href="mailto:contact@nostudio-arch.com"
                    className="text-lg text-[#111111] font-normal hover:text-[#666666] transition-colors"
                    dir="ltr"
                  >
                    contact@nostudio-arch.com
                  </a>
                </div>

                <div>
                  <span className="text-xs text-[#888888] block mb-1">خط ارتباطی دفتر تهران</span>
                  <a
                    href="tel:+982122004810"
                    className="text-lg text-[#111111] font-normal hover:text-[#666666] transition-colors"
                    dir="ltr"
                  >
                    +98 (21) 2200 4810
                  </a>
                </div>

                <div>
                  <span className="text-xs text-[#888888] block mb-1">آدرس آتلیه لواسان</span>
                  <p className="text-[#111111] leading-relaxed">
                    تهران، لواسان، بلوار باستی، کوچه سرو، استودیو کوهستان نو
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#111111]/8 text-xs text-[#777777] font-light">
              ساعات پذیرش مراجعین با هماهنگی قبلی: شنبه تا چهارشنبه ۱۰:۰۰ الی ۱۸:۰۰
            </div>
          </motion.div>

          {/* Right Column (Minimal Architectural Inquiry Form) */}
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.98 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -40, scale: 0.99 }
            }
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#EFEFEA] p-8 sm:p-12 border border-[#111111]/8"
          >
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 size={40} className="mx-auto text-[#111111]" />
                <h3 className="text-2xl font-light text-[#111111]">
                  پیام شما با موفقیت ثبت گردید.
                </h3>
                <p className="text-sm font-light text-[#666666] max-w-md mx-auto leading-relaxed">
                  تیم ارشد معماری استودیو نو پس از بررسی اولیه مشخصات پروژه، طی ۲۴ الی ۴۸ ساعت کاری با شما تماس خواهند گرفت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-[#111111] underline hover:text-[#666666] cursor-pointer"
                >
                  ارسال پیام دیگر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-[#111111]/15 pb-2">
                  <span className="text-xs uppercase tracking-widest text-[#777777] font-light block mb-2">
                    فرم مشاوره و امکان‌سنجی معماری
                  </span>
                  <p className="text-xs text-[#666666] font-light">
                    لطفاً خلاصه نیازمندی‌های فضا و مکان پروژه را درج فرمایید.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-light text-[#555555] mb-2">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: مهندس رادمهر"
                      className="w-full bg-transparent border-b border-[#111111]/25 py-2 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light text-[#555555] mb-2">
                      پست الکترونیکی (ایمیل) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      dir="ltr"
                      className="w-full bg-transparent border-b border-[#111111]/25 py-2 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-light text-[#555555] mb-2">
                      نوع کاربری بنا
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-transparent border-b border-[#111111]/25 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors cursor-pointer"
                    >
                      <option value="مسکونی تک‌واحدی">مسکونی تک‌واحدی</option>
                      <option value="ویلایی و اقامتگاه اختصاصی">ویلایی و اقامتگاه اختصاصی</option>
                      <option value="فرهنگی و گالری هنری">فرهنگی و گالری هنری</option>
                      <option value="اداری و تجاری معاصر">اداری و تجاری معاصر</option>
                      <option value="بازسازی و مداخله معمارانه">بازسازی و مداخله معمارانه</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-light text-[#555555] mb-2">
                      محل قرارگیری پروژه (شهر / منطقه)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="مثال: لواسان / مازندران / اصفهان"
                      className="w-full bg-transparent border-b border-[#111111]/25 py-2 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-light text-[#555555] mb-2">
                    شرح درخواست یا چشم‌انداز کارفرما
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="توضیحاتی پیرامون متراژ زمین، ویژگی‌های خاص و اهداف طرح بنویسید..."
                    className="w-full bg-transparent border-b border-[#111111]/25 py-2 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-[#888888] font-light">
                    * اطلاعات ارسالی محرمانه باقی خواهند ماند.
                  </span>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 text-sm font-normal text-[#111111] hover:text-[#666666] transition-colors cursor-pointer"
                  >
                    <span>ارسال پیام استعلام</span>
                    <span className="w-9 h-9 rounded-full border border-[#111111]/25 flex items-center justify-center transition-all group-hover:border-[#111111] group-hover:-translate-x-1.5">
                      <ArrowLeft size={14} />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
