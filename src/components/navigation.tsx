"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MountainIcon, Users2Icon, FileTextIcon, BarChartIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isHR: boolean;
  userName: string;
  userRole: string;
}

export function Navigation({ isHR, userName, userRole }: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: MountainIcon },
    { href: '/dashboard/tasks', label: 'Tasks', icon: FileTextIcon },
    { href: '/dashboard/documents', label: 'Documents', icon: FileTextIcon },
    { href: '/dashboard/compliance', label: 'Compliance', icon: BarChartIcon },
  ];

  if (isHR) {
    navItems.push(
      { href: '/dashboard/employees', label: 'Employees', icon: Users2Icon },
      { href: '/dashboard/onboardings', label: 'Onboardings', icon: Users2Icon },
      { href: '/dashboard/onboarding-management', label: 'Onboarding Management', icon: SettingsIcon },
    );
  }

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="bg-white shadow">
      <nav className="flex space-x-4 px-4 py-2 mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Logged in as <span className='font-bold'>
          {userName}
            </span></span>
          {(userRole === 'hr' || userRole === 'manager' || userRole === 'admin') && (
            <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
              {userRole.toUpperCase()}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-900 bg-blue-100 hover:bg-blue-200"
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
}