import React, { useState } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { Category, Restaurant } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with API calls later
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: "Joe's Pizza",
    category: 'Restaurant',
    cuisine: 'Italian',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    latitude: 40.7128,
    longitude: -74.006,
    distance: 0.5,
    isOpen: true,
  },
  {
    id: '2',
    name: 'Coffee Haven',
    category: 'Coffee Shop',
    cuisine: 'Café',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    latitude: 40.7148,
    longitude: -74.008,
    distance: 1.2,
    isOpen: true,
  },
];

const categories: Category[] = ['Restaurant', 'Bar', 'Coffee Shop', 'Street Food'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    const searchTerms = searchQuery.toLowerCase();
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchTerms) ||
      restaurant.cuisine.toLowerCase().includes(searchTerms) ||
      restaurant.category.toLowerCase().includes(searchTerms);
    return matchesCategory && matchesSearch;
  });

  const handleRestaurantClick = (id: string) => {
    const restaurant = mockRestaurants.find(r => r.id === id);
    if (restaurant) {
      toast({
        title: restaurant.name,
        description: `${restaurant.cuisine} • ${restaurant.rating} ★`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Discover Places</h1>
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleRestaurantClick(restaurant.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;