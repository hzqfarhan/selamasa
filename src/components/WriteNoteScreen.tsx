'use client'
import React, { useState } from 'react'

interface WriteNoteProps {
  coupleName: string
  guestName: string
  onClose: () => void
  onSend: (message: string, name: string) => void
  onVoiceRedirect: () => void
}

export default function WriteNoteScreen({ coupleName, guestName, onClose, onSend, onVoiceRedirect, onNavChange, onCaptureClick }: WriteNoteProps) {
  const [message, setMessage] = useState('')
  const [name, setName] = useState(guestName || '')

  return (
    <div className="screen" style={{ background: 'url(/asset/bg.png) center/cover no-repeat', padding: 'max(env(safe-area-inset-top, 20px), 20px) 20px' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 'max(env(safe-area-inset-top, 20px), 20px)', left: '20px', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>✕</button>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '44px', color: 'var(--cream-text)', margin: 0 }}>{coupleName}</h1>
        <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cream-sub)', marginTop: '8px' }}>
          ♥ Thank you for celebrating with us ♥
        </p>
      </div>

      <div className="glass-card" style={{ marginTop: '40px', borderRadius: '34px', padding: '30px 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #1f4a7c)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '24px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          ♡
        </div>

        <h2 style={{ fontFamily: 'var(--font-playfair)', textAlign: 'center', color: 'var(--cream-text)', fontSize: '24px', marginTop: '10px' }}>Leave a Memory</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '12px 0' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold-border)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '12px' }}>♥</span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold-border)' }} />
        </div>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'var(--cream-sub)', marginBottom: '20px' }}>Write a beautiful wish for the couple.</p>

        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
            placeholder="Dear Nureen & Nizam..."
            style={{ width: '100%', height: '120px', resize: 'none', background: 'transparent', borderBottom: '1px solid var(--gold)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '20px', color: 'var(--cream-text)' }}
          />
          <span style={{ position: 'absolute', bottom: '8px', right: '0', fontSize: '10px', color: 'var(--cream-sub)' }}>{message.length}/500</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--gold-border)', paddingBottom: '8px', marginBottom: '16px' }}>
          <span style={{ color: 'var(--gold)', marginRight: '10px' }}>👤</span>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Your name" 
            style={{ flex: 1, fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: 'var(--cream-text)' }} 
          />
        </div>

        <p style={{ textAlign: 'center', fontSize: '10px', color: 'var(--cream-sub)', marginBottom: '24px' }}>Auto timestamp will be saved</p>

        <button onClick={() => { if(message.trim() && name.trim()) onSend(message, name) }} style={{ width: '100%', padding: '16px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--gold), #1f4a7c)', color: '#fff', fontFamily: 'var(--font-poppins)', fontWeight: 'bold', fontSize: '14px', marginBottom: '12px' }}>
          Send Memory
        </button>
        <button onClick={onVoiceRedirect} style={{ width: '100%', padding: '16px', borderRadius: '999px', border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-poppins)', fontWeight: 'bold', fontSize: '14px' }}>
          Add Voice Memory
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--cream-sub)' }}>🔒 Your memory is safe with us</p>
    </div>
  )
}
