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

export default function GalleryScreen({ slug, coupleName, memories, tab, onChangeTab, onLoadMore, hasMore, onLike, onBack, onCaptureClick, onNavChange, onPhotoClick }: GalleryProps) {
  const tabs = ['all', 'photos', 'videos', 'audio', 'notes']

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#fffdf9 0%,#fbf3e8 58%,#efe0ca 100%)', display: 'flex', flexDirection: 'column', paddingBottom: '90px' }}>
      
      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, padding: 'max(env(safe-area-inset-top, 14px), 14px) 20px 10px', background: 'rgba(255,253,249,0.8)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--glass-card)', border: '1px solid var(--gold-border)' }}>←</button>
        <span style={{ fontFamily: 'var(--font-playfair)', fontWeight: 'bold', fontSize: '16px', color: 'var(--cream-text)' }}>SELA MASA</span>
        <span style={{ color: 'var(--gold)' }}>♡</span>
      </div>

      {/* Hero Card */}
      <div style={{ margin: '12px 16px', borderRadius: '30px', height: '246px', background: 'var(--cream-bg2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(23,17,11,0.8) 0%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ color: 'var(--gold)', fontFamily: 'var(--font-poppins)', fontSize: '10px', letterSpacing: '0.2em' }}>ENGAGEMENT MEMORIES</h3>
          <h2 style={{ color: '#fff', fontFamily: 'var(--font-great-vibes)', fontSize: '42px', margin: '4px 0' }}>{coupleName}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-dm-sans)', fontSize: '12px', maxWidth: '60%' }}>Thank you for capturing these beautiful moments with us.</p>
          <div style={{ marginTop: '16px', background: 'var(--gold)', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', alignSelf: 'flex-start', fontWeight: 'bold' }}>{memories.length} Memories</div>
        </div>
      </div>

      {/* Tab Strip */}
      <div style={{ display: 'flex', overflowX: 'auto', padding: '10px 16px', gap: '8px', scrollSnapType: 'x mandatory' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => onChangeTab(t)} style={{ scrollSnapAlign: 'start', padding: '8px 20px', borderRadius: '999px', background: tab === t ? 'var(--bg)' : 'transparent', color: tab === t ? 'var(--gold)' : 'var(--cream-sub)', border: tab === t ? 'none' : '1px solid var(--gold-border)', fontSize: '12px', fontFamily: 'var(--font-poppins)', textTransform: 'capitalize', fontWeight: 'bold' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: tab === 'notes' || tab === 'audio' ? '1fr' : '1fr 1fr', gap: '9px', padding: '10px 12px' }}>
        {memories.map((m, idx) => {
          if (m.type === 'photo' || m.type === 'boomerang' || m.type === 'video') {
            return (
              <div key={m.id} className="memory-card" onClick={() => onPhotoClick(idx)} style={{ aspectRatio: '1/1', background: '#ccc' }}>
                {m.type === 'photo' ? (
                  <img src={m.fileUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <video src={m.fileUrl} className="album-video" muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                {m.type === 'boomerang' && (
                  <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 2, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '8px', padding: '4px 8px', borderRadius: '999px' }}>BOOMERANG</div>
                )}
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ color: '#fff', fontSize: '9px', fontFamily: 'var(--font-dm-sans)' }}>Captured by {m.guestName}</div>
                    {m.caption && <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '8px' }}>{m.caption}</div>}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onLike(m.id) }} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fff', fontSize: '10px' }}>
                    ♡ {m.likes}
                  </button>
                </div>
              </div>
            )
          } else if (m.type === 'voice') {
            return (
              <div key={m.id} className="glass-card" style={{ padding: '16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #8a6a2f)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '16px' }}>🎤</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--cream-text)' }}>{m.guestName}</div>
                  <div style={{ fontSize: '10px', color: 'var(--cream-sub)' }}>Voice Memory</div>
                  <audio src={m.fileUrl} controls style={{ width: '100%', height: '24px', marginTop: '8px' }} />
                </div>
              </div>
            )
          } else if (m.type === 'message') {
            return (
              <div key={m.id} style={{ background: '#fff', padding: '16px', borderRadius: '20px', border: '1px solid var(--gold-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--cream-bg2)', display: 'grid', placeItems: 'center', color: 'var(--cream-sub)', fontWeight: 'bold' }}>{m.guestName.charAt(0).toUpperCase()}</div>
                  <div style={{ flex: 1, fontSize: '12px', fontWeight: 'bold', color: 'var(--cream-text)' }}>{m.guestName}</div>
                  <button onClick={(e) => { e.stopPropagation(); onLike(m.id) }} style={{ color: 'var(--gold)' }}>♡ {m.likes}</button>
                </div>
                <p style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '14px', color: 'var(--cream-sub)' }}>{m.caption?.replace('AJ_MESSAGE::', '')}</p>
              </div>
            )
          }
        })}
      </div>

      {hasMore && (
        <button onClick={onLoadMore} style={{ margin: '20px auto', padding: '10px 24px', borderRadius: '999px', border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-poppins)', fontSize: '12px' }}>
          Load More
        </button>
      )}

      <BottomNav activeTab="album" onTabChange={onNavChange} onCaptureClick={onCaptureClick} />
    </div>
  )
}
