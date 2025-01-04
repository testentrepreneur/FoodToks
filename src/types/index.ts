export type Category = 'Restaurants' | 'Fast Food' | 'Local Cuisine' | 'Cafes' | 'Bakeries' | 'Food Delivery';

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
}