'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, AddBtn, DeleteBtn } from '@/components/admin/AdminUI'

export default function AdminPhotosPage() {
  const [d, setD]         = useState(() => loadData())
  const [toast, setToast] = useState('')

  useEffect(() => { setD(loadData()) }, [])

  function save() {
    saveData({ photoCategories: d.photoCategories })
    setToast('Photo albums saved!')
    setTimeout(() => setToast(''), 3000)
  }

  function setAlbum(i: number, k: string, v: string | number) {
    setD(p => { const a = [...p.photoCategories]; a[i] = { ...a[i], [k]: v }; return { ...p, photoCategories: a } })
  }

  function addAlbum() {
    setD(p => ({ ...p, photoCategories: [...p.photoCategories, { name: '', count: 0, cover: '', description: '' }] }))
  }

  function removeAlbum(i: number) {
    setD(p => ({ ...p, photoCategories: p.photoCategories.filter((_, j) => j !== i) }))
  }

  return (
    <div>
      <PageHeader title="Photo Albums" desc={`${d.photoCategories.length} albums`} action={
        <div style={{ display: 'flex', gap: 10 }}>
          <AddBtn onClick={addAlbum} label="+ New Album" />
          <SaveBtn onClick={save} />
        </div>
      } />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 16 }}>
        {d.photoCategories.map((album, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <p style={{ color: '#9aabc5', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Album #{i + 1}</p>
              <DeleteBtn onConfirm={() => removeAlbum(i)} />
            </div>

            {/* Cover preview */}
            {album.cover && (
              <div style={{ width: '100%', height: 120, borderRadius: 8, overflow: 'hidden', marginBottom: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={album.cover} alt={album.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 10 }}>
              <Field label="Album Name" value={album.name}  onChange={v => setAlbum(i, 'name', v)}  placeholder="Landscape" />
              <Field label="Count"      value={String(album.count)} onChange={v => setAlbum(i, 'count', parseInt(v) || 0)} placeholder="42" />
            </div>
            <Field label="Cover Image URL" value={album.cover}        onChange={v => setAlbum(i, 'cover', v)}        placeholder="https://images.unsplash.com/…" />
            <Field label="Description"     value={album.description}  onChange={v => setAlbum(i, 'description', v)}  rows={2} />
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={save} />
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
