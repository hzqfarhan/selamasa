import { NextResponse } from 'next/server'
import { saveMemory } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const guest_name = formData.get('guest_name') as string
    const message_text = formData.get('message_text') as string
    const slug = formData.get('slug') as string

    if (!slug || !message_text) return NextResponse.json({ success: false }, { status: 400 })

    await saveMemory(slug, {
      type: 'message',
      guestName: guest_name || 'Guest',
      caption: `AJ_MESSAGE::${message_text}`,
    })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
