import { useState, useEffect } from 'react'
import { getEventBySlug } from '@/lib/db'
import { EventConfig } from '@/types'

export function useEvent(slug: string) {
  const [eventConfig, setEventConfig] = useState<EventConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    let isMounted = true
    getEventBySlug(slug).then(data => {
      if (isMounted) {
        setEventConfig(data)
        setLoading(false)
      }
    }).catch(e => {
      console.error(e)
      if (isMounted) setLoading(false)
    })
    return () => { isMounted = false }
  }, [slug])

  return { eventConfig, loading }
}
