# Thirty-Six Cafe

A Next.js 14 landing page for Timberwood — The Thirty Six cafe, built from Figma design.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** via `globals.css`
- **Google Fonts** — Dancing Script, Advent Pro, Jost

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js — no config needed.

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/thirty-six-cafe.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the GitHub repo
4. Leave all settings as default (Vercel detects Next.js automatically)
5. Click **Deploy** — live in ~60 seconds

### Option C — Drag & Drop (no Git needed)

1. Build the project:
   ```bash
   npm run build
   ```
2. Drag the entire project folder to [vercel.com/new](https://vercel.com/new)

## Project Structure

```
├── app/
│   ├── globals.css      # All styles
│   ├── layout.tsx       # Root layout + metadata
│   └── page.tsx         # Main page component
├── next.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

## Notes

- Food/dish images are placeholder gradients — replace `dish.bg` in `DISHES` array and `FOOD_COL1/2` in `page.tsx` with real image URLs once available
- Figma asset URLs expire after 7 days — host images on your own CDN or in `/public` folder before production
