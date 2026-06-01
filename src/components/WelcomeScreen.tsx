'use client'
import React, { useEffect, useState } from 'react'

interface WelcomeProps {
  onStartCapture: () => void
  onViewAlbum: () => void
  onVoiceMemory: () => void
  onWriteNote: () => void
}

const COUPLE = 'Nureen & Nizam'
const DATE = '31 . 05 . 2026'
const LOCATION = 'TAMPIN, N9'
const EVENT_TYPE = 'HARI LAMARAN (SARONG CINCIN)'

export default function WelcomeScreen({ onStartCapture, onViewAlbum, onVoiceMemory, onWriteNote }: WelcomeProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="screen" style={{
      background: 'linear-gradient(180deg, #fffdf9 0%, #fbf3e8 60%, #ede0ca 100%)',
      overflow: 'hidden',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 'max(env(safe-area-inset-top,14px),14px) 16px 0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}>

        {/* Top Brand Pill Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: '#fff', border: '1.2px solid rgba(198,162,84,0.3)', borderRadius: '999px',
          padding: '6px 18px', alignSelf: 'center', marginBottom: '4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          animation: mounted ? 'cinReveal 0.7s 0s both' : 'none',
          flexShrink: 0
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/asset/selamasa.png"
            alt="Sela Masa Logo"
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: '700', fontSize: '11px', letterSpacing: '0.12em', color: '#17110b', lineHeight: 1.1 }}>SELA MASA</div>
            <div style={{ fontFamily: 'var(--font-poppins)', fontSize: '7.5px', letterSpacing: '0.08em', color: 'var(--cream-sub)', lineHeight: 1.1 }}>ENGAGEMENT MEMORY</div>
          </div>
        </div>

        {/* Arabic + Event Label */}
        <div style={{ textAlign: 'center', animation: mounted ? 'cinReveal 0.7s 0.12s both' : 'none', flexShrink: 0 }}>
          <p style={{ fontFamily: 'serif', fontSize: '13px', color: 'var(--gold)', letterSpacing: '0.04em', marginBottom: '2px', marginTop: '2px' }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '8px', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--cream-sub)', textTransform: 'uppercase', marginBottom: '0px' }}>{EVENT_TYPE}</p>
        </div>

        {/* Couple Name */}
        <h1 style={{
          fontFamily: 'var(--font-great-vibes)', fontSize: '42px', color: 'var(--gold)',
          textAlign: 'center', lineHeight: 1.05, marginTop: '2px', marginBottom: '4px',
          animation: mounted ? 'cinReveal 0.7s 0.2s both' : 'none',
          flexShrink: 0
        }}>
          {COUPLE}
        </h1>

        {/* Date & Location Pill Row */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px',
          fontSize: '10px', fontFamily: 'var(--font-poppins)', fontWeight: '700', color: '#5f4b35',
          margin: '2px 0 6px', animation: mounted ? 'cinReveal 0.7s 0.26s both' : 'none',
          flexShrink: 0
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>📅 {DATE}</span>
          <span style={{ color: 'rgba(198,162,84,0.3)', fontWeight: '400' }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>📍 {LOCATION}</span>
        </div>

        {/* Welcome Note Card */}
        <div style={{
          textAlign: 'center', padding: '6px 14px', background: 'rgba(255,255,255,0.7)',
          borderRadius: '16px', border: '1.2px solid var(--gold-border)', marginBottom: '8px',
          animation: mounted ? 'cinReveal 0.7s 0.32s both' : 'none',
          flexShrink: 0
        }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: 'var(--cream-sub)', lineHeight: 1.4, margin: 0 }}>Thank you for being part of this promise</p>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10px', color: 'rgba(95,75,53,0.7)', lineHeight: 1.4, margin: 0 }}>A promise begins, a memory stays forever</p>
        </div>

        {/* Couple Photo */}
        <div style={{
          borderRadius: '24px', overflow: 'hidden', marginBottom: '10px',
          aspectRatio: '1/1', background: 'linear-gradient(135deg, var(--cream-bg2), var(--cream-bg3))',
          position: 'relative', animation: mounted ? 'cinReveal 0.7s 0.4s both' : 'none',
          flexShrink: 1, maxHeight: 'min(240px, 28vh)', width: 'auto',
          marginLeft: 'auto', marginRight: 'auto', border: '1px solid var(--gold-border)'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/asset/front.jpg"
            alt={COUPLE}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(23,17,11,0.4) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(198,162,84,0.92)', borderRadius: '999px', padding: '3px 12px', fontSize: '9.5px', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: '600', letterSpacing: '0.04em' }}>
              ✨ Capture Your Memory
            </div>
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '6px',
          paddingBottom: 'max(env(safe-area-inset-bottom, 12px), 12px)',
          animation: mounted ? 'cinReveal 0.7s 0.46s both' : 'none',
          width: '100%', flexShrink: 0
        }}>
          
          {/* 1. START CAPTURE */}
          <button onClick={onStartCapture} style={{
            width: '100%', height: '44px', borderRadius: '999px',
            display: 'grid', gridTemplateColumns: '36px 1fr 24px', alignItems: 'center', padding: '0 8px',
            background: 'linear-gradient(135deg, #15120e, #28251d)',
            color: '#fff8ec', border: '1px solid rgba(220,186,119,0.5)',
            boxShadow: '0 3px 8px rgba(0,0,0,0.18)', cursor: 'pointer'
          }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(145deg, #fff, #e8d1a6)', display: 'grid', placeItems: 'center', fontSize: '13px' }}>
              📸
            </div>
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10.5px', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>START CAPTURE</span>
            <span style={{ fontSize: '15px', color: 'var(--gold)', fontWeight: 'bold' }}>›</span>
          </button>

          {/* 2. VIEW ALBUM */}
          <button onClick={onViewAlbum} style={{
            width: '100%', height: '44px', borderRadius: '999px',
            display: 'grid', gridTemplateColumns: '36px 1fr 24px', alignItems: 'center', padding: '0 8px',
            background: '#fffdf9', color: '#17110b', border: '1px solid rgba(184,145,75,0.22)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)', cursor: 'pointer'
          }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(145deg, #fff, #e8d1a6)', display: 'grid', placeItems: 'center', fontSize: '13px' }}>
              🖼️
            </div>
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10.5px', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>VIEW ALBUM</span>
            <span style={{ fontSize: '15px', color: 'var(--gold)', fontWeight: 'bold' }}>›</span>
          </button>

          {/* 3. VOICE MEMORY */}
          <button onClick={onVoiceMemory} style={{
            width: '100%', height: '44px', borderRadius: '999px',
            display: 'grid', gridTemplateColumns: '36px 1fr 24px', alignItems: 'center', padding: '0 8px',
            background: '#fffdf9', color: '#17110b', border: '1px solid rgba(184,145,75,0.22)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)', cursor: 'pointer'
          }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(145deg, #fff, #e8d1a6)', display: 'grid', placeItems: 'center', fontSize: '13px' }}>
              🎙️
            </div>
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10.5px', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>VOICE MEMORY</span>
            <span style={{ fontSize: '15px', color: 'var(--gold)', fontWeight: 'bold' }}>›</span>
          </button>

          {/* 4. WRITE A NOTE */}
          <button onClick={onWriteNote} style={{
            width: '100%', height: '44px', borderRadius: '999px',
            display: 'grid', gridTemplateColumns: '36px 1fr 24px', alignItems: 'center', padding: '0 8px',
            background: '#fffdf9', color: '#17110b', border: '1px solid rgba(184,145,75,0.22)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)', cursor: 'pointer'
          }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(145deg, #fff, #e8d1a6)', display: 'grid', placeItems: 'center', fontSize: '13px' }}>
              ✍️
            </div>
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10.5px', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>WRITE A NOTE</span>
            <span style={{ fontSize: '15px', color: 'var(--gold)', fontWeight: 'bold' }}>›</span>
          </button>

        </div>

      </div>
    </div>
  )
}
