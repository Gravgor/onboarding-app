'use client'

import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OnboardingUpdates({ onboardingId, onUpdate }: { onboardingId: string, onUpdate: (data: any) => void }) {
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)

  useEffect(() => {
    const eventSource = new EventSource(`/api/onboarding-updates?id=${onboardingId}`)

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('Received update:', data)
      setLastUpdate(new Date().toLocaleTimeString())
      onUpdate(data)
    }

    return () => {
      eventSource.close()
    }
  }, [onboardingId, onUpdate])

  return (
    <div className="text-sm text-muted-foreground">
      {lastUpdate && <p>Last updated: {lastUpdate}</p>}
    </div>
  )
}