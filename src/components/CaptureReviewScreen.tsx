'use client'
import React, { useState } from 'react'

interface CaptureReviewProps {
  mediaUrl: string | null
  mediaBlob: Blob | null
  type: 'photo' | 'boomerang'
  guestName: string
  onRetake: () => void
  onShare: (caption: string) => void
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
          <button onClick={() => onShare(caption)} style={{ padding: '14px', background: 'linear-gradient(135deg, var(--gold), #a67c00)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Share Memory</button>
        </div>

      </div>
    </div>
  )
}
