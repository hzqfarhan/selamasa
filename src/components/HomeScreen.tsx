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
      <div style={{ padding: 'max(env(safe-area-inset-top, 20px), 20px) 20px 20px', position: 'relative', zIndex: 2 }}>
        
        <div style={{ background: '#fff', borderRadius: '35px', padding: '30px 20px', color: '#111', position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/asset/profbg.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ background: 'rgba(0,0,0,0.06)', display: 'inline-block', padding: '6px 12px', borderRadius: '999px', fontSize: '9px', fontFamily: 'var(--font-poppins)', letterSpacing: '0.1em', color: '#555' }}>
              ✦ DIGITAL WEDDING MEMORY SERVICE
            </div>
            <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '48px', color: 'var(--gold)', margin: '16px 0 8px' }}>{coupleName}</h1>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#333', lineHeight: 1.5, marginBottom: '20px' }}>
              Welcome to our digital guestbook. Capture your moments, leave voice messages, or write heartfelt notes.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>QR Wedding Album</span>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Guest Memories</span>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Mobile Friendly</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button onClick={onCaptureClick} style={{ background: 'linear-gradient(135deg, var(--gold), #1f4a7c)', border: 'none', borderRadius: '20px', padding: '20px 16px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>📷</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: '600', fontSize: '12px' }}>Capture</span>
          </button>
          <button onClick={onViewAlbum} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--gold-border)', borderRadius: '20px', padding: '20px 16px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>🖼️</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: '600', fontSize: '12px' }}>Album</span>
          </button>
          <button onClick={onVoiceMemory} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--gold-border)', borderRadius: '20px', padding: '20px 16px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>🎤</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: '600', fontSize: '12px' }}>Voice</span>
          </button>
          <button onClick={onWriteNote} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--gold-border)', borderRadius: '20px', padding: '20px 16px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>✍️</span>
            <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: '600', fontSize: '12px' }}>Note</span>
          </button>
        </div>

        <div style={{ marginTop: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '20px', border: '1px solid var(--gold-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '20px', color: 'var(--cream-text)', marginBottom: '8px' }}>How it works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>1</span>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)' }}>Click Capture to take photos or boomerangs</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>2</span>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)' }}>Record voice messages with the Voice button</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>3</span>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)' }}>Write heartfelt notes for the couple</span>
            </div>
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
