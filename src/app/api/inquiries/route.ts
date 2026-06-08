import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    const { name, whatsapp, service, message, source } = body
    if (!name || !whatsapp) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: simpan ke DB/email/spreadsheet di sini
    console.log('[inquiry]', {
      name,
      whatsapp,
      service: service ?? '',
      message: message ?? '',
      source: source ?? '',
      at: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}
