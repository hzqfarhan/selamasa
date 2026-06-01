'use client'
import React, { useRef, useState, useEffect } from 'react'

interface VoicePlayerProps {
  src: string
}

const bars = [10,16,22,14,26,18,12,28,20,15,24,30,18,12,26,34,22,14,28,20,16,24,31,19,13,27,21,15,22,29,17,11,20,14]

export default function VoicePlayer({ src }: VoicePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onMeta = () => setDuration(audio.duration)
    const onTime = () => setCurrentTime(audio.currentTime)
    const onEnd = () => { setPlaying(false); setCurrentTime(0) }
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  const fmt = (s: number) => {
    if (!Number.isFinite(s) || s < 0) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  return (
    <div className="voice-player-row">
      <button type="button" className="voice-play-btn" onClick={togglePlay}>
        {playing ? '❚❚' : '▶'}
      </button>
      <div className={`voice-wave${playing ? ' playing' : ''}`}>
        {bars.map((h, i) => (
          <span key={i} style={{ '--h': h, '--i': i } as React.CSSProperties} />
        ))}
      </div>
      <span className="voice-duration">{fmt(currentTime)}</span>
      <audio ref={audioRef} className="voice-native-audio" src={src} preload="metadata" />
    </div>
  )
}