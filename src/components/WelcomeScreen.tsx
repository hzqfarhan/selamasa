'use client'
import React, { useEffect, useState } from 'react'

interface WelcomeProps {
  onStartCapture: () => void
  onViewAlbum: () => void
  onVoiceMemory: () => void
  onWriteNote: () => void
}

const COUPLE = 'Nureen & Nizam'
const DATE = '01 . 06 . 2026'
const LOCATION = 'Kuala Lumpur'
const EVENT_TYPE = 'MAJLIS PERKAHWINAN'

export default function WelcomeScreen({ onStartCapture, onViewAlbum, onVoiceMemory, onWriteNote }: WelcomeProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #fffdf9 0%, #fbf3e8 60%, #ede0ca 100%)', overflowY: 'auto' }}>
      <div style={{ padding: 'max(env(safe-area-inset-top,14px),14px) 20px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

        {/* Top Brand Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '4px', animation: mounted ? 'cinReveal 0.7s 0s both' : 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/asset/selamasa.png"
            alt="Sela Masa Logo"
            style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '12px' }}
          />
          <div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: '700', fontSize: '14px', letterSpacing: '0.2em', color: '#17110b' }}>SELA MASA</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontSize: '9px', letterSpacing: '0.15em', color: 'var(--cream-sub)' }}>ENGAGEMENT MEMORY</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0', animation: mounted ? 'cinReveal 0.7s 0.08s both' : 'none' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--gold-border)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '10px' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--gold-border)' }} />
        </div>

        {/* Arabic + Event Label */}
        <div style={{ textAlign: 'center', animation: mounted ? 'cinReveal 0.7s 0.12s both' : 'none' }}>
          <p style={{ fontFamily: 'serif', fontSize: '15px', color: 'var(--gold)', letterSpacing: '0.04em', marginBottom: '6px' }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '9px', fontWeight: '600', letterSpacing: '0.2em', color: 'var(--cream-sub)', textTransform: 'uppercase' }}>{EVENT_TYPE}</p>
        </div>

        {/* Couple Name */}
        <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '52px', color: 'var(--gold)', textAlign: 'center', lineHeight: 1.1, marginTop: '4px', marginBottom: '12px', animation: mounted ? 'cinReveal 0.7s 0.2s both' : 'none' }}>
          {COUPLE}
        </h1>

        {/* Date & Location Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '14px', animation: mounted ? 'cinReveal 0.7s 0.26s both' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', background: 'var(--glass-card)', borderRadius: '999px', border: '1px solid var(--gold-border)', fontSize: '11px', color: 'var(--cream-sub)' }}>
            <span>📅</span> {DATE}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', background: 'var(--glass-card)', borderRadius: '999px', border: '1px solid var(--gold-border)', fontSize: '11px', color: 'var(--cream-sub)' }}>
            <span>📍</span> {LOCATION}
          </div>
        </div>

        {/* Welcome Note Card */}
        <div style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.7)', borderRadius: '16px', border: '1px solid var(--gold-border)', marginBottom: '16px', animation: mounted ? 'cinReveal 0.7s 0.32s both' : 'none' }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)', lineHeight: 1.6 }}>Thank you for being part of this promise</p>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: 'rgba(95,75,53,0.7)', lineHeight: 1.6 }}>A promise begins, a memory stays forever</p>
        </div>

        {/* Couple Photo */}
        <div style={{ borderRadius: '28px', overflow: 'hidden', marginBottom: '20px', aspectRatio: '1/1', background: 'linear-gradient(135deg, var(--cream-bg2), var(--cream-bg3))', position: 'relative', animation: mounted ? 'cinReveal 0.7s 0.4s both' : 'none', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/asset/front.jpg"
            alt={COUPLE}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          {/* Fallback overlay if no image */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(23,17,11,0.5) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(198,162,84,0.9)', borderRadius: '999px', padding: '4px 14px', fontSize: '11px', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: '600' }}>
              ✨ Capture Your Memory
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '24px', animation: mounted ? 'cinReveal 0.7s 0.5s both' : 'none' }}>

          {/* Start Capture — primary */}
          <button onClick={onStartCapture} style={{
            width: '100%', minHeight: '52px', borderRadius: '999px',
            display: 'grid', gridTemplateColumns: '44px 1fr 28px', alignItems: 'center', padding: '0 16px',
            background: 'linear-gradient(135deg,#15120e,#28251d 58%,#0f0f0c)',
            color: '#fff8ec', border: '1px solid rgba(220,186,119,.7)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
          }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '13px', background: 'linear-gradient(145deg,rgba(255,255,255,.96),rgba(232,209,166,.7))', display: 'grid', placeItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 19C23 20.1 22.1 21 21 21H3C1.9 21 1 20.1 1 19V8C1 6.9 1.9 6 3 6H7L9 3H15L17 6H21C22.1 6 23 6.9 23 8V19Z" stroke="#b8914b" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="13" r="4" stroke="#b8914b" strokeWidth="2" /></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '12px', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase' }}>START CAPTURE</span>
            <span style={{ fontSize: '18px', color: 'var(--gold)' }}>›</span>
          </button>

          {/* View Album */}
          <button onClick={onViewAlbum} style={{
            width: '100%', minHeight: '52px', borderRadius: '999px',
            display: 'grid', gridTemplateColumns: '44px 1fr 28px', alignItems: 'center', padding: '0 16px',
            background: 'rgba(255,255,255,0.82)', color: '#17110b', border: '1px solid rgba(184,145,75,.25)',
          }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '13px', background: 'linear-gradient(145deg,rgba(255,255,255,.94),rgba(232,209,166,.66))', display: 'grid', placeItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" stroke="#b8914b" strokeWidth="2" /><rect x="13" y="3" width="8" height="8" rx="2" stroke="#b8914b" strokeWidth="2" /><rect x="3" y="13" width="8" height="8" rx="2" stroke="#b8914b" strokeWidth="2" /><rect x="13" y="13" width="8" height="8" rx="2" stroke="#b8914b" strokeWidth="2" /></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '12px', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase' }}>VIEW ALBUM</span>
            <span style={{ fontSize: '18px', color: 'var(--gold)' }}>›</span>
          </button>

          {/* Voice & Note row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button onClick={onVoiceMemory} style={{
              minHeight: '52px', borderRadius: '999px',
              display: 'grid', gridTemplateColumns: '34px 1fr', alignItems: 'center', padding: '0 14px',
              background: 'rgba(255,255,255,0.5)', color: '#6d4c28', border: '1px solid rgba(184,145,75,.2)',
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '9px', background: 'linear-gradient(145deg,rgba(255,255,255,.94),rgba(232,209,166,.66))', display: 'grid', placeItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="2" width="6" height="12" rx="3" stroke="#b8914b" strokeWidth="2.2" /><path d="M5 10C5 14.42 8.13 18 12 18" stroke="#b8914b" strokeWidth="2.2" strokeLinecap="round" /></svg>
              </div>
              <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10px', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>VOICE</span>
            </button>
            <button onClick={onWriteNote} style={{
              minHeight: '52px', borderRadius: '999px',
              display: 'grid', gridTemplateColumns: '34px 1fr', alignItems: 'center', padding: '0 14px',
              background: 'rgba(255,255,255,0.5)', color: '#6d4c28', border: '1px solid rgba(184,145,75,.2)',
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '9px', background: 'linear-gradient(145deg,rgba(255,255,255,.94),rgba(232,209,166,.66))', display: 'grid', placeItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 20H21" stroke="#b8914b" strokeWidth="2.2" strokeLinecap="round" /><path d="M16.5 3.5C16.89 3.11 17.41 2.89 17.95 2.89C18.22 2.89 18.48 2.95 18.72 3.06C18.96 3.17 19.18 3.33 19.36 3.5C19.54 3.68 19.7 3.89 19.81 4.13C19.92 4.37 19.97 4.63 19.97 4.9C19.97 5.17 19.92 5.43 19.81 5.67L8 17.5L4 18.5L5 14.5L16.5 3.5Z" stroke="#b8914b" strokeWidth="2.2" strokeLinejoin="round" /></svg>
              </div>
              <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10px', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>WRITE NOTE</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
