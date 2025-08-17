import React from 'react';

// Feature flags configuration
export const featureFlags = {
  blog: process.env.NEXT_PUBLIC_FEATURE_BLOG === 'true',
  statistics: process.env.NEXT_PUBLIC_FEATURE_STATISTICS === 'true',
  emailTemplates: process.env.NEXT_PUBLIC_FEATURE_EMAIL_TEMPLATES === 'true',
  requestManagement: process.env.NEXT_PUBLIC_FEATURE_REQUEST_MANAGEMENT === 'true',
  customerPortal: process.env.NEXT_PUBLIC_FEATURE_CUSTOMER_PORTAL === 'true',
} as const;

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof typeof featureFlags): boolean => {
  return featureFlags[feature];
};

// Navigation item type
export interface AdminNavItem {
  id: string;
  name: string;
  href: string;
  enabled: boolean;
  icon: React.ReactElement;
}

// Get enabled admin navigation items
export const getEnabledAdminNavigation = (): AdminNavItem[] => {
  const allNavItems: AdminNavItem[] = [
    {
      id: 'statistics',
      name: 'Statistics',
      href: '/admin/statistics',
      enabled: featureFlags.statistics,
      icon: React.createElement('svg', {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      })),
    },
    {
      id: 'requests',
      name: 'Customer Requests',
      href: '/admin/requests',
      enabled: featureFlags.requestManagement,
      icon: React.createElement('svg', {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      })),
    },
    {
      id: 'galleries',
      name: 'Galleries',
      href: '/admin/galleries',
      enabled: true, // Always enabled as it's core functionality
      icon: React.createElement('svg', {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      })),
    },
    {
      id: 'blogs',
      name: 'Blogs',
      href: '/admin/blogs',
      enabled: featureFlags.blog,
      icon: React.createElement('svg', {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      })),
    },
    {
      id: 'emails',
      name: 'Emails',
      href: '/admin/emails',
      enabled: featureFlags.emailTemplates,
      icon: React.createElement('svg', {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      })),
    },
  ];

  return allNavItems.filter(item => item.enabled);
};
