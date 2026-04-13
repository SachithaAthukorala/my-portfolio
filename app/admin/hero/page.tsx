'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, Divider, TagPill, AddBtn } from '@/components/admin/AdminUI'

export default function AdminHeroPage() {
  const [d, setD]           = useState<any>(null)
  const [toast, setToast]   = useState('')
  const [saving, setSaving] = useState(false)
  const [newRole, setNewRole] = useState('')

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

  async function save() {
    setSaving(true)
    try {
      await saveData({ siteConfig: d.siteConfig, stats: d.stats })
      setToast('Hero section saved!')
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      setToast('Error saving hero section')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  const s = d?.siteConfig || {}

  if (!d) {
    return <div style={{ padding: '20px', color: '#9aabc5' }}>Loading...</div>
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
          <CardTitle>Contact & Availability</CardTitle>
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
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={save} saving={saving} />
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
