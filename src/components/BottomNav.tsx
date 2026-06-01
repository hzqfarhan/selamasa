'use client'
import React from 'react'

interface BottomNavProps {
  activeTab: 'home' | 'album' | 'voice' | 'profile'
  onTabChange: (tab: 'home' | 'album' | 'voice' | 'profile') => void
  onCaptureClick: () => void
}

export default function BottomNav({ activeTab, onTabChange, onCaptureClick }: BottomNavProps) {
  const active = '#c6a254'
  const inactive = '#9b7e57'

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: '430px',
      height: 'calc(74px + var(--safe-bot))',
      background: 'rgba(255,253,249,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(198,162,84,0.18)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      paddingBottom: 'var(--safe-bot)', paddingTop: '4px',
      zIndex: 100,
    }}>

      {/* Home */}
      <button onClick={() => onTabChange('home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '52px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
            stroke={activeTab === 'home' ? active : inactive} strokeWidth="1.7" strokeLinejoin="round" fill="none" />
        </svg>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-poppins)', fontWeight: activeTab === 'home' ? '600' : '400', color: activeTab === 'home' ? active : inactive }}>Home</span>
      </button>

      {/* Album */}
      <button onClick={() => onTabChange('album')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '52px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="2" stroke={activeTab === 'album' ? active : inactive} strokeWidth="1.7" />
          <rect x="13" y="3" width="8" height="8" rx="2" stroke={activeTab === 'album' ? active : inactive} strokeWidth="1.7" />
          <rect x="3" y="13" width="8" height="8" rx="2" stroke={activeTab === 'album' ? active : inactive} strokeWidth="1.7" />
          <rect x="13" y="13" width="8" height="8" rx="2" stroke={activeTab === 'album' ? active : inactive} strokeWidth="1.7" />
        </svg>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-poppins)', fontWeight: activeTab === 'album' ? '600' : '400', color: activeTab === 'album' ? active : inactive }}>Album</span>
      </button>

      {/* Center Capture Button */}
      <button onClick={onCaptureClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: '-28px' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(145deg,#1a1408,#0d0804)',
          border: '4px solid rgba(255,253,249,0.97)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.28)',
          display: 'grid', placeItems: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M23 19C23 19.55 22.78 20.05 22.41 20.41C22.05 20.78 21.55 21 21 21H3C2.45 21 1.95 20.78 1.59 20.41C1.22 20.05 1 19.55 1 19V8C1 7.45 1.22 6.95 1.59 6.59C1.95 6.22 2.45 6 3 6H7L9 3H15L17 6H21C22.1 6 23 6.9 23 8V19Z" stroke="#c6a254" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
            <circle cx="12" cy="13" r="4" stroke="#c6a254" strokeWidth="1.7" />
          </svg>
        </div>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-poppins)', color: '#5f4b35', fontWeight: '500' }}>Capture</span>
      </button>

      {/* Voice */}
      <button onClick={() => onTabChange('voice')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '52px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="2" width="6" height="12" rx="3" stroke={activeTab === 'voice' ? active : inactive} strokeWidth="1.7" />
          <path d="M5 10C5 14.42 8.13 18 12 18C15.87 18 19 14.42 19 10" stroke={activeTab === 'voice' ? active : inactive} strokeWidth="1.7" strokeLinecap="round" />
          <line x1="12" y1="18" x2="12" y2="22" stroke={activeTab === 'voice' ? active : inactive} strokeWidth="1.7" strokeLinecap="round" />
          <line x1="9" y1="22" x2="15" y2="22" stroke={activeTab === 'voice' ? active : inactive} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-poppins)', fontWeight: activeTab === 'voice' ? '600' : '400', color: activeTab === 'voice' ? active : inactive }}>Voice</span>
      </button>

      {/* Profile */}
      <button onClick={() => onTabChange('profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '52px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke={activeTab === 'profile' ? active : inactive} strokeWidth="1.7" />
          <path d="M4 20C4 17.33 7.58 15 12 15C16.42 15 20 17.33 20 20" stroke={activeTab === 'profile' ? active : inactive} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-poppins)', fontWeight: activeTab === 'profile' ? '600' : '400', color: activeTab === 'profile' ? active : inactive }}>Profile</span>
      </button>
    </div>
  )
}
