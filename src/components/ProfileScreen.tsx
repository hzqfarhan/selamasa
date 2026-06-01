'use client'
import React from 'react'
import BottomNav from './BottomNav'

export default function ProfileScreen({ onNavChange, onCaptureClick }: any) {
  return (
    <div className="screen" style={{ background: 'var(--cream-bg)', paddingBottom: '90px' }}>
      <div style={{ padding: 'max(env(safe-area-inset-top, 20px), 20px) 20px 20px' }}>
        
        <div style={{ background: 'linear-gradient(180deg, #1f140a, #0d0804)', borderRadius: '35px', padding: '30px 20px', color: '#fff' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', display: 'inline-block', padding: '6px 12px', borderRadius: '999px', fontSize: '9px', fontFamily: 'var(--font-poppins)', letterSpacing: '0.1em' }}>
            ✦ DIGITAL WEDDING MEMORY SERVICE
          </div>
          <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '48px', color: 'var(--gold)', margin: '16px 0 8px' }}>SelaMasa</h1>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--t2)', lineHeight: 1.5, marginBottom: '20px' }}>
            Elevate your wedding experience with our premium digital guestbook and live album platform. Cherish every memory seamlessly.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>QR Wedding Album</span>
            <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Guest Memories</span>
            <span style={{ border: '1px solid var(--gold-border)', borderRadius: '999px', padding: '6px 12px', fontSize: '10px', color: 'var(--gold)' }}>Mobile Friendly</span>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '24px', color: 'var(--cream-text)', marginBottom: '8px' }}>What we do</h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)', marginBottom: '16px' }}>We provide a modern way to collect photos, videos, and heartfelt messages from your guests.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="glass-card" style={{ padding: '16px', borderRadius: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📷</div>
              <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-playfair)', fontWeight: 'bold', color: 'var(--cream-text)' }}>QR Guest Camera</h3>
            </div>
            <div className="glass-card" style={{ padding: '16px', borderRadius: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🖼️</div>
              <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-playfair)', fontWeight: 'bold', color: 'var(--cream-text)' }}>Digital Album</h3>
            </div>
            <div className="glass-card" style={{ padding: '16px', borderRadius: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎤</div>
              <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-playfair)', fontWeight: 'bold', color: 'var(--cream-text)' }}>Voice Memory</h3>
            </div>
            <div className="glass-card" style={{ padding: '16px', borderRadius: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>✨</div>
              <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-playfair)', fontWeight: 'bold', color: 'var(--cream-text)' }}>Bride Dashboard</h3>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <a href="https://instagram.com/selamasa.my" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', background: '#000', color: '#fff', borderRadius: '16px', marginBottom: '12px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold' }}>
            Follow @SelaMasa.my
          </a>
          <a href="https://wa.me/60123456789" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', background: '#25D366', color: '#fff', borderRadius: '16px', fontFamily: 'var(--font-dm-sans)', fontWeight: 'bold' }}>
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
