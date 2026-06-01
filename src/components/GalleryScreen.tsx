'use client'
import React from 'react'
import { Memory } from '@/types'
import BottomNav from './BottomNav'

interface GalleryProps {
  slug: string
  coupleName: string
  memories: Memory[]
  tab: string
  onChangeTab: (t: string) => void
  onLoadMore: () => void
  hasMore: boolean
  onLike: (id: string) => void
  onBack: () => void
  onCaptureClick: () => void
  onNavChange: (tab: 'home' | 'album' | 'voice' | 'profile') => void
  onPhotoClick: (index: number) => void
}

function formatTime(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })
  } catch { return '' }
}

export default function GalleryScreen({ slug, coupleName, memories, tab, onChangeTab, onLoadMore, hasMore, onLike, onBack, onCaptureClick, onNavChange, onPhotoClick }: GalleryProps) {
  const tabs = ['all', 'photos', 'voice', 'videos', 'notes']

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#fffdf9 0%,#fbf3e8 100%)', display: 'flex', flexDirection: 'column', paddingBottom: 'calc(90px + var(--safe-bot))' }}>

      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, padding: 'max(env(safe-area-inset-top,14px),14px) 20px 10px', background: 'rgba(255,253,249,0.9)', backdropFilter: 'blur(14px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(198,162,84,0.12)' }}>
        <button onClick={onBack} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: '1px solid var(--gold-border)', display: 'grid', placeItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#5f4b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: '700', fontSize: '13px', letterSpacing: '0.2em', color: '#17110b' }}>SELA MASA</div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--gold)' }}>CAPTURE. CHERISH. FOREVER.</div>
        </div>
        <button style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: '1px solid var(--gold-border)', display: 'grid', placeItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61C20.32 4.1 19.71 3.7 19.04 3.43C18.37 3.16 17.66 3.03 16.94 3.03C16.22 3.03 15.51 3.17 14.84 3.44C14.17 3.71 13.56 4.11 13.04 4.62L12 5.66L10.96 4.62C9.91 3.57 8.48 2.97 6.98 2.97C5.48 2.97 4.04 3.57 2.99 4.62C1.94 5.67 1.34 7.1 1.34 8.6C1.34 10.1 1.94 11.54 2.99 12.59L12 21.6L21.01 12.59C21.52 12.07 21.92 11.46 22.19 10.79C22.46 10.12 22.59 9.41 22.59 8.69C22.59 7.97 22.45 7.26 22.18 6.59C21.91 5.92 21.51 5.31 21 4.79L20.84 4.61Z" stroke="#5f4b35" strokeWidth="1.7" /></svg>
        </button>
      </div>

      {/* Hero Card */}
      <div style={{ margin: '12px 16px', borderRadius: '28px', minHeight: '200px', background: 'linear-gradient(135deg, #2a1f12, #17110b)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(23,17,11,0.7) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: '#fff', fontFamily: 'var(--font-playfair)', fontSize: '26px', fontWeight: '700', marginBottom: '2px' }}>{coupleName}</h2>
          <p style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)', fontSize: '22px', marginBottom: '8px' }}>Engagement Memories</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-dm-sans)', fontSize: '12px', maxWidth: '65%', lineHeight: 1.5 }}>Every smile, blessing, and heartfelt wish becomes part of this engagement memory.</p>
          <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.2)', alignSelf: 'flex-start' }}>
            <span style={{ color: 'var(--gold)', fontSize: '12px' }}>✨</span>
            <span style={{ color: '#fff', fontSize: '12px', fontFamily: 'var(--font-poppins)', fontWeight: '600' }}>{memories.length} Memories Captured</span>
          </div>
        </div>
      </div>

      {/* Tab Strip */}
      <div style={{ display: 'flex', overflowX: 'auto', padding: '10px 16px', gap: '8px', scrollbarWidth: 'none' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => onChangeTab(t)} style={{
            flexShrink: 0,
            padding: '8px 18px', borderRadius: '999px',
            background: tab === t ? '#17110b' : 'transparent',
            color: tab === t ? '#fff' : 'var(--cream-sub)',
            border: tab === t ? 'none' : '1px solid rgba(184,145,75,.3)',
            fontSize: '12px', fontFamily: 'var(--font-poppins)', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Memory Feed */}
      {(tab === 'all' || tab === 'photos' || tab === 'videos') && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px', padding: '4px 12px' }}>
          {memories.filter(m => {
            if (tab === 'photos') return m.type === 'photo'
            if (tab === 'videos') return m.type === 'video' || m.type === 'boomerang'
            return m.type === 'photo' || m.type === 'video' || m.type === 'boomerang'
          }).map((m, idx) => (
            <div key={m.id} className="memory-card" onClick={() => onPhotoClick(idx)} style={{ aspectRatio: '1/1', background: '#d5c5ae', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
              {m.type === 'photo' ? (
                <img src={m.fileUrl ?? undefined} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              ) : (
                <video src={m.fileUrl ?? undefined} muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              {m.type === 'boomerang' && (
                <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '8px', padding: '3px 8px', borderRadius: '999px', fontFamily: 'var(--font-poppins)', fontWeight: '600' }}>BOOMERANG</div>
              )}
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ color: '#fff', fontSize: '9px', fontFamily: 'var(--font-dm-sans)' }}>by {m.guestName ?? m.guest_name}</div>
                <button onClick={(e) => { e.stopPropagation(); onLike(m.id) }} style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#fff', fontSize: '10px', background: 'rgba(0,0,0,0.35)', borderRadius: '999px', padding: '2px 8px' }}>
                  ♡ {m.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Voice Cards */}
      {(tab === 'all' || tab === 'voice') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px 12px' }}>
          {memories.filter(m => m.type === 'voice').map(m => (
            <div key={m.id} style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(198,162,84,0.2)', overflow: 'hidden' }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px 0' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(145deg,#c6a254,#8a6a2f)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" /><path d="M5 10C5 14.42 8.13 18 12 18C15.87 18 19 14.42 19 10H17C17 13.31 14.76 16 12 16C9.24 16 7 13.31 7 10H5Z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: '700', fontSize: '14px', color: '#17110b' }}>{m.guestName ?? m.guest_name}</div>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: 'var(--cream-sub)' }}>{formatTime(m.uploaded_at)}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontSize: '9px', fontWeight: '600', color: 'var(--gold)', letterSpacing: '0.1em' }}>AUDIO GUESTBOOK</div>
              </div>
              {/* Waveform player */}
              <div style={{ padding: '12px 16px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(145deg,#c6a254,#8a6a2f)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5V19L19 12L8 5Z" /></svg>
                </div>
                <audio src={m.fileUrl ?? undefined} controls style={{ flex: 1, height: '32px' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notes Cards */}
      {(tab === 'all' || tab === 'notes') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px 12px' }}>
          {memories.filter(m => m.type === 'message').map(m => {
            const gName = m.guestName ?? m.guest_name
            const initial = gName.charAt(0).toUpperCase()
            const text = m.caption?.replace('AJ_MESSAGE::', '') ?? ''
            return (
              <div key={m.id} style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(198,162,84,0.2)', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(145deg,#e8d9c0,#d4c2a2)', display: 'grid', placeItems: 'center', color: '#8a6a2f', fontWeight: '700', fontSize: '15px', flexShrink: 0 }}>{initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: '700', fontSize: '13px', color: '#17110b' }}>{gName}</div>
                    <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: 'var(--cream-sub)' }}>{formatTime(m.uploaded_at)}</div>
                  </div>
                  <button onClick={() => onLike(m.id)} style={{ color: 'rgba(198,162,84,0.7)', fontSize: '18px' }}>♡</button>
                </div>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#5f4b35', lineHeight: 1.6 }}>{text}</p>
              </div>
            )
          })}
        </div>
      )}

      {hasMore && (
        <button onClick={onLoadMore} style={{ margin: '16px auto', padding: '10px 28px', borderRadius: '999px', border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-poppins)', fontSize: '12px', fontWeight: '600', background: 'transparent' }}>
          Load More
        </button>
      )}

      {memories.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--cream-sub)', fontFamily: 'var(--font-dm-sans)', fontSize: '14px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✨</div>
          <div>No memories yet. Be the first to capture one!</div>
        </div>
      )}

      <BottomNav activeTab="album" onTabChange={onNavChange} onCaptureClick={onCaptureClick} />
    </div>
  )
}
