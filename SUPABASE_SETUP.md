# Supabase Setup Guide

This guide will help you set up the car hire application with Supabase integration.

## Prerequisites

- Node.js and npm installed
- A Supabase project created

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase Console](https://supabase.com/dashboard)
2. Click "New Project"
3. Follow the setup wizard to create your project
4. Choose a database password and region

### 2. Set Up Database Schema

1. In your Supabase project, go to "SQL Editor" in the left sidebar
2. Create the cars table by running this SQL:

```sql
-- Create cars table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  seats INTEGER NOT NULL CHECK (seats >= 1 AND seats <= 10),
  luggage INTEGER NOT NULL CHECK (luggage >= 0 AND luggage <= 10),
  gearshift TEXT NOT NULL CHECK (gearshift IN ('Automatic', 'Manual')),
  image TEXT NOT NULL,
  priceKsh INTEGER NOT NULL CHECK (priceKsh > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access" ON cars;
DROP POLICY IF EXISTS "Allow authenticated users to manage cars" ON cars;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON cars
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage cars" ON cars
  FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function (only if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;

-- Create updated_at trigger
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3. Set Up Storage

1. In your Supabase project, go to "Storage" in the left sidebar
2. Click "Create a new bucket"
3. Name it `car-images`
4. Set it as public (uncheck "Private bucket")
5. Create the bucket

### 4. Enable Authentication

1. In your Supabase project, go to "Authentication" in the left sidebar
2. Go to "Users" tab
3. Click "Add user"
4. Create an admin user with email and password (e.g., admin@example.com)

### 5. Get Supabase Configuration

1. In your Supabase project, go to "Settings" (gear icon) in the left sidebar
2. Click "API" in the settings menu
3. Copy the "Project URL" and "anon public" key

### 6. Environment Variables

Create a `.env.local` file in the root directory with your Supabase configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Running the Application

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## Admin Dashboard Features

### Authentication
- Secure login with Supabase Authentication
- Admin-only access to dashboard

### Car Management
- **Add Cars**: Add new cars to the inventory
- **Edit Cars**: Modify existing car details
- **Delete Cars**: Remove cars from inventory
- **View All Cars**: See all cars in a table format

### Car Properties
Each car includes:
- Name (e.g., "STANDARD (VOLKSWAGEN JETTA)")
- Type (e.g., "Sedan", "SUV")
- Number of seats
- Luggage capacity
- Gearshift type (Automatic/Manual)
- Price in KSH
- Image URL

## Frontend Integration

The frontend automatically loads cars from Supabase and displays them in the car grid. Features include:

- **Real-time Data**: Cars are loaded from Supabase
- **Filtering**: Filter by vehicle type, gearshift, seats
- **Sorting**: Sort by price (low to high, high to low)
- **Responsive Design**: Works on all device sizes

## Security Considerations

### For Production

1. **Row Level Security**: RLS policies are already configured
2. **Authentication**: Use proper admin authentication
3. **Environment Variables**: Keep Supabase config secure
4. **HTTPS**: Deploy with HTTPS enabled

### Additional Security Policies

You can add more restrictive policies if needed:

```sql
-- Example: Only allow specific users to manage cars
CREATE POLICY "Allow specific users to manage cars" ON cars
  FOR ALL USING (auth.email() IN ('admin@example.com', 'manager@example.com'));
```

## Troubleshooting

### Common Issues

1. **Supabase not initialized**: Check your environment variables
2. **Authentication errors**: Verify admin user credentials
3. **Cars not loading**: Check RLS policies and database connection
4. **Build errors**: Ensure all dependencies are installed
5. **Image upload errors**: Check storage bucket permissions

### Getting Help

- Check the browser console for error messages
- Verify Supabase project configuration
- Ensure all environment variables are set correctly
- Check Supabase logs in the dashboard

## File Structure

```
app/
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── CarForm.tsx
│   │   └── CarList.tsx
│   ├── CarCard.tsx
│   ├── FilterBar.tsx
│   └── HeroSection.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   └── supabase.ts
├── services/
│   └── carService.ts
├── admin/
│   └── page.tsx
└── page.tsx
```

## Migration from Firebase

If you're migrating from Firebase:

1. Export your data from Firebase Firestore
2. Import the data into Supabase using the SQL editor or data import feature
3. Update environment variables
4. Test all functionality

## Next Steps

1. Add more admin features (user management, analytics)
2. Implement real-time subscriptions for live updates
3. Add booking system integration
4. Enhance security with role-based access
5. Add data validation and error handling
6. Implement image optimization and CDN 