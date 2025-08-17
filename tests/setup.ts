import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    has: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock Next.js image
jest.mock('next/image', () => {
  const MockImage = (props: any) => {
    const { src, alt, ...otherProps } = props;
    return mockCreateElement('img', { src, alt, ...otherProps });
  };
  MockImage.displayName = 'MockNextImage';
  return MockImage;
});

// Mock Next.js link
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: any) => {
    return mockCreateElement('a', { href, ...props }, children);
  };
  MockLink.displayName = 'MockNextLink';
  return MockLink;
});

// Helper function for creating mock elements
function mockCreateElement(tag: string, props: any, children?: any) {
  return { 
    type: tag, 
    props: { ...props, children },
    $$typeof: Symbol.for('react.element')
  };
}

// Setup window.matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock environment variables
process.env.NEXT_PUBLIC_MOCK_MODE = 'true';
