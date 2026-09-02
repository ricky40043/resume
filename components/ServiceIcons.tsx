import React from 'react';

/**
 * Ricky 的 AI 工作室 — 專屬 SVG 圖示系統
 *
 * 設計語彙（Design System）
 *  - 畫布 48×48，內容留在 4~44 之間，超出用 overflow:visible 讓爆炸／星光可以外溢
 *  - 線條：strokeWidth 3（次要 2.2 / 粗體 6），round cap + round join，配合站上 border-4 的圓潤厚重感
 *  - 顏色：一律 currentColor（白），靠 fillOpacity 0.22 / 0.38 / 0.6 分層，因此可以直接放在
 *    五種分類漸層底色上而不用改色
 *  - 互動：整張卡片是 .group，hover 時由 CSS 觸發。動作語彙統一為
 *      sv-pop（彈出） / sv-vanish（消失） / sv-move（位移＋旋轉＋縮放，用 CSS 變數帶參數）
 *      sv-spin / sv-orbit（旋轉） / sv-tick（節拍擺動） / sv-bob（上下浮動）
 *      sv-float（往上飄散） / sv-beat（心跳縮放） / sv-bar（長條抽長） / sv-flow（虛線流動）
 *      sv-draw（描繪伸長） / sv-twinkle（閃爍）
 *    延遲用 sv-a / sv-b / sv-c / sv-d 做群組錯位
 *  - prefers-reduced-motion 會關掉所有動畫，只留靜態圖示
 */

/* ------------------------------------------------------------------ */
/* 動態樣式                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
.svc { overflow: visible; }
.svc g, .svc path, .svc circle, .svc rect, .svc ellipse, .svc line, .svc polyline, .svc polygon, .svc text {
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
.svc [class*="sv-"] {
  transition:
    transform .48s cubic-bezier(.34,1.42,.64,1),
    opacity .32s ease,
    stroke-dashoffset .6s cubic-bezier(.34,1.2,.64,1),
    fill-opacity .32s ease;
}

/* 延遲階梯 */
.svc .sv-a { transition-delay: .05s; animation-delay: .08s; }
.svc .sv-b { transition-delay: .10s; animation-delay: .16s; }
.svc .sv-c { transition-delay: .15s; animation-delay: .24s; }
.svc .sv-d { transition-delay: .20s; animation-delay: .32s; }

/* 靜止狀態 */
.svc .sv-pop     { opacity: 0; transform: scale(.35); }
.svc .sv-move    { transform: translate(0,0) rotate(0) scale(1); }
.svc .sv-draw    { stroke-dasharray: 100; stroke-dashoffset: 34; }
.svc .sv-glow    { fill-opacity: .18; }

/* hover 狀態 */
.group:hover .svc .sv-pop,
.svc:hover .sv-pop        { opacity: 1; transform: scale(1); }
.group:hover .svc .sv-vanish,
.svc:hover .sv-vanish     { opacity: 0; transform: scale(.4); }
.group:hover .svc .sv-move,
.svc:hover .sv-move       { transform: translate(var(--tx,0px), var(--ty,0px)) rotate(var(--r,0deg)) scale(var(--s,1)); }
.group:hover .svc .sv-merge,
.svc:hover .sv-merge      { transform: translate(var(--tx,0px), var(--ty,0px)) rotate(var(--r,0deg)) scale(var(--s,1)); opacity: 0; }
.group:hover .svc .sv-draw,
.svc:hover .sv-draw       { stroke-dashoffset: 0; }
.group:hover .svc .sv-glow,
.svc:hover .sv-glow       { fill-opacity: .62; }

.group:hover .svc .sv-spin,
.svc:hover .sv-spin       { transform: rotate(360deg); }
.group:hover .svc .sv-orbit,
.svc:hover .sv-orbit      { animation: sv-rot 3.6s linear infinite; }
.group:hover .svc .sv-orbit-fast,
.svc:hover .sv-orbit-fast { animation: sv-rot 1.9s linear infinite; }
.group:hover .svc .sv-tick,
.svc:hover .sv-tick       { animation: sv-tick .82s ease-in-out infinite; }
.group:hover .svc .sv-bob,
.svc:hover .sv-bob        { animation: sv-bob .9s ease-in-out infinite; }
.group:hover .svc .sv-float,
.svc:hover .sv-float      { animation: sv-float 1.25s ease-out infinite; }
.group:hover .svc .sv-beat,
.svc:hover .sv-beat       { animation: sv-beat .78s ease-in-out infinite; }
.group:hover .svc .sv-shake,
.svc:hover .sv-shake      { animation: sv-shake .5s ease-in-out infinite; }
.group:hover .svc .sv-bar,
.svc:hover .sv-bar        { animation: sv-bar .78s ease-in-out infinite; }
.group:hover .svc .sv-flow,
.svc:hover .sv-flow       { animation: sv-flow .9s linear infinite; }
.group:hover .svc .sv-twinkle,
.svc:hover .sv-twinkle    { animation: sv-twinkle 1s ease-in-out infinite; }
.group:hover .svc .sv-ripple,
.svc:hover .sv-ripple     { animation: sv-ripple 1.4s ease-out infinite; }

.svc .sv-bar { transform-origin: 50% 100%; }

@keyframes sv-rot     { to   { transform: rotate(360deg); } }
@keyframes sv-tick    { 0%,100% { transform: rotate(-19deg); } 50% { transform: rotate(19deg); } }
@keyframes sv-bob     { 0%,100% { transform: translateY(0); }   50% { transform: translateY(-3.5px); } }
@keyframes sv-float   { 0%   { transform: translateY(2px) scale(.7); opacity: 0; }
                        25%  { opacity: 1; }
                        100% { transform: translateY(-13px) scale(1.05); opacity: 0; } }
@keyframes sv-beat    { 0%,100% { transform: scale(1); } 45% { transform: scale(1.22); } }
@keyframes sv-shake   { 0%,100% { transform: translateX(0) rotate(0); }
                        25%  { transform: translateX(-1.6px) rotate(-6deg); }
                        75%  { transform: translateX(1.6px) rotate(6deg); } }
@keyframes sv-bar     { 0%,100% { transform: scaleY(.42); } 50% { transform: scaleY(1); } }
@keyframes sv-flow    { to   { stroke-dashoffset: -24; } }
@keyframes sv-twinkle { 0%,100% { transform: scale(.72) rotate(0deg); opacity: .55; }
                        50%  { transform: scale(1.18) rotate(45deg); opacity: 1; } }
@keyframes sv-ripple  { 0%   { transform: scale(.55); opacity: .9; }
                        100% { transform: scale(1.5);  opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .svc [class*="sv-"] { transition: none !important; animation: none !important; }
  .svc .sv-pop  { opacity: 1; transform: none; }
  .svc .sv-draw { stroke-dashoffset: 0; }
}
`;

export const ServiceIconStyles: React.FC = () => <style>{CSS}</style>;

/* ------------------------------------------------------------------ */
/* 共用零件                                                             */
/* ------------------------------------------------------------------ */

/** hover 位移／旋轉／縮放參數，搭配 className="sv-move" */
const mv = (tx = 0, ty = 0, r = 0, s = 1): React.CSSProperties =>
  ({ '--tx': `${tx}px`, '--ty': `${ty}px`, '--r': `${r}deg`, '--s': `${s}` } as React.CSSProperties);

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const Label: React.FC<{
  x: number; y: number; children: React.ReactNode; size?: number; className?: string; style?: React.CSSProperties;
}> = ({ x, y, children, size = 11, className, style }) => (
  <text
    x={x}
    y={y}
    className={className}
    style={style}
    textAnchor="middle"
    dominantBaseline="central"
    fontSize={size}
    fontWeight={900}
    letterSpacing="-0.4"
    fill="currentColor"
    stroke="none"
  >
    {children}
  </text>
);

/** 八角爆炸星芒，定時炸彈與各種「成功」瞬間共用 */
const BURST =
  'M42 24 L31.4 27.1 L36.7 36.7 L27.1 31.4 L24 42 L20.9 31.4 L11.3 36.7 L16.6 27.1 L6 24 ' +
  'L16.6 20.9 L11.3 11.3 L20.9 16.6 L24 6 L27.1 16.6 L36.7 11.3 L31.4 20.9 Z';

/** 四角星光，閃爍點綴 */
const Spark: React.FC<{ x: number; y: number; r?: number; className?: string; style?: React.CSSProperties }> = ({
  x, y, r = 5, className = 'sv-twinkle', style,
}) => (
  <path
    className={className}
    style={style}
    fill="currentColor"
    stroke="none"
    d={`M${x} ${y - r} Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z`}
  />
);

/** 人頭剪影，破冰／推理類共用 */
const Head: React.FC<{ x: number; y: number; r?: number; className?: string; style?: React.CSSProperties; op?: number }> = ({
  x, y, r = 4.6, className, style, op = 0.42,
}) => (
  <g className={className} style={style}>
    <circle cx={x} cy={y} r={r} fill="currentColor" fillOpacity={op} stroke="currentColor" strokeWidth={2.6} />
    <path
      d={`M${x - r * 1.75} ${y + r * 3.1} a${r * 1.75} ${r * 1.9} 0 0 1 ${r * 3.5} 0`}
      fill="currentColor"
      fillOpacity={op}
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
    />
  </g>
);

/* ------------------------------------------------------------------ */
/* 分類圖示（5）                                                        */
/* ------------------------------------------------------------------ */

/** 破冰遊戲：骰子 → hover 擲骰翻面 */
const IcoDice = (
  <g {...stroke}>
    <rect className="sv-spin" x="7" y="7" width="34" height="34" rx="10" fill="currentColor" fillOpacity={0.24} strokeWidth={3.2} />
    <g fill="currentColor" stroke="none">
      <circle cx="16" cy="16" r="3.2" />
      <circle cx="24" cy="24" r="3.2" />
      <circle cx="32" cy="32" r="3.2" />
      <circle className="sv-pop sv-b" cx="32" cy="16" r="3.2" />
      <circle className="sv-pop sv-d" cx="16" cy="32" r="3.2" />
    </g>
  </g>
);

/** 投影同工：投影機打出光束 → hover 光束展開 */
const IcoProjector = (
  <g {...stroke}>
    <rect x="4" y="26" width="23" height="13" rx="5" fill="currentColor" fillOpacity={0.26} strokeWidth={2.8} />
    <circle cx="15.5" cy="32.5" r="3.6" className="sv-glow" fill="currentColor" stroke="currentColor" strokeWidth={2.4} />
    <path d="M9 39 v3 M23 39 v3" strokeWidth={2.4} opacity={0.7} />
    <g className="sv-move" style={mv(0, 0, 0, 1.08)} strokeWidth={2.4} opacity={0.85}>
      <path d="M28 30 L42 22" />
      <path d="M28 34 L42 34" />
      <path d="M28 38 L42 45" />
    </g>
    <rect className="sv-glow" x="30" y="5" width="16" height="13" rx="3.5" fill="currentColor" stroke="currentColor" strokeWidth={2.6} />
    <path className="sv-pop sv-b" d="M34 11 h8 M34 15 h5" strokeWidth={2.2} />
  </g>
);

/** 領會伴唱：麥克風 + 聲波 → hover 聲波擴散 */
const IcoMic = (
  <g {...stroke}>
    <rect className="sv-bob" x="18" y="5" width="12" height="21" rx="6" fill="currentColor" fillOpacity={0.3} />
    <path d="M12 22 a12 12 0 0 0 24 0" />
    <path d="M24 34 v7" />
    <path d="M18 43 h12" />
    <path className="sv-ripple" d="M8 15 a15 15 0 0 0 0 15" strokeWidth={2.4} />
    <path className="sv-ripple sv-b" d="M40 15 a15 15 0 0 1 0 15" strokeWidth={2.4} />
  </g>
);

/** 工具類：扳手 + 螺絲起子 → hover 扳手轉動 */
const IcoTools = (
  <g {...stroke}>
    <g className="sv-move" style={mv(0, 0, -28)}>
      <path
        d="M33 8 a9 9 0 0 0 -9.6 14.6 L10 36 a4.2 4.2 0 0 0 5.9 5.9 L29.4 28.6 A9 9 0 0 0 40 15 l-5.4 5.4 -5.6 -1.4 -1.4 -5.6 Z"
        fill="currentColor"
        fillOpacity={0.28}
      />
    </g>
    <g className="sv-move sv-b" style={mv(3, -3)}>
      <path d="M38 40 L28 30" strokeWidth={5} opacity={0.75} />
      <path d="M40 42 l3 3" strokeWidth={3} opacity={0.75} />
    </g>
  </g>
);

/** 其他專案：星光 → hover 閃爍旋轉 */
const IcoSparkle = (
  <g {...stroke}>
    <path
      className="sv-move"
      style={mv(0, 0, 90, 1.06)}
      d="M24 6 Q27 18 38 21 Q27 24 24 38 Q21 24 10 21 Q21 18 24 6 Z"
      fill="currentColor"
      fillOpacity={0.34}
    />
    <Spark x={39} y={35} r={5.5} className="sv-twinkle sv-b" />
    <Spark x={10} y={36} r={4} className="sv-twinkle sv-c" />
  </g>
);

const SECTION_ICONS: Record<string, React.ReactNode> = {
  '破冰遊戲': IcoDice,
  '投影同工': IcoProjector,
  '領會伴唱': IcoMic,
  '工具類': IcoTools,
  '其他專案': IcoSparkle,
};

/* ------------------------------------------------------------------ */
/* 服務圖示（30）                                                       */
/* ------------------------------------------------------------------ */

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  /* ---------- 破冰遊戲 ---------- */

  /** 定時炸彈：引信冒火花 → hover 整顆炸開 */
  '定時炸彈': (
    <g {...stroke}>
      <g className="sv-vanish">
        <circle cx="21" cy="30" r="13" fill="currentColor" fillOpacity={0.34} strokeWidth={3.2} />
        <path d="M21 24 V30 h4.5" strokeWidth={2.8} opacity={0.95} />
        <path d="M28.6 20.6 L32.4 16.4" strokeWidth={6.5} />
        <path d="M33 16 C 39.5 12.5, 34 8, 40 5" strokeWidth={3.2} />
      </g>
      <Spark x={41} y={4.5} r={4.5} className="sv-twinkle" />
      <path className="sv-pop" d={BURST} fill="currentColor" fillOpacity={0.42} stroke="currentColor" strokeWidth={2.6} />
      <path className="sv-pop sv-b" d="M24 15 L27 22 L34 24 L27 26 L24 33 L21 26 L14 24 L21 22 Z" fill="currentColor" stroke="none" />
    </g>
  ),

  /** 1A2B 猜數字：數字格 → hover 逐格翻牌，A/B 提示亮起 */
  '1A2B 猜數字': (
    <g {...stroke}>
      <g strokeWidth={2.6}>
        <rect className="sv-move" style={mv(0, -3)} x="7" y="12" width="15" height="15" rx="4.5" fill="currentColor" fillOpacity={0.3} />
        <rect className="sv-move sv-b" style={mv(0, -3)} x="26" y="12" width="15" height="15" rx="4.5" fill="currentColor" fillOpacity={0.3} />
      </g>
      <Label x={14.5} y={19.5} size={10}>1A</Label>
      <Label x={33.5} y={19.5} size={10}>2B</Label>
      <g className="sv-pop sv-c" fill="currentColor" stroke="none">
        <circle cx="15" cy="37" r="3.4" />
        <circle cx="24" cy="37" r="3.4" opacity={0.55} />
        <circle cx="33" cy="37" r="3.4" />
      </g>
      <path className="sv-vanish" d="M12 37 h24" strokeWidth={2.6} opacity={0.45} />
    </g>
  ),

  /** 2 種人：左右兩派 → hover 交換位置 */
  '2 種人': (
    <g {...stroke}>
      <path d="M24 5 V43" strokeWidth={2.6} strokeDasharray="4 5" opacity={0.65} />
      <g className="sv-move" style={mv(17, 0)}>
        <Head x={14} y={17} r={5} />
      </g>
      <g className="sv-move sv-b" style={mv(-17, 0)}>
        <Head x={34} y={17} r={5} op={0.62} />
      </g>
      <path className="sv-pop sv-c" d="M12 38 h9 m-3.2 -3.2 L21 38 l-3.2 3.2" strokeWidth={2.6} />
      <path className="sv-pop sv-d" d="M36 38 h-9 m3.2 -3.2 L27 38 l3.2 3.2" strokeWidth={2.6} />
    </g>
  ),

  /** 你問我答：問號泡泡 → hover 冒出答案泡泡 */
  '你問我答': (
    <g {...stroke}>
      <g className="sv-move" style={mv(-1.5, -2)}>
        <path d="M8 10 h22 a5 5 0 0 1 5 5 v10 a5 5 0 0 1 -5 5 H19 l-6 6 v-6 h-5 a5 5 0 0 1 -5 -5 V15 a5 5 0 0 1 5 -5 Z" fill="currentColor" fillOpacity={0.3} strokeWidth={2.8} />
        <Label x={19.5} y={20} size={14}>?</Label>
      </g>
      <g className="sv-pop sv-b">
        <path d="M44 22 H28 a4 4 0 0 0 -4 4 v8 a4 4 0 0 0 4 4 h9 l5 5 v-5 h2 a4 4 0 0 0 4 -4 v-8 a4 4 0 0 0 -4 -4 Z" fill="currentColor" fillOpacity={0.55} strokeWidth={2.8} />
        <Label x={36} y={30} size={13}>!</Label>
      </g>
    </g>
  ),

  /** 誰是臥底：偵探帽 + 放大鏡 → hover 放大鏡掃過並揪出臥底 */
  '誰是臥底': (
    <g {...stroke}>
      <path d="M6 17 h28" strokeWidth={3.2} />
      <path d="M11.5 17 a8.5 8.5 0 0 1 17 0 Z" fill="currentColor" fillOpacity={0.36} strokeWidth={2.8} />
      <path d="M13 13 h14" strokeWidth={2.4} opacity={0.75} />
      <g className="sv-move" style={mv(3, -4, 0, 1.12)}>
        <circle cx="26" cy="33" r="9" fill="currentColor" fillOpacity={0.16} strokeWidth={3} />
        <path d="M32.8 39.8 L40 47" strokeWidth={4.2} />
        <g className="sv-pop sv-c" fill="currentColor" stroke="none">
          <circle cx="22.6" cy="31" r="2" />
          <circle cx="29.4" cy="31" r="2" />
          <path d="M22 36 q4 3.4 8 0" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
        </g>
      </g>
      <Spark x={40} y={10} r={4.5} className="sv-twinkle sv-b" />
    </g>
  ),

  /** 2 種人連線版：兩派 + 網路節點 → hover 訊號流動 */
  '2 種人連線版': (
    <g {...stroke}>
      <path className="sv-flow" d="M13 33 L24 14 L35 33" strokeWidth={2.8} strokeDasharray="6 6" />
      <path className="sv-flow sv-b" d="M13 33 H35" strokeWidth={2.8} strokeDasharray="6 6" />
      <circle className="sv-move" style={mv(0, -2, 0, 1.15)} cx="24" cy="12" r="6" fill="currentColor" fillOpacity={0.42} strokeWidth={2.8} />
      <circle className="sv-move sv-b" style={mv(-2, 2, 0, 1.15)} cx="12" cy="35" r="6" fill="currentColor" fillOpacity={0.42} strokeWidth={2.8} />
      <circle className="sv-move sv-c" style={mv(2, 2, 0, 1.15)} cx="36" cy="35" r="6" fill="currentColor" fillOpacity={0.42} strokeWidth={2.8} />
      <Label x={24} y={12} size={8}>2</Label>
    </g>
  ),

  /** 貪吃蛇：蛇身 + 蘋果 → hover 吃掉蘋果、身體變長 */
  '貪吃蛇': (
    <g {...stroke}>
      <path className="sv-pop sv-b" d="M6 35 H12" strokeWidth={8} opacity={0.32} />
      <path d="M12 35 H21 V23 H30" strokeWidth={8} opacity={0.5} />
      <g strokeWidth={1.6} opacity={0.4}>
        <path d="M16 31.5 v7 M17.5 29 h7 M26 19.5 v7" />
      </g>
      <g className="sv-move" style={mv(5, 0)}>
        <rect x="30" y="18" width="10" height="10" rx="3.6" fill="currentColor" fillOpacity={0.95} strokeWidth={2.4} />
        <circle cx="36.5" cy="21.5" r="1.6" fill="#0f172a" stroke="none" />
      </g>
      <g className="sv-vanish sv-a">
        <circle cx="43" cy="14" r="4" fill="currentColor" fillOpacity={0.5} strokeWidth={2.4} />
        <path d="M43 10 q2.6 -3.2 4.6 -2" strokeWidth={2.2} />
      </g>
    </g>
  ),

  /** 多人貪吃蛇：兩條蛇 → hover 同時竄出 */
  '多人貪吃蛇': (
    <g {...stroke}>
      <path className="sv-pop sv-c" d="M4 12 H9" strokeWidth={7} opacity={0.3} />
      <path d="M9 12 H18 V19 H26" strokeWidth={7} opacity={0.58} />
      <g className="sv-move" style={mv(5, 0)}>
        <rect x="26" y="14.5" width="9" height="9" rx="3.2" fill="currentColor" fillOpacity={0.95} strokeWidth={2.2} />
        <circle cx="32.2" cy="17.6" r="1.4" fill="#0f172a" stroke="none" />
      </g>
      <path className="sv-pop sv-d" d="M44 40 H39" strokeWidth={7} opacity={0.24} />
      <path d="M39 40 H30 V33 H22" strokeWidth={7} opacity={0.4} />
      <g className="sv-move sv-b" style={mv(-5, 0)}>
        <rect x="13" y="28.5" width="9" height="9" rx="3.2" fill="currentColor" fillOpacity={0.75} strokeWidth={2.2} />
        <circle cx="15.8" cy="31.6" r="1.4" fill="#0f172a" stroke="none" />
      </g>
    </g>
  ),

  /** 2048：數字磚 → hover 向右合併成 2048 */
  '2048': (
    <g {...stroke}>
      <g strokeWidth={2.6}>
        <rect className="sv-merge" style={mv(19, 0, 0, 0.8)} x="6" y="6" width="16" height="16" rx="5" fill="currentColor" fillOpacity={0.26} />
        <rect className="sv-merge sv-a" style={mv(19, 0, 0, 0.8)} x="6" y="26" width="16" height="16" rx="5" fill="currentColor" fillOpacity={0.26} />
        <rect className="sv-move sv-b" style={mv(0, 6, 0, 1.05)} x="26" y="6" width="16" height="16" rx="5" fill="currentColor" fillOpacity={0.44} />
        <rect className="sv-merge sv-b" style={mv(0, -6, 0, 0.9)} x="26" y="26" width="16" height="16" rx="5" fill="currentColor" fillOpacity={0.6} />
      </g>
      <Label x={14} y={14} size={11} className="sv-merge" style={mv(19, 0, 0, 0.8)}>2</Label>
      <Label x={14} y={34} size={11} className="sv-merge sv-a" style={mv(19, 0, 0, 0.8)}>8</Label>
      <Label x={34} y={14} size={11} className="sv-merge sv-b" style={mv(0, 6, 0, 0.8)}>4</Label>
      <Label x={34} y={34} size={11} className="sv-merge sv-b" style={mv(0, -6, 0, 0.8)}>16</Label>
      <g className="sv-pop sv-d">
        <rect x="9" y="16" width="30" height="16" rx="5.5" fill="currentColor" fillOpacity={0.92} strokeWidth={2.8} />
        <Label x={24} y={24} size={11} style={{ fill: '#0f172a' }}>2048</Label>
      </g>
    </g>
  ),

  /** 今日我最美：手持鏡 → hover 皇冠落下、星光閃爍 */
  '今日我最美': (
    <g {...stroke}>
      <ellipse cx="24" cy="21" rx="13" ry="14" fill="currentColor" fillOpacity={0.24} />
      <ellipse cx="24" cy="21" rx="8" ry="9" className="sv-glow" fill="currentColor" stroke="currentColor" strokeWidth={2.4} />
      <path d="M24 35 V42" strokeWidth={4.5} />
      <path d="M18 44 h12" strokeWidth={3} />
      <g className="sv-pop sv-b">
        <path d="M13.5 6 L18.5 10.5 L24 2 L29.5 10.5 L34.5 6 L33 13 H15 Z" fill="currentColor" fillOpacity={0.75} strokeWidth={2.6} />
      </g>
      <Spark x={40} y={30} r={5} className="sv-twinkle sv-c" />
      <Spark x={9} y={33} r={4} className="sv-twinkle sv-d" />
    </g>
  ),

  /** 冷知識大挑戰：燈泡問號 → hover 燈亮、光芒射出 */
  '冷知識大挑戰': (
    <g {...stroke}>
      <path d="M24 5 a13 13 0 0 0 -7.5 23.6 V33 h15 v-4.4 A13 13 0 0 0 24 5 Z" className="sv-glow" fill="currentColor" strokeWidth={2.8} />
      <path d="M18.5 37 h11" strokeWidth={2.8} />
      <path d="M20 42 h8" strokeWidth={2.8} />
      <Label x={24} y={19} size={13} className="sv-move" style={mv(0, 0, 0, 1.15)}>?</Label>
      <g className="sv-pop sv-b" strokeWidth={2.6}>
        <path d="M24 1 V-3" />
        <path d="M39 6 L42 3" />
        <path d="M9 6 L6 3" />
        <path d="M44 19 h4" />
        <path d="M4 19 H0" />
      </g>
    </g>
  ),

  /** 1A2B 連線版：數字格 + 連線訊號 → hover 訊號脈動 */
  '1A2B 連線版': (
    <g {...stroke}>
      <rect className="sv-move" style={mv(0, -2)} x="9" y="16" width="30" height="16" rx="5.5" fill="currentColor" fillOpacity={0.3} strokeWidth={2.8} />
      <Label x={24} y={24} size={11}>1A2B</Label>
      <g strokeWidth={2.6}>
        <path className="sv-ripple" d="M13 11 a15 15 0 0 1 22 0" />
        <path className="sv-ripple sv-b" d="M8 6 a22 22 0 0 1 32 0" />
      </g>
      <g className="sv-pop sv-c" fill="currentColor" stroke="none">
        <circle cx="14" cy="39" r="2.8" />
        <circle cx="24" cy="39" r="2.8" opacity={0.6} />
        <circle cx="34" cy="39" r="2.8" />
      </g>
    </g>
  ),

  /** 節奏接龍：節拍器 → hover 擺錘打拍、節奏條跳動 */
  '節奏接龍': (
    <g {...stroke}>
      <path d="M18 6 h12 l7 34 H11 Z" fill="currentColor" fillOpacity={0.26} strokeWidth={2.8} />
      <path d="M12.5 40 h23" strokeWidth={3} />
      <g style={{ transformOrigin: '24px 40px' }}>
        <path className="sv-tick" style={{ transformOrigin: '24px 40px' }} d="M24 40 L29 13" strokeWidth={3.2} />
      </g>
      <circle cx="24" cy="40" r="2.6" fill="currentColor" stroke="none" />
      <g className="sv-pop sv-b" strokeWidth={2.6} opacity={0.85}>
        <path className="sv-bar" d="M42 34 v-6" />
        <path className="sv-bar sv-c" d="M46 34 v-11" />
      </g>
    </g>
  ),

  /** 注音挑戰：ㄅㄆㄇ 字磚 → hover 洗牌跳動 */
  '注音挑戰': (
    <g {...stroke}>
      <g strokeWidth={2.6}>
        <rect className="sv-move" style={mv(0, -4, -8)} x="4" y="15" width="14" height="18" rx="4.5" fill="currentColor" fillOpacity={0.3} />
        <rect className="sv-move sv-b" style={mv(0, 4, 6)} x="20" y="15" width="14" height="18" rx="4.5" fill="currentColor" fillOpacity={0.44} />
        <rect className="sv-move sv-c" style={mv(0, -4, 9)} x="36" y="15" width="14" height="18" rx="4.5" fill="currentColor" fillOpacity={0.3} />
      </g>
      <Label x={11} y={24} size={11} className="sv-move" style={mv(0, -4, -8)}>ㄅ</Label>
      <Label x={27} y={24} size={11} className="sv-move sv-b" style={mv(0, 4, 6)}>ㄆ</Label>
      <Label x={43} y={24} size={11} className="sv-move sv-c" style={mv(0, -4, 9)}>ㄇ</Label>
    </g>
  ),

  /** 詞語接龍：鎖鏈 → hover 第三環扣上 */
  '詞語接龍': (
    <g {...stroke}>
      <rect className="sv-move" style={mv(-2, 0)} x="4" y="17" width="20" height="14" rx="7" fill="currentColor" fillOpacity={0.28} strokeWidth={3} />
      <rect className="sv-move sv-b" style={mv(2, 0)} x="18" y="17" width="20" height="14" rx="7" fill="currentColor" fillOpacity={0.44} strokeWidth={3} />
      <rect className="sv-pop sv-c" x="32" y="17" width="16" height="14" rx="7" fill="currentColor" fillOpacity={0.6} strokeWidth={3} />
      <Spark x={24} y={38} r={4.5} className="sv-twinkle sv-d" />
    </g>
  ),

  /** 猜人 Guess Who：三個匿名頭像 → hover 中間翻出真面目 */
  '猜人 Guess Who': (
    <g {...stroke}>
      <g className="sv-move" style={mv(-4, 2, -8)} opacity={0.5}>
        <Head x={11} y={20} r={4.4} op={0.3} />
      </g>
      <g className="sv-move sv-c" style={mv(4, 2, 8)} opacity={0.5}>
        <Head x={37} y={20} r={4.4} op={0.3} />
      </g>
      <g className="sv-move sv-b" style={mv(0, -2, 0, 1.14)}>
        <circle cx="24" cy="18" r="9" fill="currentColor" fillOpacity={0.5} strokeWidth={2.8} />
        <path d="M14.5 40 a9.5 10 0 0 1 19 0" fill="currentColor" fillOpacity={0.5} strokeWidth={2.8} />
        <Label x={24} y={18} size={12} className="sv-vanish">?</Label>
        <g className="sv-pop sv-c" fill="#0f172a" stroke="none">
          <circle cx="20.6" cy="16.5" r="1.7" />
          <circle cx="27.4" cy="16.5" r="1.7" />
          <path d="M20 21.5 q4 3.6 8 0" fill="none" stroke="#0f172a" strokeWidth={2.2} strokeLinecap="round" />
        </g>
      </g>
    </g>
  ),

  /* ---------- 投影同工 ---------- */

  /** 詩歌資料庫：資料庫圓柱 + 音符 → hover 音符飄出、資料層堆疊 */
  '詩歌資料庫': (
    <g {...stroke}>
      <g strokeWidth={2.8}>
        <path className="sv-move sv-b" style={mv(0, 2)} d="M7 33 v5 c0 3.2 7 5.8 15 5.8 s15 -2.6 15 -5.8 v-5" fill="currentColor" fillOpacity={0.24} />
        <path className="sv-move sv-a" style={mv(0, 1)} d="M7 24 v5 c0 3.2 7 5.8 15 5.8 s15 -2.6 15 -5.8 v-5" fill="currentColor" fillOpacity={0.3} />
        <ellipse cx="22" cy="19" rx="15" ry="5.8" fill="currentColor" fillOpacity={0.4} />
        <path d="M7 19 v5 c0 3.2 7 5.8 15 5.8 s15 -2.6 15 -5.8 v-5" fill="currentColor" fillOpacity={0.3} />
      </g>
      <g className="sv-float">
        <path d="M35 12 V3 l8 2.2 v9" strokeWidth={2.6} />
        <circle cx="32.4" cy="12.6" r="2.8" fill="currentColor" stroke="none" />
        <circle cx="40.4" cy="14.8" r="2.8" fill="currentColor" stroke="none" />
      </g>
    </g>
  ),

  /** 詩歌投影片：投影幕上的歌詞 → hover 換頁 */
  '詩歌投影片': (
    <g {...stroke}>
      <rect x="5" y="8" width="38" height="27" rx="5" fill="currentColor" fillOpacity={0.22} strokeWidth={2.8} />
      <path d="M24 35 v7 M17 44 h14" strokeWidth={2.8} />
      <g className="sv-move" style={mv(-16, 0)}>
        <path d="M12 18 h13 M12 25 h9" strokeWidth={3} opacity={0.9} />
      </g>
      <g className="sv-pop sv-b">
        <path d="M26 18 h10 M26 25 h13" strokeWidth={3} />
        <circle cx="34" cy="12.5" r="2.2" fill="currentColor" stroke="none" />
      </g>
      <path className="sv-pop sv-c" d="M40 21 h5 m-2 -2.5 L45.5 21 L43 23.5" strokeWidth={2.4} />
    </g>
  ),

  /** 聖經投影：翻開的聖經 + 十字光束 → hover 光束擴散、翻頁 */
  '聖經投影': (
    <g {...stroke}>
      <path d="M24 16 C20 12 13 11 6 12 v24 c7 -1 14 0 18 4 4 -4 11 -5 18 -4 V12 c-7 -1 -14 0 -18 4 Z" fill="currentColor" fillOpacity={0.26} strokeWidth={2.8} />
      <path d="M24 16 V40" strokeWidth={2.6} />
      <path className="sv-move" style={mv(0, 0, -14)} d="M24 16 C27 13 33 12 39 12.6 v10 c-6 -0.6 -12 0.4 -15 3.4 Z" fill="currentColor" fillOpacity={0.34} strokeWidth={2.4} opacity={0.85} />
      <g className="sv-pop">
        <path d="M24 2 v10 M19.5 6.5 h9" strokeWidth={3.2} />
      </g>
      <path className="sv-ripple sv-b" d="M13 8 L24 -1 L35 8" strokeWidth={2.4} opacity={0.7} />
    </g>
  ),

  /* ---------- 領會伴唱 ---------- */

  /** VocalTune Studio：波形 + 調音滑桿 → hover 波形律動、滑桿升調 */
  'VocalTune Studio': (
    <g {...stroke}>
      <g strokeWidth={4} opacity={0.9}>
        <path className="sv-bar" d="M8 28 v-8" />
        <path className="sv-bar sv-a" d="M16 32 v-16" />
        <path className="sv-bar sv-b" d="M24 34 v-20" />
        <path className="sv-bar sv-c" d="M32 32 v-16" />
        <path className="sv-bar sv-d" d="M40 28 v-8" />
      </g>
      <path d="M5 40 h38" strokeWidth={2.8} opacity={0.6} />
      <circle className="sv-move" style={mv(14, 0)} cx="15" cy="40" r="4.6" fill="currentColor" fillOpacity={0.85} strokeWidth={2.6} />
      <path className="sv-pop sv-c" d="M40 8 v-6 m-3 3 h6" strokeWidth={2.6} />
    </g>
  ),

  /** VocalTune KTV：麥克風 + 歌詞 → hover 音符飄升、麥克風脈動 */
  'VocalTune KTV': (
    <g {...stroke}>
      <g className="sv-beat">
        <rect x="19" y="6" width="11" height="19" rx="5.5" fill="currentColor" fillOpacity={0.42} strokeWidth={2.8} />
      </g>
      <path d="M13 21 a11.5 11.5 0 0 0 23 0" strokeWidth={2.8} />
      <path d="M24.5 32.5 v4" strokeWidth={2.8} />
      <rect x="9" y="37" width="31" height="9" rx="4.5" fill="currentColor" fillOpacity={0.26} strokeWidth={2.6} />
      <path d="M14 41.5 h10" strokeWidth={2.6} className="sv-move" style={mv(7, 0)} />
      <g className="sv-float sv-b">
        <path d="M39 16 V6 l6 1.6 v10" strokeWidth={2.4} />
        <circle cx="36.6" cy="16.6" r="2.5" fill="currentColor" stroke="none" />
      </g>
      <g className="sv-float sv-d">
        <circle cx="8" cy="14" r="2.5" fill="currentColor" stroke="none" />
        <path d="M10.5 14 V5" strokeWidth={2.2} />
      </g>
    </g>
  ),

  /* ---------- 工具類 ---------- */

  /** 語音即時翻譯：中英泡泡 → hover 左右互換、中間亮出轉換箭頭 */
  '語音即時翻譯': (
    <g {...stroke}>
      <g className="sv-move" style={mv(-1, -1)}>
        <path d="M8 5 h16 a5 5 0 0 1 5 5 v8 a5 5 0 0 1 -5 5 h-8 l-6 5 v-5 H8 a5 5 0 0 1 -5 -5 v-8 A5 5 0 0 1 8 5 Z" fill="currentColor" fillOpacity={0.34} strokeWidth={2.8} />
        <Label x={16} y={14} size={13} className="sv-vanish">文</Label>
        <Label x={16} y={14} size={13} className="sv-pop sv-c">A</Label>
      </g>
      <g className="sv-move sv-b" style={mv(1, 1)}>
        <path d="M40 25 H24 a5 5 0 0 0 -5 5 v8 a5 5 0 0 0 5 5 h8 l6 5 v-5 h2 a5 5 0 0 0 5 -5 v-8 a5 5 0 0 0 -5 -5 Z" fill="currentColor" fillOpacity={0.55} strokeWidth={2.8} />
        <Label x={32} y={34} size={13} className="sv-vanish sv-a">A</Label>
        <Label x={32} y={34} size={13} className="sv-pop sv-d">文</Label>
      </g>
      <path className="sv-spin" d="M32 12 a7 7 0 0 1 -13 6 M16 36 a7 7 0 0 1 13 -6" strokeWidth={2.4} opacity={0.75} />
    </g>
  ),

  /** 無廣告版 YouTube：播放鍵 + AD 標籤 → hover 廣告被劃掉飛走 */
  '無廣告版 YouTube': (
    <g {...stroke}>
      <rect x="4" y="14" width="40" height="27" rx="8" fill="currentColor" fillOpacity={0.28} strokeWidth={2.8} />
      <path className="sv-move" style={mv(0, 0, 0, 1.18)} d="M20 21.5 L31 27.5 L20 33.5 Z" fill="currentColor" fillOpacity={0.9} strokeWidth={2.6} />
      <g className="sv-move sv-b" style={mv(10, -10, 26, 0.55)}>
        <rect x="27" y="3" width="17" height="12" rx="4" fill="currentColor" fillOpacity={0.62} strokeWidth={2.4} />
        <Label x={35.5} y={9} size={9} style={{ fill: '#0f172a' }}>AD</Label>
      </g>
      <path className="sv-pop sv-a" d="M25 17 L46 1" strokeWidth={3.2} />
    </g>
  ),

  /* ---------- 其他專案 ---------- */

  /** 8 大行星模擬器：恆星 + 軌道 → hover 行星公轉 */
  '8 大行星模擬器': (
    <g {...stroke}>
      <circle cx="24" cy="24" r="6.5" className="sv-glow" fill="currentColor" stroke="currentColor" strokeWidth={2.8} />
      <g className="sv-orbit">
        <ellipse cx="24" cy="24" rx="18" ry="9" strokeWidth={2.4} opacity={0.7} transform="rotate(-22 24 24)" />
        <circle cx="40.5" cy="18.5" r="3.4" fill="currentColor" stroke="none" />
      </g>
      <g className="sv-orbit-fast">
        <ellipse cx="24" cy="24" rx="12" ry="19" strokeWidth={2.4} opacity={0.55} transform="rotate(28 24 24)" />
        <circle cx="16" cy="8.5" r="2.8" fill="currentColor" stroke="none" opacity={0.9} />
      </g>
      <Spark x={43} y={40} r={4} className="sv-twinkle sv-c" />
    </g>
  ),

  /** 聖誕市集：市集攤位 + 聖誕樹 → hover 星星亮起、彩球閃爍 */
  '聖誕市集': (
    <g {...stroke}>
      <path d="M24 11 L30 21 H18 Z" fill="currentColor" fillOpacity={0.52} strokeWidth={2.8} />
      <path d="M24 18 L33.5 30 H14.5 Z" fill="currentColor" fillOpacity={0.4} strokeWidth={2.8} />
      <path d="M24 26 L37 39 H11 Z" fill="currentColor" fillOpacity={0.28} strokeWidth={2.8} />
      <path d="M24 39 V44" strokeWidth={4.5} />
      <g className="sv-pop">
        <path d="M24 4 l2.1 4.3 4.7 0.7 -3.4 3.3 0.8 4.7 -4.2 -2.2 -4.2 2.2 0.8 -4.7 -3.4 -3.3 4.7 -0.7 Z" fill="currentColor" stroke="none" />
      </g>
      <g fill="currentColor" stroke="none">
        <circle className="sv-twinkle sv-b" cx="20.5" cy="26" r="2" />
        <circle className="sv-twinkle sv-d" cx="28" cy="34" r="2" />
      </g>
      <g className="sv-move sv-c" style={mv(0, -2)} strokeWidth={2.4}>
        <rect x="2" y="34" width="13" height="10" rx="2.8" fill="currentColor" fillOpacity={0.55} />
        <path d="M8.5 34 v10" strokeWidth={2.2} />
        <path d="M8.5 34 q-4 -4.5 -0.6 -3.2 q3.9 -1.3 -0.6 3.2" strokeWidth={2} />
      </g>
    </g>
  ),

  /** 聖誕市集 管理後台：儀表板 + 聖誕樹 → hover 長條圖成長 */
  '聖誕市集 管理後台': (
    <g {...stroke}>
      <rect x="4" y="8" width="40" height="32" rx="6" fill="currentColor" fillOpacity={0.22} strokeWidth={2.8} />
      <path d="M4 16 h40" strokeWidth={2.4} opacity={0.7} />
      <g fill="currentColor" stroke="none" opacity={0.8}>
        <circle cx="10" cy="12" r="1.7" />
        <circle cx="15.5" cy="12" r="1.7" />
      </g>
      <g strokeWidth={4} opacity={0.9}>
        <path className="sv-bar" d="M13 34 v-5" />
        <path className="sv-bar sv-b" d="M21 34 v-10" />
        <path className="sv-bar sv-c" d="M29 34 v-14" />
      </g>
      <g className="sv-pop sv-d">
        <path d="M37 33 L41.5 25 L46 33 Z" fill="currentColor" fillOpacity={0.65} strokeWidth={2.4} />
        <path d="M41.5 33 v3" strokeWidth={2.4} />
      </g>
    </g>
  ),

  /** 狗狗感人影片生成：底片框裡的腳印 → hover 愛心飄出 */
  '狗狗感人影片生成': (
    <g {...stroke}>
      <rect x="6" y="10" width="36" height="30" rx="6" fill="currentColor" fillOpacity={0.22} strokeWidth={2.8} />
      <g fill="currentColor" stroke="none" opacity={0.4}>
        <rect x="2.5" y="15" width="3.6" height="3.6" rx="1.3" />
        <rect x="2.5" y="23.2" width="3.6" height="3.6" rx="1.3" />
        <rect x="2.5" y="31.4" width="3.6" height="3.6" rx="1.3" />
        <rect x="41.9" y="15" width="3.6" height="3.6" rx="1.3" />
        <rect x="41.9" y="23.2" width="3.6" height="3.6" rx="1.3" />
        <rect x="41.9" y="31.4" width="3.6" height="3.6" rx="1.3" />
      </g>
      <g className="sv-move" style={mv(0, 0, 0, 1.08)} fill="currentColor" stroke="none">
        <ellipse cx="24" cy="32.5" rx="8.4" ry="6.4" />
        <ellipse cx="13.6" cy="24.6" rx="3.5" ry="4.4" transform="rotate(-22 13.6 24.6)" />
        <ellipse cx="20.2" cy="19.6" rx="3.4" ry="4.4" transform="rotate(-8 20.2 19.6)" />
        <ellipse cx="27.8" cy="19.6" rx="3.4" ry="4.4" transform="rotate(8 27.8 19.6)" />
        <ellipse cx="34.4" cy="24.6" rx="3.5" ry="4.4" transform="rotate(22 34.4 24.6)" />
      </g>
      <path className="sv-float sv-b" d="M36 15 c0 -2.9 -4.3 -2.9 -4.3 0.35 0 2.4 4.3 4.8 4.3 4.8 s4.3 -2.4 4.3 -4.8 c0 -3.25 -4.3 -3.25 -4.3 -0.35 Z" fill="currentColor" stroke="none" />
    </g>
  ),

  /** 桌遊租借系統：棋子 + 骰子 → hover 骰子擲出 */
  '桌遊租借系統': (
    <g {...stroke}>
      <g className="sv-move" style={mv(-1, -2)}>
        <path d="M18 8 a4.5 4.5 0 1 1 -0.1 0 Z" fill="currentColor" fillOpacity={0.55} strokeWidth={2.6} />
        <path d="M9 32 c0 -7 3.5 -11 9 -11 s9 4 9 11 Z" fill="currentColor" fillOpacity={0.42} strokeWidth={2.6} />
      </g>
      <path d="M5 36 h38" strokeWidth={3} opacity={0.7} />
      <path d="M9 42 h30" strokeWidth={2.6} opacity={0.4} />
      <g className="sv-move sv-b" style={mv(0, -3, 200)}>
        <rect x="26" y="12" width="20" height="20" rx="6" fill="currentColor" fillOpacity={0.3} strokeWidth={2.6} />
        <g fill="currentColor" stroke="none">
          <circle cx="32" cy="18" r="2.1" />
          <circle cx="40" cy="26" r="2.1" />
          <circle cx="36" cy="22" r="2.1" />
        </g>
      </g>
    </g>
  ),

  /** AI 小說轉漫畫：書本轉成漫畫格 → hover 漫畫格逐一浮現 */
  'AI 小說轉漫畫': (
    <g {...stroke}>
      <path d="M4 10 c5 -2 9 -2 13 1 v25 c-4 -3 -8 -3 -13 -1 Z" fill="currentColor" fillOpacity={0.32} strokeWidth={2.8} />
      <path d="M8 17 h6 M8 23 h5" strokeWidth={2.2} opacity={0.75} />
      <path className="sv-move" style={mv(3, 0)} d="M20 23 h5 m-2.4 -2.6 L25.4 23 l-2.8 2.6" strokeWidth={2.6} />
      <g strokeWidth={2.6}>
        <rect className="sv-move sv-a" style={mv(0, -1, 0, 1.08)} x="28" y="9" width="17" height="12" rx="4" fill="currentColor" fillOpacity={0.46} />
        <rect className="sv-move sv-c" style={mv(-1, 1, 0, 1.08)} x="28" y="25" width="8" height="12" rx="3.5" fill="currentColor" fillOpacity={0.3} />
        <rect className="sv-move sv-d" style={mv(1, 1, 0, 1.08)} x="38" y="25" width="7" height="12" rx="3.5" fill="currentColor" fillOpacity={0.3} />
      </g>
      <Spark x={36.5} y={15} r={4} className="sv-twinkle sv-b" />
    </g>
  ),

  /** 小說轉影片 編輯器：底片 + 時間軸 → hover 播放頭掃過 */
  '小說轉影片 編輯器': (
    <g {...stroke}>
      <rect x="4" y="8" width="40" height="20" rx="5" fill="currentColor" fillOpacity={0.26} strokeWidth={2.8} />
      <g fill="currentColor" stroke="none" opacity={0.7}>
        <rect x="8" y="11" width="4" height="3.4" rx="1.2" />
        <rect x="16" y="11" width="4" height="3.4" rx="1.2" />
        <rect x="24" y="11" width="4" height="3.4" rx="1.2" />
        <rect x="32" y="11" width="4" height="3.4" rx="1.2" />
        <rect x="8" y="21.6" width="4" height="3.4" rx="1.2" />
        <rect x="16" y="21.6" width="4" height="3.4" rx="1.2" />
        <rect x="24" y="21.6" width="4" height="3.4" rx="1.2" />
        <rect x="32" y="21.6" width="4" height="3.4" rx="1.2" />
      </g>
      <path className="sv-move" style={mv(0, 0, 0, 1.2)} d="M21 15.5 L28 18.5 L21 21.5 Z" fill="currentColor" stroke="none" />
      <g strokeWidth={3.4} opacity={0.85}>
        <path d="M6 36 h12" />
        <path d="M22 36 h9" opacity={0.6} />
        <path d="M35 36 h7" opacity={0.6} />
      </g>
      <path className="sv-move sv-b" style={mv(26, 0)} d="M9 31 v10" strokeWidth={2.6} />
      <circle className="sv-move sv-b" style={mv(26, 0)} cx="9" cy="30" r="2.6" fill="currentColor" stroke="none" />
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* 對外元件                                                             */
/* ------------------------------------------------------------------ */

const Svg: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className, title }) => (
  <svg viewBox="0 0 48 48" className={`svc ${className ?? 'h-9 w-9'}`} role="img" aria-label={title} focusable="false">
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

/** 服務卡片圖示：找不到專屬圖示時退回該分類圖示 */
export const ServiceIcon: React.FC<{ name: string; section?: string; className?: string }> = ({ name, section, className }) => {
  const icon =
    PROJECT_ICONS[name] ?? (section ? SECTION_ICONS[section] : undefined) ?? SECTION_ICONS['其他專案'];
  return <Svg className={className} title={name}>{icon}</Svg>;
};

/** 分類入口圖示 */
export const SectionIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <Svg className={className} title={name}>{SECTION_ICONS[name] ?? SECTION_ICONS['其他專案']}</Svg>
);

/** 站頭 Logo 用的工具箱圖示 */
export const BrandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Svg className={className} title="Ricky 的 AI 工作室">
    <g {...stroke}>
      <path className="sv-move" style={mv(0, -4)} d="M17 15 v-4 a4 4 0 0 1 4 -4 h6 a4 4 0 0 1 4 4 v4" strokeWidth={2.8} />
      <rect x="5" y="15" width="38" height="26" rx="6" fill="currentColor" fillOpacity={0.3} strokeWidth={2.8} />
      <path d="M5 26 h38" strokeWidth={2.6} opacity={0.75} />
      <rect className="sv-move sv-b" style={mv(0, 0, 0, 1.15)} x="19" y="22" width="10" height="8" rx="3" fill="currentColor" fillOpacity={0.85} strokeWidth={2.4} />
    </g>
  </Svg>
);
