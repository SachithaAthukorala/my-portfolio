// Client-side store using localStorage so edits persist without a database.
// In production you'd replace this with API calls to a real DB.

import { siteConfig, skills, projects, blogPosts, photoCategories, stats, experiences, certifications } from './data'

export type SiteData = {
  siteConfig: typeof siteConfig
  stats: typeof stats
  skills: typeof skills
  projects: typeof projects
  blogPosts: typeof blogPosts
  photoCategories: typeof photoCategories
  experiences: typeof experiences
  certifications: typeof certifications
}

const KEY = 'portfolio_data'

export function loadData(): SiteData {
  if (typeof window === 'undefined') return getDefaults()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return getDefaults()
    return { ...getDefaults(), ...JSON.parse(raw) }
  } catch {
    return getDefaults()
  }
}

export function saveData(data: Partial<SiteData>) {
  if (typeof window === 'undefined') return
  const current = loadData()
  const next = { ...current, ...data }
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function resetData() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}

function getDefaults(): SiteData {
  return { siteConfig, stats, skills, projects, blogPosts, photoCategories, experiences, certifications }
}
