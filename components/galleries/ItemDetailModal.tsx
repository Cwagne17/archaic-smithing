'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { iGalleryItem } from '@/types';
import { Modal, ModalHeader, ModalBody, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ItemDetailModalProps {
  item: iGalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!item) return null;

  const allImages = [item.mainImageUrl, ...(item.additionalImageUrls || [])];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="max-h-[90vh] overflow-hidden"
    >
      <ModalHeader onClose={onClose}>
        <h2 className="text-2xl font-bold">{item.title}</h2>
      </ModalHeader>
      
      <ModalBody className="overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={allImages[selectedImageIndex]}
                alt={`${item.title} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors',
                      selectedImageIndex === index
                        ? 'border-accent'
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${item.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Item Details */}
          <div className="space-y-6">
            {/* Summary */}
            {item.summary && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <p className="text-muted-foreground">{item.summary}</p>
              </div>
            )}
            
            {/* Description */}
            {item.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            )}
            
            {/* Attributes */}
            {item.attributes && Object.keys(item.attributes).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(item.attributes).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        {key}
                      </span>
                      <span className="text-foreground">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action */}
            <div className="pt-4 border-t">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Interested in this piece or something similar?
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    onClose();
                    // Navigate to request form with pre-filled item reference
                    const url = new URL('/requests', window.location.origin);
                    url.searchParams.set('item', item.title);
                    window.location.href = url.toString();
                  }}
                >
                  Request Custom Work
                </Button>
              </div>
            </div>
            
            {/* Metadata */}
            <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
              <p>Created: {new Date(item.createdAt).toLocaleDateString()}</p>
              {item.updatedAt !== item.createdAt && (
                <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export { ItemDetailModal };
