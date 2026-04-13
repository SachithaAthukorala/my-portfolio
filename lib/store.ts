// Store that syncs with /api/data/load and /api/data/save endpoints.
// Data is persisted in /public/data.json on the server.

import { siteConfig, heroRoles, skills, projects, blogPosts, photoCategories, stats, experiences, certifications } from './data'

export type SiteData = {
  siteConfig: typeof siteConfig
  heroRoles: typeof heroRoles
  stats: typeof stats
  skills: typeof skills
  projects: typeof projects
  blogPosts: typeof blogPosts
  photoCategories: typeof photoCategories
  experiences: typeof experiences
  certifications: typeof certifications
}

export function getDefaults(): SiteData {
  return { siteConfig, heroRoles, stats, skills, projects, blogPosts, photoCategories, experiences, certifications }
}

// Singleton cache: all components on the same page share one fetch promise.
// Cleared whenever saveData() is called so edits are reflected immediately.
let _cache: Promise<SiteData> | null = null

export async function loadData(): Promise<SiteData> {
  if (typeof window === 'undefined') {
    // Server-side: always return defaults (real fetch happens via server components)
    return getDefaults()
  }

  if (!_cache) {
    _cache = fetch('/api/data/load', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        if (!res.ok) {
          console.warn('Failed to load data from API, using defaults')
          return getDefaults()
        }
        const json = await res.json()
        return (json.data as SiteData) || getDefaults()
      })
      .catch((error) => {
        console.warn('Error loading data:', error)
        return getDefaults()
      })
  }

  return _cache
}

export function clearDataCache() {
  _cache = null
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

    // Invalidate cache so next load reflects the saved changes
    clearDataCache()
  } catch (error) {
    console.error('Error saving data:', error)
    throw error
  }
}

export async function resetData() {
  try {
    await saveData(getDefaults())
  } catch (error) {
    console.error('Error resetting data:', error)
    throw error
  }
}
