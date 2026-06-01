'use client'
import React, { useState } from 'react'

interface CaptureReviewProps {
  mediaUrl: string | null
  mediaBlob: Blob | null
  type: 'photo' | 'boomerang'
  guestName: string
  onRetake: () => void
  onShare: (caption: string) => Promise<void> | void
}

export default function CaptureReviewScreen({ mediaUrl, mediaBlob, type, guestName, onRetake, onShare }: CaptureReviewProps) {
  const [caption, setCaption] = useState('')
  const sizeWarning = mediaBlob && mediaBlob.size > 15 * 1024 * 1024

  return (
    <div className="screen" style={{ background: '#000' }}>
      {type === 'photo' && mediaUrl ? (
        <img src={mediaUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} alt="Capture" />
      ) : (
        mediaUrl && <video src={mediaUrl} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
      )}

      {type === 'boomerang' && (
        <div style={{ position: 'absolute', top: 'max(env(safe-area-inset-top, 14px), 14px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--glass-card)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '999px', color: '#fff', fontSize: '12px', zIndex: 10 }}>
          🔁 Boomerang
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '20px', paddingBottom: 'max(env(safe-area-inset-bottom, 20px), 20px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: 'var(--glass-2)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '999px', color: '#fff', fontSize: '12px' }}>
          👤 {guestName}
        </div>

        {sizeWarning && (
          <div style={{ background: 'rgba(255,0,0,0.6)', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}>
            ⚠ File is large — upload may be slow on mobile
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <textarea 
            placeholder={type === 'boomerang' ? "Write a wish..." : "Add a caption..."}
            value={caption}
            onChange={e => setCaption(e.target.value.slice(0, 280))}
            style={{ width: '100%', height: '80px', background: 'var(--glass-card)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '12px', color: '#fff', fontFamily: 'var(--font-dm-sans)', resize: 'none', border: '1px solid var(--gold-border)' }}
          />
          <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>
            {caption.length}/280
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '8px' }}>
          <button onClick={onRetake} style={{ padding: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Retake</button>
          <a href={mediaUrl || '#'} download={`selamasa-${Date.now()}.${type === 'photo' ? 'jpg' : 'webm'}`} style={{ padding: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', display: 'grid', placeItems: 'center' }}>Save</a>
          <ShareButton caption={caption} onShare={onShare} />
        </div>

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function ShareButton({ caption, onShare }: { caption: string; onShare: (caption: string) => Promise<void> | void }) {
  const [uploading, setUploading] = useState(false)
  const handleClick = async () => {
    if (uploading) return
    setUploading(true)
    try { await onShare(caption) } finally { setUploading(false) }
  }
  return (
    <button
      onClick={handleClick}
      disabled={uploading}
      style={{ padding: '14px', background: uploading ? 'rgba(74,144,226,0.5)' : 'linear-gradient(135deg, var(--gold), #1e4e8c)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
    >
      {uploading ? (
        <>
          <div style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
          Uploading…
        </>
      ) : 'Share Memory'}
    </button>
  )
}
