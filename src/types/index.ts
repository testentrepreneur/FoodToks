export type Category = 'Restaurant' | 'Bar' | 'Coffee Shop' | 'Street Food';

export interface Restaurant {
  id: string;
  name: string;
  category: Category;
  cuisine: string;
  rating: number;
  image: string;
  latitude: number;
  longitude: number;
  distance: number;
  isOpen: boolean;
}