'use client';

import React from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogManager } from '@/components/admin/BlogManager';

const AdminBlogsPage: React.FC = () => {
  return (
    <AdminGuard>
      <AdminLayout 
        title="Blog Management"
        description="Create and manage blog posts to engage with your audience"
      >
        <BlogManager />
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminBlogsPage;
