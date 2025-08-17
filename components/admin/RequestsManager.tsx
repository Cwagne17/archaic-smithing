'use client';

import React, { useState, useEffect } from 'react';
import { iCustomRequest } from '@/types';
import { getDataClient } from '@/lib/dataClient';
import { useToast } from '@/components/ui/Toast';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button, 
  Badge,
  EmptyState,
  Skeleton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@/components/ui';
import { formatDateTime } from '@/lib/utils';

const RequestsManager: React.FC = () => {
  const [requests, setRequests] = useState<iCustomRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<iCustomRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const dataClient = getDataClient();
      const requestList = await dataClient.listRequests();
      setRequests(requestList);
    } catch (error) {
      console.error('Error loading requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load requests',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId: string, status: 'pending' | 'handled') => {
    try {
      setUpdating(requestId);
      const dataClient = getDataClient();
      const updatedRequest = await dataClient.updateRequestStatus(requestId, status);
      
      setRequests(prev => prev.map(req => 
        req.id === requestId ? updatedRequest : req
      ));
      
      toast({
        title: 'Success',
        description: `Request marked as ${status}`,
        variant: 'success',
      });
    } catch (error) {
      console.error('Error updating request status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update request status',
        variant: 'error',
      });
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning' as const;
      case 'handled':
        return 'success' as const;
      default:
        return 'default' as const;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Request Management</h2>
        <Badge variant="secondary">
          {requests.length} total requests
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Work Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium truncate">{request.title}</h3>
                        <Badge variant={getStatusBadgeVariant(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium">From:</span> {request.name} ({request.email})
                        </p>
                        <p>
                          <span className="font-medium">Submitted:</span> {formatDateTime(request.createdAt)}
                        </p>
                        <p className="line-clamp-2">
                          <span className="font-medium">Description:</span> {request.description}
                        </p>
                        {request.fileUrls && request.fileUrls.length > 0 && (
                          <p>
                            <span className="font-medium">Files:</span> {request.fileUrls.length} attached
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        View Details
                      </Button>
                      
                      {request.status === 'pending' ? (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(request.id, 'handled')}
                          disabled={updating === request.id}
                        >
                          {updating === request.id ? 'Updating...' : 'Mark Handled'}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(request.id, 'pending')}
                          disabled={updating === request.id}
                        >
                          {updating === request.id ? 'Updating...' : 'Mark Pending'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No requests yet"
              description="No custom work requests have been submitted yet."
              icon={
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
            />
          )}
        </CardContent>
      </Card>

      {/* Request Detail Modal */}
      <Modal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        size="lg"
      >
        {selectedRequest && (
          <>
            <ModalHeader onClose={() => setSelectedRequest(null)}>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{selectedRequest.title}</h3>
                <Badge variant={getStatusBadgeVariant(selectedRequest.status)}>
                  {selectedRequest.status}
                </Badge>
              </div>
            </ModalHeader>
            
            <ModalBody>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-foreground">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground">{selectedRequest.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-foreground whitespace-pre-wrap mt-1">
                    {selectedRequest.description}
                  </p>
                </div>
                
                {selectedRequest.fileUrls && selectedRequest.fileUrls.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Attached Files</label>
                    <ul className="mt-1 space-y-1">
                      {selectedRequest.fileUrls.map((url, index) => (
                        <li key={index} className="text-sm text-foreground flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          {url.split('/').pop()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <label className="font-medium">Submitted</label>
                    <p>{formatDateTime(selectedRequest.createdAt)}</p>
                  </div>
                  <div>
                    <label className="font-medium">Last Updated</label>
                    <p>{formatDateTime(selectedRequest.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </Button>
              
              {selectedRequest.status === 'pending' ? (
                <Button
                  onClick={() => {
                    handleStatusUpdate(selectedRequest.id, 'handled');
                    setSelectedRequest(null);
                  }}
                  disabled={updating === selectedRequest.id}
                >
                  Mark as Handled
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleStatusUpdate(selectedRequest.id, 'pending');
                    setSelectedRequest(null);
                  }}
                  disabled={updating === selectedRequest.id}
                >
                  Mark as Pending
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};

export { RequestsManager };
