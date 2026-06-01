'use client'
import React, { useState, useRef, useEffect } from 'react'

interface VoiceProps {
  onClose: () => void
  onUpload: (blob: Blob, name: string) => void
  guestName: string
}

export default function VoiceScreen({ onClose, onUpload, guestName }: VoiceProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [name, setName] = useState(guestName || '')
  const [micError, setMicError] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [waveform, setWaveform] = useState<number[]>([])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {})
    }
  }, [previewUrl])

  const startRecording = async () => {
    setMicError(null)
    setAudioBlob(null)
    setPreviewUrl(null)
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
        setRecordingTime(t => t + 1)
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

  const handleSubmit = () => {
    if (audioBlob && name.trim()) {
      onUpload(audioBlob, name)
    }
  }

  return (
    <div className="screen" style={{ background: '#f8f1e8 url(/floral-bg.jpg) center/cover', padding: 'max(env(safe-area-inset-top, 20px), 20px) 20px', display: 'flex', flexDirection: 'column' }}>
      <button onClick={onClose} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>✕</button>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '28px', color: 'var(--cream-text)', marginBottom: '8px' }}>Audio Guestbook</h2>
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: 'var(--cream-sub)', marginBottom: '30px' }}>Leave a voice message for the couple</p>

        {micError && (
          <p style={{ color: '#ff3b30', fontFamily: 'var(--font-dm-sans)', fontSize: '13px', textAlign: 'center', margin: '-10px 20px 20px', lineHeight: 1.5 }}>
            ⚠️ {micError}
          </p>
        )}

        {isRecording && (
          <div style={{ fontFamily: 'var(--font-poppins)', fontSize: '14px', color: '#ff3b30', fontWeight: 'bold', marginBottom: '10px', animation: 'recPulse 1s infinite' }}>
            🔴 {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
          </div>
        )}

        <div style={{ height: '60px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '40px' }}>
          {(isRecording ? waveform : new Array(16).fill(10)).map((val, i) => (
            <div key={i} style={{ width: '4px', height: `${Math.max(4, val / 4)}px`, background: 'var(--gold)', borderRadius: '2px', transition: 'height 0.1s' }} />
          ))}
        </div>

        {!previewUrl ? (
          <button 
            onClick={isRecording ? stopRecording : startRecording}
            style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--gold)', display: 'grid', placeItems: 'center', padding: '6px' }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: isRecording ? '#ff3b30' : 'var(--gold)', animation: isRecording ? 'recPulse 1s infinite' : 'none' }} />
          </button>
        ) : (
          <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <audio src={previewUrl} controls style={{ width: '100%' }} />
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Your name"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--gold)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-dm-sans)', textAlign: 'center' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setPreviewUrl(null)} style={{ flex: 1, padding: '14px', borderRadius: '999px', background: 'rgba(0,0,0,0.1)', color: 'var(--cream-text)', fontWeight: 'bold' }}>Retake</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: '14px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--gold), #a67c00)', color: '#fff', fontWeight: 'bold' }}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
