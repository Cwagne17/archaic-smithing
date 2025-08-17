'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { iGalleryCategory, iGalleryItem } from '@/types';
import { getDataClient } from '@/lib/dataClient';
import { useToast } from '@/components/ui/Toast';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button, 
  Modal,
  ModalHeader,
  Badge,
  EmptyState,
  Skeleton
} from '@/components/ui';
import { ImageManager } from './ImageManager';
import { formatDateTime } from '@/lib/utils';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<iGalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<iGalleryCategory | null>(null);
  const [items, setItems] = useState<iGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadItems(selectedCategory.id);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const dataClient = getDataClient();
      const categoryList = await dataClient.listCategories();
      setCategories(categoryList.sort((a, b) => a.order - b.order));
      
      // Select first category by default
      if (categoryList.length > 0) {
        setSelectedCategory(categoryList[0]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadItems = async (categoryId: string) => {
    try {
      setItemsLoading(true);
      const dataClient = getDataClient();
      const categoryItems = await dataClient.listItemsByCategory(categoryId);
      setItems(categoryItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load gallery items',
        variant: 'error',
      });
    } finally {
      setItemsLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const dataClient = getDataClient();
      await dataClient.deleteItem(itemId);
      setItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete item',
        variant: 'error',
      });
    }
  };

  const handleItemAdded = (newItem: iGalleryItem) => {
    setItems(prev => [newItem, ...prev]);
    setShowAddItemModal(false);
    toast({
      title: 'Success',
      description: 'Item added successfully',
      variant: 'success',
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Button onClick={() => setShowAddItemModal(true)}>
          Add New Item
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedCategory?.id === category.id
                      ? 'bg-accent text-white'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm opacity-75">
                    {category.slug}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedCategory?.name} Items
                {!itemsLoading && (
                  <Badge variant="secondary" className="ml-2">
                    {items.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {itemsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Skeleton className="h-16 w-16" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Image
                        src={item.mainImageUrl}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.summary || 'No summary'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created {formatDateTime(item.createdAt)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No items yet"
                  description={`No items have been added to the ${selectedCategory?.name} category yet.`}
                  action={
                    <Button onClick={() => setShowAddItemModal(true)}>
                      Add First Item
                    </Button>
                  }
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        size="lg"
      >
        <ModalHeader onClose={() => setShowAddItemModal(false)}>
          <h3 className="text-lg font-semibold">Add New Item</h3>
        </ModalHeader>
        
        {selectedCategory && (
          <ImageManager
            category={selectedCategory}
            onItemAdded={handleItemAdded}
            onCancel={() => setShowAddItemModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export { CategoryManager };
