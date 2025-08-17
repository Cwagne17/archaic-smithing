'use client';

import React, { useState, useEffect } from 'react';
import { getDataClient } from '@/lib/dataClient';
import { iUser } from '@/types';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { isMockMode } from '@/lib/utils';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError('');
      const dataClient = getDataClient();
      const currentUser = await dataClient.currentUser();
      setUser(currentUser);
    } catch (err) {
      setError('Failed to check authentication');
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMockSignIn = async () => {
    try {
      setError('');
      const dataClient = getDataClient();
      if (dataClient.signInMockAdmin) {
        const mockUser = await dataClient.signInMockAdmin();
        setUser(mockUser);
      }
    } catch (err) {
      setError('Failed to sign in');
      console.error('Mock sign in error:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (!user || !user.roles.includes('admin')) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isMockMode() ? (
                <div>
                  <p className="text-muted-foreground mb-4">
                    You need admin privileges to access this page.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please sign in with your admin account through AWS Amplify.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-4">
                    This application is running in mock mode. 
                    Click below to sign in as a mock admin.
                  </p>
                  
                  {error && (
                    <p className="text-sm text-red-600 mb-4">{error}</p>
                  )}
                  
                  <Button onClick={handleMockSignIn} className="w-full">
                    Sign In as Mock Admin
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    In production, this would use AWS Amplify authentication.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export { AdminGuard };
