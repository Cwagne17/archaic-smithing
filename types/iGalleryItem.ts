export interface iGalleryItem {
  id: string;
  categoryId: string;
  title: string;
  summary?: string;
  description?: string;
  mainImageUrl: string;
  additionalImageUrls?: string[];
  attributes?: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}
