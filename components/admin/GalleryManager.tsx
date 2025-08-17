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
  Skeleton,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui';
import { ImageManager } from './ImageManager';
import { formatDateTime } from '@/lib/utils';

const GalleryManager: React.FC = () => {
  const [categories, setCategories] = useState<iGalleryCategory[]>([]);
  const [jewelryItems, setJewelryItems] = useState<iGalleryItem[]>([]);
  const [leatherItems, setLeatherItems] = useState<iGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<iGalleryCategory | null>(null);
  const [activeTab, setActiveTab] = useState('jewelry');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const dataClient = getDataClient();
      const categoryList = await dataClient.listCategories();
      setCategories(categoryList.sort((a, b) => a.order - b.order));
      
      // Load items for both categories
      const jewelryCategory = categoryList.find(c => c.slug === 'jewelry');
      const leatherCategory = categoryList.find(c => c.slug === 'leather');
      
      if (jewelryCategory) {
        const jewelry = await dataClient.listItemsByCategory(jewelryCategory.id);
        setJewelryItems(jewelry.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
      
      if (leatherCategory) {
        const leather = await dataClient.listItemsByCategory(leatherCategory.id);
        setLeatherItems(leather.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load gallery data',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const dataClient = getDataClient();
      await dataClient.deleteItem(itemId);
      
      // Update local state
      setJewelryItems(prev => prev.filter(item => item.id !== itemId));
      setLeatherItems(prev => prev.filter(item => item.id !== itemId));
      
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
    const category = categories.find(c => c.id === newItem.categoryId);
    if (category?.slug === 'jewelry') {
      setJewelryItems(prev => [newItem, ...prev]);
    } else if (category?.slug === 'leather') {
      setLeatherItems(prev => [newItem, ...prev]);
    }
    
    setShowAddItemModal(false);
    toast({
      title: 'Success',
      description: 'Item added successfully',
      variant: 'success',
    });
  };

  const openAddModal = (categorySlug: string) => {
    const category = categories.find(c => c.slug === categorySlug);
    if (category) {
      setSelectedCategory(category);
      setShowAddItemModal(true);
    }
  };

  const renderItemGrid = (items: iGalleryItem[], categorySlug: string) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <Skeleton className="aspect-square w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <EmptyState
          title={`No ${categorySlug} items yet`}
          description={`No ${categorySlug} pieces have been added to the gallery yet.`}
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          action={
            <Button onClick={() => openAddModal(categorySlug)}>
              Add First Item
            </Button>
          }
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-square">
              <Image
                src={item.mainImageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                  {item.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {item.summary}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDateTime(item.createdAt)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-200"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">Manage your jewelry and leatherwork collections</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="jewelry">
              Jewelry
              {!loading && (
                <Badge variant="secondary" className="ml-2">
                  {jewelryItems.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="leather">
              Leather
              {!loading && (
                <Badge variant="secondary" className="ml-2">
                  {leatherItems.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <Button onClick={() => openAddModal(activeTab)}>
            Add New {activeTab === 'jewelry' ? 'Jewelry' : 'Leather'} Item
          </Button>
        </div>

        <TabsContent value="jewelry" className="space-y-6">
          {renderItemGrid(jewelryItems, 'jewelry')}
        </TabsContent>

        <TabsContent value="leather" className="space-y-6">
          {renderItemGrid(leatherItems, 'leather')}
        </TabsContent>
      </Tabs>

      {/* Add Item Modal */}
      <Modal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        size="lg"
      >
        <ModalHeader onClose={() => setShowAddItemModal(false)}>
          <h3 className="text-lg font-semibold">
            Add New {selectedCategory?.name} Item
          </h3>
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

export { GalleryManager };
