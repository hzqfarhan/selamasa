'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllMemories, deleteMemory, getAllEvents, upsertEvent } from '@/lib/db'
import { deleteStorageFile } from '@/lib/bucket'
import { EventConfig } from '@/types'

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

type Tab = 'memories' | 'settings'

export default function AdminDashboard() {
  const [memories, setMemories] = useState<MemoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('memories')

  // Settings state
  const [events, setEvents] = useState<EventConfig[]>([])
  const [eventCodes, setEventCodes] = useState<Record<string, string>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      router.replace('/admin')
      return
    }
    loadMemories()
    loadEvents()
  }, [])

  const loadMemories = async () => {
    setLoading(true)
    const data = await getAllMemories()
    setMemories(data as any)
    setLoading(false)
  }

  const loadEvents = async () => {
    try {
      const data = await getAllEvents()
      setEvents(data)
      // Seed the codes map from DB
      const codes: Record<string, string> = {}
      data.forEach(ev => { codes[ev.id] = ev.access_code ?? '' })
      setEventCodes(codes)
    } catch (e) {
      console.error('Failed to load events:', e)
    }
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

  const handleSaveCode = async (eventId: string) => {
    const code = (eventCodes[eventId] ?? '').trim().toUpperCase()
    setSavingId(eventId)
    try {
      await upsertEvent(eventId, { access_code: code || null } as any)
      setEventCodes(prev => ({ ...prev, [eventId]: code }))
      setSavedId(eventId)
      setTimeout(() => setSavedId(null), 2500)
    } catch (e) {
      console.error('Save code error:', e)
      alert('Gagal simpan kod. Cuba lagi.')
    }
    setSavingId(null)
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
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px' }}>Admin Panel</h1>
        <button onClick={() => { sessionStorage.removeItem('admin_auth'); router.push('/admin') }}
          style={{ padding: '8px 16px', background: '#333', color: '#fff', borderRadius: '8px', fontSize: '12px' }}>
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['memories', 'settings'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '9px 20px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
              fontFamily: 'var(--font-dm-sans)',
              background: tab === t ? 'linear-gradient(135deg, #2f78c4, #1f4a7c)' : 'rgba(255,255,255,0.7)',
              color: tab === t ? '#fff' : '#4a6f94',
              border: tab === t ? 'none' : '1px solid rgba(74,144,226,0.28)',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            {t === 'memories' ? '🖼️ Memories' : '⚙️ Settings'}
          </button>
        ))}
      </div>

      {/* ── MEMORIES TAB ── */}
      {tab === 'memories' && (
        <>
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
                  {/* Thumbnail */}
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
        </>
      )}

      {/* ── SETTINGS TAB ── */}
      {tab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>🔑</span>
            <div>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px' }}>Kod Akses Majlis</h2>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: 'var(--cream-sub)', marginTop: '2px' }}>
                Tetapkan kod pendek untuk setiap majlis. Tetamu masukkan kod ini di halaman utama SelaMasa.
              </p>
            </div>
          </div>

          {/* Info banner */}
          <div style={{
            padding: '12px 16px', borderRadius: '12px',
            background: 'rgba(74,144,226,0.08)', border: '1px solid rgba(74,144,226,0.20)',
          }}>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: 'var(--cream-sub)', lineHeight: 1.7, margin: 0 }}>
              💡 Kod disimpan dalam <strong>database</strong>. Contoh: kod <strong style={{ color: '#2f78c4' }}>NN2026</strong> → tetamu akan diarahkan ke majlis yang berkenaan.
            </p>
          </div>

          {/* Per-event code cards */}
          {events.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)' }}>Tiada majlis dijumpai.</p>
          ) : (
            events.map(ev => (
              <div key={ev.id} className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
                {/* Event info */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '16px', fontWeight: 700, color: 'var(--cream-text)' }}>
                    {ev.bride} & {ev.groom}
                  </div>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: 'var(--cream-sub)', marginTop: '2px' }}>
                    Slug: <code style={{ background: 'rgba(74,144,226,0.10)', padding: '1px 6px', borderRadius: '4px' }}>{ev.id}</code>
                  </div>
                </div>

                {/* Code input */}
                <label style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 600, color: 'var(--cream-sub)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Kod Akses
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={eventCodes[ev.id] ?? ''}
                    onChange={e => setEventCodes(prev => ({ ...prev, [ev.id]: e.target.value.toUpperCase() }))}
                    placeholder="cth: NN2026"
                    maxLength={20}
                    style={{
                      flex: 1, padding: '11px 14px',
                      borderRadius: '12px', border: '1.5px solid rgba(74,144,226,0.30)',
                      fontFamily: 'var(--font-dm-sans)', fontSize: '15px', fontWeight: 700,
                      color: '#2f78c4', letterSpacing: '0.08em',
                      background: 'rgba(244,249,255,0.8)', outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => handleSaveCode(ev.id)}
                    disabled={savingId === ev.id}
                    style={{
                      padding: '11px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 700,
                      fontFamily: 'var(--font-dm-sans)', cursor: 'pointer',
                      background: savedId === ev.id
                        ? 'linear-gradient(135deg, #25d366, #1a9e4a)'
                        : savingId === ev.id
                          ? '#ccc'
                          : 'linear-gradient(135deg, #2f78c4, #1f4a7c)',
                      color: '#fff', border: 'none',
                      transition: 'background 0.3s ease', flexShrink: 0,
                    }}
                  >
                    {savedId === ev.id ? '✅' : savingId === ev.id ? '...' : '💾 Simpan'}
                  </button>
                </div>

                {/* Preview URL */}
                {eventCodes[ev.id]?.trim() && (
                  <div style={{ marginTop: '10px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(74,144,226,0.06)', border: '1px solid rgba(74,144,226,0.15)' }}>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: 'var(--cream-sub)', margin: 0 }}>
                      Tetamu masuk kod <strong style={{ color: '#2f78c4' }}>{eventCodes[ev.id].trim()}</strong> → diarahkan ke <strong style={{ color: '#2f78c4' }}>selamasa.my/event/{ev.id}</strong>
                    </p>
                  </div>
                )}
              </div>
            ))
          )}

        </div>
      )}
    </div>
  )
}