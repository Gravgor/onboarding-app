"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedCollapsible } from "@/components/ui/animated-collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateOnboardingTemplatePage() {
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<
    Array<{ id: number; title: string; category: string; priority: string }>
  >([]);
  const [documents, setDocuments] = useState<
    Array<{ id: number; title: string; required: boolean }>
  >([]);
  const [complianceItems, setComplianceItems] = useState<
    Array<{ id: number; title: string; type: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/hr/create-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: templateName,
          description,
          tasks,
          documents,
          complianceItems,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create template");
      }

      const newTemplate = await response.json();
      console.log("New template created:", newTemplate);
      router.push("/dashboard/onboarding-management");
    } catch (error) {
      console.error("Error creating template:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const addTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), title: "", category: "", priority: "medium" },
    ]);
  };

  const addDocument = () => {
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      { id: Date.now(), title: "", required: false },
    ]);
  };

  const addComplianceItem = () => {
    setComplianceItems([
      ...complianceItems,
      { id: Date.now(), title: "", type: "" },
    ]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">
        Create New Onboarding Template
      </h2>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
            <CardDescription>
              Enter the details for your new onboarding template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="templateName"
                className="block text-sm font-medium text-gray-700"
              >
                Template Name
              </label>
              <Input
                id="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <AnimatedCollapsible title="Tasks">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Input
                      className="text-black"
                      value={task.title}
                      onChange={(e) => {
                        const newTasks = [...tasks];
                        newTasks[index].title = e.target.value;
                        setTasks(newTasks);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="text-black"
                      value={task.category}
                      onChange={(e) => {
                        const newTasks = [...tasks];
                        newTasks[index].category = e.target.value;
                        setTasks(newTasks);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={task.priority}
                      onValueChange={(value) => {
                        const newTasks = [...tasks];
                        newTasks[index].priority = value;
                        setTasks(newTasks);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="text-gray-500"
                          placeholder="Select priority"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-black" value="low">
                          Low
                        </SelectItem>
                        <SelectItem className="text-black" value="medium">
                          Medium
                        </SelectItem>
                        <SelectItem className="text-black" value="high">
                          High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        setTasks(tasks.filter((_, i) => i !== index))
                      }
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button type="button" onClick={addTask} className="mt-4 ml-2 mb-2">
            Add Task
          </Button>
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
              {documents.map((doc, index) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <Input
                    className="text-black"
                      value={doc.title}
                      onChange={(e) => {
                        const newDocs = [...documents];
                        newDocs[index].title = e.target.value;
                        setDocuments(newDocs);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={doc.required}
                      onChange={(e) => {
                        const newDocs = [...documents];
                        newDocs[index].required = e.target.checked;
                        setDocuments(newDocs);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        setDocuments(documents.filter((_, i) => i !== index))
                      }
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button type="button" onClick={addDocument} className="mt-4 ml-2 mb-2">
            Add Document
          </Button>
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
              {complianceItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                    className="text-black"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...complianceItems];
                        newItems[index].title = e.target.value;
                        setComplianceItems(newItems);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.type}
                      onChange={(e) => {
                        const newItems = [...complianceItems];
                        newItems[index].type = e.target.value;
                        setComplianceItems(newItems);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        setComplianceItems(
                          complianceItems.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button type="button" onClick={addComplianceItem} className="mt-4 ml-2 mb-2">
            Add Compliance Item
          </Button>
        </AnimatedCollapsible>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/onboarding-management")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              "Create Template"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
