'use client'
import React, { useEffect, useState } from 'react'

interface WelcomeProps {
  onStartCapture: () => void
  onViewAlbum: () => void
  onVoiceMemory: () => void
  onWriteNote: () => void
}

export default function WelcomeScreen({ onStartCapture, onViewAlbum, onVoiceMemory, onWriteNote }: WelcomeProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="screen" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,.96), transparent 34%), radial-gradient(circle at 90% 18%, rgba(230,195,126,.38), transparent 30%), linear-gradient(180deg,#fffdf9 0%,#fbf3e8 58%,#efe0ca 100%)' }}>
      <div style={{ padding: 'max(env(safe-area-inset-top, 14px), 14px) 20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Top Bar */}
        <div style={{ alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--glass-card)', borderRadius: '999px', border: '1px solid var(--gold-border)', animation: mounted ? 'cinReveal 0.8s 0.06s both' : 'none' }}>
          <div style={{ width: '16px', height: '16px', background: 'var(--gold)', borderRadius: '4px' }} />
          <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10px', letterSpacing: '0.1em', fontWeight: '500', color: 'var(--cream-sub)' }}>SELA MASA / WEDDING MEMORY</span>
        </div>

        {/* Hero Text */}
        <div style={{ textAlign: 'center', marginTop: '24px', animation: mounted ? 'cinReveal 0.8s 0.14s both' : 'none' }}>
          <p style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'var(--gold)', fontSize: '16px' }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '12px 0' }}>
            <span style={{ width: '30px', height: '1px', background: 'var(--gold-border)' }} />
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--cream-sub)' }}>ENGAGEMENT</span>
            <span style={{ width: '30px', height: '1px', background: 'var(--gold-border)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '56px', color: 'var(--gold)', lineHeight: 1.1 }}>Mim & Azhad</h1>
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px', animation: mounted ? 'cinReveal 0.8s 0.34s both' : 'none' }}>
          <div style={{ padding: '6px 12px', background: 'var(--glass-1)', borderRadius: '999px', border: '1px solid var(--gold-border)', fontSize: '12px', color: 'var(--cream-sub)' }}>31 May 2026</div>
          <div style={{ padding: '6px 12px', background: 'var(--glass-1)', borderRadius: '999px', border: '1px solid var(--gold-border)', fontSize: '12px', color: 'var(--cream-sub)' }}>Tampin, N9</div>
        </div>

        {/* Note Pill */}
        <div className="glass-card" style={{ margin: '20px 0', padding: '12px', borderRadius: '999px', textAlign: 'center', animation: mounted ? 'cinReveal 0.8s 0.48s both' : 'none' }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)' }}>Thank you for being part of this promise</p>
        </div>

        {/* Hero Photo Placeholder */}
        <div style={{ flex: 1, minHeight: '150px', background: '#ccc', borderRadius: '34px 34px 12px 12px', marginBottom: '24px', animation: mounted ? 'cinReveal 0.8s 0.56s both' : 'none' }} />

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: 'var(--safe-bot)', animation: mounted ? 'cinReveal 0.8s 0.64s both' : 'none' }}>
          <button onClick={onStartCapture} style={{ width: '100%', minHeight: '45px', borderRadius: '999px', display: 'grid', gridTemplateColumns: '42px 1fr 24px', alignItems: 'center', padding: '0 16px', background: 'linear-gradient(135deg,#15120e,#28251d 58%,#0f0f0c)', color: '#fff8ec', border: '1px solid rgba(220,186,119,.75)' }}>
            <div style={{ width: '31px', height: '31px', borderRadius: '13px', background: 'linear-gradient(145deg, rgba(255,255,255,.94), rgba(232,209,166,.66))', display: 'grid', placeItems: 'center', color: '#b8914b' }}>📷</div>
            <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '12px', letterSpacing: '0.13em', fontWeight: 700, textTransform: 'uppercase' }}>START CAPTURE</span>
            <span>›</span>
          </button>
          
          <button onClick={onViewAlbum} style={{ width: '100%', minHeight: '45px', borderRadius: '999px', display: 'grid', gridTemplateColumns: '42px 1fr 24px', alignItems: 'center', padding: '0 16px', background: 'rgba(255,255,255,.78)', color: '#1f130c', border: '1px solid rgba(184,145,75,.22)' }}>
            <div style={{ width: '31px', height: '31px', borderRadius: '13px', background: 'linear-gradient(145deg, rgba(255,255,255,.94), rgba(232,209,166,.66))', display: 'grid', placeItems: 'center', color: '#b8914b' }}>🖼️</div>
            <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '12px', letterSpacing: '0.13em', fontWeight: 700, textTransform: 'uppercase' }}>VIEW ALBUM</span>
            <span>›</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button onClick={onVoiceMemory} style={{ width: '100%', minHeight: '45px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: 'rgba(255,255,255,.38)', color: '#6d4c28', border: '1px solid rgba(184,145,75,.16)' }}>
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>VOICE MEMORY</span>
            </button>
            <button onClick={onWriteNote} style={{ width: '100%', minHeight: '45px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: 'rgba(255,255,255,.38)', color: '#6d4c28', border: '1px solid rgba(184,145,75,.16)' }}>
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>WRITE A NOTE</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
