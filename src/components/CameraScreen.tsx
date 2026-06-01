'use client'
import React, { useEffect, useState } from 'react'
import { useCamera } from '@/hooks/useCamera'

interface CameraProps {
  onCapturePhoto: (dataUrl: string, filter: string) => void
  onCaptureBoomerang: (blob: Blob) => void
  onBack: () => void
  guestName: string
  coupleName: string
  allowedFilters: string[]
}

export default function CameraScreen({ onCapturePhoto, onCaptureBoomerang, onBack, guestName, coupleName, allowedFilters }: CameraProps) {
  const { videoRef, startCamera, stopCamera, flipCamera, takePhoto, startBoomerang, isRecording, facingMode } = useCamera()
  const [mode, setMode] = useState<'photo' | 'boomerang'>('photo')
  const [selectedFilter, setSelectedFilter] = useState('none')
  const [filterImg, setFilterImg] = useState<HTMLImageElement | null>(null)
  
  useEffect(() => {
    startCamera('environment')
    return () => stopCamera()
  }, [startCamera, stopCamera])

  useEffect(() => {
    if (selectedFilter !== 'none') {
      const img = new Image()
      img.src = `/filters/filter-${selectedFilter}.png`
      img.onload = () => setFilterImg(img)
    } else {
      setFilterImg(null)
    }
  }, [selectedFilter])

  const handleShutter = async () => {
    if (mode === 'photo') {
      const flash = document.getElementById('flash-overlay')
      if (flash) {
        flash.style.opacity = '1'
        setTimeout(() => flash.style.opacity = '0', 88)
      }
      const dataUrl = takePhoto(filterImg || undefined, coupleName)
      if (dataUrl) onCapturePhoto(dataUrl, selectedFilter)
    } else {
      if (!isRecording) {
        const ring = document.getElementById('boom-ring') as any
        if (ring) {
          ring.style.transition = 'stroke-dashoffset 2s linear'
          ring.style.strokeDashoffset = '0'
        }
        const blob = await startBoomerang()
        if (ring) {
          ring.style.transition = 'none'
          ring.style.strokeDashoffset = '226'
        }
        onCaptureBoomerang(blob)
      }
    }
  }

  return (
    <div className="screen" style={{ background: '#000', overflow: 'hidden' }}>
      <video ref={videoRef} playsInline autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }} />
      <div id="flash-overlay" style={{ position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none', transition: 'opacity 0.08s' }} />
      {filterImg && mode === 'photo' && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${filterImg.src})`, backgroundSize: 'cover', pointerEvents: 'none' }} />
      )}

      {/* Top Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 'max(env(safe-area-inset-top, 14px), 14px) 20px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <button onClick={onBack} style={{ width: '38px', height: '38px', background: 'var(--glass-1)', backdropFilter: 'blur(8px)', borderRadius: '50%', color: '#fff', fontSize: '18px' }}>←</button>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: '#fff', fontSize: '18px', margin: 0 }}>SelaMasa</h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--gold)', fontSize: '12px', margin: '2px 0' }}>{coupleName}</p>
          <div style={{ background: 'var(--glass-2)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '4px 10px', display: 'inline-block', color: '#fff', fontSize: '10px', marginTop: '4px' }}>👤 {guestName}</div>
        </div>
        <div style={{ width: '38px' }}>
          {isRecording && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'red', fontSize: '10px', animation: 'recPulse 1s infinite' }}><div style={{ width: '8px', height: '8px', background: 'red', borderRadius: '50%' }}/> REC</div>}
        </div>
      </div>

      {/* Bottom Controls */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 'max(env(safe-area-inset-bottom, 14px), 14px)', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '4px', marginBottom: '20px' }}>
          <button onClick={() => setMode('photo')} style={{ padding: '6px 16px', borderRadius: '999px', background: mode === 'photo' ? '#fff' : 'transparent', color: mode === 'photo' ? '#000' : '#fff', fontSize: '12px', fontWeight: 'bold' }}>📷 Photo</button>
          <button onClick={() => setMode('boomerang')} style={{ padding: '6px 16px', borderRadius: '999px', background: mode === 'boomerang' ? '#fff' : 'transparent', color: mode === 'boomerang' ? '#000' : '#fff', fontSize: '12px', fontWeight: 'bold' }}>🔁 Boomerang</button>
        </div>

        {mode === 'photo' ? (
          <div style={{ display: 'flex', overflowX: 'auto', width: '100%', padding: '0 20px', gap: '12px', marginBottom: '20px', scrollSnapType: 'x mandatory' }}>
            {allowedFilters.map(f => (
              <div key={f} onClick={() => setSelectedFilter(f)} style={{ scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '13px', background: f === 'none' ? '#333' : `url(/filters/thumbs/filter-${f}.jpg) center/cover`, border: selectedFilter === f ? '2.5px solid var(--gold)' : '2px solid transparent', boxShadow: selectedFilter === f ? '0 0 10px var(--gold)' : 'none', display: 'grid', placeItems: 'center' }}>
                  {f === 'none' && <span style={{ color: '#fff' }}>✕</span>}
                </div>
                <span style={{ color: selectedFilter === f ? 'var(--gold)' : '#fff', fontSize: '8.5px', textTransform: 'capitalize' }}>{f}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#fff', fontSize: '12px', marginBottom: '40px' }}>🔒 Filter not available in Boomerang mode</div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 40px', marginBottom: '20px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'relative' }} onClick={handleShutter}>
            {mode === 'boomerang' && (
              <svg width="86" height="86" style={{ position: 'absolute', top: '-4px', left: '-4px', pointerEvents: 'none' }}>
                <circle id="boom-ring" cx="43" cy="43" r="36" fill="none" stroke="red" strokeWidth="4" strokeDasharray="226" strokeDashoffset="226" transform="rotate(-90 43 43)" />
              </svg>
            )}
            <button style={{ width: '78px', height: '78px', borderRadius: '50%', border: mode === 'boomerang' && isRecording ? '4px solid red' : '4px solid #fff', display: 'grid', placeItems: 'center', padding: '4px' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: mode === 'boomerang' && isRecording ? 'red' : '#fff', animation: isRecording ? 'recPulse 1s infinite' : 'none' }} />
            </button>
          </div>
          <button onClick={flipCamera} style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', color: '#fff', fontSize: '20px' }}>🔄</button>
        </div>
      </div>
    </div>
  )
}
