import type { iUser } from '@/types';

export const sampleUsers: iUser[] = [
  {
    id: 'user1',
    email: 'admin@archaicsmithing.com',
    name: 'Camden Ailinger',
    roles: ['admin'],
  },
  {
    id: 'user2',
    email: 'test@example.com',
    name: 'Test Admin',
    roles: ['admin'],
  },
];

export const mockAdmin: iUser = sampleUsers[0];
