import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getOnboardings } from "@/lib/actions/actions";
import {  getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingsPage() {
    const session = await getServerAuthSession()
    if (!session || !session.user.companyId) {
      redirect("/login")
    }
    const onboardings = await getOnboardings(session.user.companyId);
  
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Active Onboardings</h2>
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Onboarding Processes</CardTitle>
            <CardDescription>Track and manage employee onboarding progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {onboardings.map((onboarding) => (
                  <TableRow key={onboarding.id}>
                    <TableCell className="font-medium">{onboarding.user.name}</TableCell>
                    <TableCell>{onboarding.user.role}</TableCell>
                    <TableCell>{onboarding.startDate.toDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={onboarding.progress >= 75 ? "default" : "secondary"}>
                        {onboarding.progress}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/hr/onboardings/${onboarding.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }