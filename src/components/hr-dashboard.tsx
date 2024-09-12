"use client"
import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiClock, FiShield, FiList, FiSend } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from 'react';

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
  >
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      </CardContent>
    </Card>
  </motion.div>
);

export function HRDashboard({ data, companyName }: { 
  data: {
    activeOnboardings: number;
    completedThisMonth: number;
    averageCompletionTime: string;
    complianceRate: string;
  },
  companyName: string
}) {
  const [email, setEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to send the invitation
    console.log(`Invitation sent to ${email}`);
    setEmail('');
  };

  const statsData = [
    { title: "Active Onboardings", value: data.activeOnboardings.toString(), icon: FiUsers },
    { title: "Completed This Month", value: data.completedThisMonth.toString(), icon: FiCheckCircle },
    { title: "Average Completion Time", value: data.averageCompletionTime, icon: FiClock },
    { title: "Compliance Rate", value: data.complianceRate, icon: FiShield },
  ];



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {companyName} HR Dashboard
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Overview of current onboarding processes
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Invite New Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <Label htmlFor="email">Employee Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="employee@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <FiSend className="mr-2 h-4 w-4" />
              Send Onboarding Invitation
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Recent Onboardings</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/dashboard/onboardings">
                <FiList className="mr-2 h-4 w-4" />
                View All Onboardings
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}