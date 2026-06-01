import { useState, useRef, useCallback, useEffect } from 'react'

export type FacingMode = 'user' | 'environment'

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const animFrameRef = useRef<number>(0)

  const [facingMode, setFacingMode] = useState<FacingMode>('environment')
  const [isRecording, setIsRecording] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [hasFrontCamera, setHasFrontCamera] = useState(true)

  // ── Detect available cameras ─────────────────────────────────────────────
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(d => d.kind === 'videoinput')
      setHasFrontCamera(videoDevices.length > 1)
    }).catch(() => {})
  }, [])

  // Re-check cameras after stream starts (enumerateDevices may return empty before getUserMedia)
  useEffect(() => {
    if (!cameraReady) return
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(d => d.kind === 'videoinput')
      if (videoDevices.length > 1) setHasFrontCamera(true)
      else setHasFrontCamera(true) // assume front camera exists on mobile
    }).catch(() => setHasFrontCamera(true))
  }, [cameraReady])

  // ── Start / restart camera ───────────────────────────────────────────────
  const startCamera = useCallback(async (mode: FacingMode) => {
    setCameraReady(false)
    setCameraError(null)

    // Stop existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }

    const constraints: MediaStreamConstraints = {
      video: {
        facingMode: { exact: mode },
        width:  { ideal: 1920 },
        height: { ideal: 1080 },
      },
      audio: false,
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = newStream
      setFacingMode(mode)

      if (videoRef.current) {
        videoRef.current.srcObject = newStream
        await videoRef.current.play().catch(() => {})
      }
      setCameraReady(true)
    } catch (err: any) {
      // Fallback — try ideal (exact failed)
      try {
        const fallback = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: mode }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        })
        streamRef.current = fallback
        setFacingMode(mode)
        if (videoRef.current) {
          videoRef.current.srcObject = fallback
          await videoRef.current.play().catch(() => {})
        }
        setCameraReady(true)
      } catch (err2: any) {
        // Last resort — any camera
        try {
          const last = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          streamRef.current = last
          if (videoRef.current) {
            videoRef.current.srcObject = last
            await videoRef.current.play().catch(() => {})
          }
          setCameraReady(true)
        } catch (err3: any) {
          setCameraError(
            err3.name === 'NotAllowedError'
              ? 'Camera permission denied. Please allow camera access in your browser settings.'
              : 'Camera not available on this device.'
          )
        }
      }
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    cancelAnimationFrame(animFrameRef.current)
    setCameraReady(false)
  }, [])

  const flipCamera = useCallback(() => {
    startCamera(facingMode === 'user' ? 'environment' : 'user')
  }, [facingMode, startCamera])

  // ── Capture still photo ──────────────────────────────────────────────────
  const takePhoto = useCallback((filterImage?: HTMLImageElement | null, watermarkText?: string): string => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return ''

    const canvas = document.createElement('canvas')
    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')!

    // Mirror front camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    if (facingMode === 'user') ctx.setTransform(1, 0, 0, 1, 0, 0)

    // Overlay filter
    if (filterImage) {
      ctx.globalCompositeOperation = 'multiply'
      ctx.drawImage(filterImage, 0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
    }

    // Watermark
    if (watermarkText) {
      const fSize = Math.round(canvas.width * 0.045)
      ctx.font = `bold ${fSize}px "Playfair Display", serif`
      ctx.textAlign = 'center'
      ctx.shadowColor = 'rgba(0,0,0,0.6)'
      ctx.shadowBlur = 12
      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height - fSize * 1.5)
    }

    return canvas.toDataURL('image/jpeg', 0.92)
  }, [facingMode])

  // ── Boomerang (2-second video loop) ─────────────────────────────────────
  const startBoomerang = useCallback((): Promise<Blob> => {
    return new Promise((resolve) => {
      const video = videoRef.current
      if (!video || !streamRef.current) return resolve(new Blob())

      setIsRecording(true)
      chunksRef.current = []

      // Record directly from the live stream instead of canvas re-draw
      const mimeTypes = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4']
      const mimeType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) ?? ''

      const mr = new MediaRecorder(streamRef.current, { mimeType, videoBitsPerSecond: 5_000_000 })
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        setIsRecording(false)
        resolve(new Blob(chunksRef.current, { type: mr.mimeType || 'video/webm' }))
      }
      mr.start(100)
      mediaRecorderRef.current = mr

      setTimeout(() => { if (mr.state === 'recording') mr.stop() }, 2000)
    })
  }, [])

  // ── Pick from gallery (file input helper) ───────────────────────────────
  const pickFromGallery = useCallback((): Promise<{ dataUrl: string; file: File } | null> => {
    return new Promise(resolve => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.style.display = 'none'
      document.body.appendChild(input)

      input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        document.body.removeChild(input)
        if (!file) return resolve(null)
        const reader = new FileReader()
        reader.onload = () => resolve({ dataUrl: reader.result as string, file })
        reader.readAsDataURL(file)
      }

      input.oncancel = () => {
        document.body.removeChild(input)
        resolve(null)
      }

      input.click()
    })
  }, [])

  return {
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    flipCamera,
    takePhoto,
    startBoomerang,
    pickFromGallery,
    isRecording,
    facingMode,
    cameraReady,
    cameraError,
    hasFrontCamera,
  }
}
