import { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { FeaturedStory } from './components/projects/FeaturedStory';
import { ProjectGrid } from './components/projects/ProjectGrid';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { StudioSection } from './components/studio/StudioSection';
import { JournalSection } from './components/journal/JournalSection';
import { ContactSection } from './components/contact/ContactSection';
import { SearchModal } from './components/common/SearchModal';
import { CinematicOpening } from './components/common/CinematicOpening';
import { useLenis } from './hooks/useLenis';
import { PROJECTS, Project } from './data/projects';

export default function App() {
  const [openingFinished, setOpeningFinished] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis smooth scroll
  useLenis();

  // Featured Project (Khaneh Sokoot / Christian de Portzamparc)
  const featuredProject = PROJECTS[0];

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleOpenSearch = (initialQuery?: string) => {
    setSearchInitialQuery(initialQuery || '');
    setSearchOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#111111] relative selection:bg-[#111111] selection:text-[#F8F8F7]">
      {/* Cinematic Architectural Opening Shutter */}
      {!openingFinished && (
        <CinematicOpening onComplete={() => setOpeningFinished(true)} />
      )}

      {/* Top Architectural Header with Live 3-Zone Layout */}
      <Header
        visible={openingFinished}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={handleOpenSearch}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <main>
        {/* Stage 1: Hero Section (AMBITIOUS + Sweeping Curved Facade + In/Out Motion) */}
        <Hero
          featuredProject={featuredProject}
          onSelectProject={(project) => setSelectedProject(project)}
          onExploreProjects={() => handleNavigate('projects')}
        />

        {/* Stage 2: Featured Story / Architect Monograph (Christian de Portzamparc + In/Out Motion) */}
        <FeaturedStory
          project={featuredProject}
          onOpenProject={(project) => setSelectedProject(project)}
        />

        {/* Stage 3: 3x2 Editorial Grid matching Video (6 Square Cards + Stagger In/Out Motion) */}
        <ProjectGrid
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Stage 4: Studio Section (Manifesto, Workspace, Team, Principles + In/Out Motion) */}
        <StudioSection />

        {/* Stage 5: Journal / Articles (Theoretical Essays + In/Out Motion) */}
        <JournalSection />

        {/* Stage 6: Contact & Inquiries (Studio Atelier + Inquiry Form + In/Out Motion) */}
        <ContactSection />
      </main>

      {/* Minimal Architectural Footer */}
      <Footer
        onNavigateToProjects={() => handleNavigate('projects')}
        onNavigateToContact={() => handleNavigate('contact')}
      />

      {/* Fullscreen Architectural Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
        initialQuery={searchInitialQuery}
      />
    </div>
  );
}
