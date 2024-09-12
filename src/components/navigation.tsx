"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MountainIcon, Users2Icon, FileTextIcon, BarChartIcon, SettingsIcon } from 'lucide-react';

interface NavigationProps {
  isHR: boolean;
}

export function Navigation({ isHR }: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: MountainIcon },
    { href: '/dashboard/tasks', label: 'Tasks', icon: FileTextIcon },
    { href: '/dashboard/documents', label: 'Documents', icon: FileTextIcon },
    { href: '/dashboard/compliance', label: 'Compliance', icon: BarChartIcon },
  ];

  if (isHR) {
    navItems.push({ href: '/dashboard/employees', label: 'Employees', icon: Users2Icon },{ href: '/dashboard/onboardings', label: 'Onboardings', icon: Users2Icon },{ href: '/dashboard/onboarding-management', label: 'Onboarding Management', icon: SettingsIcon },);
  }

  return (
    <nav className="flex space-x-4 bg-white shadow px-4 py-2 mt-2">
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
  );
}