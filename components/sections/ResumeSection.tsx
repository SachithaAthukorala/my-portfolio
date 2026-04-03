import { Download } from 'lucide-react'
import { experiences, certifications } from '@/lib/data'

export function ResumeSection() {
  return (
    <section id="resume" className="py-28 bg-navy-800/40 relative">
      <div className="glow-line" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Experience</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1]">
              Resume
            </h2>
          </div>
          <a href="/cv.pdf" className="btn-primary flex-shrink-0">
            <Download size={15} /> Download CV
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Experience timeline */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-300 mb-8 border-b border-white/8 pb-4">
              Work Experience
            </p>
            <div className="space-y-0">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-7 pb-10 last:pb-0">
                  {/* line */}
                  {i < experiences.length - 1 && (
                    <div className="absolute left-[8px] top-5 bottom-0 w-px bg-gradient-to-b from-accent-400/40 to-transparent" />
                  )}
                  {/* dot */}
                  <div className="absolute left-0 top-[5px] w-4 h-4 rounded-full border-2 border-accent-400 bg-navy-700" />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <h4 className="text-white font-semibold text-base">{exp.role}</h4>
                      <p className="text-accent-300 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-navy-200 bg-white/5 border border-white/8 rounded-full px-3 py-1 flex-shrink-0 h-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-navy-200 text-sm leading-relaxed mb-3">{exp.description}</p>
                  <ul className="space-y-1">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-navy-200">
                        <span className="text-accent-400 mt-0.5 flex-shrink-0">▸</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-300 mb-8 border-b border-white/8 pb-4">
              Certifications
            </p>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-4 rounded-lg bg-navy-700/50 border border-white/6 hover:border-accent-400/25 transition-all duration-200"
                >
                  <p className="text-white text-sm font-semibold leading-snug">{cert.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-navy-200 text-xs">{cert.issuer}</p>
                    <span className="text-xs text-accent-300">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-300 mt-10 mb-6 border-b border-white/8 pb-4">
              Education
            </p>
            <div className="p-4 rounded-lg bg-navy-700/50 border border-white/6">
              <p className="text-white font-semibold text-sm">B.Sc. Computer Science</p>
              <p className="text-accent-300 text-xs mt-1">University of Sri Lanka</p>
              <p className="text-navy-200 text-xs mt-0.5">2015 — 2019</p>
              <div className="mt-3 pt-3 border-t border-white/6">
                <span className="text-xs text-green-400 font-medium">First Class Honours · GPA 3.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
