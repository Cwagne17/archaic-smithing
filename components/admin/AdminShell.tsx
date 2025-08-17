'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GalleryManager } from './GalleryManager';
import { RequestsManager } from './RequestsManager';
import { BlogManager } from './BlogManager';

type AdminSection = 'galleries' | 'requests' | 'blogs';

const AdminShell: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('galleries');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigation = [
    {
      id: 'galleries',
      name: 'Gallery Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'blogs',
      name: 'Blog Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      id: 'requests',
      name: 'Request Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          'bg-card border-r transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
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
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id as AdminSection)}
                    className={cn(
                      'w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                      activeSection === item.id
                        ? 'bg-accent text-white'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {item.icon}
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeSection === 'galleries' && <GalleryManager />}
          {activeSection === 'blogs' && <BlogManager />}
          {activeSection === 'requests' && <RequestsManager />}
        </div>
      </div>
    </div>
  );
};

export { AdminShell };
