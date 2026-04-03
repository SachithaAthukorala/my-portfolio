import { Shield, Zap, Monitor, Clock } from 'lucide-react'

const highlights = [
  { icon: Shield, title: 'Security-First', desc: 'OWASP best practices, HTTPS, audited dependencies on every project.' },
  { icon: Zap, title: 'Performance Obsessed', desc: 'Lighthouse 90+ scores and sub-2s load times are non-negotiable targets.' },
  { icon: Monitor, title: 'Multi-Platform', desc: 'Web, iOS, Android, Windows, macOS — one developer, all surfaces.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'Agile workflows and honest scoping keep projects on schedule.' },
]

const services = [
  { name: 'Web Applications', tags: 'React · Next.js · Vue' },
  { name: 'Mobile Development', tags: 'Flutter · React Native' },
  { name: 'Desktop Software', tags: 'Electron · Tauri · .NET' },
  { name: 'Backend & APIs', tags: 'Node.js · Python · Go' },
  { name: 'Cloud & DevOps', tags: 'AWS · Docker · CI/CD' },
  { name: 'Photography', tags: 'Landscape · Portrait · Events' },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-navy-800/40 py-28 relative">
      <div className="glow-line" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <p className="section-label">About Me</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              Developer by craft,<br />
              <span className="text-gradient-accent">creator by passion.</span>
            </h2>
            <div className="space-y-4 text-navy-200 mb-8 leading-relaxed">
              <p>
                I'm <strong className="text-white font-semibold">Sachitha Athukorala</strong>, a
                full-stack developer based in Anuradhapura, Sri Lanka, with 5+ years building
                high-performance software across web, mobile, and desktop platforms.
              </p>
              <p>
                I've delivered production systems for clients in healthcare, fintech, e-commerce,
                and manufacturing — always with a focus on clean architecture, measurable outcomes,
                and long-term maintainability.
              </p>
              <p>
                Beyond code, I bring a photographer's eye to design: a trained sensitivity to
                composition, light, and detail that makes every interface visually considered.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-4 rounded-lg bg-navy-700/50 border border-white/6 hover:border-accent-400/30 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-md bg-accent-400/12 flex items-center justify-center mb-3">
                    <Icon size={15} className="text-accent-400" />
                  </div>
                  <h4 className="text-white text-sm font-semibold mb-1">{title}</h4>
                  <p className="text-navy-200 text-xs leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — services */}
          <div>
            <p className="section-label">What I Do</p>
            <ul className="divide-y divide-white/5">
              {services.map((svc) => (
                <li key={svc.name} className="flex items-center justify-between py-4 group">
                  <span className="text-white font-medium text-sm group-hover:text-accent-300 transition-colors">
                    {svc.name}
                  </span>
                  <span className="text-xs text-navy-200 bg-white/5 px-2.5 py-1 rounded-full border border-white/8">
                    {svc.tags}
                  </span>
                </li>
              ))}
            </ul>

            {/* Education card */}
            <div className="mt-8 p-6 rounded-xl bg-navy-700/60 border border-white/8">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-200 mb-3">Education</p>
              <p className="text-white font-semibold">B.Sc. Computer Science</p>
              <p className="text-accent-300 text-sm mb-1">University of Sri Lanka</p>
              <p className="text-navy-200 text-sm">2015 — 2019 · First Class Honours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
