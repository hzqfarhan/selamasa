'use client'
import React from 'react'
import BottomNav from './BottomNav'
import FallingLeaves from './FallingLeaves'

interface HomeProps {
  onNavChange: (tab: 'home' | 'album' | 'voice' | 'profile') => void
  onCaptureClick: () => void
  onViewAlbum: () => void
  onVoiceMemory: () => void
  onWriteNote: () => void
  coupleName: string
}

export default function HomeScreen({ onNavChange, onCaptureClick, onViewAlbum, onVoiceMemory, onWriteNote, coupleName }: HomeProps) {
  return (
    <div className="screen" style={{ background: 'url(/asset/bg.png) center/cover no-repeat', paddingBottom: '90px', position: 'relative' }}>
      <FallingLeaves />
      <style>{`
        .home-inner {
          padding: max(env(safe-area-inset-top,20px),20px) clamp(16px,4vw,40px) 20px;
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
        }
        .home-action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 24px;
        }
        @media (min-width: 768px) {
          .home-action-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
        .home-action-btn {
          background: rgba(255,255,255,0.10);
          border: 1px solid var(--gold-border);
          border-radius: 20px;
          padding: 20px 16px;
          color: #fff;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .home-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(47,120,196,0.18);
        }
        .home-action-btn.primary {
          background: linear-gradient(135deg, var(--gold), #1f4a7c);
          border: none;
        }
        @media (min-width: 768px) {
          .home-action-btn { padding: 28px 16px; border-radius: 24px; }
          .home-action-btn .btn-icon { font-size: 40px; }
        }
        .home-how-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .home-how-grid { flex-direction: row; gap: 16px; }
          .home-how-grid > div { flex: 1; }
        }
      `}</style>

      <div className="home-inner">
        {/* Hero card */}
        <div style={{ background: '#fff', borderRadius: '35px', padding: '30px 20px', color: '#111', position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/asset/profbg.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ background: 'rgba(0,0,0,0.06)', display: 'inline-block', padding: '6px 12px', borderRadius: '999px', fontSize: '9px', fontFamily: 'var(--font-poppins)', letterSpacing: '0.1em', color: '#555' }}>
              ✦ DIGITAL WEDDING MEMORY SERVICE
            </div>
            <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: 'clamp(40px,6vw,58px)', color: 'var(--gold)', margin: '16px 0 8px' }}>{coupleName}</h1>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(12px,1.5vw,14px)', color: '#333', lineHeight: 1.6, marginBottom: '20px', maxWidth: '540px' }}>
              Welcome to our digital guestbook. Capture your moments, leave voice messages, or write heartfelt notes.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>QR Wedding Album</span>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Guest Memories</span>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Mobile Friendly</span>
            </div>
          </div>
        </div>

        {/* Action grid — 2 cols mobile, 4 cols tablet+ */}
        <div className="home-action-grid">
          <button onClick={onCaptureClick} className="home-action-btn primary">
            <span className="btn-icon" style={{ fontSize: '32px' }}>📷</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '12px' }}>Capture</span>
          </button>
          <button onClick={onViewAlbum} className="home-action-btn">
            <span className="btn-icon" style={{ fontSize: '32px' }}>🖼️</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '12px' }}>Album</span>
          </button>
          <button onClick={onVoiceMemory} className="home-action-btn">
            <span className="btn-icon" style={{ fontSize: '32px' }}>🎤</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '12px' }}>Voice</span>
          </button>
          <button onClick={onWriteNote} className="home-action-btn">
            <span className="btn-icon" style={{ fontSize: '32px' }}>✍️</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '12px' }}>Note</span>
          </button>
        </div>

        {/* How it works */}
        <div style={{ marginTop: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '20px 24px', border: '1px solid var(--gold-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(18px,2.5vw,22px)', color: 'var(--cream-text)', marginBottom: '16px' }}>How it works</h2>
          <div className="home-how-grid">
            {[
              { n: '1', t: 'Tap Capture to take photos or boomerangs' },
              { n: '2', t: 'Record voice messages with the Voice button' },
              { n: '3', t: 'Write heartfelt notes for the couple' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>{s.n}</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(12px,1.4vw,13px)', color: 'var(--cream-sub)', lineHeight: 1.55 }}>{s.t}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'var(--gold)' }}>
          Every moment, forever cherished ♡
        </p>
      </div>

      <BottomNav activeTab="home" onTabChange={onNavChange} onCaptureClick={onCaptureClick} />
    </div>
  )
}
