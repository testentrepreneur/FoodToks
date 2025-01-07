import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Star, MapPin } from 'lucide-react';

const LateNightEats = () => {
  const spots = [
    {
      id: 1,
      name: "Night Owl Diner",
      type: "American",
      hours: "Open until 3 AM",
      rating: 4.2,
      distance: "1.2 mi",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    },
    {
      id: 2,
      name: "Midnight Ramen",
      type: "Japanese",
      hours: "Open 24/7",
      rating: 4.5,
      distance: "0.8 mi",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
    },
    {
      id: 3,
      name: "Late Pizza Joint",
      type: "Italian",
      hours: "Open until 2 AM",
      rating: 4.0,
      distance: "1.5 mi",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Late Night Eats</h2>
        <Button variant="link">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spots.map((spot) => (
          <Card key={spot.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                {spot.rating}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{spot.name}</h3>
              <p className="text-muted-foreground">{spot.type}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {spot.hours}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {spot.distance}
                </div>
              </div>
              <Button className="mt-4" variant="secondary">Order Now</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LateNightEats;