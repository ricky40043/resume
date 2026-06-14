import React, { useEffect, useMemo, useState } from 'react';
import AIChatWidget from './components/AIChatWidget';
import CanvasBackground from './components/CanvasBackground';
import ProjectCard from './components/ProjectCard';
import TiltCard from './components/TiltCard';
import { Project } from './types';
import { soundManager } from './utils/audio';
import {
  PUBLIC_SECTIONS,
  RESUME_SECTIONS,
  getContent,
} from './constants';
import { useI18n } from './i18n';

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

function LangToggle({ variant }: { variant: 'resume' | 'aiStudio' }) {
  const { t, toggle } = useI18n();
  const className = variant === 'aiStudio'
    ? 'rounded-full border-4 border-white bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-slate-950'
    : 'rounded-sm border border-amber-300/40 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:border-amber-300 hover:text-amber-200';
  return (
    <button
      type="button"
      onClick={() => { soundManager.playHover(); toggle(); }}
      aria-label="Switch language"
      className={className}
    >
      {t.common.toggleTo}
    </button>
  );
}

function Shell({ children, variant }: { children: React.ReactNode; variant: 'resume' | 'aiStudio' }) {
  if (variant === 'aiStudio') {
    return (
      <div id="top" className="relative min-h-screen overflow-hidden bg-[#fff7e8] text-slate-900 selection:bg-[#ffcf56] selection:text-slate-950">
        <div className="fixed inset-0 z-0 bg-[linear-gradient(135deg,#fff7e8_0%,#e8f7ff_38%,#fff0f6_68%,#f1ffe9_100%)]" />
        <div className="fixed inset-0 z-0 opacity-45 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.16)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-48 bg-[linear-gradient(90deg,#ff6b6b,#ffd166,#4ecdc4,#7c5cff,#ff8fab)] opacity-90" />
        <div className="pointer-events-none fixed inset-x-0 top-36 z-0 h-20 -skew-y-2 bg-white/70" />
        {children}
      </div>
    );
  }

  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-amber-300 selection:text-slate-950">
      <CanvasBackground />
      <div className="fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.95)_44%,rgba(2,6,23,1))]" />
      {children}
      {variant === 'resume' && <AIChatWidget />}
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
    <Shell variant="resume">
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
            <LangToggle variant="resume" />
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

const SECTION_META: Record<string, { icon: string; short: { zh: string; en: string }; color: string; bg: string }> = {
  "破冰遊戲": {
    icon: "🎲",
    short: { zh: "聚會炒熱氣氛", en: "Warm up gatherings" },
    color: "from-[#ff6b6b] to-[#ff9f1c]",
    bg: "bg-[#fff1e6]",
  },
  "投影同工": {
    icon: "🎬",
    short: { zh: "詩歌、聖經、投影片", en: "Hymns, Bible, slides" },
    color: "from-[#00b4d8] to-[#4361ee]",
    bg: "bg-[#e8f5ff]",
  },
  "領會伴唱": {
    icon: "🎤",
    short: { zh: "升降調、YouTube 下載、卡拉 OK", en: "Pitch shift, YouTube, karaoke" },
    color: "from-[#b5179e] to-[#f72585]",
    bg: "bg-[#fff0f6]",
  },
  "工具類": {
    icon: "🧰",
    short: { zh: "語音即時翻譯、影音、實用工具", en: "Voice translation, media, utilities" },
    color: "from-[#06d6a0] to-[#118ab2]",
    bg: "bg-[#e9fff7]",
  },
  "其他專案": {
    icon: "✨",
    short: { zh: "有趣實驗與完整系統", en: "Fun experiments & full systems" },
    color: "from-[#7c5cff] to-[#4cc9f0]",
    bg: "bg-[#f1efff]",
  },
};

const PROJECT_ICON: Record<string, string> = {
  "定時炸彈": "💣",
  "1A2B 猜數字": "🔢",
  "2 種人": "🔀",
  "你問我答": "🙋",
  "誰是臥底": "🕵️",
  "2 種人連線版": "🌐",
  "貪吃蛇": "🐍",
  "多人貪吃蛇": "🐍",
  "2048": "🎮",
  "詩歌資料庫": "📚",
  "詩歌投影片": "🎵",
  "聖經投影": "📖",
  "下載與升降調": "🎧",
  "卡拉 OK 領會伴唱": "🎤",
  "語音即時翻譯": "🌐",
  "無廣告版 YouTube": "▶️",
  "8 大行星模擬器": "🪐",
  "聖誕市集": "🎄",
  "狗狗感人影片生成": "🐾",
  "桌遊租借系統": "♟️",
};

const ToolTile: React.FC<{ project: Project; large?: boolean }> = ({ project, large = false }) => {
  const { lang, t, section: secLabel } = useI18n();
  const meta = SECTION_META[project.section] || SECTION_META["其他專案"];
  const isReady = project.status === 'Live' || project.status === 'Demo';

  return (
    <article className={`group relative overflow-hidden rounded-[28px] border-4 border-white bg-white p-4 shadow-[0_18px_0_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_26px_0_rgba(15,23,42,0.16)] ${large ? 'md:p-5' : ''}`}>
      <div className={`relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[22px] ${meta.bg} p-5`}>
        <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${meta.color}`} />
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.color} text-4xl shadow-lg shadow-slate-900/10`}>
            <span className="drop-shadow-sm">{PROJECT_ICON[project.title] || meta.icon}</span>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-black ${isReady ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
            {isReady ? t.card.tileReady : t.card.tilePreparing}
          </span>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-black text-slate-500">{secLabel(project.section)}</p>
          <h3 className={`${large ? 'text-3xl' : 'text-2xl'} font-black leading-tight text-slate-950`}>{project.title}</h3>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{project.description}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.highlights.slice(0, large ? 3 : 2).map((item) => (
            <span key={item} className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r ${meta.color} px-5 py-3 text-base font-black text-white shadow-lg shadow-slate-900/10 transition-transform group-hover:scale-[1.02]`}
            >
              {t.card.tileUse}
            </a>
          ) : (
            <div className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-200 px-5 py-3 text-base font-black text-slate-500">
              {t.card.tileNotOpen}
            </div>
          )}
        </div>
        {/* keep lang in deps so tiles re-render on switch */}
        <span hidden>{lang}</span>
      </div>
    </article>
  );
};

function AiStudioPage() {
  const { lang, t, section: secLabel } = useI18n();
  const content = useMemo(() => getContent(lang), [lang]);
  const { personal, publicProjects } = content;

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("全部");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProjects = useMemo(() => publicProjects.filter((project) => project.featured).slice(0, 5), [publicProjects]);
  const filteredProjects = useMemo(() => {
    if (activeSection === "全部") return publicProjects;
    return publicProjects.filter((project) => project.section === activeSection);
  }, [activeSection, publicProjects]);
  const liveCount = publicProjects.filter((project) => project.status === 'Live').length;
  const openProjects = publicProjects.filter((project) => project.url);

  return (
    <Shell variant="aiStudio">
      <nav className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b-4 border-slate-950 bg-white/90 py-3 shadow-lg backdrop-blur-xl' : 'py-6'}`}>
        <div className="container mx-auto flex items-center justify-between gap-5 px-6">
          <a href="#top" onMouseEnter={() => soundManager.playHover()} className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-950 md:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffcf56] text-xl shadow-[0_5px_0_#111827]">🧰</span>
            {t.studio.brand}
          </a>
          <div className="hidden items-center gap-2 text-sm font-black text-slate-700 lg:flex">
            <a href="#featured" className="rounded-full px-4 py-2 transition-colors hover:bg-[#ffcf56] hover:text-slate-950">{t.studio.navFeatured}</a>
            <a href="#projects" className="rounded-full px-4 py-2 transition-colors hover:bg-[#ffcf56] hover:text-slate-950">{t.studio.navProjects}</a>
            <a href="#contact" className="rounded-full px-4 py-2 transition-colors hover:bg-[#ffcf56] hover:text-slate-950">{t.studio.navContact}</a>
          </div>
          <LangToggle variant="aiStudio" />
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto px-6 pb-12 pt-32 md:pt-36">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border-4 border-white bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700 shadow-[0_6px_0_rgba(15,23,42,0.12)]">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                {t.studio.liveBadge(liveCount)}
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-slate-950 md:text-7xl">
                {personal.publicTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-semibold leading-9 text-slate-700">
              {personal.publicTagline} {personal.publicBio}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#featured" onMouseEnter={() => soundManager.playHover()} className="rounded-2xl border-4 border-slate-950 bg-[#ffcf56] px-6 py-3 text-lg font-black text-slate-950 shadow-[0_7px_0_#111827] transition-transform hover:-translate-y-1">
                  {t.studio.ctaFeatured}
                </a>
                <a href="#projects" onMouseEnter={() => soundManager.playHover()} className="rounded-2xl border-4 border-slate-950 bg-white px-6 py-3 text-lg font-black text-slate-950 shadow-[0_7px_0_#111827] transition-transform hover:-translate-y-1">
                  {t.studio.ctaAll}
                </a>
              </div>
            </div>

            <div className="rounded-[32px] border-4 border-white bg-white/90 p-5 shadow-[0_22px_0_rgba(15,23,42,0.12)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-950">{t.studio.panelTitle}</h2>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{t.studio.panelBadge}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {PUBLIC_SECTIONS.filter((s) => s !== "全部").map((s) => {
                  const count = publicProjects.filter((project) => project.section === s).length;
                  const meta = SECTION_META[s] || SECTION_META["其他專案"];
                  return (
                    <a
                      key={s}
                      href="#projects"
                      onClick={() => setActiveSection(s)}
                      className={`group rounded-3xl border-[3px] border-white ${meta.bg} p-4 shadow-sm transition-transform hover:-translate-y-1`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.color} text-2xl shadow-md`}>
                          {meta.icon}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-slate-700">{count}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-950">{secLabel(s)}</h3>
                      <p className="mt-1 text-sm font-bold text-slate-600">{meta.short[lang]}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="container mx-auto px-6 py-16 scroll-mt-24">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-black text-[#ff5d73]">{t.studio.featuredKicker}</p>
              <h2 className="text-4xl font-black text-slate-950">{t.studio.featuredTitle}</h2>
            </div>
            <p className="max-w-xl text-base font-semibold leading-7 text-slate-600">
              {t.studio.featuredBody}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ToolTile key={project.id} project={project} large />
            ))}
          </div>
        </section>

        <section id="projects" className="container mx-auto px-6 py-16 scroll-mt-24">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-black text-[#118ab2]">{t.studio.projectsKicker}</p>
              <h2 className="text-4xl font-black text-slate-950">{t.studio.projectsTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {PUBLIC_SECTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSection(s)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`rounded-full border-4 px-4 py-2 text-sm font-black transition-transform hover:-translate-y-0.5 ${
                    activeSection === s
                      ? 'border-slate-950 bg-[#ffcf56] text-slate-950 shadow-[0_5px_0_#111827]'
                      : 'border-white bg-white text-slate-700 shadow-sm hover:border-slate-950'
                  }`}
                >
                  {secLabel(s)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ToolTile key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="contact" className="container mx-auto px-6 py-16 scroll-mt-24">
          <div className="rounded-[32px] border-4 border-slate-950 bg-white p-8 text-center shadow-[0_18px_0_#111827] md:p-14">
            <p className="mb-3 text-sm font-black text-[#ff5d73]">{t.studio.contactKicker}</p>
            <h2 className="text-4xl font-black text-slate-950">{t.studio.contactTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              {t.studio.contactBody}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${personal.email}`} onMouseEnter={() => soundManager.playHover()} className="rounded-2xl border-4 border-slate-950 bg-[#ffcf56] px-6 py-3 text-lg font-black text-slate-950 shadow-[0_7px_0_#111827] transition-transform hover:-translate-y-1">
                {t.studio.contactCta}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t-4 border-slate-950 bg-white py-8 text-center text-sm font-bold text-slate-500">
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} {t.studio.footer(openProjects.length)}
        </div>
      </footer>
    </Shell>
  );
}

function App() {
  const pathname = usePathname();
  const isAiStudioDomain = window.location.hostname === 'studio.ricky-nova.com';
  const showAiStudio = isAiStudioDomain || pathname.startsWith('/ai-studio');
  return showAiStudio ? <AiStudioPage /> : <ResumePage />;
}

export default App;
