'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllMemories, deleteMemory } from '@/lib/db'
import { deleteStorageFile } from '@/lib/bucket'

interface MemoryRow {
  id: string
  event_id: string
  type: string
  guest_name: string
  guestName?: string
  file_url?: string
  fileUrl?: string
  caption?: string
  likes: number
  uploaded_at: string
  uploadedAt?: string
}

export default function AdminDashboard() {
  const [memories, setMemories] = useState<MemoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      router.replace('/admin')
      return
    }
    loadMemories()
  }, [])

  const loadMemories = async () => {
    setLoading(true)
    const data = await getAllMemories()
    setMemories(data as any)
    setLoading(false)
  }

  const handleDelete = async (m: MemoryRow) => {
    if (!confirm(`Delete this ${m.type} from ${m.guest_name ?? m.guestName}?`)) return
    setDeleting(m.id)
    try {
      if (m.fileUrl || m.file_url) {
        await deleteStorageFile(m.fileUrl ?? m.file_url!)
      }
    } catch (e) {
      console.error('Storage delete error (non-fatal):', e)
    }
    try {
      await deleteMemory(m.id)
      setMemories(prev => prev.filter(x => x.id !== m.id))
    } catch (e) {
      console.error('DB delete error:', e)
      alert('Failed to delete from database — check RLS policies')
    }
    setDeleting(null)
  }

  const typeIcon = (t: string) => {
    if (t === 'photo') return '📷'
    if (t === 'boomerang') return '🌀'
    if (t === 'video') return '🎥'
    if (t === 'voice') return '🎙️'
    if (t === 'message') return '✍️'
    return '📦'
  }

  return (
    <div style={{
      padding: '20px', background: 'var(--cream-bg)', minHeight: '100vh',
      color: 'var(--cream-text)', fontFamily: 'var(--font-dm-sans), sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '28px' }}>Moderation Panel</h1>
        <button onClick={() => { sessionStorage.removeItem('admin_auth'); router.push('/admin') }}
          style={{ padding: '8px 16px', background: '#333', color: '#fff', borderRadius: '8px', fontSize: '12px' }}>
          Sign Out
        </button>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--cream-sub)', marginBottom: '16px' }}>
        {memories.length} total memories
      </p>

      {loading ? (
        <p style={{ color: 'var(--cream-sub)' }}>Loading...</p>
      ) : memories.length === 0 ? (
        <p style={{ color: 'var(--cream-sub)' }}>No memories yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {memories.map(m => (
            <div key={m.id} className="glass-card" style={{
              padding: '14px', borderRadius: '16px', display: 'flex',
              alignItems: 'flex-start', gap: '14px'
            }}>
              {/* Thumbnail / preview */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '12px',
                background: '#d5c5ae', flexShrink: 0, overflow: 'hidden',
                display: 'grid', placeItems: 'center', fontSize: '24px'
              }}>
                {(m.type === 'photo' || m.type === 'boomerang' || m.type === 'video') && (m.fileUrl || m.file_url) ? (
                  <img src={m.fileUrl ?? m.file_url} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  typeIcon(m.type)
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0, fontSize: '12px', lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2px' }}>
                  <strong style={{ fontSize: '13px' }}>{m.guest_name ?? m.guestName}</strong>
                  <span style={{ color: 'var(--cream-sub)', fontSize: '10px' }}>{typeIcon(m.type)} {m.type}</span>
                </div>
                <div style={{ color: 'var(--cream-sub)', fontSize: '10px', marginBottom: '2px' }}>
                  Event: <strong>{m.event_id}</strong>
                </div>
                {m.caption && (
                  <div style={{ color: '#5f4b35', fontSize: '11px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.caption}
                  </div>
                )}
                <div style={{ color: 'var(--cream-sub)', fontSize: '10px' }}>
                  ♡ {m.likes} · {new Date(m.uploaded_at ?? m.uploadedAt).toLocaleString('en-MY')}
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(m)}
                disabled={deleting === m.id}
                style={{
                  padding: '8px 14px', borderRadius: '8px', background: deleting === m.id ? '#ccc' : '#d85a5a',
                  color: '#fff', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer',
                  flexShrink: 0
                }}>
                {deleting === m.id ? '...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}