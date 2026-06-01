import { supabase } from './supabase'

const BUCKET = 'memories'

// ─── Upload base64 image ────────────────────────────────────────────────────

export async function uploadBase64(path: string, base64: string): Promise<string> {
  const base64Data = base64.split(',')[1] || base64
  const bytes = Buffer.from(base64Data, 'base64')
  const blob = new Blob([bytes], { type: 'image/jpeg' })

  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: true,
  })
  if (error) throw error

  return getPublicUrl(path)
}

// ─── Upload binary blob (video / audio) ────────────────────────────────────

export async function uploadBlob(path: string, blob: Blob, contentType: string): Promise<string> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType,
    upsert: true,
  })
  if (error) throw error

  return getPublicUrl(path)
}

// ─── Helper ────────────────────────────────────────────────────────────────

function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteStorageFile(fileUrl: string): Promise<void> {
  if (!fileUrl || fileUrl.startsWith('blob:')) return
  const path = fileUrl.split('/storage/v1/object/public/memories/').pop()
  if (!path) return
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) console.error('Storage delete error:', error)
}
