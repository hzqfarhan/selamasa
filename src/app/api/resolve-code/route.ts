import { NextRequest, NextResponse } from 'next/server'
import { getEventByCode } from '@/lib/db'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')?.trim()

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  const event = await getEventByCode(code)

  if (!event) {
    return NextResponse.json({ error: 'Kod tidak dijumpai. Sila semak semula.' }, { status: 404 })
  }

  return NextResponse.json({ slug: event.id })
}
