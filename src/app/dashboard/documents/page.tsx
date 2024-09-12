import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const documents = [
  { id: 1, title: "Employee Handbook", status: "Signed", dueDate: "2023-06-15" },
  { id: 2, title: "Non-Disclosure Agreement", status: "Pending", dueDate: "2023-06-20" },
  { id: 3, title: "Benefits Enrollment Form", status: "Pending", dueDate: "2023-06-25" },
  { id: 4, title: "Emergency Contact Information", status: "Signed", dueDate: "2023-06-10" },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Onboarding Documents</h2>
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>Review and sign these documents to complete your onboarding.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>
                    <Badge variant={doc.status === "Signed" ? "default" : "destructive"}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.dueDate}</TableCell>
                  <TableCell>
                    <Button variant={doc.status === "Pending" ? "default" : "secondary"}>
                      {doc.status === "Pending" ? "Sign" : "View"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}