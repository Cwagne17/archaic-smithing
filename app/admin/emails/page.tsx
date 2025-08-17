'use client';

import React from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EmailTemplateManager } from '@/components/admin/EmailTemplateManager';

const AdminEmailsPage: React.FC = () => {
  return (
    <AdminGuard>
      <AdminLayout
        title="Email Templates"
        description="Manage and send templated emails to your customers"
      >
        <EmailTemplateManager />
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminEmailsPage;
