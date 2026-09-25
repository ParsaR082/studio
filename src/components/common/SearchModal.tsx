import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { Project, PROJECTS } from '../../data/projects';
import GooeyInput from '@/components/ui/gooey-input';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  const results = PROJECTS.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.materials.some((m) => m.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#F5F4F0]/95 backdrop-blur-md p-6 sm:p-12 lg:p-20 overflow-y-auto animate-in fade-in duration-300"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#111111]/10">
          <span className="text-xs uppercase tracking-widest text-[#777777] font-light">
            جستجو در آرشیو آثار استودیو نو
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-light text-[#111111] hover:text-[#666666] cursor-pointer"
          >
            <span>بستن</span>
            <X size={16} />
          </button>
        </div>

        {/* Input with Gooey effect */}
        <div className="flex flex-col items-center mb-12">
          <div dir="ltr" className="w-full flex justify-center mb-3">
            <GooeyInput
              value={query}
              onValueChange={(val) => setQuery(val)}
              placeholder="جستجوی نام پروژه، موقعیت، متریال..."
              collapsedWidth={130}
              expandedWidth={340}
              expandedOffset={52}
              gooeyBlur={5}
              className="w-full max-w-lg"
              classNames={{
                trigger:
                  'bg-[#111111] text-[#F5F4F0] border border-white/10 shadow-lg text-sm font-light',
                bubbleSurface:
                  'bg-[#111111] text-[#F5F4F0] border border-white/10 shadow-lg',
                input: 'text-sm text-[#F5F4F0] placeholder:text-[#888888] font-light',
              }}
            />
          </div>
          <span className="text-[11px] text-[#777777] font-light">
            جستجوی زنده در نام اثر، معمار، کاربری و جزئیات بستر طرح
          </span>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          <span className="text-xs text-[#888888] font-light block">
            {results.length} اثر یافت شد:
          </span>

          <div className="divide-y divide-[#111111]/8">
            {results.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  onSelectProject(project);
                  onClose();
                }}
                className="py-5 flex items-center justify-between group cursor-pointer hover:bg-[#ECEBE5] px-3 -mx-3 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-12 overflow-hidden bg-[#E0DED5] shrink-0">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-[#111111] group-hover:text-[#555555]">
                      {project.title}
                    </h4>
                    <span className="text-xs text-[#777777] font-light">
                      {project.category} · {project.location} · {project.year}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-light text-[#111111]">
                  <span>مشاهده</span>
                  <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
