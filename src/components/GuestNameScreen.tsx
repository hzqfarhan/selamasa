'use client'
import React, { useState } from 'react'

export default function GuestNameScreen({ onConfirm, onBack }: { onConfirm: (name: string) => void, onBack: () => void }) {
  const [name, setName] = useState('')

  return (
    <div className="screen" style={{ background: 'var(--cream-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '330px', borderRadius: '28px', padding: '30px 20px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#fff', padding: '6px 12px', borderRadius: '999px', fontFamily: 'var(--font-playfair)', fontWeight: 'bold', border: '2px solid #fff' }}>MA</div>
        
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'var(--cream-text)', fontSize: '28px', marginTop: '10px' }}>What's your name?</h2>
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: 'var(--cream-sub)', margin: '12px 0 24px' }}>Tell us your name so this memory can be saved beautifully.</p>
        
        <input 
          type="text" 
          placeholder="Your name" 
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--gold)', textAlign: 'center', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '18px', background: 'rgba(255,255,255,0.8)' }}
        />

        <button 
          onClick={() => { if(name.trim()) onConfirm(name) }}
          style={{ width: '100%', marginTop: '24px', padding: '14px', borderRadius: '999px', background: 'linear-gradient(135deg,#15120e,#28251d)', color: 'var(--gold)', fontFamily: 'var(--font-playfair)', fontWeight: 'bold', fontSize: '16px' }}
        >
          Open Camera →
        </button>
        <button 
          onClick={onBack}
          style={{ marginTop: '16px', color: 'var(--cream-sub)', fontFamily: 'var(--font-dm-sans)', fontSize: '14px' }}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
