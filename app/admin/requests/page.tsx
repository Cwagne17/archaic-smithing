'use client';

import React from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RequestsManager } from '@/components/admin/RequestsManager';

const AdminRequestsPage: React.FC = () => {
  return (
    <AdminGuard>
      <AdminLayout 
        title="Customer Requests"
        description="Manage and respond to customer custom work requests"
      >
        <RequestsManager />
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminRequestsPage;
