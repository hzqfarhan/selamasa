'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

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
  const pillsRef = useRef<HTMLDivElement>(null)

  // Allow the app-container to scroll on the landing page
  useEffect(() => {
    const container = document.querySelector('.app-container')
    container?.classList.add('landing-scroll')
    return () => container?.classList.remove('landing-scroll')
  }, [])

  const handleEnter = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = code.trim()
    if (!trimmed) {
      setError('Masukkan kod acara dulu ye 😅')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/resolve-code?code=${encodeURIComponent(trimmed)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Kod tidak dijumpai. Sila cuba lagi.')
        setLoading(false)
        return
      }
      router.push(`/event/${data.slug}`)
    } catch {
      setError('Ralat sambungan. Sila cuba lagi.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      background: 'url(/asset/bg.png) center/cover no-repeat fixed',
      position: 'relative',
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.92) 0%, rgba(244,249,255,0.80) 55%, transparent 100%)',
      }} />

      {/* Falling leaves */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(16)].map((_, i) => {
          const delay = i * 0.42
          const dur = 5.2 + (i % 4) * 1.8
          const left = 4 + (i * 21) % 92
          const size = 10 + (i % 4) * 4
          return (
            <div key={i} style={{
              position: 'absolute',
              width: `${size}px`, height: `${size}px`,
              background: 'linear-gradient(135deg, #2f78c4, #77acdc)',
              borderRadius: '0 100% 0 100%',
              opacity: 0,
              left: `${left}%`,
              animation: `splashFall ${dur}s ${delay}s infinite linear`,
            }} />
          )
        })}
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '480px', margin: '0 auto', padding: '0 20px 60px' }}>

        {/* ── HERO ── */}
        <header style={{ textAlign: 'center', paddingTop: 'max(env(safe-area-inset-top, 40px), 40px)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(74,144,226,0.28)', borderRadius: '999px',
            padding: '8px 18px', marginBottom: '28px',
            boxShadow: '0 4px 20px rgba(42,68,95,0.10)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/asset/selamasa.png" alt="SelaMasa" style={{ width: '28px', height: '28px', borderRadius: '10px', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.26em', color: '#2f78c4' }}>SELA MASA</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-great-vibes)', fontSize: 'clamp(52px, 14vw, 68px)',
            color: '#2f78c4', lineHeight: 1,
            textShadow: '0 2px 20px rgba(47,120,196,0.18), 0 0 1px #fff',
            marginBottom: '16px',
          }}>
            Kenangan Abadi
          </h1>

          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: '15px', color: '#4a6f94',
            lineHeight: 1.7, maxWidth: '320px', margin: '0 auto 28px',
          }}>
            Platform digital guestbook & album untuk majlis kamu. Tetamu snap, share & simpan kenangan — semua dalam satu tempat. ✨
          </p>

          {/* Feature pills row */}
          <div ref={pillsRef} style={{
            display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px',
            scrollbarWidth: 'none', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {FEATURES.map(f => (
              <div key={f.label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '999px', flexShrink: 0,
                background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(74,144,226,0.22)',
                boxShadow: '0 2px 8px rgba(42,68,95,0.06)',
              }}>
                <span style={{ fontSize: '14px' }}>{f.icon}</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 600, color: '#101726' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ── WHAT IS SELAMASA ── */}
        <section style={{ marginTop: '40px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(74,144,226,0.22)', borderRadius: '28px',
            padding: '28px 24px',
            boxShadow: '0 8px 32px rgba(42,68,95,0.10)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #2f78c4, #1f4a7c)',
                display: 'grid', placeItems: 'center', fontSize: '18px', color: '#fff',
              }}>📸</div>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '20px', fontStyle: 'italic', color: '#101726' }}>
                Apa itu SelaMasa?
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#4a6f94', lineHeight: 1.8 }}>
              SelaMasa adalah platform <strong style={{ color: '#2f78c4' }}>digital guestbook</strong> untuk majlis perkahwinan, pertunangan & kenduri di Malaysia. Tetamu scan QR, ambil gambar atau video, tinggalkan ucapan suara — semua dikumpul secara automatik dalam <strong style={{ color: '#2f78c4' }}>live album</strong> yang cantik.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: '🔗', text: 'Scan QR → terus boleh snap gambar' },
                { icon: '🖼️', text: 'Album dikemas kini secara live semasa majlis' },
                { icon: '🎙️', text: 'Rekod ucapan suara dari tetamu' },
                { icon: '💌', text: 'Tulis nota ikhlas untuk pengantin' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px', width: '28px', textAlign: 'center' }}>{item.icon}</span>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#101726' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section style={{ marginTop: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '22px',
            color: '#101726', marginBottom: '4px', textAlign: 'center',
          }}>Apa kata mereka?</h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#4a6f94', textAlign: 'center', marginBottom: '20px' }}>
            Review jujur dari pengguna SelaMasa 💙
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(74,144,226,0.18)', borderRadius: '22px',
                padding: '18px 20px',
                boxShadow: '0 4px 16px rgba(42,68,95,0.07)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%', fontSize: '22px',
                    background: 'rgba(74,144,226,0.10)', display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>{r.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '13px', color: '#101726' }}>{r.name}</div>
                    <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10px', color: '#4a6f94', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.event}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                    {[...Array(r.rating)].map((_, s) => (
                      <span key={s} style={{ color: '#f5a623', fontSize: '12px' }}>★</span>
                    ))}
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#2d3a4a', lineHeight: 1.7, margin: 0 }}>
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── EVENT CODE ENTRY ── */}
        <section style={{ marginTop: '40px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(74,144,226,0.30)', borderRadius: '28px',
            padding: '30px 24px',
            boxShadow: '0 12px 40px rgba(42,68,95,0.14)',
          }}>
            {/* Icon */}
            <div style={{
              width: '52px', height: '52px', borderRadius: '18px', margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #2f78c4, #1f4a7c)',
              display: 'grid', placeItems: 'center', fontSize: '26px', color: '#fff',
              boxShadow: '0 6px 18px rgba(47,120,196,0.30)',
            }}>🎊</div>

            <h2 style={{
              fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '22px',
              color: '#101726', textAlign: 'center', marginBottom: '8px',
            }}>Masuk Ke Majlis</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#4a6f94', textAlign: 'center', marginBottom: '22px', lineHeight: 1.6 }}>
              Dah dapat kod acara dari tuan majlis? Masukkan kat bawah ni dan terus join! 👇
            </p>

            <form onSubmit={handleEnter} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '16px', pointerEvents: 'none',
                }}>🔑</span>
                <input
                  type="text"
                  value={code}
                  onChange={e => { setCode(e.target.value); setError('') }}
                  placeholder="cth: nureen-nizam-2026"
                  style={{
                    width: '100%', padding: '14px 14px 14px 42px',
                    borderRadius: '14px', border: `1.5px solid ${error ? '#d85a5a' : 'rgba(74,144,226,0.30)'}`,
                    fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#101726',
                    background: 'rgba(244,249,255,0.8)', outline: 'none',
                    letterSpacing: '0.02em',
                  }}
                />
              </div>
              {error && (
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#d85a5a', textAlign: 'center', margin: 0 }}>
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '16px',
                  background: loading ? 'rgba(47,120,196,0.5)' : 'linear-gradient(135deg, #2f78c4, #1f4a7c)',
                  color: '#fff', borderRadius: '999px', fontFamily: 'var(--font-poppins)',
                  fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em',
                  boxShadow: '0 6px 20px rgba(47,120,196,0.30)',
                  transition: 'opacity 0.2s ease, transform 0.15s ease',
                  cursor: loading ? 'default' : 'pointer',
                }}
              >
                {loading ? 'Masuk...' : '🎊 Masuk Majlis'}
              </button>
            </form>
          </div>
        </section>

        {/* ── FOOTER SOCIAL ── */}
        <section style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href="https://www.instagram.com/selamasa.my"
            target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '15px', borderRadius: '16px',
              background: 'rgba(225,48,108,0.08)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(225,48,108,0.25)', color: '#e1306c',
              fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontSize: '14px',
            }}
          >
            <span style={{ fontSize: '20px' }}>📸</span> Follow @SelaMasa.my
          </a>
          <a
            href="https://wa.me/6011123981846"
            target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '15px', borderRadius: '16px',
              background: 'rgba(37,211,102,0.08)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(37,211,102,0.25)', color: '#25d366',
              fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontSize: '14px',
            }}
          >
            <span style={{ fontSize: '20px' }}>💬</span> Hubungi via WhatsApp
          </a>
        </section>

        {/* ── TINY FOOTER ── */}
        <footer style={{ textAlign: 'center', marginTop: '36px', paddingBottom: 'max(env(safe-area-inset-bottom, 20px), 20px)' }}>
          <p style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '13px', color: '#4a6f94' }}>
            Every moment, forever cherished ♡
          </p>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10px', color: 'rgba(74,111,148,0.6)', marginTop: '6px' }}>
            © 2026 SelaMasa · Made with 💙 in Malaysia
          </p>
        </footer>

      </div>
    </div>
  )
}
