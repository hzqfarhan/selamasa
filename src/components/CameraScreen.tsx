'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useCamera } from '@/hooks/useCamera'

interface CameraProps {
  onCapturePhoto: (dataUrl: string, filter: string) => void
  onCaptureBoomerang: (blob: Blob) => void
  onBack: () => void
  guestName: string
  coupleName: string
  allowedFilters: string[]
}

const FILTER_LABELS: Record<string, string> = {
  none: 'ORIGINAL',
  floral: 'FLORAL',
  gold: 'GOLD',
  vintage: 'VINTAGE',
  romantic: 'ROMANTIC',
  elegant: 'ELEGANT',
}

export default function CameraScreen({
  onCapturePhoto,
  onCaptureBoomerang,
  onBack,
  guestName,
  coupleName,
  allowedFilters,
}: CameraProps) {
  const {
    videoRef,
    startCamera,
    stopCamera,
    flipCamera,
    takePhoto,
    startBoomerang,
    pickFromGallery,
    isRecording,
    facingMode,
    cameraReady,
    cameraError,
    hasFrontCamera,
  } = useCamera()

  const [mode, setMode] = useState<'photo' | 'boomerang'>('photo')
  const [selectedFilter, setSelectedFilter] = useState('none')
  const [filterImg, setFilterImg] = useState<HTMLImageElement | null>(null)
  const [boomProgress, setBoomProgress] = useState(0)
  const [isCapturing, setIsCapturing] = useState(false)
  const [flashActive, setFlashActive] = useState(false)
  const boomIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Start camera on mount
  useEffect(() => {
    startCamera('environment')
    return () => stopCamera()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Load filter overlay image when filter changes
  useEffect(() => {
    if (selectedFilter === 'none') {
      setFilterImg(null)
      return
    }
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = `/filters/filter-${selectedFilter}.png`
    img.onload = () => setFilterImg(img)
    img.onerror = () => setFilterImg(null)
  }, [selectedFilter])

  // ── Shutter ────────────────────────────────────────────────────────────
  const handleShutter = useCallback(async () => {
    if (isCapturing || isRecording) return
    setIsCapturing(true)

    if (mode === 'photo') {
      // Flash feedback
      setFlashActive(true)
      setTimeout(() => setFlashActive(false), 120)

      const dataUrl = takePhoto(filterImg, coupleName)
      if (dataUrl) {
        onCapturePhoto(dataUrl, selectedFilter)
      }
      setIsCapturing(false)
    } else {
      // Boomerang — animate progress ring
      setBoomProgress(0)
      const startTime = Date.now()
      boomIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime
        setBoomProgress(Math.min(elapsed / 2000, 1))
      }, 30)

      try {
        const blob = await startBoomerang()
        clearInterval(boomIntervalRef.current!)
        setBoomProgress(0)
        onCaptureBoomerang(blob)
      } catch {
        clearInterval(boomIntervalRef.current!)
        setBoomProgress(0)
      }
      setIsCapturing(false)
    }
  }, [isCapturing, isRecording, mode, filterImg, selectedFilter, coupleName, takePhoto, startBoomerang, onCapturePhoto, onCaptureBoomerang])

  // ── Gallery picker ─────────────────────────────────────────────────────
  const handleGalleryPick = useCallback(async () => {
    const result = await pickFromGallery()
    if (result) {
      onCapturePhoto(result.dataUrl, selectedFilter)
    }
  }, [pickFromGallery, onCapturePhoto, selectedFilter])

  // Progress ring circumference (r=34 → C = 2π×34 ≈ 213.6)
  const RING_C = 213.6
  const ringOffset = RING_C * (1 - boomProgress)

  return (
    <div
      className="screen"
      style={{ background: '#000', overflow: 'hidden', userSelect: 'none' }}
    >
      {/* ── Live video feed ─────────────────────────────────────────── */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
          transition: 'opacity 0.3s',
          opacity: cameraReady ? 1 : 0,
        }}
      />

      {/* ── Filter colour overlay ─────────────────────────────────── */}
      {filterImg && mode === 'photo' && (
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${filterImg.src})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.65,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ── Flash overlay ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: '#fff',
          opacity: flashActive ? 0.9 : 0,
          pointerEvents: 'none',
          transition: flashActive ? 'none' : 'opacity 0.25s',
        }}
      />

      {/* ── Camera not ready states ───────────────────────────────── */}
      {!cameraReady && !cameraError && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#0a0806' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: '3px solid transparent', borderTopColor: 'var(--gold)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-poppins)', fontSize: '13px' }}>Starting camera…</p>
          </div>
        </div>
      )}

      {cameraError && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#0a0806', padding: '32px' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '48px' }}>📷</div>
            <p style={{ color: '#fff', fontFamily: 'var(--font-dm-sans)', fontSize: '14px', lineHeight: 1.6 }}>{cameraError}</p>
            <button
              onClick={handleGalleryPick}
              style={{ padding: '14px 28px', borderRadius: '999px', background: 'var(--gold)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: '700', fontSize: '13px' }}
            >
              Pick from Gallery Instead
            </button>
            <button
              onClick={onBack}
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-poppins)', fontSize: '12px' }}
            >
              Go Back
            </button>
          </div>
        </div>
      )}

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: 'max(env(safe-area-inset-top,14px),14px) 16px 12px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.72), transparent)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <button
          onClick={onBack}
          style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-poppins)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>Sela Masa</div>
          <div style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '20px', color: '#fff', lineHeight: 1.1 }}>{coupleName}</div>
          <div style={{ marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', padding: '2px 10px' }}>
            <span style={{ color: 'var(--gold)', fontSize: '8px' }}>P</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontFamily: 'var(--font-poppins)', fontWeight: '600', letterSpacing: '0.1em' }}>PREMIUM</span>
          </div>
        </div>

        {/* REC indicator */}
        <div style={{ width: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '8px' }}>
          {isRecording && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff3b30', animation: 'recPulse 1s infinite' }} />
              <span style={{ color: '#ff3b30', fontSize: '10px', fontWeight: '700', fontFamily: 'var(--font-poppins)' }}>REC</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom controls ───────────────────────────────────────────── */}
      {!cameraError && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          paddingBottom: 'max(env(safe-area-inset-bottom,16px),16px)',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px',
        }}>

          {/* Photo / Boomerang toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', padding: '3px', marginBottom: '16px', backdropFilter: 'blur(8px)' }}>
            {(['photo', 'boomerang'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: '7px 20px', borderRadius: '999px',
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? '#000' : '#fff',
                  fontSize: '12px', fontWeight: '700',
                  fontFamily: 'var(--font-poppins)',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s',
                }}
              >
                {m === 'photo' ? '📷 PHOTO' : '🔁 BOOMERANG'}
              </button>
            ))}
          </div>

          {/* Filter strip — only in photo mode */}
          {mode === 'photo' && (
            <div style={{
              display: 'flex', overflowX: 'auto', width: '100%',
              padding: '0 20px', gap: '12px', marginBottom: '20px',
              scrollbarWidth: 'none',
            }}>
              {allowedFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flexShrink: 0 }}
                >
                  <div style={{
                    width: '58px', height: '58px', borderRadius: '16px',
                    background: f === 'none'
                      ? 'linear-gradient(145deg,#101824,#1a2432)'
                      : `url(/filters/thumbs/filter-${f}.jpg) center/cover`,
                    border: selectedFilter === f
                      ? '2.5px solid var(--gold)'
                      : '2px solid rgba(255,255,255,0.15)',
                    boxShadow: selectedFilter === f ? '0 0 12px rgba(74,144,226,0.7)' : 'none',
                    display: 'grid', placeItems: 'center',
                    transition: 'all 0.2s',
                    overflow: 'hidden',
                  }}>
                    {f === 'none' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <line x1="4" y1="4" x2="20" y2="20" stroke={selectedFilter === 'none' ? 'var(--gold)' : 'rgba(255,255,255,0.5)'} strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="20" y1="4" x2="4" y2="20" stroke={selectedFilter === 'none' ? 'var(--gold)' : 'rgba(255,255,255,0.5)'} strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{
                    color: selectedFilter === f ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                    fontSize: '8px', fontFamily: 'var(--font-poppins)', fontWeight: '600',
                    letterSpacing: '0.06em',
                  }}>
                    {FILTER_LABELS[f] ?? f.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          )}

          {mode === 'boomerang' && (
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'var(--font-poppins)', marginBottom: '20px', letterSpacing: '0.06em' }}>
              TAP TO RECORD 2-SECOND CLIP
            </div>
          )}

          {/* Main control row: gallery | shutter | flip */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '0 36px', marginBottom: '8px',
          }}>
            {/* Gallery picker */}
            <button
              onClick={handleGalleryPick}
              title="Pick from gallery"
              style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="8" rx="2" fill="rgba(255,255,255,0.8)" />
                <rect x="13" y="3" width="8" height="8" rx="2" fill="rgba(255,255,255,0.8)" />
                <rect x="3" y="13" width="8" height="8" rx="2" fill="rgba(255,255,255,0.8)" />
                <rect x="13" y="13" width="8" height="8" rx="2" fill="rgba(255,255,255,0.8)" />
              </svg>
            </button>

            {/* Shutter button */}
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleShutter}>
              {/* Boomerang progress ring */}
              {mode === 'boomerang' && (
                <svg
                  width="92" height="92"
                  style={{ position: 'absolute', top: '-4px', left: '-4px', pointerEvents: 'none', transform: 'rotate(-90deg)' }}
                >
                  <circle cx="46" cy="46" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                  <circle
                    cx="46" cy="46" r="34"
                    fill="none" stroke="#ff3b30" strokeWidth="4"
                    strokeDasharray={RING_C}
                    strokeDashoffset={ringOffset}
                    strokeLinecap="round"
                    style={{ transition: isRecording ? 'none' : 'stroke-dashoffset 0.1s' }}
                  />
                </svg>
              )}
              <div style={{
                width: '84px', height: '84px', borderRadius: '50%',
                border: `4px solid ${isRecording ? '#ff3b30' : '#fff'}`,
                display: 'grid', placeItems: 'center', padding: '5px',
                transition: 'border-color 0.2s',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: isRecording ? '#ff3b30' : '#fff',
                  animation: isRecording ? 'recPulse 1s infinite' : 'none',
                  transition: 'background 0.2s, transform 0.1s',
                  transform: isCapturing ? 'scale(0.88)' : 'scale(1)',
                }} />
              </div>
            </div>

            {/* Flip camera */}
            <button
              onClick={flipCamera}
              title="Flip camera"
              disabled={!hasFrontCamera}
              style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,0.2)',
                opacity: hasFrontCamera ? 1 : 0.3,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 7L16 3L12 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 3V14C16 15.1 15.1 16 14 16H4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M4 17L8 21L12 17" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 21V10C8 8.9 8.9 8 10 8H20" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* View album shortcut */}
          <button
            onClick={onBack}
            style={{
              marginTop: '4px',
              padding: '7px 20px', borderRadius: '999px',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              color: '#fff', fontFamily: 'var(--font-poppins)', fontSize: '11px', fontWeight: '600',
              letterSpacing: '0.08em', border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            🖼 VIEW ALBUM
          </button>
        </div>
      )}

      {/* ── Spin keyframe inline style ────────────────────────────────── */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
