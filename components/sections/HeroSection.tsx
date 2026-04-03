import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Download, Camera, Code2, Smartphone } from 'lucide-react'
import { siteConfig, stats } from '@/lib/data'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy-700 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-lines" />
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-accent-400/5 blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] rounded-full bg-blue-800/10 blur-[100px]" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-400/20 to-transparent" />
      <div className="absolute right-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-400/25 bg-accent-400/8 mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-accent-300 tracking-wide">
                Open to new opportunities
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-6 animate-fade-up">
              <span className="text-white">Sachitha</span>
              <br />
              <span className="text-gradient-accent">Athukorala</span>
            </h1>

            {/* Role pills */}
            <div className="flex flex-wrap gap-2.5 mb-7 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-navy-200 font-medium">
                <Code2 size={11} className="text-accent-400" /> Web
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-navy-200 font-medium">
                <Smartphone size={11} className="text-accent-400" /> Mobile
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-navy-200 font-medium">
                <Code2 size={11} className="text-accent-400" /> Desktop
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-navy-200 font-medium">
                <Camera size={11} className="text-gold-500" /> Photographer
              </span>
            </div>

            <p
              className="text-navy-200 text-lg leading-relaxed max-w-lg mb-10 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              {siteConfig.tagline}
            </p>

            <div
              className="flex flex-wrap gap-3 mb-12 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="/works" className="btn-primary">
                View My Work <ArrowRight size={15} />
              </Link>
              <a href="#contact" className="btn-outline">
                Get in Touch
              </a>
              <a href="/cv.pdf" className="btn-ghost">
                <Download size={14} /> Resume
              </a>
            </div>

            {/* Socials */}
            <div
              className="flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="text-xs text-navy-200 uppercase tracking-widest">Follow</span>
              <div className="w-8 h-px bg-white/15" />
              <div className="flex gap-3">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-navy-200 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={17} />
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-navy-200 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — stats card + floating elements */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Floating code snippet */}
            <div className="absolute -top-8 -left-4 bg-navy-800/90 border border-white/8 rounded-lg p-4 backdrop-blur-sm animate-float">
              <p className="font-mono text-xs text-navy-200 leading-relaxed">
                <span className="text-accent-300">const</span>{' '}
                <span className="text-white">developer</span>{' '}
                <span className="text-navy-200">=</span>{' '}
                <span className="text-gold-500">{'{'}</span>
                <br />
                {'  '}
                <span className="text-accent-300 ml-3">name</span>
                <span className="text-navy-200">: </span>
                <span className="text-green-400">"Sachitha"</span>
                <span className="text-navy-200">,</span>
                <br />
                {'  '}
                <span className="text-accent-300 ml-3">platforms</span>
                <span className="text-navy-200">: </span>
                <span className="text-gold-500">3</span>
                <br />
                <span className="text-gold-500">{'}'}</span>
              </p>
            </div>

            {/* Main stats grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-navy-800/60 border border-white/8 rounded-xl p-6 backdrop-blur-sm hover:border-accent-400/30 transition-all duration-300"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="font-serif text-4xl text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-navy-200 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Floating camera badge */}
            <div className="absolute -bottom-6 -right-4 bg-navy-800/90 border border-gold-500/25 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Camera size={15} className="text-gold-500" />
                <span className="text-xs font-medium text-white">
                  200+ Photos Published
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-200 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-accent-400/40 to-transparent" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}
