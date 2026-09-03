import React, { useEffect, useMemo, useState } from 'react';
import AIChatWidget from './components/AIChatWidget';
import CanvasBackground from './components/CanvasBackground';
import ProjectCard from './components/ProjectCard';
import TiltCard from './components/TiltCard';
import { soundManager } from './utils/audio';
import {
  RESUME_SECTIONS,
  getContent,
} from './constants';
import { useI18n } from './i18n';
import CosmicStudioPage from './components/CosmicStudio';

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return pathname;
}

function navigateTo(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function LangToggle() {
  const { t, toggle } = useI18n();
  return (
    <button
      type="button"
      onClick={() => { soundManager.playHover(); toggle(); }}
      aria-label="Switch language"
      className="rounded-sm border border-amber-300/40 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:border-amber-300 hover:text-amber-200"
    >
      {t.common.toggleTo}
    </button>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-amber-300 selection:text-slate-950">
      <CanvasBackground />
      <div className="fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.95)_44%,rgba(2,6,23,1))]" />
      {children}
      <AIChatWidget />
    </div>
  );
}

function ResumePage() {
  const { lang, t, section: secLabel } = useI18n();
  const content = useMemo(() => getContent(lang), [lang]);
  const { personal, careerProjects, publicProjects, skills, strengths, experience, education } = content;

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("全部");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProjects = useMemo(() => careerProjects.filter((project) => project.featured).slice(0, 8), [careerProjects]);
  const filteredProjects = useMemo(() => {
    if (activeSection === "全部" || activeSection === "職涯實戰") return careerProjects;
    if (activeSection === "公開作品") return publicProjects;
    return careerProjects.filter((project) => project.section === activeSection);
  }, [activeSection, careerProjects, publicProjects]);

  return (
    <Shell>
      <nav className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-slate-950/85 py-4 backdrop-blur-xl' : 'py-7'}`}>
        <div className="container mx-auto flex items-center justify-between gap-5 px-6">
          <a href="#top" onMouseEnter={() => soundManager.playHover()} className="font-mono text-lg font-bold tracking-tight text-amber-300 md:text-xl">
            {t.resume.brand}
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
            <a href="#featured" className="transition-colors hover:text-amber-300">{t.resume.navFeatured}</a>
            <a href="#projects" className="transition-colors hover:text-amber-300">{t.resume.navProjects}</a>
            <a href="#skills" className="transition-colors hover:text-amber-300">{t.resume.navSkills}</a>
            <a href="#experience" className="transition-colors hover:text-amber-300">{t.resume.navExperience}</a>
            <a href="#contact" className="transition-colors hover:text-amber-300">{t.resume.navContact}</a>
          </div>
          <div className="flex items-center gap-3">
            <LangToggle />
            <button
              type="button"
              onClick={() => navigateTo('/ai-studio')}
              className="rounded-sm border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-200 transition-colors hover:bg-amber-300 hover:text-slate-950"
            >
              {t.common.toAiStudio}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto grid min-h-screen items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold text-amber-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              {t.resume.badge(careerProjects.length, experience.length)}
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.15] tracking-normal text-white [word-break:keep-all] sm:text-5xl md:text-6xl">
              {personal.name}{t.resume.heroTitleSuffix}
            </h1>
            <p className="mt-5 text-base font-bold uppercase tracking-wide text-amber-300">
              {personal.title}
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-200 sm:text-xl">
              {personal.tagline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              {personal.bio}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#featured" onMouseEnter={() => soundManager.playHover()} className="rounded-sm bg-amber-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-amber-200">
                {t.resume.ctaHighlights}
              </a>
              <a href={personal.resumeUrl} target="_blank" rel="noreferrer" onMouseEnter={() => soundManager.playHover()} className="rounded-sm border border-amber-300/40 bg-amber-300/10 px-6 py-3 font-bold text-amber-200 transition-colors hover:bg-amber-300 hover:text-slate-950">
                {t.common.downloadPdf}
              </a>
              <a href="#experience" onMouseEnter={() => soundManager.playHover()} className="rounded-sm border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition-colors hover:border-amber-300/50 hover:text-amber-200">
                {t.resume.ctaExperience}
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-white/10 bg-slate-950/74 p-6 backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-sm text-amber-300">{t.resume.panelTag}</span>
                <span className="rounded-sm bg-emerald-300/10 px-2 py-1 text-xs font-bold text-emerald-200">{t.resume.panelBadge}</span>
              </div>
              <div className="grid gap-4">
                {RESUME_SECTIONS.filter((s) => s !== "全部" && s !== "公開作品").map((s) => {
                  const count = s === "職涯實戰"
                    ? careerProjects.length
                    : careerProjects.filter((project) => project.section === s).length;
                  return (
                    <a
                      key={s}
                      href="#projects"
                      onClick={() => setActiveSection(s)}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-amber-300/40 hover:bg-amber-300/10"
                    >
                      <span className="font-semibold">{secLabel(s)}</span>
                      <span className="font-mono text-sm text-slate-400">{count}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="text-3xl font-bold text-white">9+</div>
                <div className="mt-1 text-xs text-slate-400">{t.resume.statYears}</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="text-3xl font-bold text-white">{careerProjects.length}</div>
                <div className="mt-1 text-xs text-slate-400">{t.resume.statCases}</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="mt-1 text-xs text-slate-400">{t.resume.statStages}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="container mx-auto px-6 py-20 scroll-mt-24">
          <div className="mb-10">
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">{t.resume.featuredKicker}</p>
            <h2 className="text-4xl font-bold text-white">{t.resume.featuredTitle}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/45 py-16 backdrop-blur-sm">
          <div className="container mx-auto grid gap-8 px-6 md:grid-cols-3">
            {strengths.map((strength) => (
              <TiltCard key={strength.title} className="h-full">
                <div className="h-full rounded-lg border border-white/10 bg-slate-950/70 p-7 transition-colors hover:border-amber-300/40">
                  <div className="mb-5 h-1 w-12 rounded-full bg-amber-300" />
                  <h3 className="mb-3 text-2xl font-bold text-white">{strength.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{strength.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="projects" className="container mx-auto px-6 py-20 scroll-mt-24">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-mono text-sm font-bold text-amber-300">{t.resume.projectsKicker}</p>
              <h2 className="text-4xl font-bold text-white">{t.resume.projectsTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {RESUME_SECTIONS.filter((s) => s !== "公開作品").map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSection(s)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`rounded-sm border px-4 py-2 text-sm font-bold transition-colors ${
                    activeSection === s
                      ? 'border-amber-300 bg-amber-300 text-slate-950'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-300/40 hover:text-amber-200'
                  }`}
                >
                  {secLabel(s)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </section>

        <section id="skills" className="container mx-auto px-6 py-20 scroll-mt-24">
          <div className="mb-10">
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">{t.resume.skillsKicker}</p>
            <h2 className="text-4xl font-bold text-white">{t.resume.skillsTitle}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.label} className="rounded-lg border border-white/10 bg-slate-950/72 p-7">
                <h3 className="mb-5 text-lg font-bold text-amber-200">{group.label}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="container mx-auto px-6 py-16 scroll-mt-24">
          <div className="rounded-lg border border-white/10 bg-slate-950/74 p-8 md:p-10">
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">{t.resume.experienceKicker}</p>
            <h2 className="mb-8 text-3xl font-bold text-white">{t.resume.experienceTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {experience.map((item) => (
                <div key={`${item.company}-${item.period}`} className="border-l border-amber-300/50 pl-5">
                  <div className="mb-2 font-mono text-xs text-slate-400">{item.period}</div>
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <p className="mt-1 text-sm font-semibold text-amber-200">{item.company}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">{t.resume.educationKicker}</p>
            <h2 className="mb-8 text-3xl font-bold text-white">{t.resume.educationTitle}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {education.map((item) => (
                <div key={`${item.school}-${item.period}`} className="rounded-md border border-white/10 bg-slate-950/60 p-5">
                  <div className="mb-2 font-mono text-xs text-slate-400">{item.period}</div>
                  <h3 className="text-xl font-bold text-white">{item.school}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.department}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="container mx-auto px-6 py-20 scroll-mt-24">
          <div className="rounded-lg border border-amber-300/30 bg-amber-300/[0.08] p-10 text-center md:p-16">
            <p className="mb-3 font-mono text-sm font-bold text-amber-200">{t.resume.contactKicker}</p>
            <h2 className="text-4xl font-bold text-white">{t.resume.contactTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {t.resume.contactBody}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${personal.email}`} onMouseEnter={() => soundManager.playHover()} className="rounded-sm bg-amber-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-amber-200">
                {personal.email}
              </a>
              <a href={personal.resumeUrl} target="_blank" rel="noreferrer" onMouseEnter={() => soundManager.playHover()} className="rounded-sm border border-amber-300/40 px-6 py-3 font-bold text-amber-200 transition-colors hover:bg-amber-300 hover:text-slate-950">
                {t.common.pdf}
              </a>
              <button type="button" onClick={() => navigateTo('/ai-studio')} className="rounded-sm border border-white/15 px-6 py-3 font-bold text-white transition-colors hover:border-amber-300/50 hover:text-amber-200">
                {t.common.toAiStudio}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950 py-10 text-center text-sm text-slate-500">
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} {personal.name}. {t.resume.footer}
        </div>
      </footer>
    </Shell>
  );
}

function App() {
  const pathname = usePathname();
  const isAiStudioDomain = window.location.hostname === 'studio.ricky-nova.com';
  const showAiStudio = isAiStudioDomain || pathname.startsWith('/ai-studio');
  return showAiStudio ? <CosmicStudioPage /> : <ResumePage />;
}

export default App;
