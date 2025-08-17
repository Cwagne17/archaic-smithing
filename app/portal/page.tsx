'use client';

import React, { useState } from 'react';
import { CustomerLogin } from '@/components/portal/CustomerLogin';
import { CustomerDashboard } from '@/components/portal/CustomerDashboard';

const CustomerPortalPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerData, setCustomerData] = useState<{
    name: string;
    requestNumber: string;
  } | null>(null);

  const handleLogin = (name: string, requestNumber: string) => {
    setCustomerData({ name, requestNumber });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCustomerData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Customer Portal
            </h1>
            <p className="text-muted-foreground">
              Track your custom work request and view updates
            </p>
          </div>

          {!isLoggedIn ? (
            <CustomerLogin onLogin={handleLogin} />
          ) : (
            <CustomerDashboard 
              customerData={customerData!} 
              onLogout={handleLogout} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalPage;
