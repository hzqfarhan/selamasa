'use client'
import React, { useEffect, useState } from 'react'

interface WelcomeProps {
  onStartCapture: () => void
  onViewAlbum: () => void
  onVoiceMemory: () => void
  onWriteNote: () => void
}

const COUPLE = 'Nureen & Nizam'
const DATE = '07 . 06 . 2026'
const LOCATION = 'PARIT HJ ALI, BP'
const EVENT_TYPE = 'Walimatul Urus'

export default function WelcomeScreen({ onStartCapture, onViewAlbum, onVoiceMemory, onWriteNote }: WelcomeProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="screen" style={{ background: 'url(/asset/bg.png) center/cover no-repeat', overflow: 'hidden' }}>
      <div className="welcome-cinema-page">

        {/* Brand capsule */}
        <header className="welcome-cinema-brand">
          <div className="welcome-cinema-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/asset/selamasa.png" alt="Sela Masa Logo" />
          </div>
          <div>
            <h3>SELA MASA</h3>
            <p>ENGAGEMENT MEMORY</p>
          </div>
        </header>

        <main className="welcome-cinema-main">

          <section className="welcome-cinema-topcopy">
            <div className="welcome-cinema-small">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
            <div className="welcome-cinema-kicker">
              <span />
              <b>{EVENT_TYPE}</b>
              <span />
            </div>

            <h1 className="welcome-cinema-title">{COUPLE}</h1>

            <div className="welcome-cinema-meta">
              <span><b>▣</b> {DATE}</span>
              <i />
              <span><b>⌖</b> {LOCATION}</span>
            </div>

            <p className="welcome-cinema-note">
              Thank you for being part of this promise<br />
              A promise begins, a memory stays forever
            </p>
          </section>

          {/* Couple photo section with auto flex sizing */}
          <section className="welcome-cinema-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/asset/front.jpg" alt={COUPLE} />
            <div className="welcome-cinema-shade" />
          </section>

          <section className="welcome-cinema-bottom">
            <div className="welcome-cinema-actions">

              <button className="welcome-cinema-btn main" type="button" onClick={onStartCapture}>
                <span>📸</span><b>Start Capture</b><em>›</em>
              </button>

              <button className="welcome-cinema-btn soft" type="button" onClick={onViewAlbum}>
                <span>▧</span><b>View Album</b><em>›</em>
              </button>

              <button className="welcome-cinema-btn ghost" type="button" onClick={onVoiceMemory}>
                <span>🎙</span><b>Voice Memory</b><em>›</em>
              </button>

              <button className="welcome-cinema-btn ghost" type="button" onClick={onWriteNote}>
                <span>✍🏻</span><b>Write a Note</b><em>›</em>
              </button>

            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
