'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, AddBtn } from '@/components/admin/AdminUI'

const ICON_OPTIONS = ['Code2', 'Smartphone', 'Monitor', 'Camera', 'Palette', 'Globe', 'Server', 'Cpu', 'Layers', 'Zap']
const COLOR_OPTIONS = ['accent', 'purple', 'teal', 'gold', 'pink', 'green', 'blue', 'orange']

const COLOR_PREVIEW: Record<string, string> = {
  accent: '#60a5fa', purple: '#c084fc', teal: '#2dd4bf',
  gold: '#facc15', pink: '#f472b6', green: '#4ade80',
  blue: '#38bdf8', orange: '#fb923c',
}

export default function AdminHeroPage() {
  const [d, setD]           = useState<any>(null)
  const [toast, setToast]   = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData().then(setD)
  }, [])

  function cfg(key: string, val: string) {
    setD((p: any) => ({ ...p, siteConfig: { ...p.siteConfig, [key]: val } }))
  }

  function addStat() {
    setD((p: any) => ({ ...p, stats: [...p.stats, { value: '', label: '' }] }))
  }

  function setStat(i: number, k: 'value' | 'label', v: string) {
    setD((p: any) => { const s = [...p.stats]; s[i] = { ...s[i], [k]: v }; return { ...p, stats: s } })
  }

  function removeStat(i: number) {
    setD((p: any) => ({ ...p, stats: p.stats.filter((_: any, j: number) => j !== i) }))
  }

  // Hero Roles
  function addRole() {
    setD((p: any) => ({ ...p, heroRoles: [...(p.heroRoles || []), { label: '', icon: 'Code2', color: 'accent' }] }))
  }

  function setRole(i: number, k: 'label' | 'icon' | 'color', v: string) {
    setD((p: any) => {
      const r = [...(p.heroRoles || [])]
      r[i] = { ...r[i], [k]: v }
      return { ...p, heroRoles: r }
    })
  }

  function removeRole(i: number) {
    setD((p: any) => ({ ...p, heroRoles: (p.heroRoles || []).filter((_: any, j: number) => j !== i) }))
  }

  async function save() {
    setSaving(true)
    try {
      await saveData({ siteConfig: d.siteConfig, stats: d.stats, heroRoles: d.heroRoles })
      setToast('Hero section saved!')
      setTimeout(() => setToast(''), 3000)
    } catch {
      setToast('Error saving hero section')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  const s = d?.siteConfig || {}
  const roles = d?.heroRoles || []

  if (!d) {
    return <div style={{ padding: '20px', color: '#9aabc5' }}>Loading...</div>
  }

  const selectStyle = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)', background: '#0f1724',
    color: '#e2e8f0', fontSize: 13, cursor: 'pointer', outline: 'none',
    marginBottom: 16,
  }

  return (
    <div>
      <PageHeader title="Hero Section" desc="Edit the main landing section of your portfolio." action={<SaveBtn onClick={save} saving={saving} />} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Identity */}
        <Card>
          <CardTitle>Identity</CardTitle>
          <Field label="Full Name"    value={s.name}     onChange={v => cfg('name', v)}     placeholder="Sachitha Athukorala" />
          <Field label="Role / Title" value={s.role}     onChange={v => cfg('role', v)}     placeholder="Full-Stack Developer" />
          <Field label="Tagline"      value={s.tagline}  onChange={v => cfg('tagline', v)}  placeholder="I craft high-performance applications…" rows={3} />
        </Card>

        {/* Contact & availability */}
        <Card>
          <CardTitle>Contact &amp; Availability</CardTitle>
          <Field label="Email"    value={s.email}    onChange={v => cfg('email', v)}    type="email" />
          <Field label="Location" value={s.location} onChange={v => cfg('location', v)} placeholder="Anuradhapura, Sri Lanka" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <label style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600 }}>Available for hire</label>
            <input type="checkbox" checked={s.available} onChange={e => setD((p: any) => ({ ...p, siteConfig: { ...p.siteConfig, available: e.target.checked } }))} style={{ width: 16, height: 16, cursor: 'pointer' }} />
          </div>
        </Card>

        {/* Social links */}
        <Card>
          <CardTitle>Social Links</CardTitle>
          {(['github', 'linkedin', 'twitter', 'instagram'] as const).map(k => (
            <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={s.socials?.[k] || ''}
              onChange={v => setD((p: any) => ({ ...p, siteConfig: { ...p.siteConfig, socials: { ...p.siteConfig.socials, [k]: v } } }))}
              placeholder={`https://${k}.com/yourhandle`} />
          ))}
        </Card>

        {/* Stats */}
        <Card>
          <CardTitle>Hero Stats</CardTitle>
          {d.stats.map((stat: any, i: number) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'flex-end' }}>
              <Field label={i === 0 ? 'Value' : ''} value={stat.value} onChange={v => setStat(i, 'value', v)} placeholder="5+" />
              <Field label={i === 0 ? 'Label' : ''} value={stat.label} onChange={v => setStat(i, 'label', v)} placeholder="Years Experience" />
              <button onClick={() => removeStat(i)} style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#f87171', cursor: 'pointer', fontSize: 13, marginBottom: 16 }}>✕</button>
            </div>
          ))}
          <AddBtn onClick={addStat} label="+ Add Stat" />
        </Card>

        {/* Hero Roles */}
        <Card style={{ gridColumn: '1 / -1' }}>
          <CardTitle>Hero Roles</CardTitle>
          <p style={{ fontSize: 12, color: '#9aabc5', marginBottom: 16, marginTop: -4 }}>
            These appear as animated badge labels on the photo and as pill tags beneath your name. Drag to reorder isn't available — remove and re-add to change order.
          </p>

          {roles.map((role: any, i: number) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'flex-end', padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Field label={i === 0 ? 'Label' : ''} value={role.label} onChange={v => setRole(i, 'label', v)} placeholder="e.g. Web Developer" />

              <div>
                {i === 0 && <label style={{ display: 'block', fontSize: 12, color: '#9aabc5', fontWeight: 600, marginBottom: 6 }}>Icon</label>}
                <select value={role.icon} onChange={e => setRole(i, 'icon', e.target.value)} style={selectStyle}>
                  {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>

              <div>
                {i === 0 && <label style={{ display: 'block', fontSize: 12, color: '#9aabc5', fontWeight: 600, marginBottom: 6 }}>Color</label>}
                <select value={role.color} onChange={e => setRole(i, 'color', e.target.value)} style={{ ...selectStyle, borderLeft: `3px solid ${COLOR_PREVIEW[role.color] || '#60a5fa'}` }}>
                  {COLOR_OPTIONS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>

              <button onClick={() => removeRole(i)} style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#f87171', cursor: 'pointer', fontSize: 13, marginBottom: 16 }}>✕</button>
            </div>
          ))}

          <AddBtn onClick={addRole} label="+ Add Role" />
        </Card>
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={save} saving={saving} />
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
