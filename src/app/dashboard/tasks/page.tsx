import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

async function getUserTasks(userId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, title: "Complete personal information form", completed: false, priority: "High" },
    { id: 2, title: "Sign employee handbook", completed: true, priority: "Medium" },
    { id: 3, title: "Set up direct deposit", completed: false, priority: "High" },
    { id: 4, title: "Complete I-9 form", completed: false, priority: "Medium" },
    { id: 5, title: "Attend orientation session", completed: false, priority: "Low" },
  ]
}

async function getHRTasks() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, title: "Review new hire documents", completed: false, priority: "High" },
    { id: 2, title: "Schedule orientation sessions", completed: true, priority: "Medium" },
    { id: 3, title: "Update onboarding checklist", completed: false, priority: "Low" },
    { id: 4, title: "Prepare welcome packages", completed: false, priority: "Medium" },
    { id: 5, title: "Conduct compliance training", completed: false, priority: "High" },
  ]
}

export default async function TasksPage() {
  /*const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }*/

  //@ts-ignore
  const isHR = true
  const tasks = isHR ? await getHRTasks() : await getUserTasks('')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isHR ? "HR Tasks" : "Your Onboarding Tasks"}</CardTitle>
        <CardDescription>
          {isHR 
            ? "Manage and track HR-related tasks" 
            : "Complete these tasks to finish your onboarding process"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox id={`task-${task.id}`} checked={task.completed} />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.title}
                </label>
              </div>
              <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}>
                {task.priority}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}