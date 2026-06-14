import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'zh' | 'en';

const STORAGE_KEY = 'ricky-resume-lang';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  // 1) 網址 ?lang=en|zh 優先（方便分享指定語言連結）
  const param = new URLSearchParams(window.location.search).get('lang')?.toLowerCase();
  if (param === 'en' || param === 'zh') return param;
  // 2) 使用者上次選擇
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'zh') return stored;
  // 3) 預設依瀏覽器語言：非中文使用者預設英文
  const nav = window.navigator.language?.toLowerCase() ?? '';
  return nav.startsWith('zh') ? 'zh' : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    setLangState(readInitialLang());
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang: setLangState,
    toggle: () => setLangState((prev) => (prev === 'zh' ? 'en' : 'zh')),
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}

// ── 區塊名稱顯示對照（filter/lookup 仍用中文 key，只有顯示換語言）──
const SECTION_LABELS: Record<string, { zh: string; en: string }> = {
  "全部": { zh: "全部", en: "All" },
  "職涯實戰": { zh: "職涯實戰", en: "Career Work" },
  "卓越科技": { zh: "卓越科技", en: "Excellent Tech" },
  "天茶智能": { zh: "天茶智能", en: "TenCha Intelligence" },
  "迅智網路": { zh: "迅智網路", en: "SwiftMind Network" },
  "光欣科技": { zh: "光欣科技", en: "GuangXin Tech" },
  "公開作品": { zh: "公開作品", en: "Public Works" },
  "破冰遊戲": { zh: "破冰遊戲", en: "Icebreaker Games" },
  "投影同工": { zh: "投影同工", en: "Worship Projection" },
  "領會伴唱": { zh: "領會伴唱", en: "Worship & Vocals" },
  "工具類": { zh: "工具類", en: "Tools" },
  "其他專案": { zh: "其他專案", en: "Other Projects" },
};

export function sectionLabel(key: string, lang: Lang): string {
  return SECTION_LABELS[key]?.[lang] ?? key;
}

// ── UI 文字字典 ──
const STRINGS = {
  zh: {
    common: {
      toggleTo: 'EN',
      toAiStudio: '前往 Ricky 的AI 工作室',
      pdf: 'PDF 履歷',
      downloadPdf: '下載 PDF 履歷',
    },
    resume: {
      brand: 'RICKY.RESUME',
      navFeatured: '重點案例',
      navProjects: '職涯專案',
      navSkills: '能力',
      navExperience: '經歷',
      navContact: '聯絡',
      badge: (cases: number, jobs: number) => `${cases} 個職涯案例 / ${jobs} 段工作經歷`,
      heroTitleSuffix: ' 的履歷作品集',
      ctaHighlights: '看履歷重點',
      ctaExperience: '看工作經歷',
      panelTag: 'RESUME_ONLY',
      panelBadge: 'CAREER',
      statYears: '年實戰',
      statCases: '職涯案例',
      statStages: '公司階段',
      featuredKicker: 'RESUME_HIGHLIGHTS',
      featuredTitle: '重點案例',
      projectsKicker: 'CAREER_PROJECTS',
      projectsTitle: '職涯專案案例',
      skillsKicker: 'CAPABILITY_MAP',
      skillsTitle: '能力地圖',
      experienceKicker: 'WORK_EXPERIENCE',
      experienceTitle: '工作經歷',
      educationKicker: 'EDUCATION',
      educationTitle: '學歷',
      contactKicker: 'CONTACT',
      contactTitle: '找我面試或合作',
      contactBody: '這一頁只保留履歷、能力、職涯案例與工作經歷。給教會朋友或一般使用者的服務入口已獨立到 Ricky 的AI 工作室。',
      footer: 'Resume portfolio.',
    },
    studio: {
      brand: 'Ricky 的AI 工作室',
      navFeatured: '推薦',
      navProjects: '全部工具',
      navContact: '聯絡',
      liveBadge: (n: number) => `${n} 個已上線服務，點進去就能用`,
      ctaFeatured: '看推薦工具',
      ctaAll: '全部都給我看',
      panelTitle: '想做什麼？',
      panelBadge: '分類入口',
      featuredKicker: '推薦先點這幾個',
      featuredTitle: '常用工具',
      featuredBody: '給聚會、服事和日常使用的入口。看到喜歡的直接點「立即使用」。',
      projectsKicker: '找你需要的服務',
      projectsTitle: '全部工具',
      contactKicker: '有工具想法嗎？',
      contactTitle: '跟 Ricky 說一聲',
      contactBody: '這個入口會慢慢補上更多小工具。如果聚會、投影、練唱或活動流程有卡住的地方，可以一起做成下一個工具。',
      contactCta: '聯絡 Ricky',
      footer: (n: number) => `Ricky 的AI 工作室 · ${n} 個工具已開放使用`,
    },
    card: {
      statusLive: '已上線',
      statusDemo: '展示中',
      statusLocal: '本機作品',
      statusPlanning: '規劃中',
      openSite: '開啟網站',
      notDeployed: '尚未部署',
      close: '關閉 ✕',
      defaultMedia: '▶ Demo 影片',
      tileReady: '可使用',
      tilePreparing: '準備中',
      tileUse: '立即使用',
      tileNotOpen: '尚未開放',
    },
    chat: {
      greeting: '你好！我是 Ricky 的作品集助手。想了解他的技能、專案或適合職缺，我可以幫你整理。',
      title: '個人助手',
      subtitle: '作品集問答',
      placeholder: '詢問關於作品或履歷的問題...',
    },
  },
  en: {
    common: {
      toggleTo: '中',
      toAiStudio: "Go to Ricky's AI Studio",
      pdf: 'PDF Resume',
      downloadPdf: 'Download PDF Resume',
    },
    resume: {
      brand: 'RICKY.RESUME',
      navFeatured: 'Highlights',
      navProjects: 'Projects',
      navSkills: 'Skills',
      navExperience: 'Experience',
      navContact: 'Contact',
      badge: (cases: number, jobs: number) => `${cases} career cases / ${jobs} roles`,
      heroTitleSuffix: ' · Resume & Portfolio',
      ctaHighlights: 'View Highlights',
      ctaExperience: 'View Experience',
      panelTag: 'RESUME_ONLY',
      panelBadge: 'CAREER',
      statYears: 'yrs hands-on',
      statCases: 'career cases',
      statStages: 'companies',
      featuredKicker: 'RESUME_HIGHLIGHTS',
      featuredTitle: 'Key Cases',
      projectsKicker: 'CAREER_PROJECTS',
      projectsTitle: 'Career Project Cases',
      skillsKicker: 'CAPABILITY_MAP',
      skillsTitle: 'Capability Map',
      experienceKicker: 'WORK_EXPERIENCE',
      experienceTitle: 'Work Experience',
      educationKicker: 'EDUCATION',
      educationTitle: 'Education',
      contactKicker: 'CONTACT',
      contactTitle: 'Let’s Talk',
      contactBody: 'This page keeps only the resume, skills, career cases and work experience. The public service entry for church friends and general users now lives in Ricky’s AI Studio.',
      footer: 'Resume portfolio.',
    },
    studio: {
      brand: "Ricky's AI Studio",
      navFeatured: 'Featured',
      navProjects: 'All Tools',
      navContact: 'Contact',
      liveBadge: (n: number) => `${n} live services — click and use right away`,
      ctaFeatured: 'See Featured',
      ctaAll: 'Show Me Everything',
      panelTitle: 'What do you want to do?',
      panelBadge: 'Categories',
      featuredKicker: 'Start with these',
      featuredTitle: 'Popular Tools',
      featuredBody: 'Entry points for gatherings, ministry and daily use. See one you like — just tap "Open".',
      projectsKicker: 'Find what you need',
      projectsTitle: 'All Tools',
      contactKicker: 'Have a tool idea?',
      contactTitle: 'Tell Ricky',
      contactBody: 'This hub keeps growing with more small tools. If anything in gatherings, projection, vocal practice or event flow gets stuck, we can turn it into the next tool.',
      contactCta: 'Contact Ricky',
      footer: (n: number) => `Ricky's AI Studio · ${n} tools open to use`,
    },
    card: {
      statusLive: 'Live',
      statusDemo: 'Demo',
      statusLocal: 'Local',
      statusPlanning: 'Planning',
      openSite: 'Open Site',
      notDeployed: 'Not deployed',
      close: 'Close ✕',
      defaultMedia: '▶ Demo Video',
      tileReady: 'Ready',
      tilePreparing: 'Preparing',
      tileUse: 'Open',
      tileNotOpen: 'Coming soon',
    },
    chat: {
      greeting: "Hi! I'm Ricky's portfolio assistant. Ask me about his skills, projects, or which roles fit him.",
      title: 'Assistant',
      subtitle: 'Portfolio Q&A',
      placeholder: 'Ask about projects or resume...',
    },
  },
} as const;

export function useI18n() {
  const { lang, setLang, toggle } = useLang();
  return {
    lang,
    setLang,
    toggle,
    t: STRINGS[lang],
    section: (key: string) => sectionLabel(key, lang),
  };
}
