'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

/* Reviews stay in Malay (Gen Z tone) */
const REVIEWS = [
  {
    name: 'Aina Sofea',
    event: 'Kenduri Aqiqah Aisyah',
    rating: 5,
    avatar: '👩🏻',
    text: 'omg tak tipu tau, memang best gila selamasa ni 😭✨ tetamu semua snap gambar sendiri pastu terus masuk album. takde la kena collect dari whatsapp satu2. ibu nangis tengok semua gambar dah ada dalam album. 10/10 wajib cuba!',
  },
  {
    name: 'Danial Haziq',
    event: 'Majlis Perkahwinan Izzatul & Amsyar',
    rating: 5,
    avatar: '🧑🏻',
    text: 'bro serious tak tipu, masa majlis tu semua org scan qr je terus boleh snap. seamless gila. lepas tu semua gambar dah organize elok2 dalam album. best siott takde lag takde problem. highly rec fr fr 🔥',
  },
  {
    name: 'Nurul Huda',
    event: 'Walimatul Urus Huda & Zulhilmi',
    rating: 5,
    avatar: '👩🏽',
    text: 'voice message punya feature tu omg 😭 mak sedara yg tak reti type pun boleh record wish terus. lagi touching dari text biasa. mesti dgr balik banyak2 kali. suka gila selamasa ni bestnya 💙',
  },
  {
    name: 'Izzudin Fahmi',
    event: 'Majlis Pertunangan Amira & Faiz',
    rating: 5,
    avatar: '🧑🏽',
    text: 'setup punya benda 5 minit je. qr code dah siap. tetamu scan je takde payah2. album pun cantik, bukan cincai2. rasa macam pakai service mahal padahal berbaloi habis. selamasa mmg fire 🔥🔥',
  },
  {
    name: 'Sarah Batrisyia',
    event: 'Kenduri Kahwin Syafiq & Liyana',
    rating: 5,
    avatar: '👩🏻‍🦱',
    text: 'takde satu pun gambar yang hilang tau 🥹 semua ada dalam album elok2 since mula majlis sampai habis. boomerang feature tu pulak comel gila, semua org nak try. mmg selamasa terbaik untuk majlis ✨',
  },
]

const FEATURES = [
  { icon: '📷', label: 'QR Guest Camera' },
  { icon: '🖼️', label: 'Digital Album' },
  { icon: '🎤', label: 'Voice Memory' },
  { icon: '✍️', label: 'Write a Note' },
  { icon: '🌀', label: 'Boomerang Mode' },
  { icon: '✨', label: 'Live Gallery' },
]

export default function LandingPage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const reviewRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  /* Allow app-container to scroll on landing page */
  useEffect(() => {
    const container = document.querySelector('.app-container')
    container?.classList.add('landing-scroll')
    // Also ensure body allows scrolling on mobile
    document.body.style.overflow = 'auto'
    return () => {
      container?.classList.remove('landing-scroll')
      document.body.style.overflow = ''
    }
  }, [])

  /* Auto-advance reviews carousel */
  const startAutoPlay = useCallback(() => {
    autoPlayRef.current = setInterval(() => {
      const el = reviewRef.current
      if (!el) return
      const cardW = Math.min(el.clientWidth * 0.80, 360) + 14
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft + cardW >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: cardW, behavior: 'smooth' })
      }
    }, 3400)
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])

  /* Drag-to-scroll — mouse */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStartX.current = e.pageX - (reviewRef.current?.offsetLeft ?? 0)
    dragScrollLeft.current = reviewRef.current?.scrollLeft ?? 0
    stopAutoPlay()
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !reviewRef.current) return
    e.preventDefault()
    const x = e.pageX - reviewRef.current.offsetLeft
    reviewRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current)
  }
  const onMouseUp = () => { isDragging.current = false; startAutoPlay() }

  /* Touch */
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].pageX - (reviewRef.current?.offsetLeft ?? 0)
    dragScrollLeft.current = reviewRef.current?.scrollLeft ?? 0
    stopAutoPlay()
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!reviewRef.current) return
    const x = e.touches[0].pageX - reviewRef.current.offsetLeft
    reviewRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current)
  }
  const onTouchEnd = () => startAutoPlay()

  const handleEnter = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = code.trim()
    if (!trimmed) { setError('Please enter your event code first 😊'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/resolve-code?code=${encodeURIComponent(trimmed)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Code not found. Please check and try again.')
        setLoading(false)
        return
      }
      router.push(`/event/${data.slug}`)
    } catch {
      setError('Connection error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        html, body {
          -webkit-overflow-scrolling: touch;
        }
        .landing-root {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          background: url(/asset/bg.png) center/cover no-repeat fixed;
          position: relative;
          scrollbar-width: none;
        }
        .landing-root::-webkit-scrollbar { display: none; }

        .landing-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
          padding: max(env(safe-area-inset-top,44px),44px) clamp(16px,5vw,40px) max(env(safe-area-inset-bottom,40px),60px);
        }

        /* On wide screens — two-column layout */
        @media (min-width: 900px) {
          .landing-root { background-attachment: fixed; }
          .landing-inner {
            max-width: 1100px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            gap: 0 48px;
            align-items: start;
          }
          .landing-col-left  { grid-column: 1; }
          .landing-col-right { grid-column: 2; }
          .landing-full      { grid-column: 1 / -1; }
        }

        /* Pills row — single scrolling row */
        .pills-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          flex-wrap: nowrap;
          padding-bottom: 4px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .pills-row::-webkit-scrollbar { display: none; }
        .pill-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(74,144,226,0.22);
          box-shadow: 0 2px 8px rgba(42,68,95,0.06);
          white-space: nowrap;
        }

        /* Reviews carousel */
        .reviews-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          flex-wrap: nowrap;
          padding-bottom: 8px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          user-select: none;
        }
        .reviews-track::-webkit-scrollbar { display: none; }
        .reviews-track:active { cursor: grabbing; }
        .review-card {
          flex-shrink: 0;
          width: clamp(260px, 78vw, 340px);
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(74,144,226,0.18);
          border-radius: 22px;
          padding: 18px 20px;
          box-shadow: 0 4px 16px rgba(42,68,95,0.07);
        }

        /* Social buttons */
        .social-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (min-width: 600px) {
          .social-row { flex-direction: row; }
          .social-row a { flex: 1; }
        }
      `}</style>

      <div className="landing-root">
        {/* Gradient overlay */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.93) 0%, rgba(244,249,255,0.82) 55%, transparent 100%)' }} />

        {/* Falling leaves */}
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          {[...Array(16)].map((_, i) => {
            const delay = i * 0.42, dur = 5.2 + (i % 4) * 1.8, left = 4 + (i * 21) % 92, size = 10 + (i % 4) * 4
            return <div key={i} style={{ position: 'absolute', width: `${size}px`, height: `${size}px`, background: 'linear-gradient(135deg, #2f78c4, #77acdc)', borderRadius: '0 100% 0 100%', opacity: 0, left: `${left}%`, animation: `splashFall ${dur}s ${delay}s infinite linear` }} />
          })}
        </div>

        <div className="landing-inner">

          {/* ── HERO (left col on wide) ── */}
          <header className="landing-col-left" style={{ textAlign: 'center', marginBottom: '40px' }}>
            {/* Logo capsule */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(74,144,226,0.28)', borderRadius: '999px', padding: '8px 20px', marginBottom: '28px', boxShadow: '0 4px 20px rgba(42,68,95,0.10)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/asset/selamasa.png" alt="SelaMasa" style={{ width: '28px', height: '28px', borderRadius: '10px', objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.28em', color: '#2f78c4' }}>SELA MASA</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: 'clamp(50px,11vw,72px)', color: '#2f78c4', lineHeight: 1, textShadow: '0 2px 20px rgba(47,120,196,0.18)', marginBottom: '16px' }}>
              Kenangan Abadi
            </h1>

            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(13px,2vw,16px)', color: '#4a6f94', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 28px' }}>
              The digital guestbook &amp; live album for your special occasion. Guests snap, share &amp; preserve memories — all in one beautiful place. ✨
            </p>

            {/* Feature pills — single scrolling row */}
            <div className="pills-row">
              {FEATURES.map(f => (
                <div key={f.label} className="pill-item">
                  <span style={{ fontSize: '14px' }}>{f.icon}</span>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 600, color: '#101726' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </header>

          {/* ── EVENT CODE ENTRY (right col on wide) ── */}
          <section className="landing-col-right" style={{ marginBottom: '40px' }}>
            <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(74,144,226,0.30)', borderRadius: '28px', padding: 'clamp(24px,5vw,40px)', boxShadow: '0 12px 40px rgba(42,68,95,0.14)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '18px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #2f78c4, #1f4a7c)', display: 'grid', placeItems: 'center', fontSize: '26px', color: '#fff', boxShadow: '0 6px 18px rgba(47,120,196,0.30)' }}>🎊</div>

              <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(20px,3vw,26px)', color: '#101726', textAlign: 'center', marginBottom: '8px' }}>
                Enter Your Event
              </h2>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(12px,1.5vw,13px)', color: '#4a6f94', textAlign: 'center', marginBottom: '24px', lineHeight: 1.65 }}>
                Got your event code from the host? Enter it below to join the album! 👇
              </p>

              <form onSubmit={handleEnter} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>🔑</span>
                  <input
                    type="text"
                    value={code}
                    onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
                    placeholder="e.g. NN2026"
                    autoCapitalize="characters"
                    autoComplete="off"
                    style={{ width: '100%', padding: '15px 15px 15px 44px', borderRadius: '14px', border: `1.5px solid ${error ? '#d85a5a' : 'rgba(74,144,226,0.30)'}`, fontFamily: 'var(--font-dm-sans)', fontSize: '18px', fontWeight: 700, color: '#2f78c4', letterSpacing: '0.12em', background: 'rgba(244,249,255,0.85)', outline: 'none' }}
                  />
                </div>
                {error && <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#d85a5a', textAlign: 'center', margin: 0 }}>{error}</p>}
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: loading ? 'rgba(47,120,196,0.5)' : 'linear-gradient(135deg, #2f78c4, #1f4a7c)', color: '#fff', borderRadius: '999px', fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', boxShadow: '0 6px 20px rgba(47,120,196,0.28)', cursor: loading ? 'default' : 'pointer', transition: 'opacity 0.2s ease' }}>
                  {loading ? 'Joining...' : '🎊 Join the Album'}
                </button>
              </form>
            </div>
          </section>

          {/* ── WHAT IS SELAMASA ── */}
          <section className="landing-full" style={{ marginBottom: '44px' }}>
            <div style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(74,144,226,0.22)', borderRadius: '28px', padding: 'clamp(20px,4vw,32px)', boxShadow: '0 8px 32px rgba(42,68,95,0.10)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '14px', flexShrink: 0, background: 'linear-gradient(135deg, #2f78c4, #1f4a7c)', display: 'grid', placeItems: 'center', fontSize: '20px', color: '#fff' }}>📸</div>
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(18px,3vw,22px)', fontStyle: 'italic', color: '#101726' }}>What is SelaMasa?</h2>
              </div>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(12px,1.8vw,14px)', color: '#4a6f94', lineHeight: 1.85, marginBottom: '16px' }}>
                SelaMasa is a <strong style={{ color: '#2f78c4' }}>digital guestbook</strong> platform for weddings, engagements &amp; celebrations in Malaysia. Guests scan a QR code, take photos or videos, and leave voice messages — all collected automatically into a beautiful <strong style={{ color: '#2f78c4' }}>live album</strong>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {[
                  { icon: '🔗', text: 'Scan QR → instantly access the camera' },
                  { icon: '🖼️', text: 'Album updates live during your event' },
                  { icon: '🎙️', text: 'Record heartfelt voice messages from guests' },
                  { icon: '💌', text: 'Leave written notes for the couple' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontSize: '18px', width: '26px', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(12px,1.6vw,13px)', color: '#101726', lineHeight: 1.55 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── REVIEWS CAROUSEL ── */}
          <section className="landing-full" style={{ marginBottom: '44px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(18px,3vw,24px)', color: '#101726', marginBottom: '4px', textAlign: 'center' }}>What people say</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#4a6f94', textAlign: 'center', marginBottom: '18px' }}>
              Real reviews from SelaMasa users 💙
            </p>

            <div
              className="reviews-track"
              ref={reviewRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {REVIEWS.map((r, i) => (
                <div key={i} className="review-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', fontSize: '22px', background: 'rgba(74,144,226,0.10)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{r.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontSize: '13px', color: '#101726' }}>{r.name}</div>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10px', color: '#4a6f94', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.event}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                      {[...Array(r.rating)].map((_, s) => <span key={s} style={{ color: '#f5a623', fontSize: '13px' }}>★</span>)}
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12.5px', color: '#2d3a4a', lineHeight: 1.75, margin: 0 }}>{r.text}</p>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => { stopAutoPlay(); reviewRef.current?.scrollTo({ left: i * (Math.min((reviewRef.current?.clientWidth ?? 320) * 0.80, 340) + 14), behavior: 'smooth' }); startAutoPlay() }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(47,120,196,0.35)', border: 'none', padding: 0, cursor: 'pointer' }}
                  aria-label={`Review ${i + 1}`} />
              ))}
            </div>
          </section>

          {/* ── SOCIAL LINKS ── */}
          <section className="landing-full social-row" style={{ marginBottom: '32px' }}>
            <a href="https://www.instagram.com/selamasa.my" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px', borderRadius: '16px', background: 'rgba(225,48,108,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(225,48,108,0.25)', color: '#e1306c', fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontSize: '14px' }}>
              <span style={{ fontSize: '20px' }}>📸</span> Follow @SelaMasa.my
            </a>
            <a href="https://wa.me/6011123981846" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px', borderRadius: '16px', background: 'rgba(37,211,102,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(37,211,102,0.25)', color: '#25d366', fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontSize: '14px' }}>
              <span style={{ fontSize: '20px' }}>💬</span> Contact via WhatsApp
            </a>
          </section>

          {/* ── FOOTER ── */}
          <footer className="landing-full" style={{ textAlign: 'center', paddingBottom: 'max(env(safe-area-inset-bottom,24px),24px)' }}>
            <p style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '13px', color: '#4a6f94' }}>Every moment, forever cherished ♡</p>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10px', color: 'rgba(74,111,148,0.55)', marginTop: '6px' }}>© 2026 SelaMasa · Made with 💙 in Malaysia</p>
          </footer>

        </div>
      </div>
    </>
  )
}
