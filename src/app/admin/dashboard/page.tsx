'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getAllEvents, upsertEvent } from '@/lib/db'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [events, setEvents] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin')
      } else {
        loadEvents()
      }
    })
  }, [])

  const loadEvents = async () => {
    const data = await getAllEvents()
    setEvents(data)
  }

  const createDummyEvent = async () => {
    const slug = 'mim-azhad-2026'
    await upsertEvent(slug, {
      bride: 'Mim',
      groom: 'Azhad',
      event_date: new Date().toISOString(),
      location: 'Tampin, N9',
      type: 'engagement',
      package: 'premium',
      allowed_filters: ['none', 'floral', 'gold', 'vintage', 'romantic'],
      features: { boomerang: true, voice: true, notes: true, filters: true },
    })
    loadEvents()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <div style={{ padding: '40px', background: 'var(--cream-bg)', minHeight: '100vh', color: 'var(--cream-text)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '36px' }}>Event Dashboard</h1>
        <button onClick={handleSignOut} style={{ padding: '10px 20px', background: '#333', color: '#fff', borderRadius: '8px' }}>Sign Out</button>
      </div>
      <button onClick={createDummyEvent} style={{ padding: '10px 20px', background: 'var(--gold)', color: '#fff', borderRadius: '8px', margin: '20px 0' }}>+ Create Mock Event</button>
      <div style={{ display: 'grid', gap: '16px' }}>
        {events.map(ev => (
          <div key={ev.id} className="glass-card" style={{ padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '20px' }}>{ev.id}</h3>
            <p>{ev.bride} &amp; {ev.groom} — {ev.type}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
