import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin } from 'lucide-react';

const TopRatedRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "The Rustic Kitchen",
      cuisine: "Italian",
      rating: 4.8,
      reviews: 234,
      priceRange: "$$",
      location: "Downtown",
      distance: "0.8 mi",
      status: "Open Now",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    // Add more restaurants as needed
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Top Rated Restaurants</h2>
        <Button variant="link">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                {restaurant.rating}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{restaurant.name}</h3>
              <p className="text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {restaurant.location} • {restaurant.distance}
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                  {restaurant.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TopRatedRestaurants;