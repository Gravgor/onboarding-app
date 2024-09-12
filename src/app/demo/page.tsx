import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DemoPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Demo</CardTitle>
          <CardDescription>Experience our onboarding software from different perspectives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/demo/hr-dashboard">
            <Button className="w-full">HR Dashboard</Button>
          </Link>
          <Link href="/demo/employee-onboarding">
            <Button className="w-full">Employee Onboarding</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}