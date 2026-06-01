import { NextResponse } from 'next/server'
import { saveMemory } from '@/lib/db'
import { uploadBlob } from '@/lib/bucket'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const video = formData.get('video') as Blob
    const guest_name = formData.get('guest_name') as string
    const caption = formData.get('caption') as string
    const type = formData.get('type') as 'boomerang' | 'voice'
    const slug = formData.get('slug') as string

    if (!video || !slug) return NextResponse.json({ success: false, error: 'Missing data' }, { status: 400 })

    const uuid = crypto.randomUUID()
    const folder = type === 'voice' ? 'voice' : 'videos'
    const url = await uploadBlob(`events/${slug}/${folder}/${uuid}.webm`, video, video.type)

    await saveMemory(slug, {
      type: type || 'boomerang',
      guestName: guest_name || 'Guest',
      caption: caption || '',
      fileUrl: url,
    })

    return NextResponse.json({ success: true, data: { url } })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
