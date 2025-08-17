'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Modal } from '@/components/ui';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'status_update' | 'welcome' | 'completion' | 'follow_up' | 'custom';
  lastUsed?: string;
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Project Started',
    subject: 'Your Custom Work Has Begun - {{requestNumber}}',
    body: `Hi {{customerName}},

Great news! I've started working on your custom piece: "{{projectTitle}}".

Here's what's happening next:
- Materials have been sourced and prepared
- Expected completion: {{expectedDate}}
- I'll send you progress updates along the way

You can track your project status anytime at: {{portalLink}}

Feel free to reach out if you have any questions!

Best regards,
Camden Ailinger
Archaic Smithing`,
    category: 'status_update',
    lastUsed: '2024-01-20'
  },
  {
    id: '2',
    name: 'Welcome New Customer',
    subject: 'Welcome to Archaic Smithing - Request Confirmed',
    body: `Hello {{customerName}},

Thank you for choosing Archaic Smithing for your custom work!

Your request has been received:
- Request Number: {{requestNumber}}
- Project: {{projectTitle}}
- Submitted: {{submissionDate}}

I'll review your requirements and get back to you within 24-48 hours with:
- Design timeline
- Material recommendations  
- Final pricing confirmation

Track your request: {{portalLink}}

I'm excited to create something special for you!

Best,
Camden`,
    category: 'welcome'
  },
  {
    id: '3',
    name: 'Project Completed',
    subject: 'Your Custom Piece is Ready! - {{requestNumber}}',
    body: `Hi {{customerName}},

Exciting news! Your custom piece is complete: "{{projectTitle}}"

I'm thrilled with how it turned out and can't wait for you to see it. The craftsmanship and attention to detail really show in this piece.

Next steps:
- Photos have been uploaded to your portal
- Shipping will be arranged within 24 hours
- You'll receive tracking information

View your completed piece: {{portalLink}}

Thank you for trusting me with this special project!

Best regards,
Camden Ailinger`,
    category: 'completion'
  },
  {
    id: '4',
    name: 'Follow-up Check',
    subject: 'How are you enjoying your custom piece?',
    body: `Hi {{customerName}},

I hope you're loving your custom {{projectTitle}}!

It's been a few weeks since delivery, and I'd love to hear:
- How the piece is working for you
- Any feedback on the craftsmanship
- Photos of it in use (if you're comfortable sharing)

Your experience helps me continue improving my craft. Plus, I always enjoy seeing my pieces in their new homes!

If you're interested in future custom work, remember you get priority booking as a returning customer.

Best,
Camden

P.S. Don't forget to follow us on social media for behind-the-scenes content!`,
    category: 'follow_up'
  }
];

interface EmailComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: EmailTemplate;
}

const EmailComposeModal: React.FC<EmailComposeModalProps> = ({ 
  isOpen, 
  onClose, 
  template 
}) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState(template?.subject || '');
  const [body, setBody] = useState(template?.body || '');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    onClose();
    // Show success message
  };

  const templateVariables = [
    '{{customerName}}',
    '{{requestNumber}}', 
    '{{projectTitle}}',
    '{{expectedDate}}',
    '{{submissionDate}}',
    '{{portalLink}}'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compose Email">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Recipient</label>
          <Input
            type="email"
            placeholder="customer@example.com"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            className="w-full h-64 p-3 border border-border rounded-md text-sm"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your message..."
          />
        </div>

        <div className="bg-muted p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">Available Variables:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {templateVariables.map((variable) => (
              <code key={variable} className="bg-background px-2 py-1 rounded">
                {variable}
              </code>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!recipient || !subject || isSending}
          >
            {isSending ? 'Sending...' : 'Send Email'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const EmailTemplateManager: React.FC = () => {
  const [templates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'status_update': return 'bg-blue-100 text-blue-800';
      case 'welcome': return 'bg-green-100 text-green-800';
      case 'completion': return 'bg-purple-100 text-purple-800';
      case 'follow_up': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUseTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsComposeModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Create Template</Button>
          <Button onClick={() => setIsComposeModalOpen(true)}>
            Compose Email
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                {template.category.replace('_', ' ')}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 font-medium">
              Subject: {template.subject}
            </p>
            
            <div className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {template.body.substring(0, 150)}...
            </div>
            
            {template.lastUsed && (
              <p className="text-xs text-muted-foreground mb-4">
                Last used: {new Date(template.lastUsed).toLocaleDateString()}
              </p>
            )}
            
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={() => handleUseTemplate(template)}
                className="flex-1"
              >
                Use Template
              </Button>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Email History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Emails Sent</h3>
        <div className="space-y-3">
          {[
            {
              recipient: 'sarah.johnson@email.com',
              subject: 'Your Custom Work Has Begun - REQ-2024-045',
              template: 'Project Started',
              sentAt: '2024-02-01 10:30 AM'
            },
            {
              recipient: 'michael.chen@email.com', 
              subject: 'Welcome to Archaic Smithing - Request Confirmed',
              template: 'Welcome New Customer',
              sentAt: '2024-01-30 2:15 PM'
            },
            {
              recipient: 'emma.davis@email.com',
              subject: 'Your Custom Piece is Ready! - REQ-2024-021',
              template: 'Project Completed',
              sentAt: '2024-01-28 4:45 PM'
            }
          ].map((email, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-sm">{email.recipient}</p>
                <p className="text-sm text-muted-foreground">{email.subject}</p>
                <p className="text-xs text-muted-foreground">Template: {email.template}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{email.sentAt}</p>
                <Button size="sm" variant="outline" className="mt-1">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Compose Modal */}
      <EmailComposeModal 
        isOpen={isComposeModalOpen}
        onClose={() => {
          setIsComposeModalOpen(false);
          setSelectedTemplate(null);
        }}
        template={selectedTemplate || undefined}
      />
    </div>
  );
};

export { EmailTemplateManager };
