import { useState, useRef, useCallback } from 'react'

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [isRecording, setIsRecording] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startCamera = useCallback(async (mode: 'user' | 'environment') => {
    if (stream) stream.getTracks().forEach(t => t.stop())
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } },
        audio: false
      })
      setStream(newStream)
      setFacingMode(mode)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
        videoRef.current.play()
      }
    } catch (e) {
      console.error('Camera error:', e)
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream(fallbackStream)
        setFacingMode(mode)
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream
          videoRef.current.play()
        }
      } catch (err) {
        console.error('Fallback camera error:', err)
      }
    }
  }, [stream])

  const flipCamera = useCallback(() => {
    startCamera(facingMode === 'user' ? 'environment' : 'user')
  }, [facingMode, startCamera])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop())
      setStream(null)
    }
  }, [stream])

  const takePhoto = useCallback((filterImage?: HTMLImageElement, watermarkText?: string): string => {
    if (!videoRef.current) return ''
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 1080
    canvas.height = video.videoHeight || 1920
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    if (facingMode === 'user') {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    if (filterImage) {
      ctx.drawImage(filterImage, 0, 0, canvas.width, canvas.height)
    }

    if (watermarkText) {
      ctx.fillStyle = 'white'
      ctx.font = 'bold 60px "Playfair Display"'
      ctx.shadowColor = 'rgba(0,0,0,0.5)'
      ctx.shadowBlur = 10
      ctx.textAlign = 'center'
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 100)
    }

    return canvas.toDataURL('image/jpeg', 0.95)
  }, [facingMode])

  const startBoomerang = useCallback((): Promise<Blob> => {
    return new Promise((resolve) => {
      if (!videoRef.current || !stream) return resolve(new Blob())
      setIsRecording(true)
      chunksRef.current = []

      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1920
      const ctx = canvas.getContext('2d')

      let drawing = true
      const drawFrame = () => {
        if (!ctx || !videoRef.current || !drawing) return
        const v = videoRef.current
        const vRatio = v.videoWidth / v.videoHeight
        const cRatio = canvas.width / canvas.height
        let drawWidth = canvas.width, drawHeight = canvas.height
        let startX = 0, startY = 0

        if (vRatio > cRatio) {
          drawWidth = canvas.height * vRatio
          startX = (canvas.width - drawWidth) / 2
        } else {
          drawHeight = canvas.width / vRatio
          startY = (canvas.height - drawHeight) / 2
        }

        ctx.save()
        if (facingMode === 'user') {
          ctx.translate(canvas.width, 0)
          ctx.scale(-1, 1)
        }
        ctx.drawImage(v, startX, startY, drawWidth, drawHeight)
        ctx.restore()
        if (drawing) requestAnimationFrame(drawFrame)
      }
      requestAnimationFrame(drawFrame)

      const canvasStream = canvas.captureStream(30)
      const mimeTypes = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4']
      let mimeType = ''
      for (const type of mimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type
          break
        }
      }

      const mr = new MediaRecorder(canvasStream, { mimeType, videoBitsPerSecond: 4000000 })
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        drawing = false
        resolve(new Blob(chunksRef.current, { type: mr.mimeType || 'video/webm' }))
      }
      mr.start()
      mediaRecorderRef.current = mr

      setTimeout(() => {
        setIsRecording(false)
        mr.stop()
      }, 2000)
    })
  }, [stream, facingMode])

  return { videoRef, startCamera, stopCamera, flipCamera, takePhoto, startBoomerang, isRecording, facingMode }
}
