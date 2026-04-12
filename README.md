# 🌊 DevStream

> A modern blog aggregator fetching articles live from [Dev.to](https://dev.to/gouranga-das-khulna) — built by **Gouranga Das Samrat**.
> Live at: https://blog.gouranga.eu.org

![DevStream preview](https://i.postimg.cc/65ZPXrgb/Screenshot-2026-04-12-at-11-00-11-Dev-Stream-Gouranga-s-Dev-Blog.png)

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-a2d2ff?style=flat-square)

---

## ✨ Features

- **Live Dev.to API** — Fetches all articles dynamically, no database needed
- **Multi-tag filtering** — Combine tags for smarter filtering
- **Sort options** — Latest, Oldest, Most Popular, Most Reactions
- **Real-time search** — Debounced search across titles, descriptions & tags
- **Pagination** — Configurable per-page (6 / 9 / 12 / 18)
- **Blog Preview Modal** — Read full articles inline with rendered Markdown
- **Open on Dev.to** — Direct link to original article on every card
- **Dark / Light / System theme** — Persisted across sessions
- **JetBrains Mono** — Used throughout the UI
- **Skeleton loading** — Smooth shimmer placeholders while fetching
- **Responsive** — Works on all screen sizes

---

## 🚀 Getting Started

### Clone & Install

```bash
git clone https://github.com/GourangaDasSamrat/devstream.git
```

```bash
cd devstream
```

```bash
pnpm install
```

### Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Edit `.env` and configure:

| Variable                 | Required | Description                                                                            |
| ------------------------ | -------- | -------------------------------------------------------------------------------------- |
| `VITE_DEVTO_USERNAME`    | ✅       | Your Dev.to username (e.g., `gouranga-das-khulna`)                                     |
| `VITE_DEVTO_API_KEY`     | ❌       | API key for private/draft articles ([get it here](https://dev.to/settings/extensions)) |
| `VITE_SITE_NAME`         | ❌       | Your site name (default: `DevStream`)                                                  |
| `VITE_SITE_URL`          | ❌       | Your deployed URL (default: `https://your-deployed-url.com`)                           |
| `VITE_SITE_DESCRIPTION`  | ❌       | SEO description                                                                        |
| `VITE_GITHUB_URL`        | ❌       | Your GitHub profile                                                                    |
| `VITE_LINKEDIN_URL`      | ❌       | Your LinkedIn profile                                                                  |
| `VITE_DEVTO_PROFILE_URL` | ❌       | Your Dev.to profile link                                                               |
| `VITE_ALGOLIA_APP_ID`    | ❌       | Algolia search (optional, leave blank for built-in search)                             |
| `VITE_DEFAULT_PER_PAGE`  | ❌       | Articles per page (default: `9`)                                                       |

### Development

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
pnpm run build
```

---

## 🛠️ Tech Stack

| Technology                  | Purpose                              |
| --------------------------- | ------------------------------------ |
| React 19                    | UI framework                         |
| TypeScript                  | Type safety                          |
| Tailwind CSS v4             | Utility-first styling                |
| Zustand                     | Global state (theme, filters, modal) |
| react-markdown + remark-gfm | Markdown rendering                   |
| Lucide React                | Icons                                |
| Vite                        | Build tool                           |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BlogCard.tsx
│   ├── BlogModal.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── Filters.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Pagination.tsx
│   ├── SearchBar.tsx
│   └── SkeletonCard.tsx
├── hooks/
│   ├── useArticles.ts
│   ├── useDebounce.ts
│   └── useTheme.ts
├── services/
│   └── devto.ts
├── store/
│   └── useAppStore.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 📄 License

MIT © [Gouranga Das Samrat](https://github.com/GourangaDasSamrat)

---

## 👤 Author

- **Gouranga Das Samrat**
- Website: https://blog.gouranga.eu.org
- Dev.to: https://dev.to/gouranga-das-khulna
- GitHub: https://github.com/GourangaDasSamrat

---

<p align="center">Made with ♥ · Powered by Dev.to API</p>
