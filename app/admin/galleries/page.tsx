'use client';

import React from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { GalleryManager } from '@/components/admin/GalleryManager';

const AdminGalleriesPage: React.FC = () => {
  return (
    <AdminGuard>
      <AdminLayout 
        title="Gallery Management"
        description="Manage your gallery categories and showcase items"
      >
        <GalleryManager />
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminGalleriesPage;
