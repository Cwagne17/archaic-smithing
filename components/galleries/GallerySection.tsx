'use client';

import React, { useState, useEffect } from 'react';
import { iGalleryCategory, iGalleryItem } from '@/types';
import { getDataClient } from '@/lib/dataClient';
import { GalleryItemCard } from './GalleryItemCard';
import { ItemDetailModal } from './ItemDetailModal';
import { Skeleton, EmptyState } from '@/components/ui';

interface GallerySectionProps {
  category: iGalleryCategory;
  className?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  category,
  className,
}) => {
  const [items, setItems] = useState<iGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<iGalleryItem | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError('');
        const dataClient = getDataClient();
        const categoryItems = await dataClient.listItemsByCategory(category.id);
        setItems(categoryItems);
      } catch (err) {
        setError('Failed to load gallery items');
        console.error('Error loading gallery items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [category.id]);

  const handleItemClick = (item: iGalleryItem) => {
    setSelectedItem(item);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <section className={className}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
          <div className="w-20 h-1 bg-accent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={className}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
          <div className="w-20 h-1 bg-accent"></div>
        </div>
        
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
        <div className="w-20 h-1 bg-accent"></div>
      </div>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <GalleryItemCard
              key={item.id}
              item={item}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No items yet"
          description={`No ${category.name.toLowerCase()} pieces have been added to the gallery yet.`}
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
      )}
      
      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={handleModalClose}
      />
    </section>
  );
};

export { GallerySection };
