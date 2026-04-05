'use client'

import { useState, useEffect } from 'react'
import { loadData, saveData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, SaveBtn, Toast, AddBtn, DeleteBtn, TagPill } from '@/components/admin/AdminUI'
import type { BlogPost } from '@/lib/data'

function emptyPost(): BlogPost {
  return {
    slug: '', title: '', excerpt: '', content: '', category: '',
    tags: [], publishedAt: new Date().toISOString().split('T')[0],
    readingTime: 5, featured: false,
    coverImage: '',
  }
}

export default function AdminBlogPage() {
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
      await saveData({ blogPosts: d?.blogPosts })
      setToast('Blog posts saved!')
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      setToast('Error saving blog posts')
      setTimeout(() => setToast(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  function setPost(i: number, k: keyof BlogPost, v: unknown) {
    setD(p => { const a = [...p.blogPosts]; a[i] = { ...a[i], [k]: v }; return { ...p, blogPosts: a } })
  }

  function addPost() {
    setD(p => ({ ...p, blogPosts: [...p.blogPosts, emptyPost()] }))
    setEditing(d.blogPosts.length)
  }

  function removePost(i: number) {
    setD(p => ({ ...p, blogPosts: p.blogPosts.filter((_, j) => j !== i) }))
    if (editing === i) setEditing(null)
  }

  function addTag(i: number) {
    if (!newTag.trim()) return
    setPost(i, 'tags', [...d.blogPosts[i].tags, newTag.trim()])
    setNewTag('')
  }

  function removeTag(pi: number, ti: number) {
    setPost(pi, 'tags', d.blogPosts[pi].tags.filter((_, j) => j !== ti))
  }

  const post = editing !== null ? d.blogPosts[editing] : null

  return (
    <div>
      <PageHeader title="Blog" desc={`${d?.blogPosts?.length || 0} posts`} action={
        <div style={{ display: 'flex', gap: 10 }}>
          <AddBtn onClick={addPost} label="+ New Post" />
          <SaveBtn onClick={save} saving={saving} />
        </div>
      } />

      <div style={{ display: 'grid', gridTemplateColumns: post ? '280px 1fr' : '1fr', gap: 16, alignItems: 'start' }}>
        {/* List */}
        <div>
          {d?.blogPosts?.map((p, i) => (
            <div key={i} onClick={() => setEditing(i)} style={{
              padding: '12px 14px', borderRadius: 10, marginBottom: 8, cursor: 'pointer',
              background: editing === i ? 'rgba(59,125,216,0.12)' : 'rgba(255,255,255,0.03)',
              border: editing === i ? '1px solid rgba(59,125,216,0.3)' : '1px solid rgba(255,255,255,0.08)',
              transition: 'all .15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title || 'Untitled Post'}
                  </p>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#6b82a3' }}>{p.category || '—'}</span>
                    <span style={{ fontSize: 11, color: '#3d5980' }}>·</span>
                    <span style={{ fontSize: 11, color: '#6b82a3' }}>{p.readingTime} min</span>
                    {p.featured && <span style={{ fontSize: 10, color: '#f59e0b', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 4, padding: '0 5px' }}>Featured</span>}
                  </div>
                </div>
                <span onClick={e => { e.stopPropagation(); removePost(i) }}
                  style={{ color: '#f87171', fontSize: 11, cursor: 'pointer', flexShrink: 0, marginLeft: 8, opacity: 0.6 }}>✕</span>
              </div>
            </div>
          ))}
          {d?.blogPosts?.length === 0 && <p style={{ color: '#3d5980', fontSize: 13 }}>No posts yet.</p>}
        </div>

        {/* Editor */}
        {post && editing !== null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card>
              <CardTitle>Post Details</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Title"    value={post.title}    onChange={v => setPost(editing, 'title', v)}    placeholder="Post Title" />
                <Field label="Slug"     value={post.slug}     onChange={v => setPost(editing, 'slug', v)}     placeholder="my-post-slug" />
                <Field label="Category" value={post.category} onChange={v => setPost(editing, 'category', v)} placeholder="Backend" />
                <Field label="Published Date" value={post.publishedAt} onChange={v => setPost(editing, 'publishedAt', v)} type="date" />
                <div>
                  <label style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600, display: 'block', marginBottom: 6 }}>Reading Time (min)</label>
                  <input type="number" value={post.readingTime} onChange={e => setPost(editing, 'readingTime', parseInt(e.target.value) || 1)} min={1}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '9px 12px', color: '#fff', fontSize: 13, outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 22 }}>
                  <label style={{ fontSize: 12, color: '#9aabc5', fontWeight: 600 }}>Featured</label>
                  <input type="checkbox" checked={post.featured} onChange={e => setPost(editing, 'featured', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
                </div>
              </div>
              <Field label="Cover Image URL" value={post.coverImage} onChange={v => setPost(editing, 'coverImage', v)} placeholder="https://images.unsplash.com/…" />
              <Field label="Excerpt (shown on blog index)" value={post.excerpt} onChange={v => setPost(editing, 'excerpt', v)} rows={2} />
            </Card>

            <Card>
              <CardTitle>Tags</CardTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {post.tags.map((t, ti) => <TagPill key={ti} label={t} onRemove={() => removeTag(editing, ti)} />)}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag(editing)}
                  placeholder="Add tag and press Enter" style={{ flex: 1, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 12, outline: 'none' }} />
                <button onClick={() => addTag(editing)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(59,125,216,0.3)', background: 'rgba(59,125,216,0.12)', color: '#5e99ee', cursor: 'pointer', fontSize: 12 }}>Add</button>
              </div>
            </Card>

            <Card>
              <CardTitle>Content (Markdown)</CardTitle>
              <p style={{ fontSize: 11, color: '#6b82a3', marginBottom: 10 }}>
                Supports: ## headings, **bold**, `code`, ```code blocks```, - lists, | tables |
              </p>
              <textarea
                value={post.content}
                onChange={e => setPost(editing, 'content', e.target.value)}
                placeholder="Write your blog post in Markdown…"
                rows={20}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px', color: '#d1d9e8', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.7, boxSizing: 'border-box' }}
              />
            </Card>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SaveBtn onClick={save} saving={saving} />
            </div>
          </div>
        )}
      </div>

      {!post && d?.blogPosts?.length > 0 && (
        <p style={{ color: '#3d5980', fontSize: 13, marginTop: 12 }}>← Select a post to edit it.</p>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
