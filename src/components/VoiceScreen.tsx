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
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [previewUrl])

  // Track playback state of preview audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => {
      if (audio.currentTime) setCurrentTime(audio.currentTime)
    }
    const handleLoadedMetadata = () => {
      if (audio.duration) setDuration(audio.duration)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [previewUrl])

  const chooseMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/ogg',
      'audio/mp4'
    ]
    for (const t of types) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) return t
    }
    return ''
  }

  const startRecording = async () => {
    setMicError(null)
    setAudioBlob(null)
    setPreviewUrl(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      const mimeType = chooseMimeType()
      let mr: MediaRecorder
      try {
        mr = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      } catch (e) {
        mr = new MediaRecorder(stream)
      }

      chunksRef.current = []

      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        if (!chunksRef.current.length) {
          setMicError('Recording is empty. Please try again.')
          return
        }

        const actualMime = mr.mimeType || 'audio/webm'
        const blob = new Blob(chunksRef.current, { type: actualMime })
        if (blob.size < 1200) {
          setMicError('Recording too short. Speak a bit more!')
          return
        }

        setAudioBlob(blob)
        setPreviewUrl(URL.createObjectURL(blob))
        setIsRecording(false)
      }

      mr.start(250)
      mediaRecorderRef.current = mr
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime(t => {
          if (t >= 59) {
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
          ? 'Microphone permission denied. Please allow mic access in your browser settings.'
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
    setCurrentTime(0)
    setDuration(0)
    setMicError(null)
  }

  const handleSubmit = () => {
    if (audioBlob && name.trim()) {
      onUpload(audioBlob, name)
    }
  }

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
    const sec = Math.floor(seconds)
    const mm = Math.floor(sec / 60)
    const ss = String(sec % 60).padStart(2, '0')
    return `${mm}:${ss}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0
  const isFormValid = audioBlob !== null && name.trim() !== ''

  return (
    <div className="screen" style={{ background: '#070a12', overflow: 'hidden' }}>
      <div className="voice-page">
        {/* Back navigation */}
        <button className="voice-back" onClick={onClose} type="button" aria-label="Go Back">
          ←
        </button>

        {/* Brand & Couple Section */}
        <header className="voice-head">
          <div className="voice-brand">Sela Masa</div>
          <h1 className="voice-couple">{coupleName}</h1>
          <div className="voice-chip">Audio Guestbook</div>
        </header>

        {/* Audio tag for preview */}
        {previewUrl && <audio ref={audioRef} src={previewUrl} preload="metadata" />}

        {/* Main Content Area */}
        <main className="voice-content">
          <section className={`voice-card ${audioBlob ? 'has-preview' : ''}`}>
            
            {/* Record Trigger Button */}
            <div className="voice-record-wrap">
              <div className="voice-pulse" />
              <button 
                className="voice-record-btn" 
                type="button" 
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? '■' : '🎙'}
              </button>
            </div>

            <h1 className="voice-title">
              {audioBlob ? 'Ready to Send' : (isRecording ? 'Recording...' : 'Leave Your Voice')}
            </h1>
            
            <p className="voice-sub">
              {audioBlob 
                ? 'Listen once before sending, then tap send voice.' 
                : 'Tap record, speak your wishes, then preview your voice before sending it to the album.'}
            </p>

            {!audioBlob && (
              <div className="voice-limit-note">Maximum recording: 60 seconds</div>
            )}

            {/* Guest Name Input */}
            <input 
              className="voice-name-input" 
              type="text" 
              maxLength={60} 
              placeholder="Your name, e.g. Aunty Sarah"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            {/* Timer or State Text */}
            <div className="voice-timer">
              {isRecording 
                ? `Recording ${formatTime(recordingTime)}` 
                : (audioBlob ? 'Preview your voice' : 'Tap to record')}
            </div>

            {/* Microphone Access Error Warnings */}
            {micError && (
              <p style={{ color: '#ff5c5c', fontFamily: 'var(--font-dm-sans)', fontSize: '12px', textAlign: 'center', maxWidth: '280px', marginTop: '4px', lineHeight: 1.4 }}>
                ⚠️ {micError}
              </p>
            )}

            {/* Preview custom player */}
            <div className={`voice-preview ${audioBlob ? 'show' : ''}`}>
              <div className="voice-custom-player">
                <button 
                  className="voice-play-btn" 
                  type="button" 
                  onClick={togglePlayPreview}
                  aria-label="Play preview"
                >
                  {isPlaying ? '❚❚' : '▶'}
                </button>

                <div className="voice-player-track">
                  <div className="voice-wave-line">
                    <div className="voice-wave-progress" style={{ width: `${progressPercentage}%` }} />
                  </div>
                  <input 
                    className="voice-seek-bar"
                    type="range" 
                    min={0} 
                    max={100} 
                    step={0.1}
                    value={progressPercentage}
                    onChange={e => {
                      if (audioRef.current && duration > 0) {
                        const newTime = (Number(e.target.value) / 100) * duration
                        audioRef.current.currentTime = newTime
                        setCurrentTime(newTime)
                      }
                    }}
                    aria-label="Voice progress"
                  />
                </div>

                <div className="voice-time-text">{formatTime(currentTime)}</div>
              </div>
            </div>

          </section>
        </main>

        {/* Footer Buttons */}
        <footer className="voice-foot">
          <button 
            className="voice-btn voice-btn-secondary" 
            type="button" 
            onClick={handleRetake}
            disabled={!audioBlob}
          >
            Retake
          </button>
          
          <button 
            className="voice-btn voice-btn-send" 
            type="button" 
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Send Voice
          </button>
        </footer>
      </div>
    </div>
  )
}
