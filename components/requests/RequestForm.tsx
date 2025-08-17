'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getDataClient } from '@/lib/dataClient';
import { validateEmail } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { Button, Input, TextArea, FileUpload, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface FormData {
  title: string;
  name: string;
  email: string;
  description: string;
}

interface FormErrors {
  title?: string;
  name?: string;
  email?: string;
  description?: string;
  files?: string;
}

const RequestForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    name: '',
    email: '',
    description: '',
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill form if item is specified in URL
  useEffect(() => {
    const itemName = searchParams.get('item');
    if (itemName) {
      setFormData(prev => ({
        ...prev,
        title: `Custom work inspired by "${itemName}"`,
        description: `I'm interested in custom work similar to "${itemName}". `,
      }));
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    if (errors.files) {
      setErrors(prev => ({
        ...prev,
        files: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const dataClient = getDataClient();
      
      // TODO: In real implementation, upload files to storage first
      const fileUrls: string[] = [];
      if (files.length > 0) {
        // Mock file URLs for now
        fileUrls.push(...files.map(file => `mock://upload/${file.name}`));
      }

      await dataClient.submitRequest({
        title: formData.title.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        description: formData.description.trim(),
        fileUrls: fileUrls.length > 0 ? fileUrls : undefined,
      });

      setIsSubmitted(true);
      toast({
        title: 'Request Submitted!',
        description: 'Thank you for your request. Camden will review it and get back to you soon.',
        variant: 'success',
      });

      // Reset form
      setFormData({
        title: '',
        name: '',
        email: '',
        description: '',
      });
      setFiles([]);

    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your request. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Request Submitted!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your custom work request. Camden will review your submission 
              and get back to you soon with details about timeline and pricing.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button onClick={() => setIsSubmitted(false)}>
              Submit Another Request
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Custom Work</h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your vision and we&apos;ll work together to create something unique.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Project Title"
                placeholder="e.g., Custom leather wallet, Silver ring design"
                value={formData.title}
                onChange={handleInputChange('title')}
                error={errors.title}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={errors.name}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={errors.email}
                  required
                />
              </div>

              <TextArea
                label="Project Description"
                placeholder="Describe your vision in detail. Include materials, style preferences, size requirements, intended use, inspiration, and any other relevant details."
                value={formData.description}
                onChange={handleInputChange('description')}
                error={errors.description}
                rows={6}
                required
                helperText="The more details you provide, the better we can understand your vision."
              />

              <FileUpload
                label="Reference Images (Optional)"
                onFileSelect={handleFileSelect}
                error={errors.files}
                helperText="Upload any reference images, sketches, or inspiration photos that might help us understand your vision."
                accept="image/*,application/pdf"
                multiple
              />

              {files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Files:</p>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        {file.name} ({Math.round(file.size / 1024)}KB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Camden will review your request within 2-3 business days</li>
                  <li>You&apos;ll receive an email with initial thoughts and questions</li>
                  <li>We&apos;ll discuss timeline, materials, and pricing</li>
                  <li>Once approved, work begins on your custom piece</li>
                </ol>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { RequestForm };
