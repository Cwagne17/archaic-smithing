'use client';

import React, { useState } from 'react';
import { Button, Card, Input } from '@/components/ui';

interface CustomerLoginProps {
  onLogin: (name: string, requestNumber: string) => void;
}

const CustomerLogin: React.FC<CustomerLoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [requestNumber, setRequestNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      // Add validation logic here
      if (!name.trim() || !requestNumber.trim()) {
        setError('Please enter both name and request number');
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLogin(name.trim(), requestNumber.trim());
    } catch (err) {
      setError('Unable to verify credentials. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Login to Portal</h2>
        <p className="text-muted-foreground text-sm">
          Enter your name and request number to view your custom work status
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="requestNumber" className="block text-sm font-medium mb-2">
            Request Number
          </label>
          <Input
            id="requestNumber"
            type="text"
            value={requestNumber}
            onChange={(e) => setRequestNumber(e.target.value)}
            placeholder="e.g., REQ-2024-001"
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Login'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Don't have your request number? Contact us at{' '}
          <a href="mailto:contact@archaicsmithing.com" className="text-accent hover:underline">
            contact@archaicsmithing.com
          </a>
        </p>
      </div>
    </Card>
  );
};

export { CustomerLogin };
