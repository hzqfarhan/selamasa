'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_PASS = '4917'

export default function AdminLogin() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Wrong passcode')
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', background: 'var(--cream-bg)', color: 'var(--cream-text)'
    }}>
      <form onSubmit={handleSubmit} className="glass-card" style={{
        padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '360px',
        display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '30px' }}>🔐 Admin</h1>
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: 'var(--cream-sub)' }}>
          Enter passcode to access the moderation panel
        </p>
        {error && <p style={{ color: '#d85a5a', fontSize: '12px' }}>{error}</p>}
        <input
          type="password" placeholder="Passcode" value={code}
          onChange={e => setCode(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--gold-border)', fontSize: '18px', textAlign: 'center', letterSpacing: '0.3em' }}
          maxLength={4} autoFocus
        />
        <button type="submit" style={{
          padding: '14px', background: 'linear-gradient(135deg, var(--gold), #1f4a7c)',
          color: '#fff', borderRadius: '999px', fontWeight: 'bold', fontSize: '14px'
        }}>
          Enter
        </button>
      </form>
    </div>
  )
}