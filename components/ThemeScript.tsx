import React from 'react';

const ThemeScript: React.FC = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getThemePreference() {
              if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                return localStorage.getItem('theme');
              }
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            const theme = getThemePreference();
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
      }}
    />
  );
};

export { ThemeScript };
