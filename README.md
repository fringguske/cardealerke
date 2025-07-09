# Car Hire Application

A modern car rental platform built with Next.js and Supabase, featuring a responsive frontend and comprehensive admin dashboard.

## Features

- **Frontend**: Beautiful car browsing interface with filtering and sorting
- **Admin Dashboard**: Complete car inventory management system
- **Authentication**: Secure admin login with Supabase Auth
- **Database**: PostgreSQL database with Row Level Security
- **Storage**: Image upload and management with Supabase Storage
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd carhire
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md)
   - Create a `.env.local` file with your Supabase credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

```
app/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── CarCard.tsx     # Individual car display
│   ├── FilterBar.tsx   # Search and filter controls
│   └── HeroSection.tsx # Landing page hero
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/               # Configuration files
│   └── supabase.ts    # Supabase client setup
├── services/          # Business logic
│   └── carService.ts  # Car data operations
├── admin/             # Admin routes
│   └── page.tsx       # Admin dashboard page
└── page.tsx           # Main landing page
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- Add, edit, and delete cars
- Manage car inventory
- Upload car images
- View all car data in a table format

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For setup help, see the [Supabase Setup Guide](./SUPABASE_SETUP.md) or check the troubleshooting section in the documentation.
