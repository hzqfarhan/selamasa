import { NextResponse } from 'next/server'
import { getMemoryCount } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    if (!slug) return NextResponse.json({ success: false }, { status: 400 })

    const count = await getMemoryCount(slug)
    return NextResponse.json({ success: true, data: { count } })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
