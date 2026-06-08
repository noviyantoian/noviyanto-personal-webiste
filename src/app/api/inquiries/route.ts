import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot — tolak kalau terisi
    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    const { name, whatsapp, service, message, source } = body
    if (!name || !whatsapp) {
      return NextResponse.json({ ok: false, error: 'Nama dan nomor WhatsApp wajib diisi.' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'inquiries',
      data: {
        name: String(name).trim(),
        whatsapp: String(whatsapp).trim(),
        service: service || undefined,
        message: message ? String(message).trim() : undefined,
        source: source ? String(source).trim() : undefined,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[api/inquiries]', e)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
