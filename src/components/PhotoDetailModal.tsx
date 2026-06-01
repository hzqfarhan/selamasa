'use client'
import React from 'react'
import { Memory } from '@/types'

interface ModalProps {
  memory: Memory
  currentIndex: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function PhotoDetailModal({ memory, currentIndex, total, onClose, onPrev, onNext }: ModalProps) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(2px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={{ position: 'absolute', top: 'max(env(safe-area-inset-top, 20px), 20px)', right: '20px', display: 'flex', gap: '12px', zIndex: 10 }}>
        {memory.fileUrl && (
          <a href={memory.fileUrl ?? undefined} download={`selamasa-${memory.id}`} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '18px' }}>⬇</a>
        )}
        <button onClick={onClose} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '18px' }}>✕</button>
      </div>

      <div style={{ position: 'absolute', top: 'max(env(safe-area-inset-top, 20px), 20px)', left: '20px', background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', borderRadius: '999px', fontSize: '12px' }}>
        {currentIndex + 1} / {total}
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '430px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {memory.type === 'photo' ? (
          <img src={memory.fileUrl ?? undefined} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
        ) : (
          <video src={memory.fileUrl ?? undefined} controls autoPlay loop playsInline style={{ width: '100%', maxHeight: '80vh' }} />
        )}

        <button onClick={(e) => { e.stopPropagation(); onPrev() }} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '20px' }}>‹</button>
        <button onClick={(e) => { e.stopPropagation(); onNext() }} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '20px' }}>›</button>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', paddingBottom: 'max(env(safe-area-inset-bottom, 20px), 20px)', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff' }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'var(--font-dm-sans)' }}>{memory.guestName ?? memory.guest_name}</div>
        {memory.caption && <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>{memory.caption}</div>}
      </div>
    </div>
  )
}
