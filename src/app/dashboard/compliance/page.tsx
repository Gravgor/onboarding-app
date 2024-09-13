import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const complianceAreas = [
  { id: 1, name: "Personal Information", progress: 100 },
  { id: 2, name: "Legal Documents", progress: 75 },
  { id: 3, name: "Training Modules", progress: 50 },
  { id: 4, name: "Policy Acknowledgements", progress: 90 },
]

export default function CompliancePage() {
  const overallProgress = complianceAreas.reduce((sum, area) => sum + area.progress, 0) / complianceAreas.length

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Compliance Status</h2>
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Your progress towards full compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="w-full h-4" />
          <p className="mt-2 text-sm text-muted-foreground">{Math.round(overallProgress)}% Complete</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Areas</CardTitle>
          <CardDescription>Detailed progress for each compliance area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {complianceAreas.map((area) => (
              <div key={area.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{area.name}</span>
                  <span className="text-sm text-muted-foreground">{area.progress}%</span>
                </div>
                <Progress value={area.progress} className="w-full h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}