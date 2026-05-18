# Ricky Resume & Tools

這是 Ricky 的個人履歷與公開工具入口網站。

## 頁面

- `/`：履歷作品集，包含職涯案例、能力、工作經歷與 PDF 履歷。
- `/tools`：Ricky 的工具天地，給朋友、教會同工與一般使用者直接使用公開服務。

## 本機開發

```bash
npm install
npm run dev
```

開啟：

- http://localhost:3000/
- http://localhost:3000/tools

## 建置

```bash
npm run build
```

## 部署

此專案可部署到 Vercel。`vercel.json` 已設定 `/tools` 路徑 rewrite，直接開啟 `/tools` 不會 404。
