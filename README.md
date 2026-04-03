# Sachitha Athukorala — Portfolio

A modern, production-grade personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, About, Skills, Featured Projects, Photography, Resume, Contact |
| `/works` | All projects with platform filter (Web / Mobile / Desktop / Full-Stack) |
| `/works/[slug]` | Individual project case study with metrics, approach, gallery |
| `/blog` | Blog index with featured post + grid |
| `/blog/[slug]` | Individual blog post with sidebar, related posts, prev/next navigation |

## Tech Stack

- **Framework** — Next.js 14 (App Router, SSG)
- **Styling** — Tailwind CSS with custom design tokens
- **Fonts** — DM Serif Display + DM Sans + JetBrains Mono (via `next/font`)
- **Images** — `next/image` with Unsplash remote patterns
- **Icons** — Lucide React
- **TypeScript** — strict mode

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Customisation

All content lives in **`lib/data.ts`** — edit it to replace:
- Personal info, socials, email (`siteConfig`)
- Skills (`skills`)
- Work experience & certifications (`experiences`, `certifications`)
- Projects (`projects`)
- Blog posts (`blogPosts`)
- Photography categories (`photoCategories`)

## Deployment

### Vercel (recommended)
```bash
npx vercel --prod
```

### Netlify
```bash
npx netlify deploy --prod --dir=.next
```

### Static export
```bash
# In next.config.js add: output: 'export'
npm run build
# Deploy the `out/` directory to any static host
```

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 100ms |

## Project Structure

```
sachitha-portfolio/
├── app/
│   ├── layout.tsx          # Root layout (fonts, Navbar, Footer)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind + custom utilities
│   ├── not-found.tsx       # 404 page
│   ├── blog/
│   │   ├── page.tsx        # Blog index
│   │   └── [slug]/page.tsx # Blog post
│   └── works/
│       ├── page.tsx        # Works showcase
│       └── [slug]/page.tsx # Case study
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── SkillsSection.tsx
│       ├── FeaturedProjects.tsx
│       ├── PhotoSection.tsx
│       ├── ResumeSection.tsx
│       └── ContactSection.tsx
├── lib/
│   ├── data.ts             # ← All your content lives here
│   └── utils.ts
├── public/
│   └── cv.pdf              # ← Add your actual CV here
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## License

MIT
