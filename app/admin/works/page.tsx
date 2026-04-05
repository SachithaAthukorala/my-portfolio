'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, AddBtn, DeleteBtn, TagPill, Divider } from '@/components/admin/AdminUI'
import type { Project } from '@/lib/data'

const platformOptions = ['web', 'mobile', 'desktop', 'fullstack']

function emptyProject(): Project {
  return {
    slug: '', title: '', summary: '', description: '', industry: '', industryColor: '#3b7dd8',
    thumbnail: '', images: [], stack: [], platform: 'web', featured: false,
    metrics: [{ value: '', label: '' }],
    problem: '', approach: '', results: '', liveUrl: '', githubUrl: '', year: new Date().getFullYear(),
  }
}

export default function AdminWorksPage() {
  const [d, setD]             = useState<any>(null)
  const [editing, setEditing] = useState<number | null>(null)
  const [toast, setToast]     = useState('')
  const [saving, setSaving]   = useState(false)
  const [newTag, setNewTag]   = useState('')

  useEffect(() => {
    loadData().then(setD)
  }, [])

  async function save() {
    setSaving(true)
    try {
      await saveData({ projects: d?.projects })
      setToast('Projects saved!')
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      setToast('Error saving projects')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  function setProj(i: number, k: keyof Project, v: unknown) {
    setD(p => { const a = [...p.projects]; a[i] = { ...a[i], [k]: v }; return { ...p, projects: a } })
  }

  function addProject() {
    const p = emptyProject()
    setD(prev => ({ ...prev, projects: [...prev.projects, p] }))
    setEditing(d.projects.length)
  }

  function removeProject(i: number) {
    setD(p => ({ ...p, projects: p.projects.filter((_, j) => j !== i) }))
    if (editing === i) setEditing(null)
  }

  function addStack(i: number) {
    if (!newTag.trim()) return
    const items = [...(d.projects[i].stack), newTag.trim()]
    setProj(i, 'stack', items)
    setNewTag('')
  }

  function removeStack(pi: number, si: number) {
    setProj(pi, 'stack', d.projects[pi].stack.filter((_, j) => j !== si))
  }

  function setMetric(pi: number, mi: number, k: 'value' | 'label', v: string) {
    const metrics = [...d.projects[pi].metrics]
    metrics[mi] = { ...metrics[mi], [k]: v }
    setProj(pi, 'metrics', metrics)
  }

  function addMetric(pi: number) {
    setProj(pi, 'metrics', [...d.projects[pi].metrics, { value: '', label: '' }])
  }

  function removeMetric(pi: number, mi: number) {
    setProj(pi, 'metrics', d.projects[pi].metrics.filter((_, j) => j !== mi))
  }

  const proj = editing !== null ? d.projects[editing] : null

  return (
    <div>
      <PageHeader title="Works" desc={`${d?.projects?.length || 0} projects`} action={
        <div style={{ display: 'flex', gap: 10 }}>
          <AddBtn onClick={addProject} label="+ New Project" />
          <SaveBtn onClick={save} saving={saving} />
        </div>
      } />

      <div style={{ display: 'grid', gridTemplateColumns: editing !== null ? '280px 1fr' : '1fr', gap: 16, alignItems: 'start' }}>
        {/* List */}
        <div>
          {d?.projects?.map((p, i) => (
            <div key={i} onClick={() => setEditing(i)} style={{
              padding: '12px 14px', borderRadius: 10, marginBottom: 8, cursor: 'pointer', transition: 'all .15s',
              background: editing === i ? 'rgba(59,125,216,0.12)' : 'rgba(255,255,255,0.03)',
              border: editing === i ? '1px solid rgba(59,125,216,0.3)' : '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title || 'Untitled Project'}
                  </p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ fontSize: 11, color: '#6b82a3' }}>{p.industry || '—'}</span>
                    <span style={{ fontSize: 11, color: '#3d5980' }}>·</span>
                    <span style={{ fontSize: 11, color: '#6b82a3', textTransform: 'capitalize' }}>{p.platform}</span>
                    {p.featured && <span style={{ fontSize: 10, color: '#f59e0b', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 4, padding: '0 5px' }}>Featured</span>}
                  </div>
                </div>
                <span onClick={e => { e.stopPropagation(); removeProject(i) }}
                  style={{ color: '#f87171', fontSize: 11, cursor: 'pointer', flexShrink: 0, marginLeft: 8, opacity: 0.6 }}>✕</span>
              </div>
            </div>
          ))}
          {d?.projects?.length === 0 && <p style={{ color: '#3d5980', fontSize: 13 }}>No projects yet.</p>}
        </div>

        {/* Editor */}
        {proj && editing !== null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card>
              <CardTitle>Basic Info</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Title"     value={proj.title}    onChange={v => setProj(editing, 'title', v)}    placeholder="Project Title" />
                <Field label="Slug (URL)" value={proj.slug}   onChange={v => setProj(editing, 'slug', v)}     placeholder="my-project" />
                <Field label="Industry"  value={proj.industry} onChange={v => setProj(editing, 'industry', v)} placeholder="Healthcare" />
                <div>
                  <p style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600, marginBottom: 6 }}>Industry Color</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="color" value={proj.industryColor} onChange={e => setProj(editing, 'industryColor', e.target.value)}
                      style={{ width: 40, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: 'transparent' }} />
                    <span style={{ color: '#9aabc5', fontSize: 12 }}>{proj.industryColor}</span>
                  </div>
                </div>
                <Field label="Year" value={String(proj.year)} onChange={v => setProj(editing, 'year', parseInt(v) || new Date().getFullYear())} placeholder="2024" />
                <div>
                  <p style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600, marginBottom: 6 }}>Platform</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {platformOptions.map(pl => (
                      <button key={pl} onClick={() => setProj(editing, 'platform', pl)} style={{
                        padding: '6px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', textTransform: 'capitalize',
                        border: proj.platform === pl ? '1px solid #5e99ee' : '1px solid rgba(255,255,255,0.1)',
                        background: proj.platform === pl ? 'rgba(59,125,216,0.2)' : 'rgba(255,255,255,0.04)',
                        color: proj.platform === pl ? '#fff' : '#9aabc5',
                      }}>{pl}</button>
                    ))}
                  </div>
                </div>
              </div>
              <Field label="Summary (card text)" value={proj.summary}     onChange={v => setProj(editing, 'summary', v)}     rows={2} />
              <Field label="Description"         value={proj.description} onChange={v => setProj(editing, 'description', v)} rows={3} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <label style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600 }}>Featured on homepage</label>
                <input type="checkbox" checked={proj.featured} onChange={e => setProj(editing, 'featured', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
              </div>
            </Card>

            <Card>
              <CardTitle>Media</CardTitle>
              <Field label="Thumbnail URL" value={proj.thumbnail} onChange={v => setProj(editing, 'thumbnail', v)} placeholder="https://images.unsplash.com/…" />
              <Field label="Gallery Images (one URL per line)" value={proj.images.join('\n')}
                onChange={v => setProj(editing, 'images', v.split('\n').map(s => s.trim()).filter(Boolean))} rows={3} />
            </Card>

            <Card>
              <CardTitle>Tech Stack</CardTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {proj.stack.map((t, si) => <TagPill key={si} label={t} onRemove={() => removeStack(editing, si)} />)}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addStack(editing)}
                  placeholder="e.g. Next.js" style={{ flex: 1, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 12, outline: 'none' }} />
                <button onClick={() => addStack(editing)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(59,125,216,0.3)', background: 'rgba(59,125,216,0.12)', color: '#5e99ee', cursor: 'pointer', fontSize: 12 }}>Add</button>
              </div>
            </Card>

            <Card>
              <CardTitle>Metrics</CardTitle>
              {proj.metrics.map((m, mi) => (
                <div key={mi} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'flex-end' }}>
                  <Field label={mi === 0 ? 'Value' : ''} value={m.value} onChange={v => setMetric(editing, mi, 'value', v)} placeholder="1,000+" />
                  <Field label={mi === 0 ? 'Label' : ''} value={m.label} onChange={v => setMetric(editing, mi, 'label', v)} placeholder="Users/Month" />
                  <button onClick={() => removeMetric(editing, mi)} style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#f87171', cursor: 'pointer', marginBottom: 16 }}>✕</button>
                </div>
              ))}
              <AddBtn onClick={() => addMetric(editing)} label="+ Add Metric" />
            </Card>

            <Card>
              <CardTitle>Case Study</CardTitle>
              <Field label="Problem"  value={proj.problem}  onChange={v => setProj(editing, 'problem', v)}  rows={3} />
              <Field label="Approach" value={proj.approach} onChange={v => setProj(editing, 'approach', v)} rows={3} />
              <Field label="Results"  value={proj.results}  onChange={v => setProj(editing, 'results', v)}  rows={3} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Live URL"   value={proj.liveUrl   || ''} onChange={v => setProj(editing, 'liveUrl', v)}   placeholder="https://…" />
                <Field label="GitHub URL" value={proj.githubUrl || ''} onChange={v => setProj(editing, 'githubUrl', v)} placeholder="https://github.com/…" />
              </div>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SaveBtn onClick={save} saving={saving} />
            </div>
          </div>
        )}
      </div>

      {!proj && d?.projects?.length > 0 && (
        <p style={{ color: '#3d5980', fontSize: 13, marginTop: 12 }}>← Select a project to edit it.</p>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
