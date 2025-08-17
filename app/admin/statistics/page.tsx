'use client';

import React from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsDashboard } from '@/components/admin/StatsDashboard';

const AdminStatisticsPage: React.FC = () => {
  return (
    <AdminGuard>
      <AdminLayout
        title="Statistics"
        description="Comprehensive overview of your business performance and customer interactions"
      >
        <StatsDashboard />
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminStatisticsPage;
