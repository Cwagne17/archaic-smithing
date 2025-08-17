import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #7c0202 0%, transparent 50%), radial-gradient(circle at 75% 75%, #888888 0%, transparent 50%)`,
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Larger Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <Image
                src="/logo.png"
                alt="Archaic Smithing Logo"
                fill
                className="object-contain dark:brightness-90"
                priority
              />
            </div>
          </div>
          
          {/* Description only */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Handcrafted jewelry and leatherwork by Camden Ailinger. 
              Each piece is meticulously crafted with traditional techniques 
              and modern artistry.
            </p>
          </div>
          
          {/* Call to Action */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link href="/requests">
              <Button size="lg" className="w-full md:w-auto">
                Request Custom Work
              </Button>
            </Link>
            <Link href="#galleries">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                View Gallery
              </Button>
            </Link>
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-muted-foreground"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
