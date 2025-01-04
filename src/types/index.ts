export type Category = 'Restaurants' | 'Hotels' | 'Schools' | 'Religious Centers' | 'Markets' | 'Tech Companies' | 'Healthcare' | 'Entertainment';

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