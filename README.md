# Archaic Smithing Website

A modern, responsive website for showcasing handcrafted jewelry and leatherwork by Camden Ailinger. Built with Next.js, TypeScript, and TailwindCSS.

## Features

- **Gallery System**: Organized by categories (Jewelry & Leather) with detailed item views
- **Custom Work Requests**: Form-based system for collecting custom work inquiries
- **Admin Dashboard**: Protected admin interface for managing galleries and requests
- **Mock Mode**: Full functionality without requiring AWS services for development
- **Responsive Design**: Mobile-first design with modern UI components
- **Accessibility**: WCAG AA compliant with proper semantic markup
- **Type Safety**: Full TypeScript implementation with strict typing

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design tokens
- **Backend**: AWS Amplify (Auth, API, Storage)
- **Testing**: Jest + React Testing Library
- **Development**: Turbopack for fast builds

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd archaic-smithing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Configuration

The application supports two modes:

### Mock Mode (Development)
```env
NEXT_PUBLIC_MOCK_MODE=true
```
- Uses localStorage for data persistence
- Includes mock admin authentication
- No AWS services required
- Perfect for development and testing

### Production Mode
```env
NEXT_PUBLIC_MOCK_MODE=false
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your-user-pool-client-id
NEXT_PUBLIC_API_URL=https://your-api-url.amazonaws.com/prod
NEXT_PUBLIC_S3_BUCKET=your-s3-bucket-name
```

## Project Structure

```
archaic-smithing/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout with global providers
│   ├── page.tsx           # Home page with hero and galleries
│   ├── requests/          # Custom work request pages
│   └── admin/             # Protected admin pages
├── components/            # React components organized by feature
│   ├── ui/               # Reusable UI components
│   ├── galleries/        # Gallery-related components
│   ├── requests/         # Request form components
│   └── admin/            # Admin dashboard components
├── types/                # TypeScript interfaces and types
├── lib/                  # Utility functions and configurations
├── styles/               # Global styles and Tailwind config
└── tests/                # Jest tests and mock data
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Admin Access

### Mock Mode
1. Navigate to `/admin`
2. Click "Sign In as Mock Admin"
3. Access gallery management and request management tabs

### Production Mode
Admin access requires proper AWS Amplify authentication configuration.

## Gallery Management

Admins can:
- Add new gallery items with multiple images
- Organize items by category (Jewelry/Leather)
- Set item attributes and descriptions
- Delete items as needed

## Request Management

The system captures:
- Project title and description
- Customer contact information
- Optional file attachments
- Request status (pending/handled)

## Design System

The application uses a cohesive design system based on the Archaic Smithing brand:

### Colors
- **Primary Accent**: `#7c0202` (Brand red)
- **Neutrals**: Full grayscale palette from white to black
- **Semantic**: Success, warning, and error variants

### Typography
- **Font**: Geist Sans (Primary) and Geist Mono (Code)
- **Scale**: Responsive typography with proper contrast ratios

### Components
All components follow accessibility best practices with:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Deployment

### AWS Amplify Deployment

1. Configure AWS Amplify with required services:
   - **Auth**: Cognito User Pools for admin authentication
   - **API**: API Gateway with Lambda functions
   - **Storage**: S3 bucket for image uploads

2. Set production environment variables

3. Deploy via Amplify CLI or console

### Alternative Deployment

The application can be deployed to any platform supporting Next.js:
- Vercel
- Netlify
- Railway
- Self-hosted

Note: Non-AWS deployments will require implementing alternative authentication and storage solutions.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use semantic commit messages
- Ensure accessibility compliance
- Follow the established component patterns

## Testing

The project includes comprehensive tests for:
- Component rendering and interaction
- Data layer functionality
- Form validation and submission
- Authentication flows
- Accessibility requirements

Run tests locally:
```bash
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Camden Ailinger** - Archaic Smithing  
Custom jewelry and leatherwork artisan

For technical questions about this website, please open an issue in the repository.
