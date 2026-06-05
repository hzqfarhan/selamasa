'use client'
import React from 'react'

interface BottomNavProps {
  activeTab: 'home' | 'album' | 'voice' | 'profile'
  onTabChange: (tab: 'home' | 'album' | 'voice' | 'profile') => void
  onCaptureClick: () => void
}

const TABS = [
  {
    id: 'home' as const,
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 21 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
          stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'album' as const,
    label: 'Album',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    id: 'voice' as const,
    label: 'Voice',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="9" y="2" width="6" height="12" rx="3" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" />
        <path d="M5 10C5 14.42 8.13 18 12 18C15.87 18 19 14.42 19 10" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="22" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" strokeLinecap="round" />
        <line x1="9" y1="22" x2="15" y2="22" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'profile' as const,
    label: 'Profile',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" />
        <path d="M4 20C4 17.33 7.58 15 12 15C16.42 15 20 17.33 20 20" stroke={active ? 'var(--gold)' : '#5f4b35'} strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function BottomNav({ activeTab, onTabChange, onCaptureClick }: BottomNavProps) {
  return (
    <>
      <style>{`
        /* ── Mobile Bottom Nav (≤767px) ── */
        .nav-bottom {
          position: fixed;
          bottom: max(env(safe-area-inset-bottom, 14px), 14px);
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 390px;
          height: 66px;
          background: rgba(255,255,255,0.68);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 999px;
          border: 1px solid var(--gold-border);
          box-shadow: 0 12px 36px rgba(42,68,95,0.12), inset 0 1px 0 rgba(255,255,255,0.85);
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 200;
        }
        .nav-sidebar { display: none; }

        /* ── Tablet Sidebar (768–1199px) ── */
        @media (min-width: 768px) {
          .nav-bottom { display: none; }
          .nav-sidebar {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 72px;
            background: rgba(255,255,255,0.90);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-right: 1px solid var(--gold-border);
            box-shadow: 2px 0 16px rgba(42,68,95,0.08);
            z-index: 200;
            padding: max(env(safe-area-inset-top,16px),16px) 0 max(env(safe-area-inset-bottom,16px),16px);
            gap: 0;
            justify-content: center;
          }
          .nav-sidebar-logo {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 38px;
            height: 38px;
            border-radius: 14px;
            border: 1px solid var(--gold-border);
            background: rgba(255,255,255,0.9);
            overflow: hidden;
            display: grid;
            place-items: center;
          }
          .nav-sidebar-logo img { width: 100%; height: 100%; object-fit: contain; }
          .nav-tab-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            width: 100%;
            padding: 14px 0;
            background: none;
            border: none;
            cursor: pointer;
            position: relative;
          }
          .nav-tab-btn.active::before {
            content: '';
            position: absolute;
            left: 0; top: 50%; transform: translateY(-50%);
            width: 3px; height: 28px;
            background: var(--gold);
            border-radius: 0 3px 3px 0;
          }
          .nav-tab-label {
            font-family: var(--font-poppins);
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.04em;
            color: #5f4b35;
          }
          .nav-tab-btn.active .nav-tab-label { color: var(--gold); }
          .nav-capture-btn-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 14px 0;
            cursor: pointer;
          }
        }

        /* ── Desktop Sidebar (1200px+) — wider with labels ── */
        @media (min-width: 1200px) {
          .nav-sidebar {
            width: 220px;
            align-items: flex-start;
            padding-left: 0;
          }
          .nav-sidebar-logo {
            width: 44px; height: 44px; border-radius: 16px;
            left: 24px; transform: none;
          }
          .nav-tab-btn {
            flex-direction: row;
            align-items: center;
            gap: 14px;
            padding: 14px 24px;
          }
          .nav-tab-btn.active::before {
            height: 36px;
          }
          .nav-tab-label {
            font-size: 13px;
            font-weight: 600;
          }
          .nav-capture-btn-wrap {
            flex-direction: row;
            gap: 14px;
            padding: 14px 24px;
          }
        }
      `}</style>

      {/* ── Mobile Bottom Nav ── */}
      <div className="nav-bottom">
        {TABS.slice(0, 2).map(t => (
          <button key={t.id} onClick={() => onTabChange(t.id)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '52px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            {t.icon(activeTab === t.id)}
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-poppins)', fontWeight: activeTab === t.id ? 600 : 400, color: activeTab === t.id ? 'var(--gold)' : '#5f4b35' }}>{t.label}</span>
          </button>
        ))}

        {/* Centre Capture */}
        <button onClick={onCaptureClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', marginTop: '-20px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #77acdc)', border: '4px solid rgba(255,255,255,0.97)', boxShadow: '0 8px 24px rgba(47,120,196,0.35)', display: 'grid', placeItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23 19C23 19.55 22.78 20.05 22.41 20.41C22.05 20.78 21.55 21 21 21H3C2.45 21 1.95 20.78 1.59 20.41C1.22 20.05 1 19.55 1 19V8C1 7.45 1.22 6.95 1.59 6.59C1.95 6.22 2.45 6 3 6H7L9 3H15L17 6H21C22.1 6 23 6.9 23 8V19Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
              <circle cx="12" cy="13" r="4" stroke="#fff" strokeWidth="1.7" />
            </svg>
          </div>
          <span style={{ fontSize: '9px', fontFamily: 'var(--font-poppins)', color: 'var(--cream-sub)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Capture</span>
        </button>

        {TABS.slice(2).map(t => (
          <button key={t.id} onClick={() => onTabChange(t.id)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '52px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            {t.icon(activeTab === t.id)}
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-poppins)', fontWeight: activeTab === t.id ? 600 : 400, color: activeTab === t.id ? 'var(--gold)' : '#5f4b35' }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tablet/Desktop Sidebar ── */}
      <nav className="nav-sidebar">
        <div className="nav-sidebar-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/asset/selamasa.png" alt="SelaMasa" />
        </div>

        {/* Capture button at top of sidebar links */}
        <button className="nav-capture-btn-wrap" onClick={onCaptureClick} style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: '70px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #77acdc)', display: 'grid', placeItems: 'center', boxShadow: '0 4px 16px rgba(47,120,196,0.30)', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M23 19C23 19.55 22.78 20.05 22.41 20.41C22.05 20.78 21.55 21 21 21H3C2.45 21 1.95 20.78 1.59 20.41C1.22 20.05 1 19.55 1 19V8C1 7.45 1.22 6.95 1.59 6.59C1.95 6.22 2.45 6 3 6H7L9 3H15L17 6H21C22.1 6 23 6.9 23 8V19Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
              <circle cx="12" cy="13" r="4" stroke="#fff" strokeWidth="1.7" />
            </svg>
          </div>
          <span className="nav-tab-label" style={{ color: 'var(--gold)' }}>Capture</span>
        </button>

        {TABS.map(t => (
          <button key={t.id}
            className={`nav-tab-btn${activeTab === t.id ? ' active' : ''}`}
            onClick={() => onTabChange(t.id)}>
            {t.icon(activeTab === t.id)}
            <span className="nav-tab-label">{t.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
