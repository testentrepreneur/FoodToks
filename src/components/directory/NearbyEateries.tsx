import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock } from 'lucide-react';

const NearbyEateries = () => {
  const eateries = [
    {
      id: 1,
      name: "Corner Café",
      type: "Café",
      distance: "0.3 mi",
      status: "Open Now",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    },
    {
      id: 2,
      name: "Street Bites",
      type: "Food Truck",
      distance: "0.5 mi",
      status: "Open Now",
      image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb",
    },
    {
      id: 3,
      name: "Local Deli",
      type: "Deli",
      distance: "0.7 mi",
      status: "Closing Soon",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Nearby Eateries</h2>
        <Button variant="link">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eateries.map((eatery) => (
          <Card key={eatery.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={eatery.image}
                alt={eatery.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{eatery.name}</h3>
              <p className="text-muted-foreground">{eatery.type}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {eatery.distance}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {eatery.status}
                </div>
              </div>
              <Button className="mt-4" variant="secondary">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NearbyEateries;