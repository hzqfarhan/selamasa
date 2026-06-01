'use client'
import React from 'react'

interface BottomNavProps {
  activeTab: 'home' | 'album' | 'voice' | 'profile'
  onTabChange: (tab: 'home' | 'album' | 'voice' | 'profile') => void
  onCaptureClick: () => void
}

export default function BottomNav({ activeTab, onTabChange, onCaptureClick }: BottomNavProps) {
  return (
    <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', height: 'calc(72px + var(--safe-bot))', background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(20px)', borderRadius: '30px 30px 0 0', borderTop: '1px solid var(--gold-border)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 'var(--safe-bot)', zIndex: 100 }}>
      
      <button onClick={() => onTabChange('home')} style={{ color: activeTab === 'home' ? 'var(--gold)' : 'var(--cream-sub)', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <span>🏠</span>
        <span style={{ fontSize: '9px', fontFamily: 'var(--font-poppins)' }}>Home</span>
      </button>

      <button onClick={() => onTabChange('album')} style={{ color: activeTab === 'album' ? 'var(--gold)' : 'var(--cream-sub)', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <span>🖼️</span>
        <span style={{ fontSize: '9px', fontFamily: 'var(--font-poppins)' }}>Album</span>
      </button>

      <button onClick={onCaptureClick} style={{ width: '62px', height: '62px', borderRadius: '50%', background: 'var(--bg)', color: '#fff', fontSize: '24px', display: 'grid', placeItems: 'center', marginTop: '-34px', border: '4px solid var(--cream-bg)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        📷
      </button>

      <button onClick={() => onTabChange('voice')} style={{ color: activeTab === 'voice' ? 'var(--gold)' : 'var(--cream-sub)', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <span>🎤</span>
        <span style={{ fontSize: '9px', fontFamily: 'var(--font-poppins)' }}>Voice</span>
      </button>

      <button onClick={() => onTabChange('profile')} style={{ color: activeTab === 'profile' ? 'var(--gold)' : 'var(--cream-sub)', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <span>👤</span>
        <span style={{ fontSize: '9px', fontFamily: 'var(--font-poppins)' }}>Profile</span>
      </button>
      
    </div>
  )
}
