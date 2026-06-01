// ─── Event ─────────────────────────────────────────────────────────────────

export interface EventConfig {
  id: string
  bride: string
  groom: string
  event_date: string | null       // ISO date string from PostgreSQL
  location: string
  type: 'wedding' | 'engagement'
  cover_photo_url: string
  welcome_note: string
  package: 'basic' | 'premium'
  features: { boomerang: boolean; voice: boolean; notes: boolean; filters: boolean }
  allowed_filters: string[]
  filter_text: { watermark: string; tagline: string }
  text_style: { position: string; size: string; font: string; color: string; showName: boolean }
  created_at: string
}

// ─── Memory ────────────────────────────────────────────────────────────────

export interface Memory {
  id: string
  event_id: string
  type: 'photo' | 'video' | 'boomerang' | 'voice' | 'message'
  guest_name: string
  // Alias used in components (mapped from guest_name for backward-compat)
  guestName?: string
  file_url?: string
  // Alias used in components
  fileUrl?: string
  caption?: string
  selected_filter?: string
  selectedFilter?: string
  likes: number
  width?: number
  height?: number
  uploaded_at: string
  uploadedAt?: string
}
