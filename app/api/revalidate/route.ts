import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Sanity webhook → POST /api/revalidate?secret=<SANITY_WEBHOOK_SECRET>
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const type = body?._type as string | undefined

  if (type === 'story') {
    revalidatePath('/stories', 'page')
    revalidatePath('/stories/[slug]', 'page')
  } else if (type === 'exhibition') {
    revalidatePath('/exhibition', 'page')
  } else if (type === 'event') {
    revalidatePath('/visit', 'page')
  } else {
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true, type })
}
