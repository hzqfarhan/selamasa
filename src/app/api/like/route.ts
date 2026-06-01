import { NextResponse } from 'next/server'
import { likeMemory } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { photo_id } = await req.json()
    if (!photo_id) return NextResponse.json({ success: false }, { status: 400 })

    await likeMemory(photo_id)
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
