'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import SplashScreen from '@/components/SplashScreen'
import WelcomeScreen from '@/components/WelcomeScreen'
import GuestNameScreen from '@/components/GuestNameScreen'
import CameraScreen from '@/components/CameraScreen'
import CaptureReviewScreen from '@/components/CaptureReviewScreen'
import GalleryScreen from '@/components/GalleryScreen'
import WriteNoteScreen from '@/components/WriteNoteScreen'
import VoiceScreen from '@/components/VoiceScreen'
import ProfileScreen from '@/components/ProfileScreen'
import HomeScreen from '@/components/HomeScreen'
import PhotoDetailModal from '@/components/PhotoDetailModal'
import { useEvent } from '@/hooks/useEvent'
import { useGallery } from '@/hooks/useGallery'

type ScreenState = 'splash' | 'welcome' | 'guestname' | 'camera' | 'review' | 'gallery' | 'note' | 'voice' | 'profile' | 'home'

export default function EventPage() {
  const { slug } = useParams()
  const { eventConfig, loading } = useEvent(slug as string)
  const { memories, tab, changeTab, loadMemories, hasMore, addOptimisticLike } = useGallery(slug as string)
  
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('splash')
  const [guestName, setGuestName] = useState('')
  const [capturedMedia, setCapturedMedia] = useState<{ url: string | null, blob: Blob | null, type: 'photo' | 'boomerang' }>({ url: null, blob: null, type: 'photo' })
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  if (loading) return null
  
  const coupleName = eventConfig ? `${eventConfig.bride} & ${eventConfig.groom}` : 'SelaMasa'
  const filters = eventConfig?.allowedFilters || ['none', 'floral', 'gold', 'vintage']

  const handleCapturePhoto = (dataUrl: string) => {
    setCapturedMedia({ url: dataUrl, blob: null, type: 'photo' })
    setCurrentScreen('review')
  }

  const handleCaptureBoomerang = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    setCapturedMedia({ url, blob, type: 'boomerang' })
    setCurrentScreen('review')
  }

  const handleUploadReview = async (caption: string) => {
    const isPhoto = capturedMedia.type === 'photo'
    if (isPhoto && capturedMedia.url) {
      await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: capturedMedia.url, guest_name: guestName, caption, slug })
      })
    } else if (capturedMedia.blob) {
      const fd = new FormData()
      fd.append('video', capturedMedia.blob)
      fd.append('guest_name', guestName)
      fd.append('caption', caption)
      fd.append('type', 'boomerang')
      fd.append('slug', slug as string)
      await fetch('/api/upload-video', { method: 'POST', body: fd })
    }
    loadMemories(true)
    setCurrentScreen('gallery')
  }

  const handleUploadVoice = async (blob: Blob, name: string) => {
    setGuestName(name)
    const fd = new FormData()
    fd.append('video', blob)
    fd.append('guest_name', name)
    fd.append('type', 'voice')
    fd.append('slug', slug as string)
    await fetch('/api/upload-video', { method: 'POST', body: fd })
    loadMemories(true)
    setCurrentScreen('gallery')
  }

  const handleSendNote = async (message: string, name: string) => {
    setGuestName(name)
    const fd = new FormData()
    fd.append('guest_name', name)
    fd.append('message_text', message)
    fd.append('slug', slug as string)
    await fetch('/api/text-message', { method: 'POST', body: fd })
    loadMemories(true)
    setCurrentScreen('gallery')
  }

  const handleLike = async (id: string) => {
    addOptimisticLike(id)
    await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photo_id: id, slug })
    })
  }

  return (
    <>
      {currentScreen === 'splash' && <SplashScreen onComplete={() => setCurrentScreen('welcome')} />}
      {currentScreen === 'welcome' && <WelcomeScreen onStartCapture={() => setCurrentScreen('guestname')} onViewAlbum={() => setCurrentScreen('gallery')} onVoiceMemory={() => setCurrentScreen('voice')} onWriteNote={() => setCurrentScreen('note')} />}
      {currentScreen === 'guestname' && <GuestNameScreen onConfirm={(name) => { setGuestName(name); setCurrentScreen('camera') }} onBack={() => setCurrentScreen('welcome')} />}
      {currentScreen === 'camera' && <CameraScreen coupleName={coupleName} guestName={guestName} allowedFilters={filters} onCapturePhoto={handleCapturePhoto} onCaptureBoomerang={handleCaptureBoomerang} onBack={() => setCurrentScreen('welcome')} />}
      {currentScreen === 'review' && <CaptureReviewScreen mediaUrl={capturedMedia.url} mediaBlob={capturedMedia.blob} type={capturedMedia.type} guestName={guestName} onRetake={() => setCurrentScreen('camera')} onShare={handleUploadReview} />}
      {currentScreen === 'gallery' && <GalleryScreen slug={slug as string} coupleName={coupleName} memories={memories} tab={tab} onChangeTab={changeTab} onLoadMore={() => loadMemories()} hasMore={hasMore} onLike={handleLike} onBack={() => setCurrentScreen('welcome')} onCaptureClick={() => guestName ? setCurrentScreen('camera') : setCurrentScreen('guestname')} onNavChange={(t) => setCurrentScreen(t as any)} onPhotoClick={setSelectedPhotoIndex} />}
      {currentScreen === 'note' && <WriteNoteScreen coupleName={coupleName} guestName={guestName} onClose={() => setCurrentScreen('welcome')} onSend={handleSendNote} onVoiceRedirect={() => setCurrentScreen('voice')} />}
      {currentScreen === 'voice' && <VoiceScreen coupleName={coupleName} guestName={guestName} onClose={() => setCurrentScreen('welcome')} onUpload={handleUploadVoice} />}
      {currentScreen === 'profile' && <ProfileScreen onNavChange={(t: any) => setCurrentScreen(t)} onCaptureClick={() => guestName ? setCurrentScreen('camera') : setCurrentScreen('guestname')} />}
      {currentScreen === 'home' && <HomeScreen onNavChange={(t) => setCurrentScreen(t as any)} onCaptureClick={() => guestName ? setCurrentScreen('camera') : setCurrentScreen('guestname')} onViewAlbum={() => setCurrentScreen('gallery')} onVoiceMemory={() => setCurrentScreen('voice')} onWriteNote={() => setCurrentScreen('note')} coupleName={coupleName} />}

      {selectedPhotoIndex !== null && (
        <PhotoDetailModal 
          memory={memories[selectedPhotoIndex]} 
          currentIndex={selectedPhotoIndex} 
          total={memories.length} 
          onClose={() => setSelectedPhotoIndex(null)} 
          onPrev={() => setSelectedPhotoIndex(Math.max(0, selectedPhotoIndex - 1))} 
          onNext={() => setSelectedPhotoIndex(Math.min(memories.length - 1, selectedPhotoIndex + 1))} 
        />
      )}
    </>
  )
}
