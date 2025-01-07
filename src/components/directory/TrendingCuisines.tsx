import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TrendingCuisines = () => {
  const cuisines = [
    {
      id: 1,
      name: "Italian",
      description: "Pizza, Pasta & More",
      image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b",
      popularity: "Very Popular"
    },
    {
      id: 2,
      name: "Japanese",
      description: "Sushi & Ramen",
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10",
      popularity: "Trending"
    },
    {
      id: 3,
      name: "Mexican",
      description: "Tacos & Burritos",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
      popularity: "Hot"
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Trending Cuisines</h2>
        <Button variant="link">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cuisines.map((cuisine) => (
          <Card key={cuisine.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={cuisine.image}
                alt={cuisine.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-accent px-2 py-1 rounded-full text-sm font-medium">
                {cuisine.popularity}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{cuisine.name}</h3>
              <p className="text-muted-foreground">{cuisine.description}</p>
              <Button className="mt-4" variant="secondary">Explore</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TrendingCuisines;