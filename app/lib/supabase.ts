import { createClient } from '@supabase/supabase-js';


// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript support
export interface Car {
  id?: string;
  name: string;
  type: string;
  seats: number;
  luggage: number;
  gearshift: 'Automatic' | 'Manual';
  images: string[];
  priceKsh: number;
  created_at?: string;
  updated_at?: string;
  color?: string;
  mileage?: string;
  year?: string;
}

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: Car;
        Insert: Omit<Car, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
} 