'use client'
import React from 'react'
import BottomNav from './BottomNav'
import FallingLeaves from './FallingLeaves'

export default function ProfileScreen({ onNavChange, onCaptureClick }: any) {
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
            <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '48px', color: 'var(--gold)', margin: '16px 0 8px' }}>SelaMasa</h1>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#333', lineHeight: 1.5, marginBottom: '20px' }}>
              Elevate your wedding experience with our premium digital guestbook and live album platform. Cherish every memory seamlessly.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>QR Wedding Album</span>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Guest Memories</span>
              <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Mobile Friendly</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '24px', color: 'var(--cream-text)', marginBottom: '8px' }}>What we do</h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)', marginBottom: '16px' }}>We provide a modern way to collect photos, videos, and heartfelt messages from your guests.</p>
          
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            <div className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px', flexShrink: 0 }}>
              <span style={{ fontSize: '16px' }}>📷</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold', color: 'var(--cream-text)' }}>QR Guest Camera</span>
            </div>
            <div className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px', flexShrink: 0 }}>
              <span style={{ fontSize: '16px' }}>🖼️</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold', color: 'var(--cream-text)' }}>Digital Album</span>
            </div>
            <div className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px', flexShrink: 0 }}>
              <span style={{ fontSize: '16px' }}>🎤</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold', color: 'var(--cream-text)' }}>Voice Memory</span>
            </div>
            <div className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px', flexShrink: 0 }}>
              <span style={{ fontSize: '16px' }}>✨</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold', color: 'var(--cream-text)' }}>Bride Dashboard</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <a href="https://www.instagram.com/selamasa.my" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', background: 'rgba(225, 48, 108, 0.08)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(225, 48, 108, 0.25)', color: '#e1306c', borderRadius: '16px', marginBottom: '12px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold' }}>
            Follow @SelaMasa.my
          </a>
          <a href="https://wa.me/6011123981846" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', background: 'rgba(37, 211, 102, 0.08)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(37, 211, 102, 0.25)', color: '#25d366', borderRadius: '16px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold' }}>
            Contact via WhatsApp
          </a>
        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'var(--gold)' }}>
          Every moment, forever cherished ♡
        </p>

      </div>
      <BottomNav activeTab="profile" onTabChange={onNavChange} onCaptureClick={onCaptureClick} />
    </div>
  )
}
