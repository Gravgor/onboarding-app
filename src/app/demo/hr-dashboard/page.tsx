import { HRDashboard } from '@/components/hr-dashboard'

export default function HRDashboardDemo() {
  const demoData = {
    activeOnboardings: 5,
    completedThisMonth: 3,
    averageCompletionTime: '14 days',
    complianceRate: '95%'
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">HR Dashboard Demo</h2>
      <HRDashboard data={demoData} companyName="Demo Company" companyId="demo" />
    </div>
  )
}