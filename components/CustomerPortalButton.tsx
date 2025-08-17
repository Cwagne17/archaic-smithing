'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CustomerPortalButton: React.FC = () => {
  return (
    <Link
      href="/portal"
      className={cn(
        "p-2 rounded-md hover:bg-muted transition-colors",
        "flex items-center space-x-1 text-sm font-medium"
      )}
      aria-label="Customer Portal Login"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span className="hidden sm:inline">Portal</span>
    </Link>
  );
};

export { CustomerPortalButton };
