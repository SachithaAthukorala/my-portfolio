import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { PhotoSection } from '@/components/sections/PhotoSection'
import { ResumeSection } from '@/components/sections/ResumeSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <PhotoSection />
      <ResumeSection />
      <ContactSection />
    </>
  )
}
