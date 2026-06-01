import { useState, useCallback, useEffect } from 'react'
import { getMemories } from '@/lib/db'
import { Memory } from '@/types'

export function useGallery(slug: string) {
  const [memories, setMemories] = useState<Memory[]>([])
  const [tab, setTab] = useState('all')
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMemories = useCallback(async (reset = false, currentTab = tab) => {
    if (!slug) return
    if (loading) return
    if (!reset && !hasMore) return

    const currentOffset = reset ? 0 : offset

    setLoading(true)
    try {
      const res = await getMemories(slug, currentTab, 20, currentOffset)

      setMemories(prev => reset ? res.memories : [...prev, ...res.memories])
      setOffset(res.nextOffset)
      setHasMore(res.memories.length === 20)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [slug, loading, hasMore, offset, tab])

  const changeTab = (newTab: string) => {
    setTab(newTab)
    setMemories([])
    setOffset(0)
    setHasMore(true)
  }

  useEffect(() => {
    if (slug) {
      loadMemories(true, tab)
    }
  }, [slug, tab])

  const addOptimisticLike = (id: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m))
  }

  return { memories, tab, changeTab, loadMemories, loading, hasMore, addOptimisticLike }
}
