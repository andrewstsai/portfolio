# andrewstsai.com

Personal portfolio. Next.js 15 (App Router) · TypeScript · Tailwind v4.

## Dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home — bento grid with hero, experience timeline, projects slideshow, random photo |
| `/projects` | Project card index |
| `/projects/[slug]` | Project detail |
| `/pictures` | Photo album index (4 albums) |
| `/pictures/[slug]` | Album gallery — masonry layout |

## Content files

Everything personal lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, tagline, location, shell prompt, CV link |
| `src/data/experience.ts` | Experience timeline on the home page |
| `src/data/projects.ts` | Projects slideshow + listing + detail pages |
| `src/data/albums.ts` | Album metadata (slug, title, cover image) |
| `src/data/pictures.ts` | All photos with album assignments |
| `src/data/contact.ts` | Email / GitHub / LinkedIn links |

## Structure

```
src/
├── app/
│   ├── layout.tsx              ← <html>, fonts, metadata, Nav
│   ├── page.tsx                ← Home (bento grid)
│   ├── globals.css             ← Tailwind v4 + custom utilities
│   ├── icon.tsx                ← Favicon (Edge, 32×32 PNG)
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── pictures/
│       ├── page.tsx            ← Album index (cover grid)
│       └── [slug]/page.tsx     ← Album detail (masonry gallery)
├── components/
│   ├── Nav.tsx
│   ├── MobileMenu.tsx
│   ├── ThemeToggle.tsx
│   ├── Reveal.tsx              ← IntersectionObserver fade-up
│   ├── Slideshow.tsx           ← Auto-rotating project cards
│   ├── BrowserMock.tsx         ← Faux browser window
│   ├── PicturePreloader.tsx    ← Scroll-ahead image cache warmer
│   ├── ExperienceList.tsx
│   ├── ContactList.tsx
│   └── RandomPicture.tsx       ← Random rotating photo on home
└── data/
    ├── site.ts
    ├── experience.ts
    ├── projects.ts
    ├── albums.ts
    ├── pictures.ts
    └── contact.ts
```
