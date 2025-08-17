'use client';

import React, { useState, useEffect } from 'react';
import { iGalleryCategory } from '@/types';
import { getDataClient, MockClient } from '@/lib/dataClient';
import { GallerySection } from './GallerySection';
import { Skeleton } from '@/components/ui';

interface GalleryGridProps {
  className?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ className }) => {
  const [categories, setCategories] = useState<iGalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError('');
        const dataClient = getDataClient();
        const categoryList = await dataClient.listCategories();
        // Sort by order
        const sortedCategories = categoryList.sort((a, b) => a.order - b.order);
        setCategories(sortedCategories);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load gallery categories';
        setError(errorMessage);
        console.error('Error loading categories:', err);

        // Fallback to mock data if there's an error
        if (errorMessage.includes('Amplify not configured')) {
          console.warn('Amplify not configured, falling back to mock data');
          // Force mock mode
          try {
            const mockClient = new MockClient();
            const categoryList = await mockClient.listCategories();
            const sortedCategories = categoryList.sort((a, b) => a.order - b.order);
            setCategories(sortedCategories);
            setError(''); // Clear error since we have fallback data
          } catch (mockErr) {
            console.error('Mock fallback also failed:', mockErr);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-16">
          {[...Array(2)].map((_, index) => (
            <section key={index}>
              <div className="mb-8">
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-1 w-20" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, itemIndex) => (
                  <div key={itemIndex} className="space-y-3">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-16">
        {categories.map((category) => (
          <GallerySection
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export { GalleryGrid };
