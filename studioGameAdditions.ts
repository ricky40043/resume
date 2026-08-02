import { PUBLIC_PROJECTS } from './constants';
import { Project } from './types';

const studioGameAdditions: Project[] = [
  {
    id: 113,
    title: "節奏接龍",
    category: "節奏聚會遊戲",
    section: "破冰遊戲",
    status: "Testing",
    description: "依照 BPM 節拍進行的快速聯想接龍。系統語音念出「一想到某個主題，我就想到」，玩家輪流限時回答，適合聚會暖場與反應力挑戰。",
    highlights: ["BPM 節拍與語音出題", "玩家輪替與自動換題", "支援跳過且不扣題數"],
    tech: ["HTML", "CSS", "JavaScript", "Web Audio API", "SpeechSynthesis"],
    url: "https://games.ricky-nova.com/rhythm-chain/",
    repoName: "HTML Game",
  },
  {
    id: 114,
    title: "注音挑戰",
    category: "文字聯想遊戲",
    section: "破冰遊戲",
    status: "Testing",
    description: "隨機產生 2～5 個注音聲母，玩家依序聯想出符合的詞語，例如 ㄒ ㄧ ㄐ 可以回答洗衣機，適合聚會腦力暖身。",
    highlights: ["2～5 字隨機注音", "題數與字數可設定", "空白鍵快速下一題"],
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    url: "https://games.ricky-nova.com/bopomofo-challenge/",
    repoName: "HTML Game",
  },
  {
    id: 115,
    title: "詞語接龍",
    category: "限時分類作答",
    section: "破冰遊戲",
    status: "Testing",
    description: "主持人選擇捷運站名、國家、電影等分類，玩家輪流在倒數內回答；按空白鍵重置計時並換人，時間到就顯示本輪輸家。",
    highlights: ["分類題庫與自訂題目", "精準倒數與玩家輪替", "跳過題目不扣遊玩題數"],
    tech: ["HTML", "CSS", "JavaScript", "Web Audio API"],
    url: "https://games.ricky-nova.com/word-chain/",
    repoName: "HTML Game",
  },
];

const existingIds = new Set(PUBLIC_PROJECTS.map((project) => project.id));
for (const project of studioGameAdditions) {
  if (!existingIds.has(project.id)) {
    PUBLIC_PROJECTS.push(project);
  }
}
