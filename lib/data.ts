export const siteConfig = {
  name: 'Sachitha Athukorala',
  role: 'Full-Stack Developer & Photographer',
  tagline: 'I craft high-performance applications across web, mobile & desktop — with a creative eye behind the lens.',
  email: 'sachitha@example.com',
  location: 'Anuradhapura, Sri Lanka',
  available: true,
  socials: {
    github: 'https://github.com/SachithaAthukorala',
    linkedin: 'https://linkedin.com/in/sachitha-athukorala',
    twitter: 'https://twitter.com/SachiAthukorala',
    instagram: 'https://instagram.com/sachitha_athukorala',
  },
}

export const skills = [
  {
    category: 'Frontend / Web',
    color: 'accent',
    items: ['React', 'Next.js', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GraphQL', 'Vite'],
  },
  {
    category: 'Mobile',
    color: 'teal',
    items: ['Flutter', 'Dart', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Expo', 'Firebase'],
  },
  {
    category: 'Desktop',
    color: 'gold',
    items: ['Electron', 'Tauri', 'C# / .NET', 'WPF', 'Qt', 'Rust'],
  },
  {
    category: 'Backend & APIs',
    color: 'purple',
    items: ['Node.js', 'Python', 'Express', 'FastAPI', 'NestJS', 'REST', 'WebSocket', 'gRPC'],
  },
  {
    category: 'Databases',
    color: 'green',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma', 'Supabase'],
  },
  {
    category: 'Cloud & DevOps',
    color: 'orange',
    items: ['AWS', 'Docker', 'GitHub Actions', 'Vercel', 'Nginx', 'Linux', 'Terraform'],
  },
]

export const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '40+', label: 'Projects Shipped' },
  { value: '3', label: 'Platforms Mastered' },
  { value: '15+', label: 'Happy Clients' },
]

export const experiences = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Freelance / Contract',
    period: '2022 — Present',
    description: 'Building bespoke web, mobile, and desktop applications for international clients across healthcare, fintech, and e-commerce. Led end-to-end delivery of 15+ projects.',
    achievements: ['Delivered telemedicine platform serving 1,000+ consultations/quarter', 'Reduced client app load time by 75% via SSG + CDN optimization', 'Built cross-platform IoT dashboard used in 3 manufacturing plants'],
  },
  {
    role: 'Software Engineer',
    company: 'Techvault — Colombo',
    period: '2020 — 2022',
    description: 'Core engineer on a B2B SaaS platform. Led frontend migration from jQuery to React and introduced TypeScript across the codebase.',
    achievements: ['Grew platform from 500 to 5,000+ active users', 'Improved API response times by 60% through Redis caching', 'Mentored 2 junior developers'],
  },
  {
    role: 'Junior Web Developer',
    company: 'PixelForge Agency',
    period: '2019 — 2020',
    description: 'Built client websites and e-commerce stores. Gained foundation in responsive design, SEO best practices, and agile workflows.',
    achievements: ['Delivered 12 client projects on schedule', 'Introduced automated testing, reducing QA time by 30%'],
  },
]

export const certifications = [
  { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: '2023' },
  { name: 'Google Professional Cloud Developer', issuer: 'Google Cloud', year: '2022' },
  { name: 'Flutter Developer Certificate', issuer: 'Google', year: '2021' },
  { name: 'Adobe Lightroom Professional', issuer: 'Adobe', year: '2020' },
]

export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  industry: string
  industryColor: string
  thumbnail: string
  images: string[]
  stack: string[]
  platform: 'web' | 'mobile' | 'desktop' | 'fullstack'
  featured: boolean
  metrics: { value: string; label: string }[]
  problem: string
  approach: string
  results: string
  liveUrl?: string
  githubUrl?: string
  year: number
}

export const projects: Project[] = [
  {
    slug: 'telemedicine-portal',
    title: 'MediConnect — Telemedicine Portal',
    summary: 'HIPAA-compliant virtual consultation platform connecting doctors and patients in real time.',
    description: 'A full-featured telemedicine portal with video consultations, secure health records, appointment scheduling, and prescription management — built under strict HIPAA compliance.',
    industry: 'Healthcare',
    industryColor: '#0ea5e9',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&q=80',
    ],
    stack: ['Next.js', 'Node.js', 'WebRTC', 'AWS', 'MongoDB', 'Tailwind CSS', 'Socket.io'],
    platform: 'web',
    featured: true,
    metrics: [
      { value: '1,200+', label: 'Consultations/Quarter' },
      { value: '4.8/5', label: 'User Rating' },
      { value: '−40%', label: 'Patient Wait Time' },
      { value: '3 months', label: 'Time to Launch' },
    ],
    problem: 'Local clinics needed a HIPAA-compliant way to offer remote consultations during and after the pandemic, without purchasing expensive off-the-shelf software with features they didn\'t need.',
    approach: 'Built a bespoke Next.js frontend with server-side rendering for fast load times. Implemented peer-to-peer video via WebRTC with a TURN server fallback for poor network conditions. Designed an intuitive scheduling flow and integrated AWS S3 for encrypted document storage.',
    results: 'Launched in 3 months. Handles 1,200+ consultations per quarter. Patient satisfaction at 4.8/5. Wait times dropped 40%. Clinic expanded from 2 to 8 virtual practitioners within 6 months of launch.',
    liveUrl: '#',
    githubUrl: '#',
    year: 2024,
  },
  {
    slug: 'fintrack-mobile',
    title: 'FinTrack — Personal Finance App',
    summary: 'Cross-platform mobile budgeting app with bank sync, intelligent categorization, and spend insights.',
    description: 'A Flutter-based mobile application for personal finance management. Features real-time bank synchronization via the Plaid API, AI-powered spending categorization, and beautiful data visualizations.',
    industry: 'FinTech',
    industryColor: '#10b981',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
    ],
    stack: ['Flutter', 'Dart', 'Node.js', 'PostgreSQL', 'Plaid API', 'Docker', 'Redis'],
    platform: 'mobile',
    featured: true,
    metrics: [
      { value: '10K+', label: 'Downloads' },
      { value: '+50%', label: 'Avg. Session Time' },
      { value: '−15%', label: 'User Expenses' },
      { value: '4.6★', label: 'App Store Rating' },
    ],
    problem: 'Young professionals wanted a cleaner, more insightful alternative to spreadsheets for tracking spending — one that synced automatically and gave actionable advice, not just raw numbers.',
    approach: 'Chose Flutter for a single codebase targeting iOS and Android. Integrated Plaid for secure bank linking. Built a custom ML model (Python/FastAPI) to categorize transactions. Used fl_chart for beautiful native visualisations.',
    results: '10K+ downloads within 4 months. Average session time up 50% after UX refinements. Users report saving 15% more on average (user survey, n=320). Featured in a Sri Lankan tech publication.',
    liveUrl: '#',
    githubUrl: '#',
    year: 2023,
  },
  {
    slug: 'learnflow-lms',
    title: 'LearnFlow — Learning Management System',
    summary: 'Web LMS for interactive courses, live classes, quizzes, and automated student progress tracking.',
    description: 'A full-featured LMS with support for live and recorded video courses, interactive quizzes, progress tracking, Stripe-powered payments, and automated certificate generation.',
    industry: 'EdTech',
    industryColor: '#f59e0b',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    ],
    stack: ['Next.js', 'GraphQL', 'MongoDB Atlas', 'Stripe', 'AWS S3', 'SendGrid', 'Vercel'],
    platform: 'web',
    featured: true,
    metrics: [
      { value: '2,500', label: 'Students Enrolled' },
      { value: '+20%', label: 'Completion Rate vs. Industry' },
      { value: '5', label: 'Courses Launched' },
      { value: '$120K', label: 'Revenue in Year 1' },
    ],
    problem: 'An education startup wanted a custom platform to offer live and recorded classes with quizzes and payments — without the high licensing fees and feature bloat of Teachable or Thinkific.',
    approach: 'Built with Next.js App Router for SSG course pages and dynamic dashboard. GraphQL with DataLoader for efficient nested queries. Stripe for subscription and one-time purchases. PDF certificate generation with Puppeteer on AWS Lambda.',
    results: '2,500 students enrolled across 5 courses in year one. Completion rate 20% above industry average. $120K revenue. Client expanded to 12 courses in year two based on platform success.',
    liveUrl: '#',
    githubUrl: '#',
    year: 2023,
  },
  {
    slug: 'shopzap-ecommerce',
    title: 'ShopZap — E-Commerce Storefront',
    summary: 'Blazing-fast headless storefront for a fashion retailer — rebuilt from scratch with a 75% performance improvement.',
    description: 'Complete rebuild of a clothing retailer\'s storefront using a headless Shopify + Gatsby architecture. Redesigned UX dramatically reduced bounce rates and cart abandonment.',
    industry: 'E-Commerce',
    industryColor: '#ec4899',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80',
    ],
    stack: ['Gatsby', 'React', 'GraphQL', 'Shopify Storefront API', 'Stripe', 'Cloudinary', 'Netlify'],
    platform: 'web',
    featured: false,
    metrics: [
      { value: '8s→1.8s', label: 'Page Load Time' },
      { value: '+30%', label: 'Conversion Rate' },
      { value: '+20%', label: 'Revenue (6 months)' },
      { value: '2×', label: 'Mobile Purchases' },
    ],
    problem: 'The retailer\'s existing WooCommerce site loaded in 8+ seconds on mobile, had a confusing 4-step checkout, and scored 28/100 on Lighthouse. High bounce rate was costing significant revenue.',
    approach: 'Migrated to headless Shopify for the backend. Built a Gatsby frontend with SSG for all product/collection pages. Redesigned checkout as a single-page flow. Implemented Cloudinary for automatic image optimization and responsive delivery.',
    results: 'Load time from 8s to 1.8s on mobile. Lighthouse score 94. Conversion rate +30%. Revenue grew 20% in the 6 months post-launch. Mobile purchases doubled as a share of total sales.',
    liveUrl: '#',
    year: 2023,
  },
  {
    slug: 'auxbot-ai-support',
    title: 'AuxBot — AI Customer Support',
    summary: 'GPT-4-powered support chatbot handling 70% of queries automatically with seamless human handoff.',
    description: 'An AI chatbot integrated into web and mobile surfaces, using GPT-4 for natural language understanding, custom prompt engineering for brand voice, and a Node.js backend for chat history and human escalation.',
    industry: 'AI / SaaS',
    industryColor: '#8b5cf6',
    thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    ],
    stack: ['React Native', 'GPT-4 API', 'Node.js', 'Firebase', 'MongoDB', 'WebSocket', 'Azure'],
    platform: 'fullstack',
    featured: false,
    metrics: [
      { value: '70%', label: 'Queries Auto-Resolved' },
      { value: '1hr→1min', label: 'Response Time' },
      { value: '24/7', label: 'Coverage' },
      { value: '−60%', label: 'Support Costs' },
    ],
    problem: 'A SaaS company\'s support team was overwhelmed with repetitive FAQs. Average response time was over 1 hour. They needed intelligent triage without losing the human touch for complex issues.',
    approach: 'Built a custom RAG (retrieval-augmented generation) pipeline ingesting the company\'s knowledge base. Fine-tuned prompt engineering for brand voice. Built a real-time handoff system using WebSockets — bot → human agent — with full chat context preserved.',
    results: '70% of queries fully auto-resolved. Response time for bot-handled queries: under 60 seconds. Support team workload reduced by 60%, allowing them to focus on high-value issues. Bot CSAT: 4.3/5.',
    githubUrl: '#',
    year: 2024,
  },
  {
    slug: 'factorylens-iot',
    title: 'FactoryLens — IoT Dashboard',
    summary: 'Real-time Electron desktop dashboard for a smart factory — monitoring 200+ sensors with predictive alerts.',
    description: 'A cross-platform Electron desktop application providing plant managers with a real-time view of machine health, energy consumption, and production KPIs via MQTT-connected IoT sensors.',
    industry: 'Industrial IoT',
    industryColor: '#f97316',
    thumbnail: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&q=80',
    ],
    stack: ['Electron', 'React', 'Next.js', 'Python', 'Flask', 'MQTT', 'PostgreSQL', 'Chart.js', 'Docker'],
    platform: 'desktop',
    featured: false,
    metrics: [
      { value: '−25%', label: 'Unscheduled Downtime' },
      { value: '−10%', label: 'Energy Costs' },
      { value: '200+', label: 'Sensors Monitored' },
      { value: '3 plants', label: 'Deployed Across' },
    ],
    problem: 'Plant managers had no centralized visibility across 200+ IoT sensors. Maintenance was purely reactive. Downtime cost the company $15,000 per unscheduled incident.',
    approach: 'Python/Flask backend aggregated sensor data via MQTT broker. Electron desktop app (React frontend) displayed live charts with Chart.js. Built an anomaly detection model (scikit-learn) that triggered alerts 30 minutes before predicted failures.',
    results: 'Unscheduled downtime down 25%. Energy costs reduced 10% via demand-response optimization. Deployed across 3 manufacturing plants. ROI achieved within 4 months of deployment.',
    year: 2022,
  },
]

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
  featured: boolean
  coverImage: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-realtime-apps-nextjs-websockets',
    title: 'Building Real-Time Apps with Next.js 14 and WebSockets',
    excerpt: 'A deep dive into adding live collaboration features to a Next.js App Router project — from Socket.io setup to scaling with Redis pub/sub.',
    content: `
## The Problem with Polling

When I started the MediConnect telemedicine project, the first question was: how do we handle real-time appointment status updates without hammering the server with HTTP polling?

The answer, as it usually is, was WebSockets. But integrating them cleanly with Next.js App Router requires some nuance.

## Setting Up Socket.io with Next.js App Router

The App Router doesn't have a built-in WebSocket server, so we need to attach one to the underlying Node.js HTTP server. Here's the pattern I settled on:

\`\`\`typescript
// server.ts (custom Next.js server)
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer, {
    cors: { origin: process.env.NEXT_PUBLIC_URL }
  })

  io.on('connection', (socket) => {
    socket.on('join-room', (roomId: string) => {
      socket.join(roomId)
    })
    socket.on('appointment-update', (data) => {
      io.to(data.roomId).emit('status-changed', data)
    })
  })

  httpServer.listen(3000)
})
\`\`\`

## Scaling with Redis Pub/Sub

When you run multiple instances (which you will in production), each Socket.io instance only knows about its own connected clients. Enter Redis adapter:

\`\`\`typescript
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'

const pubClient = createClient({ url: process.env.REDIS_URL })
const subClient = pubClient.duplicate()

await Promise.all([pubClient.connect(), subClient.connect()])
io.adapter(createAdapter(pubClient, subClient))
\`\`\`

## Client-Side Hook

I wrapped all the Socket.io logic in a clean React hook:

\`\`\`typescript
export function useRealtimeAppointment(appointmentId: string) {
  const [status, setStatus] = useState<string>('pending')
  
  useEffect(() => {
    const socket = io()
    socket.emit('join-room', appointmentId)
    socket.on('status-changed', (data) => setStatus(data.status))
    return () => { socket.disconnect() }
  }, [appointmentId])

  return status
}
\`\`\`

## Lessons Learned

1. **Always handle reconnection** — use Socket.io's built-in reconnection with exponential backoff
2. **Authenticate at the socket level** — validate JWT in the \`connection\` event, not just HTTP middleware
3. **Emit sparingly** — batch updates and debounce rapid events (like typing indicators) to avoid flooding
4. **Test with Cypress** — real WebSocket testing in E2E is worth the setup time

The full source for this pattern is in my [GitHub repo](#).
    `,
    category: 'Backend',
    tags: ['Next.js', 'WebSockets', 'Socket.io', 'Redis', 'Real-Time'],
    publishedAt: '2024-03-12',
    readingTime: 8,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  },
  {
    slug: 'flutter-vs-react-native-2024',
    title: 'Flutter vs React Native in 2024: An Honest Comparison',
    excerpt: 'After shipping production apps in both frameworks, here\'s my unfiltered take on which to choose — and when to choose each.',
    content: `
## Why This Comparison Matters Now

I've shipped FinTrack in Flutter and AuxBot's mobile client in React Native. Both are in production. Both have real users. That gives me a perspective most "vs" articles don't have.

## Performance

Flutter wins, hands down. Its Skia (now Impeller) rendering engine bypasses native UI components entirely — which means consistent 60fps even on mid-range Android devices. React Native's new architecture (JSI + Fabric) has closed the gap significantly, but Flutter still leads for animation-heavy UIs.

On FinTrack, the spending graph animations are silky smooth on a $150 Android device. I couldn't say the same for the React Native prototype I built first.

## Developer Experience

React Native wins for web developers making the mobile transition. If your team knows React, they're 80% of the way there. Expo has also dramatically improved the DX — \`npx create-expo-app\` and you're running in 2 minutes.

Dart (Flutter's language) is excellent, but it's a learning curve. The upside: Dart's strong typing and null safety catch bugs at compile time that would bite you at runtime in JavaScript.

## Ecosystem & Libraries

**React Native:** Larger ecosystem. More packages. More Stack Overflow answers. Most third-party SDKs ship a React Native version first (or exclusively).

**Flutter:** Smaller but high-quality. pub.dev packages are typically well-maintained. The Flutter team's own packages (go_router, riverpod, etc.) are excellent. But you'll occasionally hit a native feature with no package — meaning platform channels and some Kotlin/Swift.

## My Rule of Thumb

| Scenario | My Pick |
|---|---|
| Team already knows React | React Native |
| Animation/graphics-heavy app | Flutter |
| Targeting low-end Android devices | Flutter |
| Tight deadline, web dev team | React Native (Expo) |
| Long-term maintainability | Flutter |
| Startup MVP | React Native |

## The Honest Answer

For my own projects, I default to Flutter now. The performance headroom and Dart's safety guarantees make production support much easier. But I understand why teams choose React Native — and with the New Architecture, it's genuinely competitive in 2024.

Pick based on your team's strengths, not internet benchmarks.
    `,
    category: 'Mobile',
    tags: ['Flutter', 'React Native', 'Mobile', 'Dart', 'Cross-Platform'],
    publishedAt: '2024-02-05',
    readingTime: 10,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    slug: 'photography-composition-for-developers',
    title: 'What Composition Rules Taught Me About UI Design',
    excerpt: 'Photography\'s rule of thirds, leading lines, and negative space are design principles that translate directly to building better interfaces.',
    content: `
## An Unexpected Crossover

When I picked up a camera seriously a few years ago, I didn't expect it to make me a better developer. But the visual language of photography — learned by shooting hundreds of frames and studying what worked — changed how I think about interface design.

## Rule of Thirds → Grid Systems

The rule of thirds divides your frame into a 3×3 grid. The strongest compositions place subjects at the intersections of those lines, not dead center. Sound familiar? It should — it's the same principle behind CSS grid systems and the 8-point spacing system.

When I design a landing page now, I mentally overlay a rule-of-thirds grid. The hero headline usually lands at the top-left intersection. The CTA at the bottom-right. It creates visual movement — the eye travels naturally from headline to supporting copy to action.

## Leading Lines → Visual Hierarchy

In landscape photography, leading lines (a road, a river, a fence) guide the viewer's eye to the subject. In UI, visual hierarchy does the same work: font size, weight, and spacing create a "path" through the content.

My test for any page I design: squint at it. Can you tell, without reading a word, where the eye should go first? Second? Third? If not, the hierarchy is broken.

## Negative Space → Breathing Room

Beginning photographers fill the frame. Experienced ones know that empty space is active — it gives the subject room to breathe and creates elegance. The same principle destroys cluttered UIs.

When I find myself cramming more content into a section, I ask: what would I remove if I had to? The answer is usually what should have been removed anyway.

## Shoot More. It'll Make You a Better Designer.

I'm not suggesting every developer needs to become a photographer. But the practice of composing thousands of shots — and immediately seeing the result — trains your eye faster than reading design theory.

Go take 100 photos of the same object. Edit them. Notice what makes some work and others fail. It'll change how you look at screens.
    `,
    category: 'Design',
    tags: ['Photography', 'UI Design', 'Composition', 'Creative Process'],
    publishedAt: '2024-01-18',
    readingTime: 6,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
  },
  {
    slug: 'electron-tauri-desktop-apps',
    title: 'Electron vs Tauri: Building the FactoryLens Dashboard',
    excerpt: 'Why I chose Electron over Tauri for an industrial IoT dashboard, and what I\'d do differently today.',
    content: `
## The Brief

Build a desktop app for plant managers — Windows primarily, with some macOS. Real-time charts from 200+ sensors. Runs on an intranet, no internet required. Must work offline.

## Why Desktop at All?

Fair question in 2024. The answer was twofold: the plant's network security policy blocked web apps on production floor terminals, and the client needed native OS notification integration for critical alerts (machine fault, temperature spike).

## Electron: The Conservative Choice

I went with Electron. Here's the honest reasoning: the team knew React, the timeline was tight, and Electron's maturity meant every problem I'd hit had a StackOverflow answer.

The bundle size (120MB) didn't matter — this isn't a consumer app. The memory footprint (~180MB idle) was fine on the industrial PCs (16GB RAM). Performance was acceptable because Chart.js handles the heavy lifting efficiently.

What I'd change: I embedded too much business logic in the renderer process. Everything that doesn't touch the UI should be in the main process or a Node.js worker. Lesson learned.

## Tauri: What I'd Choose Today

For FactoryLens v2 (in planning), I'm strongly considering Tauri. The reasons:

- **Bundle size:** 8MB vs 120MB — matters for USB deployment in air-gapped environments
- **Memory:** ~30MB idle vs 180MB — meaningful on older industrial hardware
- **Security:** Tauri's Rust backend has a much smaller attack surface than Node.js in Electron
- **Performance:** Rust for data processing (MQTT parsing, anomaly detection) would be significantly faster

The tradeoff is the Rust learning curve for the team and a smaller ecosystem. But Tauri's maturity in 2024 makes it a serious option that it wasn't in 2022.

## Quick Comparison

| Factor | Electron | Tauri |
|---|---|---|
| Bundle size | ~120MB | ~8MB |
| Memory (idle) | ~180MB | ~30MB |
| Backend language | Node.js | Rust |
| Ecosystem | Mature | Growing |
| Learning curve | Low (if you know Node) | Higher (Rust) |
| Security posture | Good | Excellent |

## The Verdict

Electron for speed-to-market and team familiarity. Tauri for performance-sensitive apps or when bundle size matters. Both are genuinely good choices in 2024 — the "Electron is bloated" criticism is valid but often overstated for non-consumer applications.
    `,
    category: 'Desktop',
    tags: ['Electron', 'Tauri', 'Desktop', 'Rust', 'IoT'],
    publishedAt: '2023-11-30',
    readingTime: 9,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
  {
    slug: 'lighthouse-100-score-nextjs',
    title: 'How I Hit Lighthouse 100 on a Next.js Site (And Kept It)',
    excerpt: 'The specific techniques that pushed every category to 100 — and the CI check that keeps it there.',
    content: `
## The Goal

A perfect Lighthouse score isn't a vanity metric — it's a forcing function for every web performance and accessibility best practice. Getting there, and keeping it, requires discipline.

Here's exactly what I did on the LearnFlow LMS marketing site.

## Performance: The Usual Suspects

**Images** are always the first culprit. Using \`next/image\` gets you 80% of the way there — automatic WebP/AVIF conversion, responsive \`srcset\`, lazy loading by default. The remaining 20% is:

- Set \`priority\` on the hero image (prevents LCP from being a lazy-loaded image)
- Specify explicit \`width\` and \`height\` to eliminate CLS
- Use \`sizes\` prop correctly: \`sizes="(max-width: 768px) 100vw, 50vw"\`

**Fonts** are the second culprit. Always use \`next/font\` — it downloads fonts at build time, serves them from your domain, and adds \`font-display: swap\` automatically:

\`\`\`typescript
import { DM_Sans, DM_Serif_Display } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap' })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'] })
\`\`\`

**JavaScript** — audit your bundle with \`@next/bundle-analyzer\`. I found a date library (moment.js, 72KB gzipped) I could replace with \`date-fns\` tree-shaking (2KB for the functions I used).

## Accessibility: The Checklist

- Every image: descriptive \`alt\` text (not "image" or the filename)
- Every form input: \`<label>\` with matching \`htmlFor\` / \`id\`
- Color contrast: 4.5:1 minimum for body text (I use the Accessible Colors tool)
- Heading order: one \`h1\`, then \`h2\`, \`h3\` — never skip levels
- Focus rings: \`outline-none\` without a replacement is an accessibility bug

## Keeping It at 100 with CI

This is the part most tutorials skip. A Lighthouse score without automated enforcement decays within weeks. My GitHub Actions workflow:

\`\`\`yaml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      https://staging.learnflow.dev/
      https://staging.learnflow.dev/courses
    budgetPath: ./budget.json
    uploadArtifacts: true
\`\`\`

The \`budget.json\` fails the build if any score drops below 95. It's caught regressions from third-party script additions, un-optimised images committed by mistake, and a mis-sized heading added during a quick fix.

Automate the checks. They're the only thing that keeps scores honest.
    `,
    category: 'Performance',
    tags: ['Next.js', 'Lighthouse', 'Performance', 'Accessibility', 'CI/CD'],
    publishedAt: '2023-10-14',
    readingTime: 7,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
  },
]

export const photoCategories = [
  {
    name: 'Landscape',
    count: 42,
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Mountains, coastlines, and the golden-hour light of Sri Lanka.',
  },
  {
    name: 'Portrait',
    count: 28,
    cover: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    description: 'Authentic portraits with natural light and environmental context.',
  },
  {
    name: 'Architecture',
    count: 35,
    cover: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80',
    description: 'Ancient temples, colonial buildings, and modern urban structures.',
  },
  {
    name: 'Street',
    count: 19,
    cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    description: 'Life in motion — markets, streets, and candid moments.',
  },
  {
    name: 'Nature',
    count: 54,
    cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    description: 'Wildlife, macro flora, and the biodiversity of the island.',
  },
  {
    name: 'Events',
    count: 23,
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    description: 'Weddings, conferences, and cultural celebrations.',
  },
]
