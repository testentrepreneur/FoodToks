import React from 'react';
import { TopNavigation } from '@/components/social/TopNavigation';
import { BottomNavigation } from '@/components/social/BottomNavigation';
import { Search, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Marketplace() {
  const categories = ['All', 'Food', 'Services', 'Projects', 'Personal Shoppers'];
  const actions = [
    { title: 'Post a Project', description: 'Start your food business journey' },
    { title: 'Offer a Service', description: 'Share your culinary expertise' },
    { title: 'Become a Personal Shopper', description: 'Help others find ingredients' }
  ];

  const featuredSellers = [
    {
      name: 'Sarah\'s Kitchen',
      rating: 4.9,
      reviews: 128,
      verified: true,
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f'
    },
    {
      name: 'Asian Fusion Co',
      rating: 4.8,
      reviews: 96,
      verified: true,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavigation />
      <main className="flex-1 mt-16 mb-16 container mx-auto max-w-2xl p-4">
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="search"
              placeholder="Search marketplace..."
              className="pl-10 w-full"
            />
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="secondary"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action) => (
              <div
                key={action.title}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold text-lg">{action.title}</h3>
                <p className="text-muted-foreground">{action.description}</p>
              </div>
            ))}
          </div>

          {/* Featured Sellers */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Featured Sellers</h2>
            <div className="grid grid-cols-1 gap-4">
              {featuredSellers.map((seller) => (
                <div
                  key={seller.name}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="aspect-video relative">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{seller.name}</h3>
                      {seller.verified && (
                        <div className="flex items-center text-sm text-blue-500">
                          <Shield className="w-4 h-4 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{seller.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        ({seller.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}