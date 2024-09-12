import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCollapsible } from "@/components/ui/animated-collapsible";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getOnboardings, getOnboardingTemplates } from "@/lib/actions";

export default async function OnboardingManagementPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.companyId) {
    redirect("/login");
  }

  const templates = await getOnboardingTemplates(session.user.companyId);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Onboarding Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Templates</CardTitle>
          <CardDescription>Manage and create onboarding templates for different roles</CardDescription>
        </CardHeader>
        <CardContent>
          {templates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Compliance Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>{template.tasks.length}</TableCell>
                    <TableCell>{template.documents.length}</TableCell>
                    <TableCell>{template.complianceItems.length}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/onboarding-management/${template.id}`}>
                          Edit
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Your company doesn't have any onboarding templates yet.</p>
          )}
        </CardContent>
      </Card>

      <Button asChild>
        <Link href="/dashboard/onboarding-management/create">Create New Template</Link>
      </Button>

      <AnimatedCollapsible title="Onboarding Settings">
        <div className="space-y-4 p-4">
          <div>
            <h3 className="text-lg font-semibold">Default Onboarding Duration</h3>
            <p>30 days</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Automatic Reminders</h3>
            <Badge>Enabled</Badge>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Integration Settings</h3>
            <p>Connected to HRIS, Email, and Slack</p>
          </div>
        </div>
      </AnimatedCollapsible>
    </div>
  );
}