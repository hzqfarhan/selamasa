'use client'
import React, { useState, useRef, useEffect } from 'react'

interface VoiceProps {
  onClose: () => void
  onUpload: (blob: Blob, name: string) => void
  guestName: string
  coupleName: string
}

export default function VoiceScreen({ onClose, onUpload, guestName, coupleName }: VoiceProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [name, setName] = useState(guestName || '')
  const [micError, setMicError] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [waveform, setWaveform] = useState<number[]>([])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {})
    }
  }, [previewUrl])

  // Track playback state of preview audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [previewUrl])

  const startRecording = async () => {
    setMicError(null)
    setAudioBlob(null)
    setPreviewUrl(null)
    setIsPlaying(false)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      chunksRef.current = []

      let audioCtx: AudioContext | null = null
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
          audioCtx = new AudioContextClass()
          audioCtxRef.current = audioCtx
        }
      } catch (ctxErr) {
        console.warn('AudioContext failed:', ctxErr)
      }

      if (audioCtx) {
        try {
          const source = audioCtx.createMediaStreamSource(stream)
          const analyser = audioCtx.createAnalyser()
          analyser.fftSize = 64
          source.connect(analyser)
          analyserRef.current = analyser

          const updateWaveform = () => {
            if (mr.state !== 'recording') return
            const dataArray = new Uint8Array(analyser.frequencyBinCount)
            analyser.getByteFrequencyData(dataArray)
            const subset = Array.from(dataArray).slice(0, 16)
            setWaveform(subset)
            requestAnimationFrame(updateWaveform)
          }

          mr.onstart = () => {
            requestAnimationFrame(updateWaveform)
          }
        } catch (analyserErr) {
          console.warn('Waveform analysis failed:', analyserErr)
        }
      }

      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        const mimeType = mr.mimeType || 'audio/webm'
        const blob = new Blob(chunksRef.current, { type: mimeType })
        setAudioBlob(blob)
        setPreviewUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(t => t.stop())
        if (audioCtx) {
          audioCtx.close().catch(() => {})
        }
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        setIsRecording(false)
      }

      mr.start(100)
      mediaRecorderRef.current = mr
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime(t => {
          if (t >= 59) {
            // Auto stop at 60s limit
            stopRecording()
            return 60
          }
          return t + 1
        })
      }, 1000)
    } catch (e: any) {
      console.error(e)
      setMicError(
        e.name === 'NotAllowedError'
          ? 'Microphone permission denied. Please allow microphone access in your browser settings.'
          : 'Microphone not available on this device.'
      )
      setIsRecording(false)
    }
  }

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }

  const togglePlayPreview = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(err => console.error('Play failed:', err))
    }
  }

  const handleRetake = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setAudioBlob(null)
    setPreviewUrl(null)
    setIsPlaying(false)
    setWaveform([])
  }

  const handleSubmit = () => {
    if (audioBlob && name.trim()) {
      onUpload(audioBlob, name)
    }
  }

  const renderPromptText = () => {
    if (isRecording) {
      return 'RECORDING... (TAP TO STOP)'
    }
    if (previewUrl) {
      return isPlaying ? 'PLAYING... (TAP TO PAUSE)' : 'RECORDED (TAP TO LISTEN)'
    }
    return 'TAP TO RECORD'
  }

  const renderBadgeContent = () => {
    if (isRecording) {
      return (
        <div style={{ width: '28px', height: '28px', background: '#ff3b30', borderRadius: '6px', animation: 'recPulse 1s infinite' }} />
      )
    }
    if (previewUrl) {
      return isPlaying ? (
        // Pause icon SVG
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#17110b">
          <rect x="5" y="4" width="4" height="16" rx="1" />
          <rect x="15" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        // Play icon SVG
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#17110b" style={{ marginLeft: '6px' }}>
          <path d="M8 5V19L19 12L8 5Z" />
        </svg>
      )
    }
    return (
      <span style={{ fontSize: '38px', userSelect: 'none' }}>🎙️</span>
    )
  }

  const isFormValid = audioBlob !== null && name.trim() !== ''

  return (
    <div className="screen" style={{
      background: 'radial-gradient(circle at center, #2b1f13 0%, #0d0805 100%)',
      padding: 'max(env(safe-area-inset-top, 20px), 20px) 20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Decorative Concentric Rings/Arcs */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '320px', height: '320px', borderRadius: '50%',
        border: '1.5px solid rgba(198,162,84,0.12)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '280px', height: '280px', borderRadius: '50%',
        border: '1px solid rgba(198,162,84,0.06)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-150px', left: '-150px',
        width: '360px', height: '360px', borderRadius: '50%',
        border: '1.5px solid rgba(198,162,84,0.12)', pointerEvents: 'none'
      }} />
      
      {/* Hidden Audio Player for Previews */}
      {previewUrl && <audio ref={audioRef} src={previewUrl} style={{ display: 'none' }} />}

      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', zIndex: 10, position: 'relative' }}>
        <button onClick={onClose} style={{
          width: '42px', height: '42px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(198,162,84,0.22)',
          display: 'grid', placeItems: 'center',
          color: '#fff', fontSize: '18px', cursor: 'pointer'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Brand & Couple Section */}
      <div style={{ textAlign: 'center', marginTop: '10px', zIndex: 10 }}>
        <div style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '15px', color: '#c6a254', letterSpacing: '0.04em' }}>Sela Masa</div>
        <h1 style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '42px', color: '#fff', margin: '4px 0 10px', lineHeight: 1.1 }}>
          {coupleName}
        </h1>
        
        {/* AUDIO GUESTBOOK badge */}
        <div style={{
          border: '1px solid rgba(198,162,84,0.4)',
          borderRadius: '999px',
          padding: '6px 18px',
          fontSize: '9px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          color: '#c6a254',
          display: 'inline-block',
          textTransform: 'uppercase',
          background: 'rgba(198,162,84,0.05)',
        }}>
          AUDIO GUESTBOOK
        </div>
      </div>

      {/* Center Interactive Recorder Circle */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
        
        {/* Red Live Stopwatch overlay */}
        {isRecording && (
          <div style={{
            fontFamily: 'var(--font-poppins)', fontSize: '13px', color: '#ff3b30', fontWeight: 'bold',
            marginBottom: '10px', background: 'rgba(255,59,48,0.1)', padding: '4px 12px', borderRadius: '999px'
          }}>
            🔴 0:{(recordingTime).toString().padStart(2, '0')} / 1:00
          </div>
        )}

        {/* Double-Ring Golden Concentric recorder circle */}
        <button
          onClick={isRecording ? stopRecording : (previewUrl ? togglePlayPreview : startRecording)}
          style={{
            width: '126px', height: '126px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #fbe8c5 0%, #c6a254 50%, #8a6a2f 100%)',
            border: '4px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 0 2px #c6a254, 0 12px 30px rgba(0,0,0,0.6)',
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.2s',
          }}
          className="rec-badge"
        >
          {renderBadgeContent()}
        </button>

        {/* Serif main description */}
        <h3 style={{
          fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: '28px',
          fontWeight: '400', color: '#fff', textAlign: 'center', marginTop: '24px', marginBottom: '8px'
        }}>
          Leave Your Voice
        </h3>
        
        <p style={{
          fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'rgba(255,253,249,0.7)',
          textAlign: 'center', maxWidth: '290px', lineHeight: 1.6, margin: '0 auto 4px'
        }}>
          Tap record, speak your wishes, then preview your voice before sending it to the album.
        </p>
        
        <p style={{
          fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#c6a254',
          fontWeight: '600', textAlign: 'center', marginBottom: '24px'
        }}>
          Maximum recording: 60 seconds
        </p>

        {/* Mic Access Error Warnings */}
        {micError && (
          <p style={{ color: '#ff3b30', fontFamily: 'var(--font-dm-sans)', fontSize: '13px', textAlign: 'center', maxWidth: '280px', marginBottom: '16px', lineHeight: 1.4 }}>
            ⚠️ {micError}
          </p>
        )}

        {/* Capsule Name Input */}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name, e.g. Aunty Sarah"
          style={{
            width: '100%', maxWidth: '310px',
            padding: '15px 22px', borderRadius: '999px',
            border: '1.2px solid rgba(198,162,84,0.3)',
            background: 'rgba(255,255,255,0.03)',
            color: '#fff', textAlign: 'center',
            fontSize: '14px', fontFamily: 'var(--font-dm-sans)',
            outline: 'none', transition: 'border-color 0.2s',
          }}
        />

        {/* Tap Prompt text below input */}
        <div 
          onClick={isRecording ? stopRecording : (previewUrl ? togglePlayPreview : startRecording)}
          style={{
            fontFamily: 'var(--font-poppins)', fontSize: '11px', fontWeight: '700',
            letterSpacing: '0.18em', color: '#fbe8c5', marginTop: '16px',
            textTransform: 'uppercase', cursor: 'pointer', opacity: 0.95
          }}
        >
          {renderPromptText()}
        </div>

      </div>

      {/* Bottom Retake / Send Voice buttons row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '12px',
        width: '100%', maxWidth: '340px', margin: 'auto auto 0', zIndex: 10
      }}>
        
        {/* RETAKE */}
        <button 
          onClick={handleRetake} 
          disabled={!audioBlob}
          style={{
            padding: '15px',
            background: 'rgba(255,255,255,0.02)',
            border: '1.2px solid rgba(198,162,84,0.22)',
            borderRadius: '999px',
            color: '#fff',
            opacity: audioBlob ? 0.9 : 0.28,
            fontSize: '11px', fontWeight: '700',
            fontFamily: 'var(--font-poppins)', letterSpacing: '0.12em',
            textTransform: 'uppercase', cursor: audioBlob ? 'pointer' : 'default',
            transition: 'all 0.2s'
          }}
        >
          RETAKE
        </button>

        {/* SEND VOICE */}
        <button 
          onClick={handleSubmit} 
          disabled={!isFormValid}
          style={{
            padding: '15px',
            background: isFormValid ? 'linear-gradient(135deg, #c6a254, #8a6a2f)' : 'rgba(198,162,84,0.1)',
            border: isFormValid ? 'none' : '1px solid rgba(198,162,84,0.15)',
            borderRadius: '999px',
            color: isFormValid ? '#17110b' : 'rgba(255,255,255,0.28)',
            fontSize: '11px', fontWeight: '700',
            fontFamily: 'var(--font-poppins)', letterSpacing: '0.12em',
            textTransform: 'uppercase', cursor: isFormValid ? 'pointer' : 'default',
            boxShadow: isFormValid ? '0 5px 18px rgba(198,162,84,0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          SEND VOICE
        </button>

      </div>
    </div>
  )
}
