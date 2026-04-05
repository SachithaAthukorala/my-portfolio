'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, AddBtn, DeleteBtn, TagPill } from '@/components/admin/AdminUI'

const colorOptions = ['accent', 'teal', 'gold', 'purple', 'green', 'orange']

export default function AdminSkillsPage() {
  const [d, setD]         = useState<any>(null)
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState<Record<number, string>>({})

  useEffect(() => {
    loadData().then(setD)
  }, [])

  async function save() {
    setSaving(true)
    try {
      await saveData({ skills: d?.skills })
      setToast('Skills saved!')
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      setToast('Error saving skills')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  function setGroup(i: number, k: keyof typeof d.skills[0], v: string) {
    setD(p => { const a = [...p.skills]; a[i] = { ...a[i], [k]: v }; return { ...p, skills: a } })
  }

  function addGroup() {
    setD(p => ({ ...p, skills: [...p.skills, { category: 'New Group', color: 'accent', items: [] }] }))
  }

  function removeGroup(i: number) {
    setD(p => ({ ...p, skills: p.skills.filter((_, j) => j !== i) }))
  }

  function addItem(gi: number) {
    const val = (newItem[gi] || '').trim()
    if (!val) return
    setD(p => { const a = [...p.skills]; a[gi] = { ...a[gi], items: [...a[gi].items, val] }; return { ...p, skills: a } })
    setNewItem(p => ({ ...p, [gi]: '' }))
  }

  function removeItem(gi: number, ii: number) {
    setD(p => { const a = [...p.skills]; a[gi] = { ...a[gi], items: a[gi].items.filter((_, j) => j !== ii) }; return { ...p, skills: a } })
  }

  return (
    <div>
      <PageHeader title="Skills" desc="Manage skill groups and individual technologies." action={
        <div style={{ display: 'flex', gap: 10 }}>
          <AddBtn onClick={addGroup} label="+ Add Group" />
          <SaveBtn onClick={save} saving={saving} />
        </div>
      } />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 16 }}>
        {d?.skills?.map((group, gi) => (
          <Card key={gi}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <p style={{ color: '#9aabc5', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Group #{gi + 1}</p>
              <DeleteBtn onConfirm={() => removeGroup(gi)} />
            </div>

            <Field label="Category Name" value={group.category} onChange={v => setGroup(gi, 'category', v)} placeholder="Frontend / Web" />

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600, marginBottom: 8 }}>Accent Color</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {colorOptions.map(c => (
                  <button key={c} onClick={() => setGroup(gi, 'color', c)} style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                    border: group.color === c ? '2px solid #5e99ee' : '1px solid rgba(255,255,255,0.12)',
                    background: group.color === c ? 'rgba(59,125,216,0.2)' : 'rgba(255,255,255,0.04)',
                    color: group.color === c ? '#fff' : '#9aabc5', fontWeight: group.color === c ? 700 : 400,
                  }}>{c}</button>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600, marginBottom: 8 }}>Skills ({group.items.length})</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {group.items.map((item, ii) => (
                <TagPill key={ii} label={item} onRemove={() => removeItem(gi, ii)} />
              ))}
              {group.items.length === 0 && <p style={{ fontSize: 12, color: '#3d5980' }}>No skills yet.</p>}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={newItem[gi] || ''}
                onChange={e => setNewItem(p => ({ ...p, [gi]: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && addItem(gi)}
                placeholder="Type skill & press Enter"
                style={{ flex: 1, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 12, outline: 'none' }}
              />
              <button onClick={() => addItem(gi)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(59,125,216,0.3)', background: 'rgba(59,125,216,0.12)', color: '#5e99ee', cursor: 'pointer', fontSize: 12 }}>Add</button>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={save} saving={saving} />
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
