import { NextResponse } from 'next/server'
import { getMemories } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const tab = searchParams.get('tab') || 'all'
    const offsetParam = searchParams.get('offset')
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0

    if (!slug) return NextResponse.json({ success: false }, { status: 400 })

    const { memories, nextOffset } = await getMemories(slug, tab, 20, offset)
    return NextResponse.json({ success: true, data: { photos: memories, nextOffset } })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
