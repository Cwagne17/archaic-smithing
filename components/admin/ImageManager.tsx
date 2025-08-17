'use client';

import React, { useState } from 'react';
import { iGalleryCategory, iGalleryItem } from '@/types';
import { getDataClient } from '@/lib/dataClient';
import { useToast } from '@/components/ui/Toast';
import { 
  ModalBody,
  ModalFooter,
  Button, 
  Input, 
  TextArea, 
  FileUpload,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui';

interface ImageManagerProps {
  category: iGalleryCategory;
  onItemAdded: (item: iGalleryItem) => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  summary: string;
  description: string;
  attributes: Record<string, string>;
}

interface FormErrors {
  title?: string;
  mainImage?: string;
}

const ImageManager: React.FC<ImageManagerProps> = ({
  category,
  onItemAdded,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    summary: '',
    description: '',
    attributes: {},
  });
  
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [attributeInput, setAttributeInput] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleMainImageSelect = (files: File[]) => {
    if (files.length > 0) {
      setMainImage(files[0]);
      if (errors.mainImage) {
        setErrors(prev => ({
          ...prev,
          mainImage: undefined,
        }));
      }
    }
  };

  const handleAdditionalImagesSelect = (files: File[]) => {
    setAdditionalImages(files);
  };

  const parseAttributes = (input: string): Record<string, string> => {
    const attributes: Record<string, string> = {};
    const lines = input.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        attributes[key.trim()] = valueParts.join(':').trim();
      }
    }
    
    return attributes;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!mainImage) {
      newErrors.mainImage = 'Main image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Switch to basic tab if there are basic errors
      if (errors.title || errors.mainImage) {
        setActiveTab('basic');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: In real implementation, upload images to storage first
      const mainImageUrl = `mock://upload/${mainImage!.name}`;
      const additionalImageUrls = additionalImages.map(file => `mock://upload/${file.name}`);

      const attributes = parseAttributes(attributeInput);

      const dataClient = getDataClient();
      const newItem = await dataClient.createItem({
        categoryId: category.id,
        title: formData.title.trim(),
        summary: formData.summary.trim() || undefined,
        description: formData.description.trim() || undefined,
        mainImageUrl,
        additionalImageUrls: additionalImageUrls.length > 0 ? additionalImageUrls : undefined,
        attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
      });

      onItemAdded(newItem);

    } catch (error) {
      console.error('Error creating item:', error);
      toast({
        title: 'Error',
        description: 'Failed to create item',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ModalBody className="p-0">
        <div className="p-6">
          <div className="text-sm text-muted-foreground mb-4">
            Adding item to <span className="font-medium">{category.name}</span> category
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="basic" className="space-y-4">
                <Input
                  label="Title"
                  placeholder="Enter item title"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  error={errors.title}
                  required
                />

                <Input
                  label="Summary"
                  placeholder="Brief description (optional)"
                  value={formData.summary}
                  onChange={handleInputChange('summary')}
                  helperText="A short summary that appears on the gallery card"
                />

                <TextArea
                  label="Description"
                  placeholder="Detailed description (optional)"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  rows={4}
                  helperText="Full description shown in the detail modal"
                />
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <FileUpload
                  label="Main Image"
                  onFileSelect={handleMainImageSelect}
                  error={errors.mainImage}
                  accept="image/*"
                  multiple={false}
                  helperText="Primary image shown in the gallery"
                />

                {mainImage && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected main image:</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      {mainImage.name} ({Math.round(mainImage.size / 1024)}KB)
                    </div>
                  </div>
                )}

                <FileUpload
                  label="Additional Images (Optional)"
                  onFileSelect={handleAdditionalImagesSelect}
                  accept="image/*"
                  multiple={true}
                  helperText="Additional images shown in the detail modal gallery"
                />

                {additionalImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Additional images:</p>
                    <div className="max-h-32 overflow-y-auto">
                      <ul className="space-y-1">
                        {additionalImages.map((file, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            {file.name} ({Math.round(file.size / 1024)}KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <TextArea
                  label="Attributes (Optional)"
                  placeholder="Material: Sterling Silver&#10;Size: 7&#10;Weight: 10g"
                  value={attributeInput}
                  onChange={(e) => setAttributeInput(e.target.value)}
                  rows={6}
                  helperText="Enter attributes as key:value pairs, one per line (e.g., 'Material: Silver')"
                />
                
                {attributeInput && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="text-sm space-y-1">
                      {parseAttributes(attributeInput) && Object.entries(parseAttributes(attributeInput)).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="font-medium mr-2">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Item'}
        </Button>
      </ModalFooter>
    </div>
  );
};

export { ImageManager };
