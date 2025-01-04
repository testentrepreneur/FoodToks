import React, { useState } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { Category, Restaurant } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, MapPin } from 'lucide-react';

// Mock data with Nigerian food businesses
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: "Chicken Republic",
    category: 'Fast Food',
    cuisine: 'Fast Food',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    latitude: 6.5244,
    longitude: 3.3792,
    distance: 0.5,
    isOpen: true,
    address: 'Allen Avenue, Ikeja, Lagos',
    phone: '+234 801 234 5678',
    description: 'Popular fast-food restaurant chain known for their spicy chicken'
  },
  {
    id: '2',
    name: "Mama Put Kitchen",
    category: 'Local Cuisine',
    cuisine: 'Nigerian',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    latitude: 6.5143,
    longitude: 3.3685,
    distance: 1.2,
    isOpen: true,
    address: 'Opebi Road, Ikeja, Lagos',
    phone: '+234 802 345 6789',
    description: 'Authentic Nigerian cuisine with daily specials'
  },
  {
    id: '3',
    name: "Sweet Sensation",
    category: 'Fast Food',
    cuisine: 'Fast Food',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    latitude: 6.4281,
    longitude: 3.4219,
    distance: 2.5,
    isOpen: true,
    address: 'Lekki Phase 1, Lagos',
    website: 'www.sweetsensation.com',
    description: 'Nigerian fast food chain with local and continental options'
  },
  {
    id: '4',
    name: "Café Neo",
    category: 'Cafes',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    latitude: 6.4281,
    longitude: 3.4219,
    distance: 3.0,
    isOpen: true,
    address: 'Victoria Island, Lagos',
    phone: '+234 803 456 7890',
    website: 'www.cafeneo.com',
    description: 'Modern café serving Nigerian coffee and pastries'
  },
  {
    id: '5',
    name: "Yakoyo Restaurant",
    category: 'Local Cuisine',
    cuisine: 'Nigerian',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f',
    latitude: 6.4550,
    longitude: 3.3920,
    distance: 4.2,
    isOpen: true,
    address: 'Surulere, Lagos',
    phone: '+234 805 567 8901',
    description: 'Famous for traditional soups and pounded yam'
  },
  {
    id: '6',
    name: "Breadline Bakery",
    category: 'Bakeries',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    latitude: 6.4550,
    longitude: 3.3920,
    distance: 1.8,
    isOpen: true,
    address: 'Maryland, Lagos',
    phone: '+234 806 678 9012',
    description: 'Fresh bread, cakes, and Nigerian pastries'
  }
];

const categories: Category[] = ['Restaurants', 'Fast Food', 'Local Cuisine', 'Cafes', 'Bakeries', 'Food Delivery'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    const searchTerms = searchQuery.toLowerCase();
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchTerms) ||
      restaurant.description.toLowerCase().includes(searchTerms) ||
      (restaurant.cuisine?.toLowerCase().includes(searchTerms) || false) ||
      restaurant.category.toLowerCase().includes(searchTerms);
    return matchesCategory && matchesSearch;
  });

  const handleRestaurantClick = (id: string) => {
    const restaurant = mockRestaurants.find(r => r.id === id);
    if (restaurant) {
      toast({
        title: restaurant.name,
        description: `${restaurant.description} • ${restaurant.rating} ★`,
      });
    }
  };

  const handleAddListing = () => {
    toast({
      title: "Add New Food Business",
      description: "Coming soon: Add your restaurant or food business to our directory!",
    });
  };

  const handleNearMe = () => {
    toast({
      title: "Nearby Food Spots",
      description: "Finding restaurants and food businesses near you...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nigerian Food Directory</h1>
        <Button onClick={handleAddListing} className="bg-accent text-accent-foreground">
          <Plus className="mr-2" />
          Add Food Business
        </Button>
      </div>
      
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={handleNearMe}
          className="w-full md:w-auto mb-4"
        >
          <MapPin className="mr-2" />
          Food Near Me
        </Button>
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