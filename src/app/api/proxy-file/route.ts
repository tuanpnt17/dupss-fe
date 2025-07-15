import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fileUrl = searchParams.get('url')

  if (!fileUrl) {
    return NextResponse.json({ error: 'File URL is required' }, { status: 400 })
  }

  // Validate URL (security check)
  try {
    const url = new URL(fileUrl)

    if (!['http:', 'https:'].includes(url.protocol)) {
      return NextResponse.json({ error: 'Invalid URL protocol' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
  }

  try {
    const response = await fetch(fileUrl, {
      headers: {
        'User-Agent': 'Hospital-App/1.0',
        Accept: 'text/csv,text/plain,application/octet-stream,*/*'
      }
    })

    if (!response.ok) {
      console.error(`Failed to fetch file: ${response.status} ${response.statusText}`)

      return NextResponse.json(
        { error: `Failed to fetch file: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    const contentType = response.headers.get('Content-Type') || 'text/plain'
    const data = await response.text()

    console.log('Successfully fetched file, size:', data.length)

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    console.error('Proxy error:', error)

    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
  }
}