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
    <div className="screen" data-out={out} style={{ background: 'url(/asset/bg.png) center/cover no-repeat' }}>
      {/* Animated blue leaves dropping effect (frequent & many) */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(18)].map((_, i) => {
          const delay = i * 0.35;
          const duration = 4.8 + (i % 3) * 2.1;
          const left = 5 + (i * 18.5) % 90;
          const size = 12 + (i % 4) * 4.5;
          return (
            <div key={i} style={{
              position: 'absolute',
              width: `${size}px`, height: `${size}px`,
              background: 'linear-gradient(135deg, var(--gold), var(--gold3))',
              borderRadius: '0 100% 0 100%',
              opacity: 0,
              left: `${left}%`,
              animation: `splashFall ${duration}s ${delay}s infinite linear`
            }} />
          )
        })}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="splash-writing-text">Sela Masa</h1>
        <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '8px', textShadow: '0 1px 0 #fff, 0px 2px 4px rgba(255,255,255,0.8)' }}>
          Every Moment, Forever Cherished.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '2px', background: 'rgba(198,162,84,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40%', background: 'var(--gold)', animation: 'loadingSlide 1.6s infinite ease-in-out' }} />
        </div>
        <span style={{ marginTop: '12px', fontFamily: 'var(--font-poppins)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>Loading...</span>
      </div>
    </div>
  )
}
