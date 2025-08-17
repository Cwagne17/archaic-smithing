import { iGalleryCategory, iGalleryItem, iCustomRequest, iUser } from '@/types';
import { iBlog } from '@/types/iBlog';
import { sampleItems } from '@/tests/mockData/items';

export interface iDataClient {
  listCategories(): Promise<iGalleryCategory[]>;
  listItemsByCategory(categoryId: string): Promise<iGalleryItem[]>;
  createItem(input: Omit<iGalleryItem, 'id'|'createdAt'|'updatedAt'>): Promise<iGalleryItem>;
  deleteItem(id: string): Promise<void>;
  submitRequest(input: Omit<iCustomRequest, 'id'|'status'|'createdAt'|'updatedAt'>): Promise<iCustomRequest>;
  listRequests(): Promise<iCustomRequest[]>;
  updateRequestStatus(id: string, status: 'pending'|'handled'): Promise<iCustomRequest>;
  // Blog methods
  listBlogs(): Promise<iBlog[]>;
  getBlog(id: string): Promise<iBlog | null>;
  createBlog(input: Omit<iBlog, 'id'|'createdAt'|'updatedAt'|'slug'>): Promise<iBlog>;
  updateBlog(id: string, input: Partial<Omit<iBlog, 'id'|'createdAt'|'updatedAt'>>): Promise<iBlog>;
  deleteBlog(id: string): Promise<void>;
  // Auth
  currentUser(): Promise<iUser | null>;
  signInMockAdmin?(): Promise<iUser>; // mock only
}

// Mock Client Implementation
class MockClient implements iDataClient {
  private categories: iGalleryCategory[] = [
    {
      id: 'cat1',
      slug: 'jewelry',
      name: 'Jewelry',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cat2',
      slug: 'leather',
      name: 'Leather',
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private items: iGalleryItem[] = [];
  private requests: iCustomRequest[] = [];
  private blogs: iBlog[] = [];
  private currentMockUser: iUser | null = null;

  constructor() {
    this.loadFromStorage();
    this.initializeWithSampleData();
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('archaic-items');
      const storedRequests = localStorage.getItem('archaic-requests');
      const storedBlogs = localStorage.getItem('archaic-blogs');
      const storedUser = localStorage.getItem('archaic-user');

      if (storedItems) {
        this.items = JSON.parse(storedItems);
      }
      if (storedRequests) {
        this.requests = JSON.parse(storedRequests);
      }
      if (storedBlogs) {
        this.blogs = JSON.parse(storedBlogs);
      }
      if (storedUser) {
        this.currentMockUser = JSON.parse(storedUser);
      }
    }
  }

  private initializeWithSampleData() {
    // Only initialize if no items exist in storage
    if (this.items.length === 0) {
      this.items = [...sampleItems];
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('archaic-items', JSON.stringify(this.items));
      localStorage.setItem('archaic-requests', JSON.stringify(this.requests));
      localStorage.setItem('archaic-blogs', JSON.stringify(this.blogs));
      if (this.currentMockUser) {
        localStorage.setItem('archaic-user', JSON.stringify(this.currentMockUser));
      }
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async listCategories(): Promise<iGalleryCategory[]> {
    return this.categories;
  }

  async listItemsByCategory(categoryId: string): Promise<iGalleryItem[]> {
    return this.items.filter(item => item.categoryId === categoryId);
  }

  async createItem(input: Omit<iGalleryItem, 'id'|'createdAt'|'updatedAt'>): Promise<iGalleryItem> {
    const now = new Date().toISOString();
    const item: iGalleryItem = {
      ...input,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now,
    };
    this.items.push(item);
    this.saveToStorage();
    return item;
  }

  async deleteItem(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
  }

  async submitRequest(input: Omit<iCustomRequest, 'id'|'status'|'createdAt'|'updatedAt'>): Promise<iCustomRequest> {
    const now = new Date().toISOString();
    const request: iCustomRequest = {
      ...input,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    this.requests.push(request);
    this.saveToStorage();
    return request;
  }

  async listRequests(): Promise<iCustomRequest[]> {
    return this.requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateRequestStatus(id: string, status: 'pending'|'handled'): Promise<iCustomRequest> {
    const request = this.requests.find(r => r.id === id);
    if (!request) {
      throw new Error('Request not found');
    }
    request.status = status;
    request.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return request;
  }

  // Blog methods
  async listBlogs(): Promise<iBlog[]> {
    return this.blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBlog(id: string): Promise<iBlog | null> {
    return this.blogs.find(blog => blog.id === id || blog.slug === id) || null;
  }

  async createBlog(input: Omit<iBlog, 'id'|'createdAt'|'updatedAt'|'slug'>): Promise<iBlog> {
    const now = new Date().toISOString();
    const blog: iBlog = {
      ...input,
      id: Math.random().toString(36).substr(2, 9),
      slug: this.generateSlug(input.title),
      createdAt: now,
      updatedAt: now,
    };
    this.blogs.push(blog);
    this.saveToStorage();
    return blog;
  }

  async updateBlog(id: string, input: Partial<Omit<iBlog, 'id'|'createdAt'|'updatedAt'>>): Promise<iBlog> {
    const blog = this.blogs.find(b => b.id === id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    
    Object.assign(blog, input);
    if (input.title) {
      blog.slug = this.generateSlug(input.title);
    }
    blog.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return blog;
  }

  async deleteBlog(id: string): Promise<void> {
    this.blogs = this.blogs.filter(blog => blog.id !== id);
    this.saveToStorage();
  }

  async currentUser(): Promise<iUser | null> {
    return this.currentMockUser;
  }

  async signInMockAdmin(): Promise<iUser> {
    const user: iUser = {
      id: 'mock-admin',
      email: 'admin@archaicsmithing.com',
      name: 'Mock Admin',
      roles: ['admin'],
    };
    this.currentMockUser = user;
    this.saveToStorage();
    return user;
  }
}

// Amplify Client Implementation (placeholder)
class AmplifyClient implements iDataClient {
  async listCategories(): Promise<iGalleryCategory[]> {
    throw new Error('Amplify not configured');
  }

  async listItemsByCategory(categoryId: string): Promise<iGalleryItem[]> {
    throw new Error('Amplify not configured');
  }

  async createItem(input: Omit<iGalleryItem, 'id'|'createdAt'|'updatedAt'>): Promise<iGalleryItem> {
    throw new Error('Amplify not configured');
  }

  async deleteItem(id: string): Promise<void> {
    throw new Error('Amplify not configured');
  }

  async submitRequest(input: Omit<iCustomRequest, 'id'|'status'|'createdAt'|'updatedAt'>): Promise<iCustomRequest> {
    throw new Error('Amplify not configured');
  }

  async listRequests(): Promise<iCustomRequest[]> {
    throw new Error('Amplify not configured');
  }

  async updateRequestStatus(id: string, status: 'pending'|'handled'): Promise<iCustomRequest> {
    throw new Error('Amplify not configured');
  }

  async listBlogs(): Promise<iBlog[]> {
    throw new Error('Amplify not configured');
  }

  async getBlog(id: string): Promise<iBlog | null> {
    throw new Error('Amplify not configured');
  }

  async createBlog(input: Omit<iBlog, 'id'|'createdAt'|'updatedAt'|'slug'>): Promise<iBlog> {
    throw new Error('Amplify not configured');
  }

  async updateBlog(id: string, input: Partial<Omit<iBlog, 'id'|'createdAt'|'updatedAt'>>): Promise<iBlog> {
    throw new Error('Amplify not configured');
  }

  async deleteBlog(id: string): Promise<void> {
    throw new Error('Amplify not configured');
  }

  async currentUser(): Promise<iUser | null> {
    return null;
  }
}

// Factory function to get the appropriate client
export function getDataClient(): iDataClient {
  const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';
  return isMockMode ? new MockClient() : new AmplifyClient();
}
