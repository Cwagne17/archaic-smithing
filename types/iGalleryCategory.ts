export interface iGalleryCategory {
  id: string;
  slug: 'jewelry' | 'leather' | string;
  name: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
