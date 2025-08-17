import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Archaic Smithing. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0">
            Crafted by Camden Ailinger
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
