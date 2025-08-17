'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const AdminDashboard: React.FC = () => {
  const pathname = usePathname();

  const dashboardCards = [
    {
      title: 'Statistics Dashboard',
      description: 'View business analytics, trending work, and customer insights',
      href: '/admin/statistics',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Email Templates',
      description: 'Send templated emails and manage customer communication',
      href: '/admin/emails',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Gallery Management',
      description: 'Add, edit, and organize your work galleries',
      href: '#',
      onClick: 'galleries',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Request Management',
      description: 'Manage customer requests and project status',
      href: '#',
      onClick: 'requests',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      href: '#',
      onClick: 'blogs',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Customer Portal',
      description: 'View customer portal and manage access',
      href: '/portal',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  // Mock recent activity data
  const recentActivity = [
    { type: 'request', message: 'New custom work request from Sarah Johnson', time: '2 hours ago' },
    { type: 'completion', message: 'Project REQ-2024-045 marked as completed', time: '5 hours ago' },
    { type: 'email', message: 'Email sent to Michael Chen - Project Started', time: '1 day ago' },
    { type: 'blog', message: 'New blog post published: "Traditional Techniques"', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your business operations from one central location
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <h3 className="text-2xl font-bold text-foreground">23</h3>
          <p className="text-muted-foreground text-sm">Active Requests</p>
        </Card>
        <Card className="p-6 text-center">
          <h3 className="text-2xl font-bold text-foreground">156</h3>
          <p className="text-muted-foreground text-sm">Total Projects</p>
        </Card>
        <Card className="p-6 text-center">
          <h3 className="text-2xl font-bold text-foreground">2,340</h3>
          <p className="text-muted-foreground text-sm">Page Views</p>
        </Card>
        <Card className="p-6 text-center">
          <h3 className="text-2xl font-bold text-foreground">$15,420</h3>
          <p className="text-muted-foreground text-sm">Revenue YTD</p>
        </Card>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className={cn('p-3 rounded-lg', card.bgColor)}>
                <div className={card.color}>
                  {card.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
                {card.href && card.href !== '#' ? (
                  <Link href={card.href}>
                    <Button size="sm" className="w-full">
                      Open
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    size="sm" 
                    className="w-full" 
                    onClick={() => {
                      // Handle internal navigation
                      console.log(`Navigate to ${card.onClick}`);
                    }}
                  >
                    Open
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className={cn(
                'w-2 h-2 rounded-full',
                activity.type === 'request' && 'bg-blue-500',
                activity.type === 'completion' && 'bg-green-500',
                activity.type === 'email' && 'bg-purple-500',
                activity.type === 'blog' && 'bg-orange-500'
              )} />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export { AdminDashboard };
