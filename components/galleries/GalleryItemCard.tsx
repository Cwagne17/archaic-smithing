'use client';

import React from 'react';
import Image from 'next/image';
import { iGalleryItem } from '@/types';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface GalleryItemCardProps {
  item: iGalleryItem;
  onClick: () => void;
  className?: string;
}

const GalleryItemCard: React.FC<GalleryItemCardProps> = ({
  item,
  onClick,
  className,
}) => {
  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1',
        className
      )}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.mainImageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        
        {item.summary && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {item.summary}
          </p>
        )}
        
        {item.attributes && Object.keys(item.attributes).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {Object.entries(item.attributes).slice(0, 2).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
              >
                {key}: {String(value)}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>View Details</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </div>
      </div>
    </Card>
  );
};

export { GalleryItemCard };
