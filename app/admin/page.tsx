'use client';

import React from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminLayout
        title="Admin Dashboard"
        description="Manage your business operations from one central location"
      >
        <AdminDashboard />
      </AdminLayout>
    </AdminGuard>
  );
}
