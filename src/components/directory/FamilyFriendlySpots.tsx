import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Utensils, Baby } from 'lucide-react';

const FamilyFriendlySpots = () => {
  const spots = [
    {
      id: 1,
      name: "Family Diner",
      features: ["Kids Menu", "High Chairs", "Play Area"],
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
    },
    {
      id: 2,
      name: "Pizza Paradise",
      features: ["Family Deals", "Kids Eat Free", "Birthday Parties"],
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
    },
    {
      id: 3,
      name: "Ice Cream Garden",
      features: ["Outdoor Seating", "Kid-Friendly", "Special Events"],
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5",
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Family-Friendly Spots</h2>
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
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
                ⭐ {spot.rating}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{spot.name}</h3>
              <div className="mt-2 space-y-2">
                {spot.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    {index === 0 ? <Users className="w-4 h-4" /> : 
                     index === 1 ? <Utensils className="w-4 h-4" /> : 
                     <Baby className="w-4 h-4" />}
                    {feature}
                  </div>
                ))}
              </div>
              <Button className="mt-4" variant="secondary">Learn More</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FamilyFriendlySpots;