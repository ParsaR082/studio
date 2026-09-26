'use client';

import React from 'react';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';

interface FooterProps {
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102B2B] text-[#F4F8F3] pt-24 pb-16 px-6 sm:px-10 lg:px-16 transition-colors">
      <div className="max-w-[1540px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-24">
          {/* Brand & Poetic Statement */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#FF9A56] mb-4 block font-light">
                استودیو معماری معاصر
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight mb-6">
                استودیو معماری نو
              </h3>
              <p className="text-[#A4E0D6] text-base sm:text-lg font-light leading-relaxed max-w-md">
                طراحی فضاهایی برای زندگی معاصر؛ کاوش مداوم در پیوند میان حجم، نور طبیعی، سکوت و حافظه مکان.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[#102B2B] hidden md:block">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs text-[#FF9A56] hover:text-[#F4F8F3] transition-colors cursor-pointer group"
              >
                <span>بازگشت به ابتدای صفحه</span>
                <ArrowUpLeft size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Nav / Links Columns */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
            {/* Primary Action Links with Motion */}
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest text-[#FF9A56] font-light">
                دسترسی سریع
              </span>
              <ul className="flex flex-col gap-5">
                <li>
                  <button
                    onClick={onNavigateToProjects}
                    className="group inline-flex items-center gap-3 text-lg font-light hover:text-[#FF9A56] transition-colors cursor-pointer"
                  >
                    <span className="relative">
                      مشاهده مجموعه‌ آثار
                      <span className="absolute bottom-0 right-0 left-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                    </span>
                    <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={onNavigateToContact}
                    className="group inline-flex items-center gap-3 text-lg font-light hover:text-[#FF9A56] transition-colors cursor-pointer"
                  >
                    <span className="relative">
                      سفارش پروژه و مشاوره
                      <span className="absolute bottom-0 right-0 left-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                    </span>
                    <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:contact@nostudio-arch.com"
                    className="group inline-flex items-center gap-3 text-lg font-light hover:text-[#FF9A56] transition-colors"
                  >
                    <span className="relative">
                      مکاتبه مستقیم (ایمیل)
                      <span className="absolute bottom-0 right-0 left-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                    </span>
                    <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Offices & Locations */}
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest text-[#FF9A56] font-light">
                دفاتر و ارتباط
              </span>
              <div className="flex flex-col gap-4 text-sm font-light text-[#A4E0D6]">
                <div>
                  <span className="text-white block font-normal mb-1">دفتر مرکزی تهران</span>
                  <p>خیابان فرشته، بن‌بست یاس، پلاک ۸</p>
                  <p dir="ltr" className="text-xs text-[#FF9A56] mt-0.5 text-right">+98 (21) 2200 4810</p>
                </div>
                <div className="pt-2">
                  <span className="text-white block font-normal mb-1">آتلیه طراحی لواسان</span>
                  <p>بلوار باستی، کوچه سرو، استودیو کوهستان</p>
                </div>
                <div className="pt-2">
                  <span className="text-white block font-normal mb-1">دفتر ارومیه</span>
                  <p>خیابان دانشکده، پردیس معماران</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0B1C1C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#42635F]">
          <p>© ۱۴۰۵ استودیو معماری نو. تمام حقوق مادی و معنوی محفوظ است.</p>
          <div className="flex items-center gap-6">
            <span>تهران — لواسان — ارومیه</span>
            <span>·</span>
            <span>طراحی ادیتوریال و معماری</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
