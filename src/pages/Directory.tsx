import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import LocationFilter from '@/components/LocationFilter';
import RestaurantCard from '@/components/RestaurantCard';
import { Category } from '@/types';

// Mock data for demonstration
const mockRestaurants = [
  {
    id: '1',
    name: 'Tasty Bites',
    category: 'Restaurants' as Category,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    latitude: 40.7128,
    longitude: -74.006,
    distance: 0.5,
    isOpen: true,
    address: '123 Food Street, NY',
    phone: '+1 234-567-8900',
    website: 'www.tastybites.com',
    description: 'Authentic local cuisine',
    country: 'Nigeria',
    city: 'Lagos'
  },
  // Add more mock restaurants as needed
];

export default function Directory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const categories: Category[] = [
    'Restaurants',
    'Fast Food',
    'Local Cuisine',
    'Street Foods',
    'Cafes',
    'Bakeries',
    'Food Delivery',
    'Other'
  ];

  const handleMarkerClick = (id: string) => {
    console.log('Marker clicked:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Food Directory</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            <LocationFilter
              selectedCountry={selectedCountry}
              selectedCity={selectedCity}
              onCountryChange={setSelectedCountry}
              onCityChange={setSelectedCity}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleMarkerClick(restaurant.id)}
                />
              ))}
            </div>
          </div>

          <div className="h-[calc(100vh-2rem)] sticky top-4 rounded-lg overflow-hidden hidden lg:block">
            <Map restaurants={mockRestaurants} onMarkerClick={handleMarkerClick} />
          </div>
        </div>
      </div>
    </div>
  );
}