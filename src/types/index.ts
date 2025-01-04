export type Category = 'Restaurants' | 'Fast Food' | 'Local Cuisine' | 'Street Foods' | 'Cafes' | 'Bakeries' | 'Food Delivery' | 'Other';

export interface Restaurant {
  id: string;
  name: string;
  category: Category;
  cuisine?: string;
  rating: number;
  image: string;
  latitude: number;
  longitude: number;
  distance: number;
  isOpen: boolean;
  address: string;
  phone?: string;
  website?: string;
  description: string;
  country: string;
  city: string;
}