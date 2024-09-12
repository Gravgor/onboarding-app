import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCollapsible } from "@/components/ui/animated-collapsible";
import { Input } from "@/components/ui/input";

// Mock data for a specific onboarding template
const templateData = {
  id: 1,
  name: "Software Engineer Onboarding",
  tasks: [
    { id: 1, title: "Complete personal information form", category: "Administrative" },
    { id: 2, title: "Set up development environment", category: "Technical" },
    { id: 3, title: "Review coding standards", category: "Technical" },
  ],
  documents: [
    { id: 1, title: "Employee Handbook", required: true },
    { id: 2, title: "NDA", required: true },
    { id: 3, title: "Benefits Enrollment Form", required: false },
  ],
  complianceItems: [
    { id: 1, title: "Code of Conduct Training", type: "Training" },
    { id: 2, title: "Security Awareness Course", type: "Course" },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EditOnboardingTemplatePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Edit Onboarding Template</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Template Details</CardTitle>
          <CardDescription>Edit the details of this onboarding template</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">Template Name</label>
              <Input id="templateName" defaultValue={templateData.name} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatedCollapsible title="Tasks">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templateData.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Badge>{task.category}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-4">Add Task</Button>
      </AnimatedCollapsible>

      <AnimatedCollapsible title="Documents">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templateData.documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>
                  <Badge variant={doc.required ? "default" : "secondary"}>
                    {doc.required ? "Required" : "Optional"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-4">Add Document</Button>
      </AnimatedCollapsible>

      <AnimatedCollapsible title="Compliance Items">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templateData.complianceItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Badge>{item.type}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-4">Add Compliance Item</Button>
      </AnimatedCollapsible>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}