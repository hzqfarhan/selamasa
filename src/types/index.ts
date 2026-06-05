// ─── Event ─────────────────────────────────────────────────────────────────

export interface EventConfig {
  // DB columns (snake_case from Supabase)
  id: string
  bride: string
  groom: string
  event_date: string | null
  location: string
  type: 'wedding' | 'engagement'
  cover_photo_url: string | null
  welcome_note: string | null
  package: 'basic' | 'premium'
  features: { boomerang: boolean; voice: boolean; notes: boolean; filters: boolean }
  allowed_filters: string[]
  filter_text: { watermark: string; tagline: string }
  text_style: { position: string; size: string; font: string; color: string; showName: boolean }
  access_code: string | null
  created_at: string

  // camelCase aliases for component compatibility
  coverPhotoUrl?: string | null
  welcomeNote?: string | null
  allowedFilters?: string[]
  filterText?: { watermark: string; tagline: string }
  textStyle?: { position: string; size: string; font: string; color: string; showName: boolean }
  createdAt?: string
}

// ─── Memory ────────────────────────────────────────────────────────────────

export interface Memory {
  // DB columns (snake_case from Supabase)
  id: string
  event_id: string
  type: 'photo' | 'video' | 'boomerang' | 'voice' | 'message'
  guest_name: string
  file_url?: string | null
  caption?: string | null
  selected_filter?: string
  likes: number
  width?: number | null
  height?: number | null
  uploaded_at: string

  // camelCase aliases for component compatibility
  guestName?: string
  fileUrl?: string | null
  selectedFilter?: string
  uploadedAt?: string
}
