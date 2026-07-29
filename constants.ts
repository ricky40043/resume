import { Experience, Project } from './types';

export const PERSONAL_INFO = {
  name: "李柏儀 Ricky",
  title: "資深後端 / 全端工程師",
  publicTitle: "Ricky 的AI 工作室",
  tagline: "後端架構 × 系統設計 × AI 落地",
  publicTagline: "把聚會、投影、語音即時翻譯、領會伴唱和活動營運做成可以直接使用的網頁服務。",
  bio: "資深後端 / 全端工程師，近 10 年軟體開發經驗，主軸是後端架構、系統設計、資料庫設計、系統重構與自架部署。過去參與並主導過充電樁能源管理、智慧醫療影音串流、人臉辨識、智慧停車、網路監控、AIoT SaaS 與影像辨識巡檢等正式上線系統。曾將 .NET 後端翻寫為 Python / FastAPI，並將人臉辨識從單人升級為多人＋多執行緒運算，效能提升 5–10 倍。2025 年起深度整合 AI 工具（Claude、Antigravity、Codex、NotebookLM）到開發流程，一個月學會 Go，持續打造穩定、可維護、能上線的 Side Project。",
  publicBio: "這裡整理我做過、正在做或即將部署的公開工具。一般使用者可以直接進入服務，聚會、服事、練唱、活動需要什麼就點進去用。",
  location: "New Taipei City, Taiwan",
  email: "ricky400430012@gmail.com",
  github: "",
  resumeUrl: "/resume.pdf",
};

export const PERSONAL_INFO_EN = {
  name: "Ricky Li",
  title: "Senior Backend / Full-stack Engineer",
  publicTitle: "Ricky's AI Studio",
  tagline: "Backend Architecture × System Design × AI Integration",
  publicTagline: "Turning gatherings, projection, real-time voice translation, vocal practice and event operations into ready-to-use web services.",
  bio: "A senior backend / full-stack engineer with nearly 10 years of experience, focused on backend architecture, system design, database design, system refactoring and self-hosted deployment. I have shipped production systems across EV-charging energy management, smart-healthcare video streaming, facial recognition, smart parking, network monitoring, AIoT SaaS platforms and computer-vision inspection. I refactored a legacy .NET backend into Python / FastAPI and upgraded facial recognition from single- to multi-person with multi-threaded processing for a 5–10× performance gain. Since 2025 I have integrated AI tools (Claude, Antigravity, Codex, NotebookLM) deeply into my workflow, picking up Go in a month and continuously shipping stable, maintainable, production-ready side projects.",
  publicBio: "A hub of the public tools I've built, am building, or am about to deploy. General users can jump straight in — whatever a gathering, ministry, vocal practice or event needs, just tap and use.",
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

export const RESUME_SECTIONS = ["全部", "職涯實戰", "三傑物聯", "天茶智能", "迅智網路", "光欣科技", "公開作品"];

export const PUBLIC_SECTIONS = ["全部", "破冰遊戲", "投影同工", "領會伴唱", "工具類", "其他專案"];

export const SKILLS_CATEGORIES = [
  {
    label: "後端",
    items: [
      "Python / FastAPI",
      ".NET Core / C#",
      "SQLAlchemy / Entity Framework",
      "RESTful API / 自動排程",
      "pytest 單元測試",
    ],
  },
  {
    label: "前端",
    items: [
      "Vue3 / Pinia / TypeScript",
      "ECharts / 圖表客製化",
      "Naive UI / Tailwind CSS",
    ],
  },
  {
    label: "資料庫",
    items: ["MS SQL", "PostgreSQL", "SQLite", "Redis"],
  },
  {
    label: "影像 / AI",
    items: [
      "OpenCV / 人臉辨識",
      "YOLO 物件偵測",
      "LSTM 時序預測",
      "FFmpeg / Demucs 影音處理",
      "Gemini / OpenAI Vision",
      "AOI 自動光學檢測",
    ],
  },
  {
    label: "部署 / 工具",
    items: [
      "自架 Ubuntu Server",
      "Docker / Nginx",
      "CI/CD 自動部署",
      "MQTT / Edge AI",
      "LINE Bot 串接",
      "AI 協作（Claude / Antigravity / Codex / NotebookLM）",
    ],
  },
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
    desc: "2025 年起以 Claude、Antigravity、Codex、NotebookLM 等工具與 AI 深度協作，一週完成 AI 路燈巡檢、一個月學會 Go，能快速把想法做成上線的 side project。",
  },
];

export const CAREER_PROJECTS: Project[] = [
  {
    id: 1,
    title: "充電樁 EMS、金流、後台戰情分析平台",
    category: "三傑物聯 / 能源管理",
    section: "三傑物聯",
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
    category: "三傑物聯 / 醫療科技",
    section: "三傑物聯",
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
    category: "三傑物聯 / 企業內部工具",
    section: "三傑物聯",
    status: "Demo",
    description: "串接 LINE 選單與 AI 聊天分析，協助公司內部請假、打卡、報帳等流程工具化。",
    highlights: ["LINE 選單串接", "AI 聊天分析", "內部流程自動化"],
    tech: ["LINE Bot", "AI Chat", "Backend API", "Automation"],
    repoName: "職涯案例",
  },
  {
    id: 4,
    title: "YOLO 路燈不亮影像辨識與自動巡檢估驗",
    category: "三傑物聯 / 影像辨識",
    section: "三傑物聯",
    status: "Demo",
    description: "開發路燈不亮影像辨識與自動巡檢估驗系統，將影像辨識結果導入巡檢與估驗流程。",
    highlights: ["YOLO 影像辨識", "巡檢流程自動化", "影像結果資料化"],
    tech: ["YOLO", "Python", "Image Recognition", "Backend"],
    repoName: "職涯案例",
  },
  {
    id: 5,
    title: "AMS 資產管理系統",
    category: "天茶智能 / 智慧建築",
    section: "天茶智能",
    status: "Demo",
    description: "主導 BIM 平台 AMS 資產管理模組開發，提升設備管理功能，加入備品管理、資產盤點與設備生命週期追蹤。",
    highlights: ["備品管理與資產盤點", "BIM 設備管理整合", "系統分析與企劃書"],
    tech: [".NET Core 6", "MS SQL", "Redis", "Vue3", "Docker"],
    videoUrl: "https://drive.google.com/file/d/1FCz1Yvg8WqnIKSA0vyg5NX41CFny0UzN/preview",
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 6,
    title: "EMS 能源管理系統",
    category: "天茶智能 / 能源管理",
    section: "天茶智能",
    status: "Demo",
    description: "主導 BIM 平台 EMS 能源管理模組開發，建置能耗總覽、電費計算與契約用電分析，協助掌握用電趨勢與成本。",
    highlights: ["能耗總覽與用電分析", "電費計算與契約用電", "ECharts 報表與排程"],
    tech: [".NET Core 6", "MS SQL", "Redis", "Vue3", "ECharts", "Docker"],
    videoUrl: "https://drive.google.com/file/d/1Oz3LS0S0wBaqZ5FbzRJcZk7BAHp2a0KZ/preview",
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 7,
    title: "宜蘭智慧路邊停車系統",
    category: "天茶智能 / 智慧城市",
    section: "天茶智能",
    status: "Demo",
    description: "主導停車管理流程模組，整合 BIM 模型、設備管理、報修流程與路邊停車硬體，開發 MQTT 對接、佔位率與設備狀態統計。",
    highlights: ["MQTT 硬體對接", "API 文件與資料庫設計", "pytest 與假資料測試"],
    tech: [".NET Core", "MS SQL", "MQTT", "Python", "Pytest", "Vue3"],
    videoUrl: "https://drive.google.com/file/d/1bS7TtxnaUoeEjAdnzgY3iRkJ2qRVMVAg/preview",
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 8,
    title: "多人人臉辨識體溫量測平台",
    category: "迅智網路 / AIOT",
    section: "迅智網路",
    status: "Demo",
    description: "將 .NET 後端翻寫為 Python，資料表從約 30 張縮減到 15 張，支援多人臉辨識、體溫量測、訪客建模、異常通報與語音回應。",
    highlights: ["效能提升 5-10 倍", "資料結構重構", "多人辨識與正臉篩選"],
    tech: ["Python", "FastAPI", "OpenCV", "C#", "SocketIO", "Vue3"],
    videoUrl: "https://drive.google.com/file/d/13VuNHzjpNLdYdWUATdDdD-82J59zdWAk/preview",
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 9,
    title: "AIOT SaaS 戰情室平台",
    category: "迅智網路 / SaaS",
    section: "迅智網路",
    status: "Demo",
    description: "智慧工廠戰情室與物聯網監控平台，整合考勤、戰情室、公告欄、帳號分權、群組區域管理與平面配置圖，採低耦合設計以便快速客製化。",
    highlights: ["前後端架構自建", "多對多 DB 設計", "Docker / Nginx 部署"],
    tech: ["FastAPI", "SQLAlchemy", "AWS S3", "Docker", "Nginx", "Vue3"],
    videoUrl: "https://drive.google.com/file/d/1oUqgM0CFbtDra8E_2aI5uokhv7ETAzhY/preview",
    repoName: "職涯案例",
  },
  {
    id: 10,
    title: "網路監控系統",
    category: "迅智網路 / 網管平台",
    section: "迅智網路",
    status: "Demo",
    description: "以 Python SNMP / Trap 從零建立網路監控系統，包含拓撲圖、平面配置圖、異常主動推播與自動掃描新增設備。",
    highlights: ["SNMP / Trap", "拓撲圖與平面圖", "異常推播"],
    tech: ["Python", "FastAPI", "pysnmp", "Docker", "Mail Server", "Vue3"],
    videoUrl: "https://drive.google.com/file/d/1ND1zir25NjTw3hKvBcA-OtoUgRTq42No/preview",
    repoName: "職涯案例",
  },
  {
    id: 11,
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
    id: 12,
    title: "空壓機智慧工廠 ESG 節能平台（林口新創競賽冠軍）",
    category: "迅智網路 / ESG AIOT",
    section: "迅智網路",
    status: "Demo",
    description: "監控空壓機 sensor 資料，透過 AI LSTM 推算使用頻率與習慣，呈現機台健康、漏氣、用電量與戰情室分析；帶領團隊 3 個月闖過複賽與決賽，與研華 ESG 合作奪下林口新創競賽冠軍（100 萬獎金）。",
    highlights: ["林口新創競賽冠軍（100 萬獎金）", "帶領團隊規劃 POC", "AI LSTM 模型與資料產生"],
    tech: ["FastAPI", "SQLAlchemy", "Matplotlib", "LINE Bot", "VueChart", "LSTM"],
    videoUrl: "https://drive.google.com/file/d/1AjPueI_YN4icG7qPh6YdXmX950YCQjVJ/preview",
    mediaLabel: "ESG 簡報",
    repoName: "職涯案例",
  },
  {
    id: 13,
    title: "工研院 MR 教育訓練系統",
    category: "迅智網路 / MR 與影像辨識",
    section: "迅智網路",
    status: "Demo",
    description: "透過 MR 頭盔、空間定位與影像處理，判斷把手、閥門、按鈕狀態，即時回傳操作步驟完成狀態。",
    highlights: ["影像取代 sensor", "AI 模型串接", "影像串流 API"],
    tech: ["Python", "FastAPI", "OpenCV", "AI", "Streaming"],
    videos: [
      { label: "▶ 角度偵測", url: "https://drive.google.com/file/d/1Ukkp2hZWYq0eJtvPKnxMKXKx7xtfpdit/preview" },
      { label: "▶ 高度偵測", url: "https://drive.google.com/file/d/10k9r4C9Ia-UyhbE60FKXIl-V2zb7XROO/preview" },
    ],
    repoName: "職涯案例",
  },
  {
    id: 14,
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
    id: 16,
    title: "智慧舊衣回收機系統",
    category: "迅智網路 / AI 影像辨識",
    section: "迅智網路",
    status: "Demo",
    description: "智慧回收機系統：使用者投入衣物、掃 QR Code 完成機台定位綁定後，AI 影像辨識自動判斷衣服 / 褲子 / 外套並依折損程度評分給點，點數可在平台兌換商品或食物，是一套完整的回收點數系統。",
    highlights: ["通過「公益創新．徵案 100」第一階段", "AI 影像辨識分類與折損評分", "掃 QR + GPS 定位綁定機台"],
    tech: ["AI 影像辨識", "GPS 定位", "FastAPI", "Vue3"],
    videoUrl: "https://drive.google.com/file/d/1zGoNUK685dgfQGRNVc1yICsv8OXdTg1A/preview",
    repoName: "職涯案例",
    featured: true,
  },
  {
    id: 15,
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
    title: "定時炸彈",
    category: "聚會互動",
    section: "破冰遊戲",
    status: "Live",
    description: "適合聚會破冰的炸彈傳遞遊戲，時間到的人回答題目或接受挑戰，快速炒熱氣氛。",
    highlights: ["聚會破冰", "題目挑戰", "手機可玩"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://games.ricky-nova.com/bomb-topic/",
    repoName: "HTML Game",
    featured: true,
  },
  {
    id: 102,
    title: "1A2B 猜數字",
    category: "聚會互動",
    section: "破冰遊戲",
    status: "Live",
    description: "經典 1A2B 猜數字推理遊戲，適合小組、朋友聚會或等待時間一起動腦。",
    highlights: ["推理猜數字", "快速開始", "聚會小遊戲"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://games.ricky-nova.com/1A2B/",
    repoName: "HTML Game",
  },
  {
    id: 103,
    title: "2 種人",
    category: "聚會互動",
    section: "破冰遊戲",
    status: "Live",
    description: "用二選一題目讓大家快速分享想法，適合認識彼此、帶出笑點與討論。",
    highlights: ["二選一題目", "快速認識", "炒熱氣氛"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://games.ricky-nova.com/two-types-people/",
    repoName: "HTML Game",
    featured: true,
  },
  {
    id: 104,
    title: "你問我答",
    category: "聚會互動",
    section: "破冰遊戲",
    status: "Live",
    description: "雙人問答對決遊戲，適合小組互動、朋友挑戰或聚會中的輕鬆競賽。",
    highlights: ["雙人問答", "互動對決", "聚會挑戰"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://games.ricky-nova.com/two-player-quiz/",
    repoName: "HTML Game",
  },
  {
    id: 105,
    title: "誰是臥底",
    category: "聚會互動",
    section: "破冰遊戲",
    status: "Live",
    description: "經典多人角色推理遊戲，每個人描述自己的詞語，找出拿到不同詞的人。",
    highlights: ["多人連線", "角色推理", "聚會必玩"],
    tech: ["React", "WebSocket", "Docker"],
    url: "https://spy.ricky-nova.com",
    repoName: "spy_game",
    featured: true,
  },
  {
    id: 106,
    title: "2 種人連線版",
    category: "聚會互動",
    section: "破冰遊戲",
    status: "Live",
    description: "連線版二選一破冰遊戲，讓不同裝置的人一起選、一起看結果。",
    highlights: ["多人連線", "二選一互動", "即時結果"],
    tech: ["React", "WebSocket", "Docker"],
    url: "https://duogame.ricky-nova.com",
    repoName: "two_people_game",
  },
  {
    id: 107,
    title: "貪吃蛇",
    category: "單機遊戲",
    section: "破冰遊戲",
    status: "Live",
    description: "經典貪食蛇單機挑戰，操作簡單，看你能長到多長。",
    highlights: ["單機挑戰", "操作簡單", "手機可玩"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://games.ricky-nova.com/snake-game/",
    repoName: "HTML Game",
  },
  {
    id: 108,
    title: "多人貪吃蛇",
    category: "多人連線",
    section: "破冰遊戲",
    status: "Live",
    description: "連線多人對戰版貪食蛇，和朋友同場競技看誰存活最久。",
    highlights: ["多人連線", "即時對戰", "聚會必玩"],
    tech: ["React", "WebSocket", "Docker"],
    url: "https://snake.ricky-nova.com",
    repoName: "snake_game",
  },
  {
    id: 109,
    title: "2048",
    category: "單機益智",
    section: "破冰遊戲",
    status: "Live",
    description: "數字合併益智遊戲，滑動方塊讓相同數字合體，挑戰拼出 2048。",
    highlights: ["益智挑戰", "數字合併", "手機可玩"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://games.ricky-nova.com/CascadeProjects/2048/",
    repoName: "HTML Game",
  },
  {
    id: 110,
    title: "今日我最美",
    category: "多人連線",
    section: "破冰遊戲",
    status: "Live",
    description: "掃 QR code 開玩的拍照派對遊戲，手機出題、比美拍照，主畫面即時投影得獎作品牆，適合聚會現場同樂。",
    highlights: ["QR Code 快速入場", "即時投影照片牆", "單人/團體雙模式"],
    tech: ["Vue3", "Go", "WebSocket", "Docker"],
    url: "https://beauty.ricky-nova.com",
    repoName: "beauty-game",
    featured: true,
  },
  {
    id: 111,
    title: "冷知識大挑戰",
    category: "單機遊戲",
    section: "破冰遊戲",
    status: "Live",
    description: "1,000 題冷知識題庫的單機益智挑戰，也有小組破冰模式，適合聚會中考驗大家的知識廣度。",
    highlights: ["1,000 題題庫", "小組破冰模式", "手機可玩"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://games.ricky-nova.com/trivia-quiz/",
    repoName: "HTML Game",
  },
  {
    id: 112,
    title: "1A2B 連線版",
    category: "多人連線",
    section: "破冰遊戲",
    status: "Live",
    description: "多人即時連線的 1A2B 猜數字競技場，環狀分配對手題目、限時搶答，戰況牆即時顯示對手猜題進度。",
    highlights: ["多人連線", "環狀對戰配對", "戰況即時牆"],
    tech: ["Node.js", "Socket.IO", "Docker"],
    url: "https://1a2b.ricky-nova.com",
    repoName: "1A2B-multiplayer-game",
  },
  {
    id: 201,
    title: "詩歌資料庫",
    category: "教會投影工具",
    section: "投影同工",
    status: "Live",
    description: "詩歌資料庫、搜尋 API、爬蟲匯入與 PPTX 產生服務，支援歌詞正規化、hash 去重與固定 SQLite seed 部署。",
    highlights: ["16,000+ 詩歌資料", "搜尋與 PPTX API", "自架 Docker 部署"],
    tech: ["Python", "FastAPI", "SQLite", "SQLAlchemy", "python-pptx", "Docker"],
    url: "https://songs.ricky-nova.com",
    repoName: "Songs Data",
    featured: true,
  },
  {
    id: 202,
    title: "詩歌投影片",
    category: "教會投影工具",
    section: "投影同工",
    status: "Live",
    description: "為聚會投影同工準備的詩歌投影片工具，搭配詩歌資料庫可形成從找歌到產生投影片的工作流。",
    highlights: ["詩歌投影流程", "快速產生投影片", "服事現場導向"],
    tech: ["Python", "Flask", "HTML", "Docker"],
    url: "https://songptt.ricky-nova.com",
    repoName: "songPPT",
  },
  {
    id: 203,
    title: "聖經投影",
    category: "教會投影工具",
    section: "投影同工",
    status: "Live",
    description: "聖經投影與 PPT 自動生成系統，支援主控端與投影端同步、QR Code 加入、多版本聖經與禮拜投影片格式。",
    highlights: ["WebSocket 即時同步", "PPT 自動生成", "多版本聖經"],
    tech: ["React", "FastAPI", "WebSocket", "python-pptx", "Docker"],
    url: "https://bible.ricky-nova.com",
    repoName: "bible ppt",
    featured: true,
  },
  {
    id: 204,
    title: "VocalTune Studio",
    category: "AI 影音工具",
    section: "領會伴唱",
    status: "Live",
    description: "專為領會練唱設計的 YouTube 工具，支援下載、升降調、變速、去人聲與多軌音量控制。",
    highlights: ["YouTube 下載", "升降調 / 變速", "AI 去人聲"],
    tech: ["React", "TypeScript", "Tone.js", "FastAPI", "Demucs", "yt-dlp"],
    url: "https://vocal.ricky-nova.com",
    repoName: "vocaltune---youtube-practice-studio",
    featured: true,
  },
  {
    id: 205,
    title: "VocalTune KTV",
    category: "AI 影音工具",
    section: "領會伴唱",
    status: "Live",
    description: "給領會練唱使用的卡拉 OK 模式，AI 自動分離人聲與伴奏，可即時升降調跟唱，支援點歌歌單與個人歌唱紀錄。",
    highlights: ["AI 去人聲卡拉OK", "即時升降調", "點歌歌單"],
    tech: ["React", "TypeScript", "Tone.js", "FastAPI", "Demucs", "Docker"],
    url: "https://vocal.ricky-nova.com/ktv",
    repoName: "vocaltune---youtube-practice-studio",
    featured: true,
  },
  {
    id: 206,
    title: "語音即時翻譯",
    category: "即時協作",
    section: "工具類",
    status: "Live",
    description: "支援語音輸入、即時翻譯、多人房間、個人語言字幕與主板統一語言顯示，適合跨語言活動或聚會現場。",
    highlights: ["語音即時翻譯", "多人字幕", "主板顯示"],
    tech: ["Vue", "FastAPI", "WebSocket", "Redis", "PostgreSQL"],
    url: "https://translate.ricky-nova.com",
    repoName: "polyglot-chat",
    featured: true,
  },
  {
    id: 207,
    title: "無廣告版 YouTube",
    category: "影音工具",
    section: "工具類",
    status: "Live",
    description: "類 YouTube PWA，支援影片搜尋、播放、背景播放、鎖定螢幕控制與無廣告串流體驗。",
    highlights: ["背景播放", "Media Session API", "yt-dlp 串流"],
    tech: ["React", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    url: "https://youtube.ricky-nova.com",
    repoName: "youtube-no-add",
  },
  {
    id: 208,
    title: "8 大行星模擬器",
    category: "互動視覺",
    section: "其他專案",
    status: "Live",
    description: "太陽系行星運轉模擬，展示 3D / Canvas 互動視覺與前端動畫能力。",
    highlights: ["行星運轉", "互動視覺", "靜態部署"],
    tech: ["HTML", "CSS", "JavaScript", "Docker"],
    url: "https://solar.ricky-nova.com",
    repoName: "8 大行星運轉",
  },
  {
    id: 209,
    title: "聖誕市集",
    category: "活動營運系統",
    section: "其他專案",
    status: "Demo",
    description: "完整市集支付管理系統，包含顧客儲值、QR Code 掃描、攤商 POS、商品管理、交易報表與管理後台。",
    highlights: ["QR Code 支付", "攤商 POS", "管理後台與報表"],
    tech: ["Vue", "TypeScript", "FastAPI", "SQLAlchemy", "Docker", "GitHub Actions"],
    url: "https://christmas.ricky-nova.com",
    repoName: "Christmas Market Payment Platform",
    featured: true,
  },
  {
    id: 210,
    title: "狗狗感人影片生成",
    category: "AI 影片剪輯",
    section: "其他專案",
    status: "Live",
    description: "自動剪輯回憶影片的系統，使用 FFmpeg 抽幀、AI Vision 分析互動片段，產生精華影片與中文描述。",
    highlights: ["影片上傳任務", "AI Vision 分析", "FFmpeg 自動剪輯"],
    tech: ["Go", "Gin", "Vue", "FFmpeg", "OpenAI Vision"],
    url: "https://paw.ricky-nova.com",
    repoName: "Paw Diary",
  },
  {
    id: 211,
    title: "桌遊租借系統",
    category: "租借管理平台",
    section: "其他專案",
    status: "Live",
    description: "桌遊租借平台，包含會員認證、租借管理、LINE 通知、AI 推薦與後台 API 文件。",
    highlights: ["JWT 認證", "LINE Bot 整合", "AI 推薦"],
    tech: ["Go", "Gin", "React", "TypeScript", "SQLite", "LINE Bot"],
    url: "https://board-game.ricky-nova.com",
    repoName: "tableGameBorrowSystem",
  },
  {
    id: 212,
    title: "小說轉漫畫 Prompt 工作台",
    category: "AI 創作工具",
    section: "其他專案",
    status: "Live",
    description: "把小說轉成漫畫分鏡的 AI Prompt 工作台：匯入小說，管理角色 / 風格 / 服裝 / 場景 / 分鏡，產出可直接餵給繪圖 AI 或 NotebookLM 的 Prompt，支援 Markdown / DOCX 匯出。",
    highlights: ["小說轉漫畫分鏡", "角色 / 風格 / 場景管理", "Prompt 一鍵匯出"],
    tech: ["Vue 3", "TypeScript", "FastAPI", "SQLite", "OpenRouter"],
    url: "https://noveltocomic.ricky-nova.com",
    repoName: "novel_to_comic",
    featured: true,
  },
];

export const PROJECTS: Project[] = [...CAREER_PROJECTS, ...PUBLIC_PROJECTS];

export const EXPERIENCE: Experience[] = [
  {
    role: "資深軟體工程師",
    company: "三傑物聯股份有限公司",
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
    description: "擔任後端架構、API 實作、影像處理演算法研究與團隊帶領角色。將 .NET 後端翻寫為 Python，縮減資料表並提升人臉辨識效能 5-10 倍，自學 Vue3 完成 AIOT 考勤與智慧工廠平台初版；帶領團隊與研華 ESG 合作，奪下林口新創競賽冠軍（100 萬獎金）。",
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

// ──────────────────────────────────────────────
// English content (英文版資料；section / id / url / tech 等不翻譯)
// ──────────────────────────────────────────────

export const SKILLS_CATEGORIES_EN = [
  {
    label: "Backend",
    items: [
      "Python / FastAPI",
      ".NET Core / C#",
      "SQLAlchemy / Entity Framework",
      "RESTful API / scheduling",
      "pytest unit testing",
    ],
  },
  {
    label: "Frontend",
    items: [
      "Vue3 / Pinia / TypeScript",
      "ECharts / custom charts",
      "Naive UI / Tailwind CSS",
    ],
  },
  {
    label: "Database",
    items: ["MS SQL", "PostgreSQL", "SQLite", "Redis"],
  },
  {
    label: "Vision / AI",
    items: [
      "OpenCV / facial recognition",
      "YOLO object detection",
      "LSTM time-series forecasting",
      "FFmpeg / Demucs media processing",
      "Gemini / OpenAI Vision",
      "AOI optical inspection",
    ],
  },
  {
    label: "Deploy / Tools",
    items: [
      "Self-hosted Ubuntu Server",
      "Docker / Nginx",
      "CI/CD automation",
      "MQTT / Edge AI",
      "LINE Bot integration",
      "AI pair-programming (Claude / Antigravity / Codex / NotebookLM)",
    ],
  },
];

export const KEY_STRENGTHS_EN = [
  {
    title: "Backend Architecture & System Analysis",
    desc: "Requirement analysis, database design, API planning, scheduling, reporting and backend implementation — while keeping legacy compatibility and long-term maintainability.",
  },
  {
    title: "Computer Vision & AIoT",
    desc: "From AOI machines, OpenCV, facial recognition and temperature screening to network monitoring and smart-factory platforms — hands-on hardware-software integration and real-world deployment.",
  },
  {
    title: "AI-Assisted Product Development",
    desc: "Since 2025, working deeply with Claude, Antigravity, Codex and NotebookLM — built an AI streetlight inspection in a week, learned Go in a month, and rapidly ships production-ready side projects.",
  },
];

export const EXPERIENCE_EN: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "三傑物聯股份有限公司",
    period: "2024/03 - Present",
    description: "Managed the software department and co-developed all projects, owning new modules, backend planning and API implementation. Key projects: EV-charging EMS / payment / operations dashboard, smart-healthcare video streaming / editing / live / SDVoE / PACS, and a LINE-based leave / clock-in / expense assistant.",
  },
  {
    role: "Senior Backend / Full-stack Engineer",
    company: "天茶智能",
    period: "2023/06 - 2024/03",
    description: "Led the AMS asset-management and EMS energy-management systems — system analysis, proposals, database, API, UI/UX planning and backend implementation. Also led Yilan smart roadside parking, integrating MQTT, geomagnetic sensors, occupancy and device-status analytics.",
  },
  {
    role: "R&D Lead Engineer",
    company: "迅智網路有限公司",
    period: "2021/06 - 2023/05",
    description: "Backend architecture, API implementation, image-processing algorithm research and team leadership. Refactored the .NET backend into Python, slimmed the schema and boosted facial-recognition performance 5–10×; self-taught Vue3 to ship the first AIoT attendance & smart-factory platform; led the team with Advantech ESG to win the Linkou Startup Competition champion (NT$1M prize).",
  },
  {
    role: "Software Engineer",
    company: "光欣科技",
    period: "2016/09 - 2021/05",
    description: "Focused on AOI optical inspection — image analysis, lighting setup, IO / motion-card SDK wrapping, automation flow and inspection algorithms. Worked on Wafer, PCB, Panel, LineScan and robotic pick-and-place machines.",
  },
];

export const EDUCATION_EN = [
  {
    school: "Tamkang University",
    department: "Dept. of Aerospace Engineering · Automatic Control",
    period: "2015 - 2016",
  },
  {
    school: "Tamkang University",
    department: "Dept. of Aerospace Engineering",
    period: "2012 - 2015",
  },
];

type ProjectI18n = Pick<Project, 'title' | 'category' | 'description' | 'highlights'>;

const EN_PROJECT_OVERRIDES: Record<number, ProjectI18n> = {
  1: { title: "EV-Charging EMS, Payment & Operations Dashboard", category: "三傑物聯 / Energy Management", description: "Owned EV-charging energy-management, payment and operations-dashboard modules, supporting site, transaction and device monitoring for operators.", highlights: ["New modules & backend planning", "Payment & operations data integration", "API development"] },
  2: { title: "Smart-Healthcare Video Streaming, Editing & Live Platform", category: "三傑物聯 / HealthTech", description: "Built a smart operating-room video streaming platform handling editing, live broadcast, SDVoE and PACS integration for medical environments.", highlights: ["PACS / SDVoE integration", "Video streaming & live", "Medical-grade system integration"] },
  3: { title: "Leave / Clock-in / Expense Assistant", category: "三傑物聯 / Internal Tools", description: "Integrated a LINE menu with AI chat analysis to streamline internal leave, clock-in and expense workflows.", highlights: ["LINE menu integration", "AI chat analysis", "Internal process automation"] },
  4: { title: "YOLO Streetlight-Outage Recognition & Auto Inspection", category: "三傑物聯 / Computer Vision", description: "Built a streetlight-outage recognition and automated inspection/acceptance system, feeding vision results into the inspection workflow.", highlights: ["YOLO recognition", "Inspection automation", "Vision results as data"] },
  5: { title: "AMS Asset Management System", category: "天茶智能 / Smart Building", description: "Led the AMS module on a BIM platform, adding spare-parts management, asset stocktaking and device life-cycle tracking.", highlights: ["Spare-parts & stocktaking", "BIM device-management integration", "System analysis & proposals"] },
  6: { title: "EMS Energy Management System", category: "天茶智能 / Energy Management", description: "Led the EMS module on a BIM platform — energy overview, electricity-cost calculation and contracted-power analysis to track usage trends and cost.", highlights: ["Energy overview & analysis", "Electricity cost & contracted power", "ECharts reports & scheduling"] },
  7: { title: "Yilan Smart Roadside Parking", category: "天茶智能 / Smart City", description: "Led the parking-management modules, integrating BIM models, device management, repair flow and roadside hardware — MQTT integration, occupancy and device-status stats.", highlights: ["MQTT hardware integration", "API docs & DB design", "pytest with mock data"] },
  8: { title: "Multi-Person Facial Recognition & Temperature Screening", category: "迅智網路 / AIoT", description: "Refactored the .NET backend into Python, cut the schema from ~30 to 15 tables, and supported multi-face recognition, temperature screening, visitor modeling, alerts and voice response.", highlights: ["5–10× performance gain", "Data-structure refactoring", "Multi-person recognition & frontal filtering"] },
  9: { title: "AIoT SaaS Operations Platform", category: "迅智網路 / SaaS", description: "Smart-factory war-room and IoT monitoring platform integrating attendance, dashboards, bulletin boards, role-based access, group/zone management and floor plans — low-coupling design for fast customization.", highlights: ["Self-built full-stack architecture", "Many-to-many DB design", "Docker / Nginx deployment"] },
  10: { title: "Network Monitoring System", category: "迅智網路 / Network Management", description: "Built a network-monitoring system from scratch with Python SNMP / Trap — topology, floor plans, proactive alerts and auto-scan device discovery.", highlights: ["SNMP / Trap", "Topology & floor plans", "Proactive alerting"] },
  11: { title: "Exhibition Foot-Traffic Analytics", category: "迅智網路 / Foot-Traffic Analytics", description: "Counted entrance/exit foot traffic, peak/off-peak times and dwell time for trade-show flow and operations analysis.", highlights: ["Foot-traffic counting", "Dwell-time analysis", "Visitor flow planning"] },
  12: { title: "Air-Compressor Smart-Factory ESG Platform (Startup Competition Champion)", category: "迅智網路 / ESG AIoT", description: "Monitored air-compressor sensor data, used an AI LSTM model to infer usage patterns, and visualized machine health, leakage, power usage and dashboards; led the team through semifinals and finals over 3 months to win the Linkou Startup Competition champion with Advantech ESG (NT$1M prize).", highlights: ["Linkou Startup Competition champion (NT$1M)", "Led team & POC planning", "AI LSTM model & data generation"] },
  13: { title: "ITRI MR Training System", category: "迅智網路 / MR & Vision", description: "Using an MR headset, spatial positioning and image processing to detect handle, valve and button states and report step completion in real time.", highlights: ["Vision instead of sensors", "AI model integration", "Video-streaming API"] },
  14: { title: "Inventory & Customer-Service Ticketing System", category: "迅智網路 / Internal Management", description: "Role-based access, purchasing, inventory, shipping quotes, ticket-status flow, returns/closing and chat windows — owned requirements, UX, backend architecture and project scheduling.", highlights: ["Permission & flow design", "Many-to-many DB design", "Microsoft AD integration"] },
  16: { title: "Smart Used-Clothing Recycling Machine", category: "迅智網路 / AI Vision", description: "A smart recycling system: users drop in clothing, scan a QR code to bind the machine by location, then AI vision auto-classifies shirts/pants/coats and scores by wear to award points redeemable for goods or food — a complete points-based recycling system.", highlights: ["Passed Stage 1 of 'Social Innovation · Call for 100'", "AI vision classification & wear scoring", "QR + GPS machine binding"] },
  15: { title: "AOI Optical Inspection & Machine Development", category: "光欣科技 / Industrial Automation", description: "Owned AOI image analysis, lighting setup, IO/motion-card SDK wrapping, automation flow and inspection algorithms across Wafer, PCB, Panel and LineScan machines.", highlights: ["Wafer label recognition", "PCB 2D barcode / laser cutting", "Panel defects & robotic pick-and-place"] },
  101: { title: "Time Bomb", category: "Gathering Interaction", description: "A bomb-passing icebreaker for gatherings — whoever holds it when time's up answers a question or takes a challenge, instantly warming up the room.", highlights: ["Gathering icebreaker", "Question challenges", "Mobile friendly"] },
  102: { title: "1A2B Number Guessing", category: "Gathering Interaction", description: "The classic 1A2B deduction game — great for small groups, friends or filling wait time together.", highlights: ["Deduction guessing", "Quick start", "Party mini-game"] },
  103: { title: "Two Types of People", category: "Gathering Interaction", description: "Two-choice prompts that get everyone sharing fast — perfect for breaking the ice and sparking laughs and discussion.", highlights: ["Either/or prompts", "Quick get-to-know", "Warms up the room"] },
  104: { title: "Quiz Duel", category: "Gathering Interaction", description: "A two-player Q&A duel — great for small-group interaction, friendly challenges or light competition at gatherings.", highlights: ["Two-player Q&A", "Interactive duel", "Gathering challenge"] },
  105: { title: "Who Is the Spy", category: "Gathering Interaction", description: "The classic multiplayer deduction game — each person describes their word to find who got a different one.", highlights: ["Multiplayer online", "Role deduction", "Party must-play"] },
  106: { title: "Two Types of People (Online)", category: "Gathering Interaction", description: "An online version of the either/or icebreaker — people on different devices choose and see results together.", highlights: ["Multiplayer online", "Either/or interaction", "Live results"] },
  107: { title: "Snake", category: "Single-player Game", description: "The classic single-player snake challenge — simple controls, see how long you can grow.", highlights: ["Single-player challenge", "Simple controls", "Mobile friendly"] },
  108: { title: "Multiplayer Snake", category: "Multiplayer Online", description: "An online multiplayer battle version of snake — compete with friends to survive the longest.", highlights: ["Multiplayer online", "Real-time battle", "Party must-play"] },
  109: { title: "2048", category: "Single-player Puzzle", description: "The number-merging puzzle — slide tiles to combine matching numbers and reach 2048.", highlights: ["Puzzle challenge", "Number merging", "Mobile friendly"] },
  110: { title: "Today I'm the Prettiest", category: "Multiplayer Online", description: "A scan-and-play photo party game — prompts appear on your phone, snap and submit, and the big screen live-projects a wall of winning photos for the whole gathering.", highlights: ["QR-code quick join", "Live photo wall", "Solo & group modes"] },
  111: { title: "Trivia Challenge", category: "Single-player Game", description: "A single-player trivia challenge with 1,000 questions, plus a group icebreaker mode — test everyone's general knowledge at a gathering.", highlights: ["1,000-question bank", "Group icebreaker mode", "Mobile friendly"] },
  112: { title: "1A2B Online", category: "Multiplayer Online", description: "A real-time multiplayer 1A2B deduction arena — opponents are matched in a ring, answers are timed, and a live feed shows everyone's progress.", highlights: ["Multiplayer online", "Ring-matched opponents", "Live status feed"] },
  201: { title: "Hymn Database", category: "Church Projection Tool", description: "A hymn database with search API, crawler import and PPTX generation — lyric normalization, hash dedup and a fixed SQLite seed for deployment.", highlights: ["16,000+ hymns", "Search & PPTX API", "Self-hosted Docker"] },
  202: { title: "Hymn Slides", category: "Church Projection Tool", description: "A hymn-slide tool for projection volunteers; paired with the hymn database it forms a workflow from finding songs to generating slides.", highlights: ["Hymn projection flow", "Fast slide generation", "Built for live ministry"] },
  203: { title: "Bible Projection", category: "Church Projection Tool", description: "A Bible projection and auto-PPT system — host/projection sync, QR-code join, multiple Bible versions and service-slide formats.", highlights: ["Real-time WebSocket sync", "Auto PPT generation", "Multiple Bible versions"] },
  204: { title: "VocalTune Studio", category: "AI Media Tool", description: "A YouTube tool built for vocal practice — download, pitch shift, tempo change, vocal removal and multi-track volume control.", highlights: ["YouTube download", "Pitch / tempo", "AI vocal removal"] },
  205: { title: "VocalTune KTV", category: "AI Media Tool", description: "A karaoke mode for vocal practice — AI auto-separates vocals and accompaniment, real-time pitch shifting to sing along, with a song queue and personal singing history.", highlights: ["AI vocal-removal karaoke", "Real-time pitch shift", "Song queue"] },
  206: { title: "Real-time Voice Translation", category: "Real-time Collaboration", description: "Supports voice input, real-time translation, multi-user rooms, personal-language subtitles and a unified main-board language — ideal for cross-language events or gatherings.", highlights: ["Real-time voice translation", "Multi-user subtitles", "Main-board display"] },
  207: { title: "Ad-free YouTube", category: "Media Tool", description: "A YouTube-like PWA supporting video search, playback, background play, lock-screen controls and an ad-free streaming experience.", highlights: ["Background play", "Media Session API", "yt-dlp streaming"] },
  208: { title: "8-Planet Simulator", category: "Interactive Visual", description: "A solar-system orbit simulation showcasing 3D / Canvas interactive visuals and frontend animation.", highlights: ["Planet orbits", "Interactive visual", "Static deployment"] },
  209: { title: "Christmas Market", category: "Event Operations System", description: "A complete market payment-management system — customer top-up, QR-code scanning, vendor POS, product management, transaction reports and an admin backend.", highlights: ["QR-code payment", "Vendor POS", "Admin backend & reports"] },
  210: { title: "Heartwarming Dog Video Generator", category: "AI Video Editing", description: "A system that auto-edits memory videos — FFmpeg frame extraction, AI Vision interaction analysis, producing highlight clips with Chinese descriptions.", highlights: ["Video upload tasks", "AI Vision analysis", "FFmpeg auto-editing"] },
  211: { title: "Board-Game Rental System", category: "Rental Management Platform", description: "A board-game rental platform with member auth, rental management, LINE notifications, AI recommendations and backend API docs.", highlights: ["JWT auth", "LINE Bot integration", "AI recommendations"] },
  212: { title: "Novel-to-Manga Prompt Studio", category: "AI Creative Tool", description: "An AI prompt workbench that turns novels into manga storyboards: import a novel, manage characters / style / costumes / scenes / panels, and export prompts ready for image-gen AI or NotebookLM (Markdown / DOCX).", highlights: ["Novel to manga storyboard", "Character / style / scene manager", "One-click prompt export"] },
};

function localizeProjects(list: Project[], lang: 'zh' | 'en'): Project[] {
  if (lang === 'zh') return list;
  return list.map((p) => {
    const ov = EN_PROJECT_OVERRIDES[p.id];
    return ov ? { ...p, ...ov } : p;
  });
}

export interface SiteContent {
  personal: typeof PERSONAL_INFO;
  careerProjects: Project[];
  publicProjects: Project[];
  skills: typeof SKILLS_CATEGORIES;
  strengths: typeof KEY_STRENGTHS;
  experience: Experience[];
  education: typeof EDUCATION;
}

export function getContent(lang: 'zh' | 'en'): SiteContent {
  const en = lang === 'en';
  return {
    personal: en ? PERSONAL_INFO_EN : PERSONAL_INFO,
    careerProjects: localizeProjects(CAREER_PROJECTS, lang),
    publicProjects: localizeProjects(PUBLIC_PROJECTS, lang),
    skills: en ? SKILLS_CATEGORIES_EN : SKILLS_CATEGORIES,
    strengths: en ? KEY_STRENGTHS_EN : KEY_STRENGTHS,
    experience: en ? EXPERIENCE_EN : EXPERIENCE,
    education: en ? EDUCATION_EN : EDUCATION,
  };
}

export const SYSTEM_INSTRUCTION = `
你是李柏儀 Ricky 的個人作品集 AI 助手。
請根據以下資訊回答訪客關於 Ricky 的能力與作品問題：

定位：${PERSONAL_INFO.title}
簡介：${PERSONAL_INFO.bio}
職涯重點：三傑物聯充電樁 EMS / 智慧醫療影音串流 / LINE 與 AI 內部工具；天茶智能 AMS / EMS / 宜蘭智慧停車；迅智網路 AIOT、人臉辨識、網路監控、空壓機 ESG 智慧工廠（與研華 ESG 合作奪林口新創競賽冠軍、100 萬獎金）、MR 教育訓練；光欣科技 AOI 自動光學檢測。
公開作品：${PUBLIC_PROJECTS.filter((project) => project.featured).map((project) => project.title).join('、')}。
主要能力：Python FastAPI、.NET Core、C#、Go、Vue3、React、MS SQL、PostgreSQL、SQLite、Redis、Docker、Nginx、OpenCV、MQTT、LINE Bot、AI 協作開發。

回答策略：
1. 用繁體中文回答。
2. 找工作問題優先講履歷模式與職涯案例。
3. 一般使用者問題優先推薦 Ricky 的AI 工作室中的公開服務。
4. 不誇大，使用「曾負責」「參與」「主導」等精準措辭。
5. 若被問聯絡方式，提供 ${PERSONAL_INFO.email}。
6. 回答控制在 120 字以內，除非使用者要求詳細說明。
`;
