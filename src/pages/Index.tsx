import React, { useState } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import AddListingForm from '@/components/AddListingForm';
import LocationFilter from '@/components/LocationFilter';
import { Category, Restaurant } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Updated mock data with country and city properties for all entries
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: "Mama Put Kitchen",
    category: 'Street Foods',
    cuisine: 'Nigerian',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26',
    latitude: 6.5143,
    longitude: 3.3685,
    distance: 1.2,
    isOpen: true,
    address: 'Opebi Road, Ikeja, Lagos',
    phone: '+234 802 345 6789',
    description: 'Authentic Nigerian street food with daily specials',
    country: 'Nigeria',
    city: 'Lagos'
  },
  {
    id: '2',
    name: "Sweet Sensation",
    category: 'Fast Food',
    cuisine: 'Fast Food',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    latitude: 6.4281,
    longitude: 3.4219,
    distance: 2.5,
    isOpen: true,
    address: 'Lekki Phase 1, Lagos',
    website: 'www.sweetsensation.com',
    description: 'Nigerian fast food chain with local and continental options',
    country: 'Nigeria',
    city: 'Lagos'
  },
  {
    id: '3',
    name: "Kanta's Local Dishes",
    category: 'Local Cuisine',
    cuisine: 'Ghanaian',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1511910849309-0dffb8785146',
    latitude: 5.6037,
    longitude: -0.1870,
    distance: 1.8,
    isOpen: true,
    address: 'Osu, Accra',
    phone: '+233 24 123 4567',
    description: 'Traditional Ghanaian dishes in a cozy setting',
    country: 'Ghana',
    city: 'Accra'
  },
  {
    id: '4',
    name: "Mr. Bigg's",
    category: 'Fast Food',
    cuisine: 'Fast Food',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    latitude: 6.5244,
    longitude: 3.3792,
    distance: 0.5,
    isOpen: true,
    address: 'Allen Avenue, Ikeja, Lagos',
    phone: '+234 801 234 5678',
    website: 'www.mrbiggs.com',
    description: 'Popular fast-food restaurant chain known for their meat pies',
    country: 'Nigeria',
    city: 'Lagos'
  },
  {
    id: '5',
    name: "Kilimanjaro",
    category: 'Fast Food',
    cuisine: 'Nigerian Fast Food',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    latitude: 6.4281,
    longitude: 3.4219,
    distance: 3.0,
    isOpen: true,
    address: 'Victoria Island, Lagos',
    phone: '+234 803 456 7890',
    website: 'www.kilimanjaro.com',
    description: 'Nigerian fast food with a focus on local flavors',
    country: 'Nigeria',
    city: 'Lagos'
  },
  {
    id: '6',
    name: "Buka Express",
    category: 'Street Foods',
    cuisine: 'Nigerian',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    latitude: 6.4550,
    longitude: 3.3920,
    distance: 1.8,
    isOpen: true,
    address: 'Maryland, Lagos',
    phone: '+234 806 678 9012',
    description: 'Quick service local dishes and street food favorites',
    country: 'Nigeria',
    city: 'Lagos'
  }
];

const categories: Category[] = ['Restaurants', 'Fast Food', 'Local Cuisine', 'Street Foods', 'Cafes', 'Bakeries', 'Food Delivery', 'Other'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    const matchesCountry = restaurant.country === selectedCountry;
    const matchesCity = !selectedCity || restaurant.city === selectedCity;
    const searchTerms = searchQuery.toLowerCase();
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchTerms) ||
      restaurant.description.toLowerCase().includes(searchTerms) ||
      (restaurant.cuisine?.toLowerCase().includes(searchTerms) || false) ||
      restaurant.category.toLowerCase().includes(searchTerms);
    return matchesCategory && matchesSearch && matchesCountry && matchesCity;
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

  const handleNearMe = () => {
    toast({
      title: "Food Near Me",
      description: "Finding restaurants and food businesses near you...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">
          {selectedCity ? `${selectedCity}, ` : ''}{selectedCountry} Food Directory
        </h1>
        <Button onClick={() => setIsAddListingOpen(true)} className="bg-accent text-accent-foreground w-full md:w-auto">
          <Plus className="mr-2" />
          Add Food Business
        </Button>
      </div>
      
      <LocationFilter
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
        onCountryChange={setSelectedCountry}
        onCityChange={setSelectedCity}
      />
      
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

      <Dialog open={isAddListingOpen} onOpenChange={setIsAddListingOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Food Business</DialogTitle>
          </DialogHeader>
          <AddListingForm onClose={() => setIsAddListingOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
