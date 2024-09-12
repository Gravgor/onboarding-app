"use client"
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiFileText, FiUser, FiBriefcase, FiCalendar, FiList, FiFile } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface UserDashboardProps {
  name: string;
  position: string;
  startDate: string;
  onboardingProgress: number;
  tasksCompleted: number;
  tasksTotal: number;
  documentsCompleted: number;
  documentsTotal: number;
}

interface StatCardProps {
  title: string;
  value: number;
  total: number;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, total, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-blue-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}/{total}</div>
      <Progress value={(value / total) * 100} className="mt-2" />
    </CardContent>
  </Card>
);

export function UserDashboard({
  name,
  position,
  startDate,
  onboardingProgress,
  tasksCompleted,
  tasksTotal,
  documentsCompleted,
  documentsTotal
}: UserDashboardProps) {
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
            Welcome, {name}!
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Your onboarding progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Overall Progress</span>
              <span>{onboardingProgress}%</span>
            </div>
            <Progress value={onboardingProgress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Position</CardTitle>
            <FiBriefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{position}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Start Date</CardTitle>
            <FiCalendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{startDate}</div>
          </CardContent>
        </Card>

        <StatCard title="Tasks" value={tasksCompleted} total={tasksTotal} icon={FiList} />
        <StatCard title="Documents" value={documentsCompleted} total={documentsTotal} icon={FiFile} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{tasksCompleted}/{tasksTotal}</div>
            <Progress value={(tasksCompleted / tasksTotal) * 100} className="mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You've completed {tasksCompleted} out of {tasksTotal} tasks.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/dashboard/tasks">View Tasks</Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Documents Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{documentsCompleted}/{documentsTotal}</div>
            <Progress value={(documentsCompleted / documentsTotal) * 100} className="mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You've completed {documentsCompleted} out of {documentsTotal} required documents.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/dashboard/documents">View Documents</Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}