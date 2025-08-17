export interface iBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  featuredImage?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface iBlogFormData {
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  featuredImage?: File | null;
  tags: string[];
}
