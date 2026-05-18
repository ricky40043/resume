import { Experience, Project, Skill } from './types';

export const PERSONAL_INFO = {
  name: "李柏儀 Ricky",
  title: "資深後端 / AI 協作軟體架構師",
  publicTitle: "Ricky 的工具天地",
  tagline: "具備 Python、.NET Core、C#、AOI 影像處理、AIOT 與全端系統實作經驗。",
  publicTagline: "把聚會、影音、翻譯、投影和活動營運做成可以直接使用的網頁服務。",
  bio: "我是一位資深後端工程師，擁有 3 年 Python 後端、3 年 .NET Core、5 年 C# 開發、6 年影像處理與 5 年 AOI 機台開發經驗。近年負責充電樁 EMS、智慧醫療影音串流、AIOT、智慧停車、能源管理與企業內部系統，也持續用 AI 協作工具加速新技術學習與產品開發。",
  publicBio: "這裡整理我做過、正在做或即將部署的公開工具。一般使用者可以直接進入服務，聚會、服事、練唱、活動需要什麼就點進去用。",
  location: "New Taipei City, Taiwan",
  email: "ricky400430012@gmail.com",
  github: "",
  resumeUrl: "/resume.pdf",
};

export const NAV_ITEMS = [
  { label: "首頁", href: "#top" },
  { label: "精選", href: "#featured" },
  { label: "專案", href: "#projects" },
  { label: "能力", href: "#skills" },
  { label: "經歷", href: "#experience" },
  { label: "聯絡", href: "#contact" },
];

export const RESUME_SECTIONS = ["全部", "職涯實戰", "卓越科技", "天茶智能", "迅智網路", "光欣科技", "公開作品"];

export const PUBLIC_SECTIONS = ["全部", "破冰遊戲", "投影同工", "領會伴唱", "工具類", "其他專案"];

export const SKILLS_CATEGORIES = {
  backend: [
    { name: "Python / FastAPI / SQLAlchemy", level: 90 },
    { name: ".NET Core / C# / Entity Framework", level: 88 },
    { name: "Go / Gin / REST API", level: 76 },
  ],
  frontend: [
    { name: "Vue3 / TypeScript / Pinia", level: 86 },
    { name: "React / Vite / SPA", level: 82 },
    { name: "ECharts / Dashboard / UI 串接", level: 84 },
  ],
  architecture: [
    { name: "SA 系統分析 / API 規劃", level: 88 },
    { name: "Docker / Nginx / 部署", level: 84 },
    { name: "MS SQL / PostgreSQL / SQLite / Redis", level: 84 },
  ],
  aiot: [
    { name: "OpenCV / AOI / 影像處理", level: 90 },
    { name: "MQTT / Edge AI / AIOT", level: 84 },
    { name: "LINE Bot / AI Chat / FFmpeg", level: 80 },
  ],
};

export const SKILLS: Skill[] = [
  ...SKILLS_CATEGORIES.backend,
  ...SKILLS_CATEGORIES.frontend,
  ...SKILLS_CATEGORIES.architecture,
  ...SKILLS_CATEGORIES.aiot,
];

export const KEY_STRENGTHS = [
  {
    title: "後端架構與系統分析",
    desc: "能做需求分析、資料庫設計、API 規劃、排程、報表與後端實作，並兼顧舊系統相容與後續維護。",
  },
  {
    title: "影像處理與 AIOT",
    desc: "從 AOI 機台、OpenCV、人臉辨識、體溫量測、網路監控到智慧工廠平台，具備軟硬整合與場域落地經驗。",
  },
  {
    title: "AI 協作產品開發",
    desc: "2023 年起使用 Antigravity、Rovo CLI、Codex、Google AI Studio、NotebookLM 等工具提升學習與開發效率，並能快速建立 side project。",
  },
];

export const CAREER_PROJECTS: Project[] = [
  {
    id: 1,
    title: "充電樁 EMS、金流、後台戰情分析平台",
    category: "卓越科技 / 能源管理",
    section: "卓越科技",
    status: "Demo",
    description: "負責充電樁能源管理、金流與後台戰情分析相關模組，支援營運端監控站點、交易與設備狀態。",
    highlights: ["新模組與後端規劃", "金流與營運資料整合", "API 開發實作"],
    tech: ["Python", ".NET Core", "API", "Dashboard", "Database"],
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 2,
    title: "智慧醫療影音串流、剪輯、直播平台",
    category: "卓越科技 / 醫療科技",
    section: "卓越科技",
    status: "Demo",
    description: "開發智慧醫療開刀房影音串流平台，處理剪輯、直播、SDVoE 串接與 PACS 串接等醫療場域需求。",
    highlights: ["PACS / SDVoE 串接", "影音串流與直播", "醫療場域系統整合"],
    tech: ["Streaming", "PACS", "SDVoE", "Backend API", "Video"],
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 3,
    title: "請假打卡報帳小幫手",
    category: "卓越科技 / 企業內部工具",
    section: "卓越科技",
    status: "Demo",
    description: "串接 LINE 選單與 AI 聊天分析，協助公司內部請假、打卡、報帳等流程工具化。",
    highlights: ["LINE 選單串接", "AI 聊天分析", "內部流程自動化"],
    tech: ["LINE Bot", "AI Chat", "Backend API", "Automation"],
    repoName: "職涯案例",
  },
  {
    id: 4,
    title: "YOLO 路燈不亮影像辨識與自動巡檢估驗",
    category: "卓越科技 / 影像辨識",
    section: "卓越科技",
    status: "Demo",
    description: "開發路燈不亮影像辨識與自動巡檢估驗系統，將影像辨識結果導入巡檢與估驗流程。",
    highlights: ["YOLO 影像辨識", "巡檢流程自動化", "影像結果資料化"],
    tech: ["YOLO", "Python", "Image Recognition", "Backend"],
    repoName: "職涯案例",
  },
  {
    id: 5,
    title: "AMS 資產管理與 EMS 能源管理系統",
    category: "天茶智能 / 智慧建築",
    section: "天茶智能",
    status: "Demo",
    description: "主導 AMS/EMS 系統開發，提升 BIM 平台設備管理功能，加入備品管理、資產盤點、能耗總覽、電費計算與契約用電分析。",
    highlights: ["系統分析與企劃書", "資料庫 / API / UIUX 規劃", "ECharts 報表與排程"],
    tech: [".NET Core 6", "MS SQL", "Redis", "Vue3", "ECharts", "Docker"],
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 6,
    title: "宜蘭智慧路邊停車系統",
    category: "天茶智能 / 智慧城市",
    section: "天茶智能",
    status: "Demo",
    description: "主導停車管理流程模組，整合 BIM 模型、設備管理、報修流程與路邊停車硬體，開發 MQTT 對接、佔位率與設備狀態統計。",
    highlights: ["MQTT 硬體對接", "API 文件與資料庫設計", "pytest 與假資料測試"],
    tech: [".NET Core", "MS SQL", "MQTT", "Python", "Pytest", "Vue3"],
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 7,
    title: "多人人臉辨識體溫量測平台",
    category: "迅智網路 / AIOT",
    section: "迅智網路",
    status: "Demo",
    description: "將 .NET 後端翻寫為 Python，資料表從約 30 張縮減到 15 張，支援多人臉辨識、體溫量測、訪客建模、異常通報與語音回應。",
    highlights: ["效能提升 5-10 倍", "資料結構重構", "多人辨識與正臉篩選"],
    tech: ["Python", "FastAPI", "OpenCV", "C#", "SocketIO", "Vue3"],
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 8,
    title: "AIOT SaaS 戰情室平台",
    category: "迅智網路 / SaaS",
    section: "迅智網路",
    status: "Demo",
    description: "物聯網監控平台，整合考勤、戰情室、公告欄、帳號分權、群組區域管理與平面配置圖，採低耦合設計以便快速客製化。",
    highlights: ["前後端架構自建", "多對多 DB 設計", "Docker / Nginx 部署"],
    tech: ["FastAPI", "SQLAlchemy", "AWS S3", "Docker", "Nginx", "Vue3"],
    repoName: "職涯案例",
  },
  {
    id: 9,
    title: "網路監控系統",
    category: "迅智網路 / 網管平台",
    section: "迅智網路",
    status: "Demo",
    description: "以 Python SNMP / Trap 從零建立網路監控系統，包含拓撲圖、平面配置圖、異常主動推播與自動掃描新增設備。",
    highlights: ["SNMP / Trap", "拓撲圖與平面圖", "異常推播"],
    tech: ["Python", "FastAPI", "pysnmp", "Docker", "Mail Server", "Vue3"],
    repoName: "職涯案例",
  },
  {
    id: 10,
    title: "展場人流統計平台",
    category: "迅智網路 / 人流分析",
    section: "迅智網路",
    status: "Demo",
    description: "計算展場進出口人流、高峰與離峰時間，並統計場內停留時間，用於世貿展場動線與營運分析。",
    highlights: ["人流統計", "停留時間分析", "客戶動線規劃"],
    tech: ["Python", "FastAPI", "OpenCV", "Vue3", "VueChart"],
    repoName: "職涯案例",
  },
  {
    id: 11,
    title: "研華空壓機智慧工廠 ESG 節能平台",
    category: "迅智網路 / ESG AIOT",
    section: "迅智網路",
    status: "Demo",
    description: "監控空壓機 sensor 資料，透過 AI 推算使用頻率與習慣，呈現機台健康、漏氣、用電量與戰情室分析；3 個月內通過複賽與決賽。",
    highlights: ["帶領團隊規劃 POC", "AI LSTM 模型討論與資料產生", "ESG 節能優勝"],
    tech: ["FastAPI", "SQLAlchemy", "Matplotlib", "LINE Bot", "VueChart", "LSTM"],
    repoName: "職涯案例",
  },
  {
    id: 12,
    title: "工研院 MR 教育訓練系統",
    category: "迅智網路 / MR 與影像辨識",
    section: "迅智網路",
    status: "Demo",
    description: "透過 MR 頭盔、空間定位與影像處理，判斷把手、閥門、按鈕狀態，即時回傳操作步驟完成狀態。",
    highlights: ["影像取代 sensor", "AI 模型串接", "影像串流 API"],
    tech: ["Python", "FastAPI", "OpenCV", "AI", "Streaming"],
    repoName: "職涯案例",
  },
  {
    id: 13,
    title: "進銷存與客服工單系統",
    category: "迅智網路 / 內部管理系統",
    section: "迅智網路",
    status: "Demo",
    description: "包含帳號分權、進貨、庫存、出貨報價單、客服工單狀態流程、退單結單與對話視窗，負責需求、UX、後端架構與專案進度管理。",
    highlights: ["權限與流程設計", "多對多資料庫設計", "Microsoft AD 串接"],
    tech: ["FastAPI", "SQLAlchemy", "AD", "Docker", "Vue3", "VueChart"],
    repoName: "職涯案例",
  },
  {
    id: 14,
    title: "AOI 自動光學檢測與機台開發",
    category: "光欣科技 / 工業自動化",
    section: "光欣科技",
    status: "Demo",
    description: "負責 AOI 影像分析、光源環境架設、IO/軸卡 SDK 封裝、自動化流程與影像檢測演算法，涵蓋 Wafer、PCB、Panel 與 LineScan 機台。",
    highlights: ["Wafer 標籤辨識", "PCB 2D 條碼 / 雷射切割", "Panel 瑕疵與機械手臂挑料"],
    tech: ["C#", "OpenCV", "Halcon", "Open eVision", "AOI", "Machine Control"],
    repoName: "職涯案例",
    featured: true,
  },
];

export const PUBLIC_PROJECTS: Project[] = [
  {
    id: 101,
    title: "破冰小遊戲集合",
    category: "聚會互動",
    section: "破冰遊戲",
    status: "Live",
    description: "聚會、團契、活動可直接使用的小遊戲入口，包含定時炸彈、猜數字、2 種人、雙人問答、誰是臥底與 2048。",
    highlights: ["純靜態部署", "多款遊戲入口", "手機與桌面可用"],
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    url: "https://html-games-8rea0bue1-rickys-projects-df82972f.vercel.app",
    repoName: "HTML Game",
    featured: true,
  },
  {
    id: 102,
    title: "SongsData 詩歌資料庫",
    category: "教會投影工具",
    section: "投影同工",
    status: "Live",
    description: "詩歌資料庫、搜尋 API、爬蟲匯入與 PPTX 產生服務，支援歌詞正規化、hash 去重與固定 SQLite seed 部署。",
    highlights: ["16,000+ 詩歌資料", "搜尋與 PPTX API", "Docker / Render 部署"],
    tech: ["Python", "FastAPI", "SQLite", "SQLAlchemy", "python-pptx", "Docker"],
    url: "https://songsdata.onrender.com",
    repoName: "Songs Data",
    featured: true,
  },
  {
    id: 103,
    title: "songPTT 詩歌投影片",
    category: "教會投影工具",
    section: "投影同工",
    status: "Live",
    description: "為聚會投影同工準備的詩歌投影片工具，搭配 SongsData 可形成從找歌到產生投影片的工作流。",
    highlights: ["詩歌投影流程", "快速產生投影片", "服事現場導向"],
    tech: ["Python", "Flask", "HTML", "Render"],
    url: "https://songptt.onrender.com",
    repoName: "songPPT",
  },
  {
    id: 104,
    title: "Bible PPT 聖經投影",
    category: "教會投影工具",
    section: "投影同工",
    status: "Live",
    description: "聖經投影與 PPT 自動生成系統，支援主控端與投影端同步、QR Code 加入、多版本聖經與禮拜投影片格式。",
    highlights: ["WebSocket 即時同步", "PPT 自動生成", "多版本聖經"],
    tech: ["React", "FastAPI", "WebSocket", "python-pptx", "Docker"],
    url: "https://bible-ppt.onrender.com",
    repoName: "bible ppt",
    featured: true,
  },
  {
    id: 105,
    title: "VocalTune Practice Studio",
    category: "AI 影音工具",
    section: "領會伴唱",
    status: "Local",
    description: "專為練唱與音樂學習設計的 YouTube 工具，支援下載、AI 音軌分離、多軌音量控制、變速與變調。",
    highlights: ["Demucs 去人聲", "多軌播放器", "速度與音高控制"],
    tech: ["React", "TypeScript", "Tone.js", "FastAPI", "Demucs", "yt-dlp"],
    repoName: "vocaltune---youtube-practice-studio",
    featured: true,
  },
  {
    id: 106,
    title: "Karaoke 領會伴唱模式",
    category: "AI 影音工具",
    section: "領會伴唱",
    status: "Planning",
    description: "將練唱工具拆成更直接的伴唱入口，讓使用者能進入卡拉 OK 模式、播放伴奏並調整適合自己的練習狀態。",
    highlights: ["伴奏播放", "練唱模式", "可獨立網址"],
    tech: ["React", "Audio API", "Vite"],
    repoName: "vocaltune---youtube-practice-studio",
  },
  {
    id: 107,
    title: "即時翻譯聊天工具",
    category: "即時協作",
    section: "工具類",
    status: "Live",
    description: "支援語音或文字輸入、多人房間、個人語言字幕與主板統一語言顯示，適合跨語言活動或聚會現場。",
    highlights: ["多人即時字幕", "主板語言覆寫", "WebSocket 通訊"],
    tech: ["Vue", "FastAPI", "WebSocket", "Redis", "PostgreSQL"],
    url: "https://realtime-translate-hwdr.onrender.com",
    repoName: "polyglot-chat",
    featured: true,
  },
  {
    id: 108,
    title: "無廣告版 YouTube",
    category: "影音工具",
    section: "工具類",
    status: "Local",
    description: "類 YouTube PWA，支援影片搜尋、播放、背景播放、鎖定螢幕控制與無廣告串流體驗。",
    highlights: ["背景播放", "Media Session API", "yt-dlp 串流"],
    tech: ["React", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    repoName: "youtube-no-add",
  },
  {
    id: 109,
    title: "8 大行星模擬器",
    category: "互動視覺",
    section: "其他專案",
    status: "Live",
    description: "太陽系行星運轉模擬，展示 3D / Canvas 互動視覺與前端動畫能力。",
    highlights: ["行星運轉", "互動視覺", "靜態部署"],
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    url: "https://solar-system-6xt38lqwy-rickys-projects-df82972f.vercel.app",
    repoName: "8 大行星運轉",
  },
  {
    id: 110,
    title: "聖誕市集",
    category: "活動營運系統",
    section: "其他專案",
    status: "Demo",
    description: "完整市集支付管理系統，包含顧客儲值、QR Code 掃描、攤商 POS、商品管理、交易報表與管理後台。",
    highlights: ["QR Code 支付", "攤商 POS", "管理後台與報表"],
    tech: ["Vue", "TypeScript", "FastAPI", "SQLAlchemy", "Docker", "GitHub Actions"],
    repoName: "Christmas Market Payment Platform",
    featured: true,
  },
  {
    id: 111,
    title: "狗狗感人影片生成",
    category: "AI 影片剪輯",
    section: "其他專案",
    status: "Local",
    description: "自動剪輯回憶影片的系統，使用 FFmpeg 抽幀、AI Vision 分析互動片段，產生精華影片與中文描述。",
    highlights: ["影片上傳任務", "AI Vision 分析", "FFmpeg 自動剪輯"],
    tech: ["Go", "Gin", "Vue", "FFmpeg", "OpenAI Vision"],
    repoName: "Paw Diary",
  },
  {
    id: 112,
    title: "桌遊租借系統",
    category: "租借管理平台",
    section: "其他專案",
    status: "Local",
    description: "桌遊租借平台，包含會員認證、租借管理、LINE 通知、AI 推薦與後台 API 文件。",
    highlights: ["JWT 認證", "LINE Bot 整合", "AI 推薦"],
    tech: ["Go", "Gin", "React", "TypeScript", "SQLite", "LINE Bot"],
    repoName: "tableGameBorrowSystem",
  },
];

export const PROJECTS: Project[] = [...CAREER_PROJECTS, ...PUBLIC_PROJECTS];

export const EXPERIENCE: Experience[] = [
  {
    role: "資深軟體工程師",
    company: "卓越科技股份有限公司",
    period: "2024/03 - 至今",
    description: "管理軟體部門並共同開發所有專案，負責新模組、後端規劃與 API 實作。主要專案包含充電樁 EMS / 金流 / 後台戰情分析、智慧醫療影音串流 / 剪輯 / 直播 / SDVoE / PACS，以及請假打卡報帳小幫手。",
  },
  {
    role: "資深後端 / 全端工程師",
    company: "天茶智能",
    period: "2023/06 - 2024/03",
    description: "主導 AMS 資產管理與 EMS 能源管理系統，負責系統分析、企劃書、資料庫、API、UI/UX 規劃與後端實作；另主導宜蘭智慧路邊停車，整合 MQTT、地磁設備、佔位率與設備狀態統計。",
  },
  {
    role: "研發主任工程師",
    company: "迅智網路有限公司",
    period: "2021/06 - 2023/05",
    description: "擔任後端架構、API 實作、影像處理演算法研究與團隊帶領角色。將 .NET 後端翻寫為 Python，縮減資料表並提升人臉辨識效能 5-10 倍，自學 Vue3 完成 AIOT 考勤與智慧工廠平台初版。",
  },
  {
    role: "軟體工程師",
    company: "光欣科技",
    period: "2016/09 - 2021/05",
    description: "專注 AOI 自動光學檢測，負責影像分析、光源環境、IO/軸卡 SDK 封裝、自動化流程與影像檢測演算法。參與 Wafer、PCB、Panel、LineScan 與機械手臂挑料等機台開發。",
  },
];

export const EDUCATION = [
  {
    school: "淡江大學 Tamkang University",
    department: "航空太空工程學系 自動控制組",
    period: "2015 - 2016",
  },
  {
    school: "淡江大學 Tamkang University",
    department: "航空太空工程學系",
    period: "2012 - 2015",
  },
];

export const SYSTEM_INSTRUCTION = `
你是李柏儀 Ricky 的個人作品集 AI 助手。
請根據以下資訊回答訪客關於 Ricky 的能力與作品問題：

定位：${PERSONAL_INFO.title}
簡介：${PERSONAL_INFO.bio}
職涯重點：卓越科技充電樁 EMS / 智慧醫療影音串流 / LINE 與 AI 內部工具；天茶智能 AMS / EMS / 宜蘭智慧停車；迅智網路 AIOT、人臉辨識、網路監控、ESG 智慧工廠、MR 教育訓練；光欣科技 AOI 自動光學檢測。
公開作品：${PUBLIC_PROJECTS.filter((project) => project.featured).map((project) => project.title).join('、')}。
主要能力：Python FastAPI、.NET Core、C#、Go、Vue3、React、MS SQL、PostgreSQL、SQLite、Redis、Docker、Nginx、OpenCV、MQTT、LINE Bot、AI 協作開發。

回答策略：
1. 用繁體中文回答。
2. 找工作問題優先講履歷模式與職涯案例。
3. 一般使用者問題優先推薦 Ricky 的工具天地中的公開服務。
4. 不誇大，使用「曾負責」「參與」「主導」等精準措辭。
5. 若被問聯絡方式，提供 ${PERSONAL_INFO.email}。
6. 回答控制在 120 字以內，除非使用者要求詳細說明。
`;
