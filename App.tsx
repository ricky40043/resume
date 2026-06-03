import React, { useEffect, useMemo, useState } from 'react';
import AIChatWidget from './components/AIChatWidget';
import CanvasBackground from './components/CanvasBackground';
import ProjectCard from './components/ProjectCard';
import TiltCard from './components/TiltCard';
import { Project } from './types';
import { soundManager } from './utils/audio';
import {
  CAREER_PROJECTS,
  EDUCATION,
  EXPERIENCE,
  KEY_STRENGTHS,
  PERSONAL_INFO,
  PUBLIC_PROJECTS,
  PUBLIC_SECTIONS,
  RESUME_SECTIONS,
  SKILLS_CATEGORIES,
} from './constants';

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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("全部");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProjects = useMemo(() => CAREER_PROJECTS.filter((project) => project.featured).slice(0, 8), []);
  const filteredProjects = useMemo(() => {
    if (activeSection === "全部" || activeSection === "職涯實戰") return CAREER_PROJECTS;
    if (activeSection === "公開作品") return PUBLIC_PROJECTS;
    return CAREER_PROJECTS.filter((project) => project.section === activeSection);
  }, [activeSection]);

  return (
    <Shell variant="resume">
      <nav className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-slate-950/85 py-4 backdrop-blur-xl' : 'py-7'}`}>
        <div className="container mx-auto flex items-center justify-between gap-5 px-6">
          <a href="#top" onMouseEnter={() => soundManager.playHover()} className="font-mono text-lg font-bold tracking-tight text-amber-300 md:text-xl">
            RICKY.RESUME
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
            <a href="#featured" className="transition-colors hover:text-amber-300">重點案例</a>
            <a href="#projects" className="transition-colors hover:text-amber-300">職涯專案</a>
            <a href="#skills" className="transition-colors hover:text-amber-300">能力</a>
            <a href="#experience" className="transition-colors hover:text-amber-300">經歷</a>
            <a href="#contact" className="transition-colors hover:text-amber-300">聯絡</a>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('/ai-studio')}
            className="rounded-sm border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-200 transition-colors hover:bg-amber-300 hover:text-slate-950"
          >
            前往 Ricky 的AI 工作室
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto grid min-h-screen items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold text-amber-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              {CAREER_PROJECTS.length} 個職涯案例 / {EXPERIENCE.length} 段工作經歷
            </div>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-normal text-white md:text-7xl">
              {PERSONAL_INFO.name} 的履歷作品集
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-300">
              {PERSONAL_INFO.tagline} {PERSONAL_INFO.bio}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#featured" onMouseEnter={() => soundManager.playHover()} className="rounded-sm bg-amber-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-amber-200">
                看履歷重點
              </a>
              <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" onMouseEnter={() => soundManager.playHover()} className="rounded-sm border border-amber-300/40 bg-amber-300/10 px-6 py-3 font-bold text-amber-200 transition-colors hover:bg-amber-300 hover:text-slate-950">
                下載 PDF 履歷
              </a>
              <a href="#experience" onMouseEnter={() => soundManager.playHover()} className="rounded-sm border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition-colors hover:border-amber-300/50 hover:text-amber-200">
                看工作經歷
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-white/10 bg-slate-950/74 p-6 backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-sm text-amber-300">RESUME_ONLY</span>
                <span className="rounded-sm bg-emerald-300/10 px-2 py-1 text-xs font-bold text-emerald-200">CAREER</span>
              </div>
              <div className="grid gap-4">
                {RESUME_SECTIONS.filter((section) => section !== "全部" && section !== "公開作品").map((section) => {
                  const count = section === "職涯實戰"
                    ? CAREER_PROJECTS.length
                    : CAREER_PROJECTS.filter((project) => project.section === section).length;
                  return (
                    <a
                      key={section}
                      href="#projects"
                      onClick={() => setActiveSection(section)}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-amber-300/40 hover:bg-amber-300/10"
                    >
                      <span className="font-semibold">{section}</span>
                      <span className="font-mono text-sm text-slate-400">{count}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="text-3xl font-bold text-white">9+</div>
                <div className="mt-1 text-xs text-slate-400">年實戰</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="text-3xl font-bold text-white">{CAREER_PROJECTS.length}</div>
                <div className="mt-1 text-xs text-slate-400">職涯案例</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="mt-1 text-xs text-slate-400">公司階段</div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="container mx-auto px-6 py-20 scroll-mt-24">
          <div className="mb-10">
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">RESUME_HIGHLIGHTS</p>
            <h2 className="text-4xl font-bold text-white">重點案例</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/45 py-16 backdrop-blur-sm">
          <div className="container mx-auto grid gap-8 px-6 md:grid-cols-3">
            {KEY_STRENGTHS.map((strength) => (
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
              <p className="mb-3 font-mono text-sm font-bold text-amber-300">CAREER_PROJECTS</p>
              <h2 className="text-4xl font-bold text-white">職涯專案案例</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {RESUME_SECTIONS.filter((section) => section !== "公開作品").map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`rounded-sm border px-4 py-2 text-sm font-bold transition-colors ${
                    activeSection === section
                      ? 'border-amber-300 bg-amber-300 text-slate-950'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-300/40 hover:text-amber-200'
                  }`}
                >
                  {section}
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
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">CAPABILITY_MAP</p>
            <h2 className="text-4xl font-bold text-white">能力地圖</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS_CATEGORIES.map((group) => (
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
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">WORK_EXPERIENCE</p>
            <h2 className="mb-8 text-3xl font-bold text-white">工作經歷</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {EXPERIENCE.map((item) => (
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
            <p className="mb-3 font-mono text-sm font-bold text-amber-300">EDUCATION</p>
            <h2 className="mb-8 text-3xl font-bold text-white">學歷</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {EDUCATION.map((item) => (
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
            <p className="mb-3 font-mono text-sm font-bold text-amber-200">CONTACT</p>
            <h2 className="text-4xl font-bold text-white">找我面試或合作</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              這一頁只保留履歷、能力、職涯案例與工作經歷。給教會朋友或一般使用者的服務入口已獨立到 Ricky 的AI 工作室。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${PERSONAL_INFO.email}`} onMouseEnter={() => soundManager.playHover()} className="rounded-sm bg-amber-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-amber-200">
                {PERSONAL_INFO.email}
              </a>
              <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" onMouseEnter={() => soundManager.playHover()} className="rounded-sm border border-amber-300/40 px-6 py-3 font-bold text-amber-200 transition-colors hover:bg-amber-300 hover:text-slate-950">
                PDF 履歷
              </a>
              <button type="button" onClick={() => navigateTo('/ai-studio')} className="rounded-sm border border-white/15 px-6 py-3 font-bold text-white transition-colors hover:border-amber-300/50 hover:text-amber-200">
                前往 Ricky 的AI 工作室
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950 py-10 text-center text-sm text-slate-500">
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Resume portfolio.
        </div>
      </footer>
    </Shell>
  );
}

const SECTION_META: Record<string, { icon: string; short: string; color: string; bg: string }> = {
  "破冰遊戲": {
    icon: "🎲",
    short: "聚會炒熱氣氛",
    color: "from-[#ff6b6b] to-[#ff9f1c]",
    bg: "bg-[#fff1e6]",
  },
  "投影同工": {
    icon: "🎬",
    short: "詩歌、聖經、投影片",
    color: "from-[#00b4d8] to-[#4361ee]",
    bg: "bg-[#e8f5ff]",
  },
  "領會伴唱": {
    icon: "🎤",
    short: "升降調、YouTube 下載、卡拉 OK",
    color: "from-[#b5179e] to-[#f72585]",
    bg: "bg-[#fff0f6]",
  },
  "工具類": {
    icon: "🧰",
    short: "語音即時翻譯、影音、實用工具",
    color: "from-[#06d6a0] to-[#118ab2]",
    bg: "bg-[#e9fff7]",
  },
  "其他專案": {
    icon: "✨",
    short: "有趣實驗與完整系統",
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

function ToolTile({ project, large = false }: { project: Project; large?: boolean }) {
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
            {isReady ? '可使用' : '準備中'}
          </span>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-black text-slate-500">{project.section}</p>
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
              立即使用
            </a>
          ) : (
            <div className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-200 px-5 py-3 text-base font-black text-slate-500">
              尚未開放
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function AiStudioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("全部");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProjects = useMemo(() => PUBLIC_PROJECTS.filter((project) => project.featured).slice(0, 5), []);
  const filteredProjects = useMemo(() => {
    if (activeSection === "全部") return PUBLIC_PROJECTS;
    return PUBLIC_PROJECTS.filter((project) => project.section === activeSection);
  }, [activeSection]);
  const liveCount = PUBLIC_PROJECTS.filter((project) => project.status === 'Live').length;
  const openProjects = PUBLIC_PROJECTS.filter((project) => project.url);

  return (
    <Shell variant="aiStudio">
      <nav className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b-4 border-slate-950 bg-white/90 py-3 shadow-lg backdrop-blur-xl' : 'py-6'}`}>
        <div className="container mx-auto flex items-center justify-between gap-5 px-6">
          <a href="#top" onMouseEnter={() => soundManager.playHover()} className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-950 md:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffcf56] text-xl shadow-[0_5px_0_#111827]">🧰</span>
            Ricky 的AI 工作室
          </a>
          <div className="hidden items-center gap-2 text-sm font-black text-slate-700 lg:flex">
            <a href="#featured" className="rounded-full px-4 py-2 transition-colors hover:bg-[#ffcf56] hover:text-slate-950">推薦</a>
            <a href="#projects" className="rounded-full px-4 py-2 transition-colors hover:bg-[#ffcf56] hover:text-slate-950">全部工具</a>
            <a href="#contact" className="rounded-full px-4 py-2 transition-colors hover:bg-[#ffcf56] hover:text-slate-950">聯絡</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto px-6 pb-12 pt-32 md:pt-36">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border-4 border-white bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700 shadow-[0_6px_0_rgba(15,23,42,0.12)]">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                {liveCount} 個已上線服務，點進去就能用
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-slate-950 md:text-7xl">
                {PERSONAL_INFO.publicTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-semibold leading-9 text-slate-700">
              {PERSONAL_INFO.publicTagline} {PERSONAL_INFO.publicBio}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#featured" onMouseEnter={() => soundManager.playHover()} className="rounded-2xl border-4 border-slate-950 bg-[#ffcf56] px-6 py-3 text-lg font-black text-slate-950 shadow-[0_7px_0_#111827] transition-transform hover:-translate-y-1">
                  看推薦工具
                </a>
                <a href="#projects" onMouseEnter={() => soundManager.playHover()} className="rounded-2xl border-4 border-slate-950 bg-white px-6 py-3 text-lg font-black text-slate-950 shadow-[0_7px_0_#111827] transition-transform hover:-translate-y-1">
                  全部都給我看
                </a>
              </div>
            </div>

            <div className="rounded-[32px] border-4 border-white bg-white/90 p-5 shadow-[0_22px_0_rgba(15,23,42,0.12)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-950">想做什麼？</h2>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">分類入口</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {PUBLIC_SECTIONS.filter((section) => section !== "全部").map((section) => {
                  const count = PUBLIC_PROJECTS.filter((project) => project.section === section).length;
                  const meta = SECTION_META[section] || SECTION_META["其他專案"];
                  return (
                    <a
                      key={section}
                      href="#projects"
                      onClick={() => setActiveSection(section)}
                      className={`group rounded-3xl border-[3px] border-white ${meta.bg} p-4 shadow-sm transition-transform hover:-translate-y-1`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.color} text-2xl shadow-md`}>
                          {meta.icon}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-slate-700">{count}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-950">{section}</h3>
                      <p className="mt-1 text-sm font-bold text-slate-600">{meta.short}</p>
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
              <p className="mb-3 text-sm font-black text-[#ff5d73]">推薦先點這幾個</p>
              <h2 className="text-4xl font-black text-slate-950">常用工具</h2>
            </div>
            <p className="max-w-xl text-base font-semibold leading-7 text-slate-600">
              給聚會、服事和日常使用的入口。看到喜歡的直接點「立即使用」。
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
              <p className="mb-3 text-sm font-black text-[#118ab2]">找你需要的服務</p>
              <h2 className="text-4xl font-black text-slate-950">全部工具</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {PUBLIC_SECTIONS.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`rounded-full border-4 px-4 py-2 text-sm font-black transition-transform hover:-translate-y-0.5 ${
                    activeSection === section
                      ? 'border-slate-950 bg-[#ffcf56] text-slate-950 shadow-[0_5px_0_#111827]'
                      : 'border-white bg-white text-slate-700 shadow-sm hover:border-slate-950'
                  }`}
                >
                  {section}
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
            <p className="mb-3 text-sm font-black text-[#ff5d73]">有工具想法嗎？</p>
            <h2 className="text-4xl font-black text-slate-950">跟 Ricky 說一聲</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              這個入口會慢慢補上更多小工具。如果聚會、投影、練唱或活動流程有卡住的地方，可以一起做成下一個工具。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${PERSONAL_INFO.email}`} onMouseEnter={() => soundManager.playHover()} className="rounded-2xl border-4 border-slate-950 bg-[#ffcf56] px-6 py-3 text-lg font-black text-slate-950 shadow-[0_7px_0_#111827] transition-transform hover:-translate-y-1">
                聯絡 Ricky
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t-4 border-slate-950 bg-white py-8 text-center text-sm font-bold text-slate-500">
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} Ricky 的AI 工作室 · {openProjects.length} 個工具已開放使用
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
