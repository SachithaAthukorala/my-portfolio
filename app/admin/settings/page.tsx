'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData, resetData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, Divider } from '@/components/admin/AdminUI'

export default function AdminSettingsPage() {
  const [d, setD]         = useState<any>(null)
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData().then(setD)
  }, [])

  if (!d) {
    return <div style={{ padding: '20px', color: '#9aabc5' }}>Loading...</div>
  }

  function cfg(key: string, val: string) {
    setD((p: any) => ({ ...p, siteConfig: { ...p.siteConfig, [key]: val } }))
  }

  async function save() {
    setSaving(true)
    try {
      await saveData({ siteConfig: d?.siteConfig })
      setToast('Settings saved!')
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      setToast('Error saving settings')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    if (!confirm('This will reset ALL portfolio data to defaults. Are you sure?')) return
    resetData()
    setD(loadData())
    setToast('Reset to defaults.')
    setTimeout(() => setToast(''), 3000)
  }

  const s = d?.siteConfig || {}

  return (
    <div>
      <PageHeader title="Settings" desc="Site-wide configuration and profile details." action={<SaveBtn onClick={save} saving={saving} />} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 800 }}>
        {/* Profile */}
        <Card>
          <CardTitle>Profile</CardTitle>
          <Field label="Full Name"  value={s.name}     onChange={v => cfg('name', v)}     placeholder="Sachitha Athukorala" />
          <Field label="Role/Title" value={s.role}     onChange={v => cfg('role', v)}     placeholder="Full-Stack Developer & Photographer" />
          <Field label="Email"      value={s.email}    onChange={v => cfg('email', v)}    type="email" />
          <Field label="Location"   value={s.location} onChange={v => cfg('location', v)} placeholder="Anuradhapura, Sri Lanka" />
          <Field label="Tagline"    value={s.tagline}  onChange={v => cfg('tagline', v)}  rows={3} />
        </Card>

        {/* Socials */}
        <Card>
          <CardTitle>Social Links</CardTitle>
          {(['github', 'linkedin', 'twitter', 'instagram'] as const).map(k => (
            <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}
              value={s.socials[k]}
              onChange={v => setD((p: any) => ({ ...p, siteConfig: { ...p.siteConfig, socials: { ...p.siteConfig.socials, [k]: v } } }))}
              placeholder={`https://${k}.com/yourhandle`} />
          ))}
        </Card>
      </div>

      {/* Security */}
      <div style={{ marginTop: 16, maxWidth: 800 }}>
        <Card>
          <CardTitle>Security & Environment</CardTitle>
          <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ color: '#9aabc5', fontSize: 13, marginBottom: 8 }}>
              Admin password is set via environment variable, not stored here.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { key: 'ADMIN_PASSWORD',       desc: 'The password you use to log in' },
                { key: 'ADMIN_SESSION_SECRET', desc: 'Random 32-char string for sessions' },
              ].map(({ key, desc }) => (
                <div key={key} style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ color: '#5e99ee', fontSize: 12, fontFamily: 'monospace', marginBottom: 4 }}>{key}</p>
                  <p style={{ color: '#6b82a3', fontSize: 11 }}>{desc}</p>
                </div>
              ))}
            </div>
            <p style={{ color: '#6b82a3', fontSize: 12, marginTop: 10 }}>
              Set these in <code style={{ color: '#5e99ee', background: 'rgba(0,0,0,0.3)', padding: '1px 6px', borderRadius: 4 }}>.env.local</code> and in your Vercel project environment variables.
            </p>
          </div>

          <Divider />

          <p style={{ color: '#f87171', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Danger Zone</p>
          <p style={{ color: '#6b82a3', fontSize: 12, marginBottom: 12 }}>
            Reset all portfolio data to the original sample data. This cannot be undone.
          </p>
          <button onClick={handleReset} style={{
            padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)',
            background: 'rgba(239,68,68,0.08)', color: '#f87171', cursor: 'pointer', fontSize: 13, fontWeight: 600,
          }}>
            Reset All Data to Defaults
          </button>
        </Card>
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', maxWidth: 800 }}>
        <SaveBtn onClick={save} saving={saving} />
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
