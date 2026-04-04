import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Linkedin, Download, Camera, Code2, Smartphone } from 'lucide-react'
import { siteConfig, stats } from '@/lib/data'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy-700 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines" />
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-accent-400/5 blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] rounded-full bg-blue-800/10 blur-[100px]" />
      </div>
      <div className="absolute left-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-400/20 to-transparent" />
      <div className="absolute right-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: copy */}
          <div>
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

            <p className="text-navy-200 text-lg leading-relaxed max-w-lg mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {siteConfig.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/works" className="btn-primary">
                View My Work <ArrowRight size={15} />
              </Link>
              <a href="#contact" className="btn-outline">Get in Touch</a>
              <a href="/cv.pdf" className="btn-ghost">
                <Download size={14} /> Resume
              </a>
            </div>

            <div className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <span className="text-xs text-navy-200 uppercase tracking-widest">Follow</span>
              <div className="w-8 h-px bg-white/15" />
              <div className="flex gap-3">
                <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="text-navy-200 hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={17} />
                </a>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="text-navy-200 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: photo + stats */}
          <div className="relative hidden lg:flex flex-col items-center gap-8">

            {/* Photo card */}
            <div className="relative">
              {/* Glow ring behind photo */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-400/40 via-transparent to-accent-400/10 blur-sm" />

              {/* Photo */}
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-white/12 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src="/sachitha.jpg"
                  alt="Sachitha Athukorala"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="288px"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-4 -left-6 bg-navy-800/95 border border-gold-500/30 rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2">
                  <Camera size={13} className="text-gold-500" />
                  <span className="text-xs font-medium text-white">Photographer</span>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-4 -right-6 bg-navy-800/95 border border-green-500/30 rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-white">Available</span>
                </div>
              </div>
            </div>

            {/* Stats below photo */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy-800/60 border border-white/8 rounded-xl p-3 text-center backdrop-blur-sm hover:border-accent-400/30 transition-all duration-300"
                >
                  <p className="font-serif text-xl text-white">{stat.value}</p>
                  <p className="text-[10px] text-navy-200 leading-snug mt-0.5">{stat.label}</p>
                </div>
              ))}
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