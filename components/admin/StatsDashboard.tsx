'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';

// Mock data - in real app this would come from APIs
const mockStats = {
  overview: {
    totalRequests: 156,
    activeRequests: 23,
    completedThisMonth: 12,
    revenue: 15420,
    pageViews: 2340,
    uniqueVisitors: 890
  },
  requestsByTimeframe: {
    thisWeek: 8,
    thisMonth: 23,
    thisQuarter: 67,
    thisYear: 156
  },
  trendingWork: [
    { type: 'Custom Rings', count: 45, percentage: 28.8 },
    { type: 'Leather Wallets', count: 38, percentage: 24.4 },
    { type: 'Necklaces', count: 32, percentage: 20.5 },
    { type: 'Bracelets', count: 28, percentage: 17.9 },
    { type: 'Other', count: 13, percentage: 8.3 }
  ],
  recentPageViews: [
    { page: 'Gallery - Jewelry', views: 520, change: '+12%' },
    { page: 'Gallery - Leather', views: 380, change: '+8%' },
    { page: 'Request Custom Work', views: 290, change: '+15%' },
    { page: 'Blog Posts', views: 240, change: '-3%' },
    { page: 'Home Page', views: 910, change: '+5%' }
  ],
  priorityRequests: [
    {
      id: 'REQ-2024-045',
      customer: 'Sarah Johnson',
      title: 'Wedding Ring Set',
      priority: 'High',
      dueDate: '2024-02-15',
      status: 'In Progress'
    },
    {
      id: 'REQ-2024-042',
      customer: 'Michael Chen',
      title: 'Custom Leather Portfolio',
      priority: 'Medium',
      dueDate: '2024-02-20',
      status: 'Design Review'
    },
    {
      id: 'REQ-2024-039',
      customer: 'Emma Davis',
      title: 'Engraved Pendant',
      priority: 'High',
      dueDate: '2024-02-18',
      status: 'Materials Sourcing'
    }
  ],
  blogStats: {
    totalPosts: 24,
    lastPosted: '2024-01-28',
    mostPopularPost: 'The Art of Traditional Leatherworking',
    avgEngagement: '4.2 min',
    totalViews: 15600
  },
  upcomingDeadlines: [
    { date: '2024-02-15', count: 3, type: 'deliveries' },
    { date: '2024-02-18', count: 2, type: 'milestones' },
    { date: '2024-02-20', count: 1, type: 'consultations' }
  ]
};

const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
}> = ({ title, value, subtitle, trend }) => (
  <Card className="p-6">
    <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
    <div className="flex items-baseline space-x-2">
      <span className="text-3xl font-bold text-foreground">{value}</span>
      {trend && (
        <span className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      )}
    </div>
    {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
  </Card>
);

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const StatsDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Requests" 
          value={mockStats.overview.totalRequests}
          trend="+12%"
        />
        <StatCard 
          title="Active Projects" 
          value={mockStats.overview.activeRequests}
          subtitle="Currently in progress"
        />
        <StatCard 
          title="Completed This Month" 
          value={mockStats.overview.completedThisMonth}
          trend="+23%"
        />
        <StatCard 
          title="Revenue (YTD)" 
          value={`$${mockStats.overview.revenue.toLocaleString()}`}
          trend="+18%"
        />
        <StatCard 
          title="Page Views" 
          value={mockStats.overview.pageViews.toLocaleString()}
          subtitle="This month"
        />
        <StatCard 
          title="Unique Visitors" 
          value={mockStats.overview.uniqueVisitors}
          trend="+7%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Work Types */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Trending Work Types</h3>
          <div className="space-y-3">
            {mockStats.trendingWork.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.type}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">{item.count} requests</span>
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent rounded-full h-2" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Page Views */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Page Performance</h3>
          <div className="space-y-3">
            {mockStats.recentPageViews.map((page, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{page.page}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">{page.views} views</span>
                  <span className={`text-sm ${
                    page.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {page.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Priority Requests */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Priority Requests</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-medium">Request ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium">Due Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockStats.priorityRequests.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="py-3 font-mono text-xs">{request.id}</td>
                  <td className="py-3">{request.customer}</td>
                  <td className="py-3">{request.title}</td>
                  <td className="py-3">
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {new Date(request.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-muted-foreground">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blog Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Blog Engagement</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Posts</span>
              <span className="font-medium">{mockStats.blogStats.totalPosts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Posted</span>
              <span className="font-medium">
                {new Date(mockStats.blogStats.lastPosted).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Views</span>
              <span className="font-medium">{mockStats.blogStats.totalViews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg. Reading Time</span>
              <span className="font-medium">{mockStats.blogStats.avgEngagement}</span>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground mb-1">Most Popular:</p>
              <p className="font-medium text-sm">{mockStats.blogStats.mostPopularPost}</p>
            </div>
          </div>
        </Card>

        {/* Upcoming Deadlines Calendar */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {mockStats.upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <span className="font-medium text-sm">
                    {new Date(deadline.date).toLocaleDateString()}
                  </span>
                  <p className="text-xs text-muted-foreground capitalize">
                    {deadline.count} {deadline.type}
                  </p>
                </div>
                <Badge variant="outline">{deadline.count}</Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Calendar
          </Button>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <span className="text-xs">Send</span>
            <span className="font-semibold">Email Update</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <span className="text-xs">Create</span>
            <span className="font-semibold">Blog Post</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <span className="text-xs">Add</span>
            <span className="font-semibold">Gallery Item</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col space-y-2">
            <span className="text-xs">Export</span>
            <span className="font-semibold">Data</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { StatsDashboard };
