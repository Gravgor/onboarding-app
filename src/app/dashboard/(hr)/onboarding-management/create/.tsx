"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedCollapsible } from "@/components/ui/animated-collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreateOnboardingTemplatePage() {
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Array<{ id: number; title: string; category: string }>>([]);
  const [documents, setDocuments] = useState<Array<{ id: number; title: string; required: boolean }>>([]);
  const [complianceItems, setComplianceItems] = useState<Array<{ id: number; title: string; type: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/hr/create-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        throw new Error(errorData.message || 'Failed to create template');
      }

      const newTemplate = await response.json();
      console.log('New template created:', newTemplate);
      router.push("/dashboard/onboarding-management");
    } catch (error) {
      console.error("Error creating template:", error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // ... (rest of the component code remains the same)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Create New Onboarding Template</h2>
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* ... (rest of the form remains the same) */}

        <div className="mt-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/onboarding-management")} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              'Create Template'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}