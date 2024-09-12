import { UserDashboard } from '@/components/user-dashboard'

export default function EmployeeOnboardingDemo() {
  const demoData = {
    name: 'John Doe',
    position: 'Software Engineer',
    startDate: new Date('2023-07-01'),
    onboardingProgress: 60,
    tasksCompleted: 6,
    tasksTotal: 10,
    documentsCompleted: 3,
    documentsTotal: 5
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee Onboarding Demo</h2>
      <UserDashboard {...demoData} startDate={demoData.startDate.toISOString().split('T')[0]} />
    </div>
  )
}