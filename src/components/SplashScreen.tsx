'use client'
import React, { useEffect, useState } from 'react'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [out, setOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setOut(true)
      setTimeout(onComplete, 400)
    }, 2000)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="screen" data-out={out} style={{ background: 'linear-gradient(180deg,#f4f9ff 0%,#d5e9ff 100%)' }}>
      {/* Animated petals */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '20px', height: '20px',
            background: 'var(--gold)',
            borderRadius: '0 100% 0 100%',
            opacity: 0,
            left: `${20 + i * 15}%`,
            animation: `splashFall 8s ${i * 1.5}s infinite linear`
          }} />
        ))}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/asset/selamasa.png"
          alt="Sela Masa"
          style={{ width: '180px', height: '180px', objectFit: 'contain', marginBottom: '10px' }}
        />
        <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '8px' }}>
          Every Moment, Forever Cherished.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '2px', background: 'rgba(74,144,226,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40%', background: 'var(--gold)', animation: 'loadingSlide 1.6s infinite ease-in-out' }} />
        </div>
        <span style={{ marginTop: '12px', fontFamily: 'var(--font-poppins)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>Loading...</span>
      </div>
    </div>
  )
}
