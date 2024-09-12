import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const stream = new ReadableStream({
    start(controller) {
      const pushUpdate = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
      }

      // Set up a listener for onboarding updates
      // This is just a placeholder, you'd need to implement the actual update mechanism
      const interval = setInterval(() => {
        pushUpdate({ message: 'Onboarding updated' })
      }, 5000)

      return () => {
        clearInterval(interval)
      }
    }
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}