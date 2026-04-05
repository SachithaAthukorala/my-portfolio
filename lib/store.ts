// Store that syncs with /api/data/load and /api/data/save endpoints.
// Data is persisted in /public/data.json on the server.

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

export async function loadData(): Promise<SiteData> {
  try {
    const res = await fetch('/api/data/load', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      console.warn('Failed to load data from API, using defaults')
      return getDefaults()
    }

    const json = await res.json()
    return json.data || getDefaults()
  } catch (error) {
    console.warn('Error loading data:', error)
    return getDefaults()
  }
}

export async function saveData(data: Partial<SiteData>): Promise<void> {
  try {
    const res = await fetch('/api/data/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error(`Save failed with status ${res.status}`)
    }
  } catch (error) {
    console.error('Error saving data:', error)
    throw error
  }
}

export async function resetData() {
  // Reset to defaults by saving the default data
  try {
    await saveData(getDefaults())
  } catch (error) {
    console.error('Error resetting data:', error)
    throw error
  }
}

function getDefaults(): SiteData {
  return { siteConfig, stats, skills, projects, blogPosts, photoCategories, experiences, certifications }
}
