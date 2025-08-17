import { getDataClient } from '@/lib/dataClient';
import { sampleCategories, sampleItems, sampleRequests } from '../mockData';

// Ensure we're in mock mode for tests
process.env.NEXT_PUBLIC_MOCK_MODE = 'true';

describe('DataClient', () => {
  let dataClient: any;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    dataClient = getDataClient();
  });

  describe('Categories', () => {
    it('should list categories', async () => {
      const categories = await dataClient.listCategories();
      expect(categories).toHaveLength(2);
      expect(categories[0]).toMatchObject({
        slug: 'jewelry',
        name: 'Jewelry',
        order: 1,
      });
    });
  });

  describe('Gallery Items', () => {
    it('should create a new item', async () => {
      const newItem = {
        categoryId: 'cat1',
        title: 'Test Ring',
        summary: 'A test ring',
        description: 'This is a test ring for testing purposes.',
        mainImageUrl: '/test-ring.jpg',
      };

      const createdItem = await dataClient.createItem(newItem);
      
      expect(createdItem).toMatchObject(newItem);
      expect(createdItem.id).toBeDefined();
      expect(createdItem.createdAt).toBeDefined();
      expect(createdItem.updatedAt).toBeDefined();
    });

    it('should list items by category', async () => {
      // First create some test items
      await dataClient.createItem({
        categoryId: 'cat1',
        title: 'Jewelry Item 1',
        mainImageUrl: '/jewelry1.jpg',
      });
      
      await dataClient.createItem({
        categoryId: 'cat2',
        title: 'Leather Item 1',
        mainImageUrl: '/leather1.jpg',
      });

      const jewelryItems = await dataClient.listItemsByCategory('cat1');
      const leatherItems = await dataClient.listItemsByCategory('cat2');

      expect(jewelryItems).toHaveLength(1);
      expect(leatherItems).toHaveLength(1);
      expect(jewelryItems[0].title).toBe('Jewelry Item 1');
      expect(leatherItems[0].title).toBe('Leather Item 1');
    });

    it('should delete an item', async () => {
      const newItem = await dataClient.createItem({
        categoryId: 'cat1',
        title: 'Item to Delete',
        mainImageUrl: '/delete-me.jpg',
      });

      await dataClient.deleteItem(newItem.id);

      const items = await dataClient.listItemsByCategory('cat1');
      expect(items.find((item: any) => item.id === newItem.id)).toBeUndefined();
    });
  });

  describe('Custom Requests', () => {
    it('should submit a request', async () => {
      const requestData = {
        title: 'Custom Ring Request',
        name: 'John Doe',
        email: 'john@example.com',
        description: 'I would like a custom ring.',
      };

      const submittedRequest = await dataClient.submitRequest(requestData);

      expect(submittedRequest).toMatchObject(requestData);
      expect(submittedRequest.id).toBeDefined();
      expect(submittedRequest.status).toBe('pending');
      expect(submittedRequest.createdAt).toBeDefined();
    });

    it('should list requests', async () => {
      await dataClient.submitRequest({
        title: 'Request 1',
        name: 'User 1',
        email: 'user1@example.com',
        description: 'First request',
      });

      await dataClient.submitRequest({
        title: 'Request 2',
        name: 'User 2',
        email: 'user2@example.com',
        description: 'Second request',
      });

      const requests = await dataClient.listRequests();
      expect(requests).toHaveLength(2);
      // Should be sorted by creation date (newest first) - but timing might vary
      const titles = requests.map(r => r.title).sort();
      expect(titles).toEqual(['Request 1', 'Request 2']);
    });

    it('should update request status', async () => {
      const request = await dataClient.submitRequest({
        title: 'Test Request',
        name: 'Test User',
        email: 'test@example.com',
        description: 'Test description',
      });

      const updatedRequest = await dataClient.updateRequestStatus(request.id, 'handled');

      expect(updatedRequest.status).toBe('handled');
      expect(updatedRequest.updatedAt).toBeDefined();
    });
  });

  describe('Authentication (Mock)', () => {
    it('should return null for current user initially', async () => {
      const user = await dataClient.currentUser();
      expect(user).toBeNull();
    });

    it('should sign in mock admin', async () => {
      const user = await dataClient.signInMockAdmin();
      
      expect(user.email).toBe('admin@archaicsmithing.com');
      expect(user.roles).toContain('admin');

      // Should persist the user
      const currentUser = await dataClient.currentUser();
      expect(currentUser).toEqual(user);
    });
  });
});
