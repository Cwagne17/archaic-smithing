'use client';

import React from 'react';
import { Button, Card, Badge } from '@/components/ui';

interface CustomerDashboardProps {
  customerData: {
    name: string;
    requestNumber: string;
  };
  onLogout: () => void;
}

// Mock data - in real app this would come from API
const mockRequestData = {
  title: "Custom Silver Ring with Engraving",
  status: "In Progress",
  createdDate: "2024-01-15",
  estimatedCompletion: "2024-02-20",
  description: "Custom sterling silver ring with intricate Celtic knot engraving and personalized inscription.",
  notes: [
    {
      id: 1,
      date: "2024-01-15",
      type: "system",
      message: "Request submitted and confirmed"
    },
    {
      id: 2,
      date: "2024-01-18",
      type: "admin",
      message: "Design sketch approved. Starting material preparation."
    },
    {
      id: 3,
      date: "2024-01-25",
      type: "admin", 
      message: "Silver casting complete. Beginning engraving work."
    },
    {
      id: 4,
      date: "2024-02-01",
      type: "customer",
      message: "Looks great! Can you make the engraving slightly deeper?"
    },
    {
      id: 5,
      date: "2024-02-02",
      type: "admin",
      message: "Absolutely! I'll enhance the engraving depth as requested."
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'in progress': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'on hold': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ 
  customerData, 
  onLogout 
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {customerData.name}</h2>
          <p className="text-muted-foreground">Request #{customerData.requestNumber}</p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>

      {/* Request Overview */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{mockRequestData.title}</h3>
            <p className="text-muted-foreground text-sm">
              Submitted on {new Date(mockRequestData.createdDate).toLocaleDateString()}
            </p>
          </div>
          <Badge className={getStatusColor(mockRequestData.status)}>
            {mockRequestData.status}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-4">
          {mockRequestData.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Created</span>
            <p className="text-sm">{new Date(mockRequestData.createdDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Estimated Completion</span>
            <p className="text-sm">{new Date(mockRequestData.estimatedCompletion).toLocaleDateString()}</p>
          </div>
        </div>
      </Card>

      {/* Communication History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Communication History</h3>
        <div className="space-y-4">
          {mockRequestData.notes.map((note) => (
            <div 
              key={note.id} 
              className={`p-4 rounded-lg ${
                note.type === 'admin' 
                  ? 'bg-blue-50 border-l-4 border-blue-400' 
                  : note.type === 'customer'
                  ? 'bg-green-50 border-l-4 border-green-400'
                  : 'bg-gray-50 border-l-4 border-gray-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">
                  {note.type === 'admin' ? 'Camden (Artisan)' : 
                   note.type === 'customer' ? 'You' : 'System'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(note.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-foreground">{note.message}</p>
            </div>
          ))}
        </div>
        
        {/* Add message form */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-md font-medium mb-3">Send a Message</h4>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-border rounded-md text-sm"
            />
            <Button size="sm">Send</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { CustomerDashboard };
