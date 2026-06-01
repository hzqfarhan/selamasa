import { NextResponse } from 'next/server'
import { saveMemory } from '@/lib/db'
import { uploadBase64 } from '@/lib/bucket'

export async function POST(req: Request) {
  try {
    const { image, guest_name, caption, selected_filter, slug } = await req.json()
    if (!image || !slug) return NextResponse.json({ success: false, error: 'Missing data' }, { status: 400 })

    const uuid = crypto.randomUUID()
    const url = await uploadBase64(`events/${slug}/photos/${uuid}.jpg`, image)

    await saveMemory(slug, {
      type: 'photo',
      guestName: guest_name,
      caption: caption || '',
      selectedFilter: selected_filter || 'none',
      fileUrl: url,
    })

    return NextResponse.json({ success: true, data: { url } })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
