'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CustomerPortalButton } from '@/components/CustomerPortalButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Gallery', href: '/#galleries' },
    { name: 'Blog', href: '/blog' },
    { name: 'Request Work', href: '/requests' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href.split('#')[0]);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Site Title - now navigates to home */}
        <Link href="/" className="flex items-center">
          <span className="font-bold text-xl">
            Archaic Smithing
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <CustomerPortalButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <CustomerPortalButton />
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={cn(
                  'bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm',
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                )}
              />
              <span
                className={cn(
                  'bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5',
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm',
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block text-sm font-medium transition-colors hover:text-accent',
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-muted-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export { Header };
