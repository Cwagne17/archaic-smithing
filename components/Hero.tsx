import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center bg-gradient-to-br from-background via-muted/30 to-muted/50 overflow-hidden">
      {/* Large Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80vmin] h-[80vmin] max-w-[800px] max-h-[800px] opacity-15">
          <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Overlaid Content */}
      <div className="absolute max-w-screen w-full z-10 container justify-end bottom-0 py-16">
        <div className="text-center mx-auto">
          {/* Main Title */}
          {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Archaic Smithing
          </h1> */}

          {/* Description */}
          {/* <div className="mb-8">
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Handcrafted jewelry and leatherwork by Camden Ailinger. Each piece
              is meticulously crafted with traditional techniques and modern
              artistry.
            </p>
          </div> */}

          {/* Call to Action */}
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <Link href="/requests">
              <Button size="lg" className="w-full md:w-auto text-lg px-8 py-4">
                Request Custom Work
              </Button>
            </Link>
            <Link href="#galleries">
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto text-lg px-8 py-4"
              >
                View Gallery
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 flex justify-center">
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
