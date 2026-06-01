import { supabase } from './supabase'
import { EventConfig, Memory } from '@/types'

// ─── Events ────────────────────────────────────────────────────────────────

export async function getEventBySlug(slug: string): Promise<EventConfig | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', slug)
    .single()

  if (error || !data) return null
  return data as EventConfig
}

export async function getAllEvents(): Promise<EventConfig[]> {
  const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as EventConfig[]
}

export async function upsertEvent(slug: string, payload: Partial<EventConfig>) {
  const { error } = await supabase.from('events').upsert({ id: slug, ...payload })
  if (error) throw error
}

// ─── Memories ──────────────────────────────────────────────────────────────

const PAGE_LIMIT = 20

export async function getMemories(
  slug: string,
  tab: string = 'all',
  pageLimit: number = PAGE_LIMIT,
  offset: number = 0
): Promise<{ memories: Memory[]; nextOffset: number }> {
  let query = supabase
    .from('memories')
    .select('*')
    .eq('event_id', slug)
    .order('uploaded_at', { ascending: false })
    .range(offset, offset + pageLimit - 1)

  if (tab === 'photos') query = query.eq('type', 'photo')
  else if (tab === 'videos') query = query.in('type', ['video', 'boomerang'])
  else if (tab === 'audio') query = query.eq('type', 'voice')
  else if (tab === 'notes') query = query.eq('type', 'message')

  const { data, error } = await query
  if (error) throw error

  const memories = (data ?? []) as Memory[]
  return {
    memories,
    nextOffset: offset + memories.length,
  }
}

export async function saveMemory(slug: string, data: Partial<Memory>): Promise<Memory> {
  const { data: inserted, error } = await supabase
    .from('memories')
    .insert({
      event_id: slug,
      type: data.type,
      guest_name: data.guestName ?? 'Guest',
      file_url: data.fileUrl ?? null,
      caption: data.caption ?? '',
      selected_filter: data.selectedFilter ?? 'none',
      likes: 0,
      width: data.width ?? null,
      height: data.height ?? null,
    })
    .select()
    .single()

  if (error) throw error
  return inserted as Memory
}

export async function likeMemory(memoryId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_likes', { memory_id: memoryId })
  if (error) throw error
}

export async function getMemoryCount(slug: string): Promise<number> {
  const { count, error } = await supabase
    .from('memories')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', slug)

  if (error) throw error
  return count ?? 0
}
