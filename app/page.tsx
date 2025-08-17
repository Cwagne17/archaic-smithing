import React from 'react';
import { Hero } from '@/components/Hero';
import { GalleryGrid } from '@/components/galleries';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      
      <section id="galleries" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of handcrafted jewelry and leatherwork. 
              Each piece tells a story of traditional craftsmanship and modern design.
            </p>
          </div>
          
          <GalleryGrid />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
