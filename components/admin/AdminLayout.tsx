'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getEnabledAdminNavigation } from '@/lib/featureFlags';
import { Button } from '@/components/ui';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title = "Admin Dashboard",
  description 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const navigation = getEnabledAdminNavigation();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          'bg-card border-r transition-all duration-300 ease-in-out flex-shrink-0',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <Link href="/admin">
                  <h2 className="text-lg font-semibold hover:text-accent transition-colors">
                    Admin Dashboard
                  </h2>
                </Link>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg
                  className={cn('w-4 h-4 transition-transform', sidebarCollapsed && 'rotate-180')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="px-2 pb-4">
            <ul className="space-y-1">
              {/* Dashboard Home */}
              <li>
                <Link
                  href="/admin"
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    isActive('/admin') && pathname === '/admin'
                      ? 'bg-accent text-white [&>svg]:text-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v1m0 0V7a2 2 0 012-2h14a2 2 0 012 2v1" />
                  </svg>
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </Link>
              </li>
              
              {/* Navigation Items */}
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      'w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-accent text-white [&>svg]:text-white [&>*]:text-white'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {item.icon}
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to Main Site */}
          <div className="absolute bottom-4 left-2 right-2">
            <Link href="/">
              <Button variant="outline" size="sm" className={cn("w-full", sidebarCollapsed && "px-2")}>
                {sidebarCollapsed ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Site
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="p-6">
            {title && (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {title}
                </h1>
                {description && (
                  <p className="text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminLayout };
