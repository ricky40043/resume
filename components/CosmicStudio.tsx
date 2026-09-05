import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Project } from '../types';
import { PUBLIC_SECTIONS, getContent } from '../constants';
import { useI18n } from '../i18n';
import { soundManager } from '../utils/audio';
import { ServiceIcon, ServiceIconStyles } from './ServiceIcons';

/**
 * AI Studio 宇宙版 — 每個服務是一顆發光星球，卡片組成星系。
 * 完整移植自「AI Studio 宇宙版 (單檔版).html」：真實星球自轉貼圖、
 * 前後層行星環、繞軌月球、人造衛星、黑洞吸積盤與奇異點、星空 Canvas 視差、
 * 縮圖輪播切換、卡片 3D 傾斜與曲速跳躍星球飛出特效。
 */

/* ------------------------------------------------------------------ */
/* 資料                                                                 */
/* ------------------------------------------------------------------ */

const BG_PHOTOS: { file: string; thumb: string; name: { zh: string; en: string } }[] = [
  { file: '/cosmic/bg/01-nebula-blue-1920.jpg', thumb: '/cosmic/bg/01-nebula-blue-thumb.jpg', name: { zh: '藍星雲', en: 'Blue Nebula' } },
  { file: '/cosmic/bg/02-cloud-planet-1920.jpg', thumb: '/cosmic/bg/02-cloud-planet-thumb.jpg', name: { zh: '雲海行星', en: 'Cloud Planet' } },
  { file: '/cosmic/bg/03-solar-system-1920.jpg', thumb: '/cosmic/bg/03-solar-system-thumb.jpg', name: { zh: '太陽系', en: 'Solar System' } },
  { file: '/cosmic/bg/04-orbit-sunrise-1920.jpg', thumb: '/cosmic/bg/04-orbit-sunrise-thumb.jpg', name: { zh: '軌道日出', en: 'Orbit Sunrise' } },
  { file: '/cosmic/bg/05-sky-galaxy-1920.jpg', thumb: '/cosmic/bg/05-sky-galaxy-thumb.jpg', name: { zh: '旋渦星系', en: 'Spiral Galaxy' } },
  { file: '/cosmic/bg/06-hubble-1920.jpg', thumb: '/cosmic/bg/06-hubble-thumb.jpg', name: { zh: '哈伯棒旋', en: 'Hubble Spiral' } },
  { file: '/cosmic/bg/07-night-lake-1920.jpg', thumb: '/cosmic/bg/07-night-lake-thumb.jpg', name: { zh: '湖畔星夜', en: 'Starry Lake' } },
  { file: '/cosmic/bg/08-drifting-1920.jpg', thumb: '/cosmic/bg/08-drifting-thumb.jpg', name: { zh: '遠航艦隊', en: 'Drifting Fleet' } },
  { file: '/cosmic/bg/09-mars-dawn-1920.jpg', thumb: '/cosmic/bg/09-mars-dawn-thumb.jpg', name: { zh: '火星拂曉', en: 'Mars Dawn' } },
  { file: '/cosmic/bg/10-planet-galaxy-1920.jpg', thumb: '/cosmic/bg/10-planet-galaxy-thumb.jpg', name: { zh: '銀河行星', en: 'Galaxy Planet' } },
];

type Hue = readonly [string, string, string];

const HUES: Record<string, Hue> = {
  '破冰遊戲': ['#fbbf24', '#b45309', '#fef3c7'], // 黃色系
  '投影同工': ['#38bdf8', '#0369a1', '#e0f2fe'],
  '領會伴唱': ['#f472b6', '#9d174d', '#fce7f3'], // 粉紅色系
  '工具類': ['#34d399', '#047857', '#d1fae5'],
  '其他專案': ['#a78bfa', '#5b21b6', '#ede9fe'],
};
const DEFAULT_HUE = HUES['其他專案'];

/** 26 款專屬星球 WebP 貼圖對應表 */
const PLANET: Record<string, string> = {
  '定時炸彈': 'bomb',
  '誰是臥底': 'spy',
  '今日我最美': 'beauty',
  '2 種人': 'two-types',
  '2 種人連線版': 'duogame',
  '1A2B 猜數字': 'a1b2',
  '1A2B 連線版': 'a1b2-online',
  '你問我答': 'quiz',
  '冷知識大挑戰': 'trivia',
  '貪吃蛇': 'snake',
  '多人貪吃蛇': 'snake-multi',
  '2048': 'g2048',
  '詩歌資料庫': 'songs',
  '聖經投影': 'bible',
  '詩歌投影片': 'songptt',
  'VocalTune Studio': 'vocal',
  'VocalTune KTV': 'ktv',
  '語音即時翻譯': 'translate',
  '無廣告版 YouTube': 'youtube',
  'AI 小說轉漫畫': 'comic',
  '小說轉影片 編輯器': 'novel-video',
  '聖誕市集': 'christmas',
  '桌遊租借系統': 'board-game',
  '狗狗感人影片生成': 'paw',
  '8 大行星模擬器': 'solar',
  '軟體工程學習': 'learning',
};

/** 特殊天體外觀分類 */
const RING = new Set(['8 大行星模擬器', '詩歌資料庫', '1A2B 連線版', '桌遊租借系統', '2048']);
const MOON = new Set(['今日我最美', '聖經投影', '貪吃蛇', '軟體工程學習', 'AI 小說轉漫畫', '冷知識大挑戰']);
const SAT = new Set(['語音即時翻譯', '無廣告版 YouTube', '小說轉影片 編輯器', '多人貪吃蛇']);

const WARP_MS = 1150;
const ROTATE_MS = 60000;

function isStandaloneApp() {
  const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true;
  const displayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
  return iosStandalone || displayModeStandalone;
}

/* ------------------------------------------------------------------ */
/* 樣式                                                                 */
/* ------------------------------------------------------------------ */

const CSS = `
.cosmic-root { --font-heading: 'Caprasimo', system-ui, sans-serif; --font-body: 'Figtree', system-ui, sans-serif; }
.cosmic-root h1, .cosmic-root h2, .cosmic-root h3, .cosmic-root .cf-heading { font-family: var(--font-heading); }
.cosmic-root { font-family: var(--font-body); }

.cf-card {
  transition: box-shadow .3s cubic-bezier(.2,.8,.2,1), border-color .25s, transform .12s ease-out, background .25s cubic-bezier(.2,.8,.2,1);
  transform-style: preserve-3d;
  background: linear-gradient(165deg, rgba(16,22,48,0.84), rgba(8,11,30,0.8));
  will-change: transform;
}
/* 滑鼠移動到的卡片：完全無模糊，透明度大於 95%，清澈見底看透背後星空背景，零 GPU 模糊卷積負擔 */
.cf-card:hover {
  box-shadow: 0 30px 70px rgba(3,4,18,.6), 0 0 40px rgba(129,140,248,.2);
  border-color: rgba(199,210,254,.6);
  background: linear-gradient(165deg, rgba(16,22,48,0.05), rgba(8,11,30,0.04)) !important;
}
.cf-shine { position: absolute; top: -30%; left: 0; width: 45%; height: 160%; background: linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,.75), rgba(255,255,255,0)); transform: translateX(-160%) skewX(-18deg); transition: transform .95s cubic-bezier(.2,.7,.2,1); pointer-events: none; }
.cf-card:hover .cf-shine { transform: translateX(240%) skewX(-18deg); }

/* 星球視窗區域同步透亮，無模糊 */
.cf-planet-viewport {
  transition: background .25s cubic-bezier(.2,.8,.2,1);
}
.cf-card:hover .cf-planet-viewport {
  background: radial-gradient(120% 120% at 82% 12%, rgba(255,255,255,0.04), transparent 58%), rgba(6,7,26,0.04) !important;
}

/* 星球貼圖自轉：平時靜止，hover 時才轉動，節省大量渲染資源 */
.cf-orb { animation: cf-spin-x 90s linear infinite paused; will-change: background-position; }
.cf-card:hover .cf-orb { animation-play-state: running; animation-duration: 9s; }

/* 衛星與月球：平時暫停，hover 時才運轉，大幅降低全頁 26 張卡片的併發負載 */
.cf-moon-orbit { animation: cf-moon 7s linear infinite paused; will-change: transform; }
.cf-card:hover .cf-moon-orbit { animation-play-state: running; }
.cf-sat-orbit { animation: cf-moon 5.5s linear infinite paused; will-change: transform; }
.cf-card:hover .cf-sat-orbit { animation-play-state: running; }

.cf-halo { opacity: 0; transform: translate(-50%,-50%) scale(.9); transition: opacity .35s ease, transform .45s cubic-bezier(.2,.8,.2,1); }
.cf-card:hover .cf-halo { opacity: 1; transform: translate(-50%,-50%) scale(1.06); }
.cf-sphere { transition: transform .4s cubic-bezier(.2,.8,.2,1); }
.cf-card:hover .cf-sphere { transform: translate(-50%,-52%) scale(1.08); }
.cf-glyph { transition: transform .35s cubic-bezier(.2,.8,.2,1), opacity .3s; }
.cf-card:hover .cf-glyph { transform: translate(-50%,-50%) scale(1.1); }

@keyframes cf-spin-x { from { background-position-x: 0%; } to { background-position-x: -200%; } }
@keyframes cf-moon { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
@keyframes cf-disc {
  from { transform: translate(-50%,-50%) rotate(-14deg) scaleY(.3) rotate(0deg); }
  to { transform: translate(-50%,-50%) rotate(-14deg) scaleY(.3) rotate(360deg); }
}
@keyframes cf-drift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.15); } }
@keyframes cf-drift2 { 0%,100% { transform: translate(0,0) scale(1.1); } 50% { transform: translate(-50px,40px) scale(.9); } }
@keyframes cf-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes cf-warp-orb { 0% { transform: scale(.15); opacity: 0; } 22% { opacity: 1; } 100% { transform: scale(7.5); opacity: 1; } }
@keyframes cf-warp-fade { 0% { opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { opacity: 0; } }
@keyframes cf-label { 0% { opacity: 0; transform: translateY(14px); } 30% { opacity: 1; transform: none; } 80% { opacity: 1; } 100% { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .cf-card, .cf-shine, .cf-orb, .cf-halo, .cf-sphere, .cf-glyph { transition: none !important; animation: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/* 星空背景（Canvas 視差 + 曲速拖曳）                                     */
/* ------------------------------------------------------------------ */

function useStarfield(mouseRef: React.MutableRefObject<{ x: number; y: number }>, warpRef: React.MutableRefObject<number>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let stars: { a: number; r: number; z: number; s: number; c: string; tw: number }[] = [];
    let shoot: { x: number; y: number; l: number } | null = null;
    let raf = 0;
    const cur = { x: 0.5, y: 0.5 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 5200);
      const tint = ['#ffffff', '#dbeafe', '#e9d5ff', '#bfdbfe', '#fde68a'];
      stars = [];
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.62);
        stars.push({ a, r, z: 0.28 + Math.random() * 0.72, s: 0.5 + Math.random() * 1.5, c: tint[(Math.random() * tint.length) | 0], tw: Math.random() * 6.28 });
      }
    };
    build();
    window.addEventListener('resize', build, { passive: true });

    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 0.016;
      cur.x += (mouseRef.current.x - cur.x) * 0.05;
      cur.y += (mouseRef.current.y - cur.y) * 0.05;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.hypot(cx, cy) * 1.05;
      const ox = cur.x - 0.5;
      const oy = cur.y - 0.5;
      const wp = warpRef.current;

      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.a += 0.00006 / st.z;
        const rr = st.r * maxR;
        const x = cx + Math.cos(st.a) * rr - ox * 110 * st.z;
        const y = cy + Math.sin(st.a) * rr * 0.92 - oy * 85 * st.z;
        const tw = 0.55 + 0.45 * Math.sin(t * 1.6 + st.tw);
        if (wp > 0.02) {
          const len = wp * (rr * 0.55 + 40) * st.z;
          const nx = Math.cos(st.a);
          const ny = Math.sin(st.a) * 0.92;
          ctx.strokeStyle = st.c;
          ctx.globalAlpha = Math.min(1, 0.35 + wp * 0.6) * tw;
          ctx.lineWidth = st.s * (1 + wp);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + nx * len, y + ny * len);
          ctx.stroke();
        } else {
          ctx.globalAlpha = tw * (0.35 + st.z * 0.6);
          ctx.fillStyle = st.c;
          ctx.beginPath();
          ctx.arc(x, y, st.s * st.z, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!shoot && wp < 0.05 && Math.random() < 0.004) {
        shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, l: 0 };
      }
      if (shoot) {
        shoot.l += 26;
        const ang = 0.5;
        ctx.globalAlpha = Math.max(0, 1 - shoot.l / 620);
        const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x + Math.cos(ang) * 160, shoot.y + Math.sin(ang) * 160);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(1, '#ffffff');
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(shoot.x + Math.cos(ang) * shoot.l, shoot.y + Math.sin(ang) * shoot.l);
        ctx.lineTo(shoot.x + Math.cos(ang) * (shoot.l + 150), shoot.y + Math.sin(ang) * (shoot.l + 150));
        ctx.stroke();
        if (shoot.l > 640) shoot = null;
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
    };
  }, [mouseRef, warpRef]);

  return canvasRef;
}

/* ------------------------------------------------------------------ */
/* 星球卡片                                                             */
/* ------------------------------------------------------------------ */

const PlanetCard: React.FC<{
  project: Project;
  statusLabel: string;
  useLabel: string;
  onLaunch: (project: Project, e: React.MouseEvent) => void;
}> = ({ project, statusLabel, useLabel, onLaunch }) => {
  const { section: secLabel } = useI18n();
  const hue = HUES[project.section] ?? DEFAULT_HUE;
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  const planetKey = PLANET[project.title] || 'learning';
  const planetMapUrl = `/cosmic/planets/maps/${planetKey}.webp`;
  const hasRing = RING.has(project.title);
  const hasMoon = MOON.has(project.title);
  const hasSat = SAT.has(project.title);
  const hasHole = project.title === '誰是臥底';

  const ringColor = `${hue[2]}88`;
  const satColor = hue[2];
  const haloColor = `${hue[0]}66`;
  const planetBg = `radial-gradient(120% 120% at 82% 12%, ${hue[1]}4d, transparent 58%), radial-gradient(90% 90% at 12% 96%, ${hue[0]}38, transparent 62%), linear-gradient(160deg, #0b1130, #06071a)`;
  const orbGlow = `0 0 46px ${hue[0]}80, inset -14px -18px 40px rgba(4,5,20,.65)`;
  const ctaBg = `linear-gradient(120deg, ${hue[2]}, ${hue[0]})`;
  const ctaGlow = `0 10px 30px ${hue[0]}5e`;

  const onEnter = () => {
    soundManager.playHover();
    const el = cardRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
    }
  };

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    const r = rectRef.current;
    if (!el || !r) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transform = `rotateX(${(-(py - 0.5) * 7).toFixed(2)}deg) rotateY(${((px - 0.5) * 8.5).toFixed(2)}deg) translateZ(16px)`;
    });
  };

  const onLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rectRef.current = null;
    const el = cardRef.current;
    if (el) el.style.transform = '';
  };

  return (
    <div style={{ perspective: 1100 }}>
      <a
        ref={cardRef}
        href={project.url}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => onLaunch(project, e)}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="cf-card relative flex h-full flex-col gap-3.5 rounded-[30px] border border-white/10 p-5 text-inherit no-underline shadow-[0_18px_40px_rgba(3,4,18,0.5)]"
      >
        <div className="flex items-start gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: hue[0] }}>
              {secLabel(project.section)} · {project.category}
            </div>
            <h3 className="cf-heading mt-1.5 text-[22px] leading-tight tracking-tight text-white">{project.title}</h3>
          </div>
          <span
            className="shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px]"
            style={{ color: '#bbf7d0', background: 'rgba(52,211,153,.14)', borderColor: 'rgba(52,211,153,.32)' }}
          >
            {statusLabel}
          </span>
        </div>

        <p className="m-0 line-clamp-2 text-[13.5px] leading-relaxed text-white/65">{project.description}</p>

        <div className="cf-planet-viewport relative aspect-[16/11] overflow-hidden rounded-[22px] border border-white/10" style={{ background: planetBg }}>
          {/* 行星環 - 後半部 (被星球遮擋) */}
          {hasRing && (
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[124%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                transform: 'translate(-50%,-50%) rotate(-18deg) scaleY(.26)',
                border: `8px solid ${ringColor}`,
                boxShadow: `0 0 22px ${ringColor}`,
                clipPath: 'inset(0 0 50% 0)',
              }}
            />
          )}

          {/* 黑洞吸積盤光環 */}
          {hasHole && (
            <div
              aria-hidden
              className="cf-disc-acc pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[130%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                transform: 'translate(-50%,-50%) rotate(-14deg) scaleY(.3)',
                background: 'conic-gradient(from 0deg, rgba(255,214,160,0), rgba(255,196,120,.95), rgba(190,120,255,.75), rgba(255,214,160,0))',
                filter: 'blur(4px)',
              }}
            />
          )}

          {/* 星球本體球體 (帶自轉貼圖與球面光影) */}
          <div
            className="cf-sphere pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[64%] w-auto -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
            style={{ boxShadow: orbGlow }}
          >
            <div
              className="cf-orb absolute inset-0"
              style={{
                backgroundImage: `url("${planetMapUrl}")`,
                backgroundSize: '200% 100%',
                backgroundRepeat: 'repeat',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 26%, rgba(255,255,255,.42), rgba(255,255,255,0) 46%), radial-gradient(circle at 72% 74%, rgba(2,5,20,.9), rgba(2,5,20,.15) 62%, rgba(2,5,20,0) 78%)',
                boxShadow: 'inset -14px -16px 34px rgba(2,5,20,.75), inset 10px 10px 26px rgba(255,255,255,.10)',
              }}
            />
          </div>

          {/* 行星環 - 前半部 (覆蓋在星球前) */}
          {hasRing && (
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[124%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                transform: 'translate(-50%,-50%) rotate(-18deg) scaleY(.26)',
                border: `8px solid ${ringColor}`,
                boxShadow: `0 0 22px ${ringColor}`,
                clipPath: 'inset(50% 0 0 0)',
              }}
            />
          )}

          {/* 黑洞中心奇異點核心 */}
          {hasHole && (
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[46%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: '#04050f',
                boxShadow: '0 0 40px 10px rgba(255,190,120,.45), inset 0 0 20px rgba(0,0,0,1)',
              }}
            />
          )}

          {/* 繞軌小月球 */}
          {hasMoon && (
            <div
              aria-hidden
              className="cf-moon-orbit pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[84%] w-auto -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className="absolute left-1/2 top-0 aspect-square w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 34% 30%, #f4f6fb, #97a2b8 62%, #3c4459)',
                  boxShadow: '0 0 14px rgba(190,205,230,.55)',
                }}
              />
            </div>
          )}

          {/* 繞軌人造衛星 */}
          {hasSat && (
            <div
              aria-hidden
              className="cf-sat-orbit pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[86%] w-auto -translate-x-1/2 -translate-y-1/2"
              style={{ transform: 'translate(-50%,-50%) rotate(24deg)' }}
            >
              <svg viewBox="0 0 40 20" className="absolute left-1/2 top-0 w-[17%] -translate-x-1/2 -translate-y-1/2">
                <g fill="none" stroke={satColor} strokeWidth="2.4" strokeLinecap="round">
                  <rect x="16" y="6" width="8" height="8" rx="2" fill={satColor} fillOpacity=".5" />
                  <path d="M16 10H4M24 10h12" />
                  <rect x="1" y="5" width="6" height="10" rx="1.5" fill={satColor} fillOpacity=".35" />
                  <rect x="33" y="5" width="6" height="10" rx="1.5" fill={satColor} fillOpacity=".35" />
                </g>
              </svg>
            </div>
          )}

          {/* 外圍 Halo 光暈 */}
          <div
            aria-hidden
            className="cf-halo pointer-events-none absolute left-1/2 top-[52%] aspect-square h-[96%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: `radial-gradient(circle, transparent 53%, ${haloColor} 61%, transparent 73%)` }}
          />

          {/* 中央 SVG 呼吸圖示 */}
          <div className="cf-glyph pointer-events-none absolute left-1/2 top-[52%] aspect-square h-1/2 w-auto -translate-x-1/2 -translate-y-1/2 opacity-95">
            <ServiceIcon
              name={project.title}
              section={project.section}
              className="h-full w-full"
              style={{ color: '#ffffff', filter: `drop-shadow(0 0 6px rgba(255,255,255,.55)) drop-shadow(0 0 18px ${hue[1]})` }}
            />
          </div>

          {/* 亮點標籤 */}
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
            {project.highlights.slice(0, 2).map((h) => (
              <span
                key={h}
                className="rounded-full border px-3 py-1.5 text-[11.5px] text-white"
                style={{ background: `${hue[1]}3d`, borderColor: `${hue[0]}66` }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        <div
          className="cf-heading relative mt-auto flex items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 text-[15px]"
          style={{ color: '#0b0d24', background: ctaBg, boxShadow: ctaGlow }}
        >
          <span aria-hidden className="cf-shine" />
          <span className="relative">{useLabel}</span>
          <span aria-hidden className="relative">→</span>
        </div>
      </a>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 主頁面                                                               */
/* ------------------------------------------------------------------ */

const CosmicStudioPage: React.FC = () => {
  const { lang, t, section: secLabel } = useI18n();
  const content = useMemo(() => getContent(lang), [lang]);
  const { personal, publicProjects } = content;

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('全部');
  const [scrolled, setScrolled] = useState(false);
  const [launch, setLaunch] = useState<Project | null>(null);

  const [bgIndex, setBgIndex] = useState(0);
  const [frontLayer, setFrontLayer] = useState<'a' | 'b'>('a');
  const [layerImg, setLayerImg] = useState({ a: BG_PHOTOS[0].file, b: BG_PHOTOS[0].file });
  const bgIndexRef = useRef(0);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const warpRef = useRef(0);
  const canvasRef = useStarfield(mouseRef, warpRef);

  const goToBg = (i: number) => {
    if (i === bgIndexRef.current) return;
    setFrontLayer((front) => {
      const back = front === 'a' ? 'b' : 'a';
      setLayerImg((prev) => ({ ...prev, [back]: BG_PHOTOS[i].file }));
      requestAnimationFrame(() => requestAnimationFrame(() => setFrontLayer(back)));
      return front;
    });
    bgIndexRef.current = i;
    setBgIndex(i);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      mouseRef.current = {
        x: Math.min(1, Math.max(0, 0.5 + e.gamma / 60)),
        y: Math.min(1, Math.max(0, 0.5 + (e.beta - 40) / 60)),
      };
    };
    window.addEventListener('deviceorientation', onTilt);
    const rotate = setInterval(() => goToBg((bgIndexRef.current + 1) % BG_PHOTOS.length), ROTATE_MS);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('deviceorientation', onTilt);
      clearInterval(rotate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusLabels: Record<Project['status'], string> = {
    Live: t.card.statusLive,
    Demo: t.card.statusDemo,
    Local: t.card.statusLocal,
    Planning: t.card.statusPlanning,
    Testing: t.card.statusTesting,
  };

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publicProjects.filter((p) => {
      if (filter !== '全部' && p.section !== filter) return false;
      if (!q) return true;
      return (p.title + ' ' + p.category + ' ' + p.section + ' ' + p.description + ' ' + p.highlights.join(' ')).toLowerCase().includes(q);
    });
  }, [publicProjects, query, filter]);

  const liveCount = publicProjects.filter((p) => p.status === 'Live').length;
  const openCount = publicProjects.filter((p) => p.url).length;

  const launchHue = launch ? HUES[launch.section] ?? DEFAULT_HUE : DEFAULT_HUE;

  const onLaunch = (project: Project, e: React.MouseEvent) => {
    if (launch) return;

    // PWA/手機桌面模式不一定能建立新分頁，直接在目前視窗跳轉最可靠。
    if (isStandaloneApp()) {
      e.preventDefault();
      window.location.assign(project.url);
      return;
    }

    warpRef.current = 1;
    setLaunch(project);
    window.setTimeout(() => {
      warpRef.current = 0;
      setLaunch(null);
    }, WARP_MS);
  };

  return (
    <div className="cosmic-root relative min-h-screen overflow-hidden bg-[#06071a] text-[#eef1ff]" style={{ fontFamily: 'var(--font-body)' }}>
      <style>{CSS}</style>
      <ServiceIconStyles />

      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-cover bg-center transition-opacity duration-[1400ms]"
        style={{ backgroundImage: `url("${layerImg.a}")`, opacity: frontLayer === 'a' ? 1 : 0 }}
      />
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-cover bg-center transition-opacity duration-[1400ms]"
        style={{ backgroundImage: `url("${layerImg.b}")`, opacity: frontLayer === 'b' ? 1 : 0 }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(125% 95% at 50% 0%, rgba(6,8,26,.14), rgba(4,5,18,.5) 58%, rgba(3,4,14,.78) 100%)' }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-[6vw] -top-[14vh] h-[62vw] w-[62vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(129,140,248,.32) 0%, rgba(129,140,248,.10) 36%, transparent 70%)', animation: 'cf-drift 34s ease-in-out infinite', willChange: 'transform' }}
        />
        <div
          className="absolute -right-[10vw] -bottom-[22vh] h-[70vw] w-[70vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(192,132,252,.25) 0%, rgba(192,132,252,.08) 38%, transparent 70%)', animation: 'cf-drift2 44s ease-in-out infinite', willChange: 'transform' }}
        />
        <div
          className="absolute right-[18vw] top-[26vh] h-[34vw] w-[34vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,.22) 0%, rgba(56,189,248,.06) 38%, transparent 70%)', animation: 'cf-drift 28s ease-in-out infinite', willChange: 'transform' }}
        />
      </div>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen" />

      <div className="relative z-[2]">
        <header className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 md:px-14 md:py-4">
          <a href="#top" onMouseEnter={() => soundManager.playHover()} className="mr-auto flex min-w-0 items-center gap-3 text-lg font-black tracking-tight text-white no-underline md:text-xl">
            <span className="grid h-11 w-11 place-items-center rounded-2xl text-[19px] text-[#0b0d24] shadow-[0_0_28px_rgba(129,140,248,.55)]" style={{ background: 'linear-gradient(140deg, #818cf8, #c084fc)', fontFamily: 'var(--font-heading)' }}>
              R
            </span>
            <span className="cf-heading">{t.studio.brand}</span>
          </a>
          <div className="order-3 flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">
            {BG_PHOTOS.map((b, i) => (
              <button
                key={b.file}
                type="button"
                onClick={() => goToBg(i)}
                title={b.name[lang]}
                aria-label={b.name[lang]}
                className="h-[9px] w-[9px] shrink-0 rounded-full border-0 p-0 transition-transform"
                style={{ background: i === bgIndex ? '#818cf8' : 'rgba(255,255,255,.3)', transform: i === bgIndex ? 'scale(1.4)' : 'scale(1)', boxShadow: i === bgIndex ? '0 0 12px #818cf8' : 'none' }}
              />
            ))}
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 pb-12 pt-8 md:px-14 md:pt-10">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,210,254,.3)] bg-[rgba(129,140,248,.12)] px-[15px] py-[7px] text-xs uppercase tracking-[.16em] text-[#c7d2fe]"
            style={{ animation: 'cf-rise .8s cubic-bezier(.2,.8,.2,1) both' }}
          >
            {t.studio.liveBadge(liveCount)}
          </span>
          <h1
            className="cf-heading mt-5 max-w-4xl text-[clamp(38px,6.4vw,78px)] leading-[1.04] tracking-tight text-white"
            style={{ animation: 'cf-rise .9s cubic-bezier(.2,.8,.2,1) .08s both' }}
          >
            {personal.publicTitle}
          </h1>
          <p
            className="mt-5 max-w-2xl text-[clamp(16px,1.5vw,21px)] leading-[1.62] text-white/70"
            style={{ animation: 'cf-rise .9s cubic-bezier(.2,.8,.2,1) .16s both' }}
          >
            {personal.publicTagline} {personal.publicBio}
          </p>
        </section>

        <div className="sticky top-0 z-[6] border-b border-white/[0.07] bg-[rgba(8,10,32,.92)] px-4 py-3 md:px-14">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2.5">
            <div className="relative min-w-[200px] max-w-[380px] flex-1">
              <span aria-hidden className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4.2-4.2" />
                </svg>
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search services, categories, keywords' : '搜尋服務、分類或關鍵字'}
                aria-label={lang === 'en' ? 'Search services' : '搜尋服務'}
                className="h-[46px] w-full rounded-full border border-white/[0.16] bg-white/[0.07] pl-[46px] pr-4 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-[#818cf8] focus:bg-[rgba(129,140,248,.14)]"
              />
            </div>
            <span className="whitespace-nowrap text-[13px] text-white/55">
              {list.length} {lang === 'en' ? 'results' : '個結果'}
            </span>
            <div className="flex w-full flex-wrap gap-2 py-0.5">
              {PUBLIC_SECTIONS.map((s) => {
                const hue = s === '全部' ? ['#818cf8', '#6366f1', '#e0e7ff'] as const : HUES[s] ?? DEFAULT_HUE;
                const count = s === '全部' ? publicProjects.length : publicProjects.filter((p) => p.section === s).length;
                const on = filter === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFilter(s)}
                    onMouseEnter={() => soundManager.playHover()}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 pl-2.5 text-[13px] transition-transform hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: on ? `linear-gradient(120deg, ${hue[2]}, ${hue[0]})` : 'rgba(255,255,255,.05)',
                      color: on ? '#08122a' : '#eef1ff',
                      borderColor: on ? 'transparent' : 'rgba(255,255,255,.16)',
                      boxShadow: on ? `0 0 26px ${hue[0]}70` : 'none',
                    }}
                  >
                    <span className="h-5 w-5 shrink-0 rounded-full" style={{ background: `radial-gradient(circle at 32% 28%, ${hue[2]}, ${hue[0]} 52%, ${hue[1]} 88%)`, boxShadow: `0 0 10px ${hue[0]}99` }} />
                    <span>{secLabel(s)}</span>
                    <span className="text-[11.5px] opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-[1180px] grid-cols-1 gap-[22px] px-4 py-7 pb-24 md:grid-cols-2 md:px-10 xl:grid-cols-3">
          {list.length === 0 ? (
            <div className="col-span-full rounded-[34px] border border-white/10 bg-white/[0.05] p-16 text-center">
              <h3 className="cf-heading mb-2.5 text-2xl text-white">{lang === 'en' ? 'No planets at this coordinate' : '這個座標沒有星球'}</h3>
              <p className="m-0 text-white/60">{lang === 'en' ? 'Try another keyword, or switch back to "All".' : '換個關鍵字，或把星系切回「全部」。'}</p>
            </div>
          ) : (
            list.map((project) => (
              <PlanetCard
                key={project.id}
                project={project}
                statusLabel={statusLabels[project.status]}
                useLabel={t.card.tileUse}
                onLaunch={onLaunch}
              />
            ))
          )}
        </section>

        <section className="mx-auto max-w-[1180px] px-4 pb-12 md:px-10">
          <div
            className="mx-auto flex flex-wrap items-center gap-5 rounded-[34px] border border-white/10 p-8 md:p-12"
            style={{ background: 'linear-gradient(150deg, rgba(129,140,248,.18), rgba(192,132,252,.1))' }}
          >
            <div className="flex-1 basis-[300px]">
              <h2 className="cf-heading mb-2 text-[clamp(24px,3vw,34px)] tracking-tight text-white">{t.studio.contactTitle}</h2>
              <p className="m-0 text-[15.5px] text-white/68">{t.studio.contactBody}</p>
            </div>
            <a
              href={`mailto:${personal.email}`}
              onMouseEnter={() => soundManager.playHover()}
              className="cf-heading rounded-full px-6 py-3.5 text-[15px] text-[#0b0d24] no-underline shadow-[0_0_30px_rgba(165,180,252,.45)]"
              style={{ background: 'linear-gradient(120deg, #a5b4fc, #e9d5ff)' }}
            >
              {t.studio.contactCta}
            </a>
          </div>
        </section>

        <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-white/50 md:px-14">
          © {new Date().getFullYear()} {t.studio.footer(openCount)}
        </footer>
      </div>

      {launch && (
        <div
          className="fixed inset-0 z-[40] grid place-items-center overflow-hidden"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(6,7,26,.2), rgba(4,5,16,.94))', animation: `cf-warp-fade ${WARP_MS}ms ease-in-out both` }}
        >
          <div
            aria-hidden
            className="absolute h-[44vmin] w-[44vmin]"
            style={{
              backgroundImage: `url("/cosmic/planets/${PLANET[launch.title] || 'learning'}.webp")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 0 60px rgba(120,180,255,.5))',
              animation: `cf-warp-orb ${WARP_MS}ms cubic-bezier(.5,0,.85,.4) both`,
            }}
          />
          <div className="relative text-center" style={{ animation: `cf-label ${WARP_MS}ms ease-out both` }}>
            <div className="text-xs uppercase tracking-[.3em] text-white/70">Warp</div>
            <div className="cf-heading mt-2.5 text-[clamp(28px,5vw,54px)] tracking-tight text-white">
              {lang === 'en' ? `Flying to ${launch.title}` : `飛往 ${launch.title}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CosmicStudioPage;
