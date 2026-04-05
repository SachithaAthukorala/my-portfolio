'use client'

import { useState, useEffect, useRef } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, AddBtn, DeleteBtn } from '@/components/admin/AdminUI'
import { Upload, Link2, X } from 'lucide-react'

type UploadMode = 'url' | 'file'

export default function AdminPhotosPage() {
  const [d, setD]         = useState<any>(null)
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)
  const [modes, setModes] = useState<Record<number, UploadMode>>({})
  const fileRefs          = useRef<Record<number, HTMLInputElement | null>>({})

  useEffect(() => {
    loadData().then(setD)
  }, [])

  if (!d) {
    return <div style={{ padding: '20px', color: '#9aabc5' }}>Loading...</div>
  }

  async function save() {
    setSaving(true)
    try {
      await saveData({ photoCategories: d?.photoCategories })
      setToast('Photo albums saved!')
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      setToast('Error saving photo albums')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  function setAlbum(i: number, k: string, v: string | number) {
    setD(p => {
      const a = [...p.photoCategories]
      a[i] = { ...a[i], [k]: v }
      return { ...p, photoCategories: a }
    })
  }

  function addAlbum() {
    setD(p => ({
      ...p,
      photoCategories: [...p.photoCategories, { name: '', count: 0, cover: '', description: '' }],
    }))
  }

  function removeAlbum(i: number) {
    setD(p => ({ ...p, photoCategories: p.photoCategories.filter((_, j) => j !== i) }))
  }

  function handleFileChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      setAlbum(i, 'cover', dataUrl)
    }
    reader.readAsDataURL(file)
  }

  function toggleMode(i: number) {
    setModes(p => ({ ...p, [i]: p[i] === 'file' ? 'url' : 'file' }))
    setAlbum(i, 'cover', '')
  }

  return (
    <div>
      <PageHeader
        title="Photo Albums"
        desc={`${d?.photoCategories?.length || 0} albums`}
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <AddBtn onClick={addAlbum} label="+ New Album" />
            <SaveBtn onClick={save} saving={saving} />
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {d?.photoCategories?.map((album, i) => {
          const mode = modes[i] || 'url'
          return (
            <Card key={i}>
              {/* Card header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <p style={{ color: '#9aabc5', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Album #{i + 1}
                </p>
                <DeleteBtn onConfirm={() => removeAlbum(i)} />
              </div>

              {/* Cover image preview + upload */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600 }}>Cover Image</p>
                  <button
                    onClick={() => toggleMode(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                      background: 'rgba(59,125,216,0.1)', border: '1px solid rgba(59,125,216,0.25)',
                      color: '#5e99ee',
                    }}
                  >
                    {mode === 'url' ? <><Upload size={11} /> Upload file</> : <><Link2 size={11} /> Use URL</>}
                  </button>
                </div>

                {/* Preview */}
                {album.cover ? (
                  <div style={{ position: 'relative', width: '100%', height: 160, borderRadius: 10, overflow: 'hidden', marginBottom: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={album.cover} alt={album.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={() => setAlbum(i, 'cover', '')}
                      style={{
                        position: 'absolute', top: 8, right: 8, width: 26, height: 26,
                        borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => mode === 'file' && fileRefs.current[i]?.click()}
                    style={{
                      width: '100%', height: 120, borderRadius: 10, marginBottom: 8,
                      border: '2px dashed rgba(255,255,255,0.1)', display: 'flex',
                      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 8, cursor: mode === 'file' ? 'pointer' : 'default',
                      background: 'rgba(0,0,0,0.15)',
                    }}
                  >
                    <Upload size={22} color="#3d5980" />
                    <p style={{ fontSize: 12, color: '#3d5980' }}>
                      {mode === 'file' ? 'Click to upload image' : 'No cover yet'}
                    </p>
                  </div>
                )}

                {/* URL input */}
                {mode === 'url' && (
                  <input
                    value={album.cover}
                    onChange={e => setAlbum(i, 'cover', e.target.value)}
                    placeholder="https://images.unsplash.com/…"
                    style={{
                      width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 12, outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                )}

                {/* File input (hidden) */}
                {mode === 'file' && (
                  <>
                    <input
                      ref={el => { fileRefs.current[i] = el }}
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileChange(i, e)}
                      style={{ display: 'none' }}
                    />
                    {!album.cover && (
                      <button
                        onClick={() => fileRefs.current[i]?.click()}
                        style={{
                          width: '100%', padding: '8px', borderRadius: 8,
                          border: '1px solid rgba(59,125,216,0.3)', background: 'rgba(59,125,216,0.08)',
                          color: '#5e99ee', fontSize: 12, cursor: 'pointer', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', gap: 6,
                        }}
                      >
                        <Upload size={13} /> Choose file from computer
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Album details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 10 }}>
                <Field label="Album Name" value={album.name} onChange={v => setAlbum(i, 'name', v)} placeholder="Landscape" />
                <Field label="Photo Count" value={String(album.count)} onChange={v => setAlbum(i, 'count', parseInt(v) || 0)} placeholder="42" />
              </div>
              <Field label="Description" value={album.description} onChange={v => setAlbum(i, 'description', v)} rows={2} placeholder="Mountains, coastlines and golden-hour light." />
            </Card>
          )
        })}

        {d?.photoCategories?.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: '#3d5980', fontSize: 14 }}>No albums yet. Click "+ New Album" to add one.</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={save} saving={saving} />
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
