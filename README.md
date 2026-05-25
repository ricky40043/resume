# Ricky Resume & AI Studio

這是 Ricky 的個人履歷與 ai 工作室入口網站。

## 頁面

- `/`：履歷作品集，包含職涯案例、能力、工作經歷與 PDF 履歷。
- `/ai-studio`：ai 工作室，給朋友、教會同工與一般使用者直接使用公開服務。

## 對外網址

- https://ai.ricky-nova.com

## 本機開發

```bash
npm install
npm run dev
```

開啟：

- http://localhost:3000/
- http://localhost:3000/ai-studio

## 建置

```bash
npm run build
```

## 部署

此專案可部署到 Vercel。`vercel.json` 已設定 `/ai-studio` 路徑 rewrite，直接開啟 `/ai-studio` 不會 404。
