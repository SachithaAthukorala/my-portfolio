'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, AddBtn, DeleteBtn } from '@/components/admin/AdminUI'

export default function AdminAboutPage() {
  const [d, setD]         = useState<any>(null)
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData().then(setD)
  }, [])

  if (!d) {
    return <div style={{ padding: '20px', color: '#9aabc5' }}>Loading...</div>
  }

  async function save() {
    setSaving(true)
    try {
      await saveData({ experiences: d?.experiences, certifications: d?.certifications })
      setToast('About section saved!')
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      setToast('Error saving about section')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  function setExp(i: number, k: keyof typeof d.experiences[0], v: string | string[]) {
    setD(p => { const a = [...p.experiences]; a[i] = { ...a[i], [k]: v }; return { ...p, experiences: a } })
  }

  function addExp() {
    setD(p => ({ ...p, experiences: [...p.experiences, { role: '', company: '', period: '', description: '', achievements: [''] }] }))
  }

  function removeExp(i: number) {
    setD(p => ({ ...p, experiences: p.experiences.filter((_, j) => j !== i) }))
  }

  function setAchievement(ei: number, ai: number, v: string) {
    setD(p => {
      const exps = [...p.experiences]
      const ach  = [...exps[ei].achievements]
      ach[ai]    = v
      exps[ei]   = { ...exps[ei], achievements: ach }
      return { ...p, experiences: exps }
    })
  }

  function addAchievement(ei: number) {
    setD(p => {
      const exps = [...p.experiences]
      exps[ei]   = { ...exps[ei], achievements: [...exps[ei].achievements, ''] }
      return { ...p, experiences: exps }
    })
  }

  function removeAchievement(ei: number, ai: number) {
    setD(p => {
      const exps = [...p.experiences]
      exps[ei]   = { ...exps[ei], achievements: exps[ei].achievements.filter((_, j) => j !== ai) }
      return { ...p, experiences: exps }
    })
  }

  function setCert(i: number, k: keyof typeof d.certifications[0], v: string) {
    setD(p => { const a = [...p.certifications]; a[i] = { ...a[i], [k]: v }; return { ...p, certifications: a } })
  }

  function addCert() {
    setD(p => ({ ...p, certifications: [...p.certifications, { name: '', issuer: '', year: '' }] }))
  }

  function removeCert(i: number) {
    setD(p => ({ ...p, certifications: p.certifications.filter((_, j) => j !== i) }))
  }

  return (
    <div>
      <PageHeader title="About" desc="Edit your experience, certifications, and background." action={<SaveBtn onClick={save} saving={saving} />} />

      {/* Work experience */}
      <Card className="mb-4">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <CardTitle>Work Experience</CardTitle>
          <AddBtn onClick={addExp} label="+ Add Role" />
        </div>

        {d?.experiences?.map((exp, i) => (
          <div key={i} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <p style={{ color: '#9aabc5', fontSize: 12, fontWeight: 600 }}>Role #{i + 1}</p>
              <DeleteBtn onConfirm={() => removeExp(i)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Job Title"    value={exp.role}        onChange={v => setExp(i, 'role', v)}        placeholder="Senior Developer" />
              <Field label="Company"      value={exp.company}     onChange={v => setExp(i, 'company', v)}     placeholder="Company Name" />
              <Field label="Period"       value={exp.period}      onChange={v => setExp(i, 'period', v)}      placeholder="2022 — Present" />
            </div>
            <Field label="Description" value={exp.description} onChange={v => setExp(i, 'description', v)} rows={3} />
            <p style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600, marginBottom: 8 }}>Achievements</p>
            {exp.achievements.map((a, ai) => (
              <div key={ai} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <input value={a} onChange={e => setAchievement(i, ai, e.target.value)} placeholder={`Achievement ${ai + 1}`}
                  style={{ flex: 1, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none' }} />
                <button onClick={() => removeAchievement(i, ai)}
                  style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#f87171', cursor: 'pointer', fontSize: 13 }}>✕</button>
              </div>
            ))}
            <button onClick={() => addAchievement(i)}
              style={{ marginTop: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(59,125,216,0.25)', background: 'rgba(59,125,216,0.08)', color: '#5e99ee', cursor: 'pointer', fontSize: 12 }}>
              + Add Achievement
            </button>
          </div>
        ))}
      </Card>

      {/* Certifications */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <CardTitle>Certifications</CardTitle>
          <AddBtn onClick={addCert} label="+ Add Cert" />
        </div>
        {d?.certifications?.map((cert, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px auto', gap: 8, marginBottom: 8, alignItems: 'flex-end' }}>
            <Field label={i === 0 ? 'Name' : ''} value={cert.name}   onChange={v => setCert(i, 'name', v)}   placeholder="AWS Certified Developer" />
            <Field label={i === 0 ? 'Issuer' : ''} value={cert.issuer} onChange={v => setCert(i, 'issuer', v)} placeholder="Amazon Web Services" />
            <Field label={i === 0 ? 'Year' : ''} value={cert.year}   onChange={v => setCert(i, 'year', v)}   placeholder="2023" />
            <button onClick={() => removeCert(i)}
              style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#f87171', cursor: 'pointer', fontSize: 13, marginBottom: 16 }}>✕</button>
          </div>
        ))}
      </Card>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={save} saving={saving} />
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
