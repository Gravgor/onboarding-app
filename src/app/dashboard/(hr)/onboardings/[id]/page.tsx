"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnimatedCollapsible } from "@/components/ui/animated-collapsible";
import { getOnboardingDetails } from "@/lib/actions";
import { TaskActions } from "@/components/task-actions";
import { OnboardingUpdates } from "@/components/onboarding-updates";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
}

interface Document {
  id: string;
  title: string;
  status: string;
  dueDate: Date;
}

interface ComplianceItem {
  id: string;
  name: string;
  progress: number;
}

interface Onboarding {
  id: string;
  user: {
    name: string;
    role: string;
    email: string;
  };
  startDate: Date;
  progress: number;
  tasks: Task[];
  documents: Document[];
  complianceItems: ComplianceItem[];
}


export default function OnboardingDetailsPage({ params }: { params: { id: string } }) {
  const [onboarding, setOnboarding] = useState<Onboarding | null>(null);
  const router = useRouter()
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchOnboarding() {
      if (session?.user?.companyId) {
        const data = await getOnboardingDetails(params.id, session.user.companyId);
        setOnboarding(data);
      } else {
        router.push('/login');
      }
    }
    fetchOnboarding();
  }, [params.id, session, router]);

  if (!onboarding) {
    return <div>Onboarding not found</div>
  }

  const handleUpdate = (data: any) => {
    setOnboarding(prevOnboarding => ({ ...prevOnboarding, ...data }))
    router.refresh()
  }
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Onboarding Details: {onboarding.user.name}</h2>
      <OnboardingUpdates onboardingId={onboarding.id} onUpdate={handleUpdate} />
      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
          <CardDescription>Details about the onboarding employee</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p>{onboarding.user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Position</p>
              <p>{onboarding.user.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Start Date</p>
              <p>{onboarding.startDate.toDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{onboarding.user.email}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
            <div className="flex items-center space-x-4">
              <Progress value={onboarding.progress} className="w-full" />
              <Badge variant={onboarding.progress >= 75 ? "default" : "secondary"}>
                {onboarding.progress}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatedCollapsible title="Tasks Progress">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Task</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Priority</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {onboarding.tasks.map((task) => (
        <TableRow key={task.id}>
          <TableCell>{task.title}</TableCell>
          <TableCell>
            <Badge variant={task.completed ? "default" : "secondary"}>
              {task.completed ? "Completed" : "Pending"}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}>
              {task.priority}
            </Badge>
          </TableCell>
          <TableCell>
            <TaskActions task={task} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</AnimatedCollapsible>

      <AnimatedCollapsible title="Documents Status">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onboarding.documents.map((doc: { id: string; title: string; status: string, dueDate: Date }) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>
                  <Badge variant={doc.status === "Signed" ? "default" : "destructive"}>
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell>{doc.dueDate.toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AnimatedCollapsible>

      <AnimatedCollapsible title="Compliance Progress">
        <div className="space-y-4 p-4">
          {onboarding.complianceItems.map((item: { id: string; name: string; progress: number }) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="w-full" />
            </div>
          ))}
        </div>
      </AnimatedCollapsible>
    </div>
  );
}