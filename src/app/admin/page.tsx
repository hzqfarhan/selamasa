'use client'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--cream-bg)', color: 'var(--cream-text)' }}>
      <form onSubmit={handleLogin} className="glass-card" style={{ padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', textAlign: 'center' }}>Admin Login</h1>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--gold)' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--gold)' }} />
        <button type="submit" style={{ padding: '14px', background: 'var(--gold)', color: '#fff', borderRadius: '999px', fontWeight: 'bold' }}>Login</button>
      </form>
    </div>
  )
}
