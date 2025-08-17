import React, { Suspense } from 'react';
import { RequestForm } from '@/components/requests';

function RequestFormWithSuspense() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading...</div>}>
      <RequestForm />
    </Suspense>
  );
}

export default function RequestsPage() {
  return <RequestFormWithSuspense />;
}
