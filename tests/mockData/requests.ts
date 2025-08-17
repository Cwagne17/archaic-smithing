import type { iCustomRequest } from '@/types';

export const sampleRequests: iCustomRequest[] = [
  {
    id: 'req1',
    title: 'Custom Wedding Ring Set',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    description: 'I would like to commission a custom wedding ring set for my fiancé and myself. We\'re looking for matching bands with a Celtic knot pattern in white gold. The rings should be comfortable for daily wear and have a timeless design. We\'re flexible on timeline but hoping to have them completed within 3 months for our wedding.',
    fileUrls: [
      '/uploads/celtic-inspiration-1.jpg',
      '/uploads/ring-sizing-chart.pdf',
    ],
    status: 'pending',
    createdAt: '2024-01-22T09:30:00Z',
    updatedAt: '2024-01-22T09:30:00Z',
  },
  {
    id: 'req2',
    title: 'Leather Laptop Bag',
    name: 'Michael Chen',
    email: 'mike.chen@techstartup.com',
    description: 'I need a custom leather laptop bag for my 15" MacBook Pro. I travel frequently for work and need something professional but durable. I prefer a messenger-style bag with padded compartments and possibly a shoulder strap. Dark brown or black leather would be ideal. Quality is more important than cost.',
    fileUrls: [
      '/uploads/laptop-dimensions.jpg',
      '/uploads/bag-style-reference.jpg',
    ],
    status: 'handled',
    createdAt: '2024-01-19T14:15:00Z',
    updatedAt: '2024-01-20T10:45:00Z',
  },
  {
    id: 'req3',
    title: 'Memorial Jewelry Piece',
    name: 'Emily Rodriguez',
    email: 'emily.r.rodriguez@gmail.com',
    description: 'I would like to create a memorial piece for my grandmother who recently passed away. She loved dragonflies and had a collection of vintage jewelry. I\'m thinking of a pendant or brooch that incorporates a dragonfly design, possibly using some elements from her existing jewelry if possible. This is very meaningful to me, so I want to make sure it\'s done right.',
    status: 'pending',
    createdAt: '2024-01-21T16:20:00Z',
    updatedAt: '2024-01-21T16:20:00Z',
  },
  {
    id: 'req4',
    title: 'Custom work inspired by "Sterling Silver Rope Ring"',
    name: 'David Wilson',
    email: 'd.wilson@email.com',
    description: 'I\'m interested in custom work similar to "Sterling Silver Rope Ring". I love the rope pattern but would like it in a wider band, possibly 8mm instead of 4mm. I wear a size 9.5 and prefer a brushed finish rather than polished. Would this be possible to create?',
    status: 'pending',
    createdAt: '2024-01-23T11:10:00Z',
    updatedAt: '2024-01-23T11:10:00Z',
  },
];
