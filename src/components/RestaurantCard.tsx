import React from 'react';
import { Card } from '@/components/ui/card';
import { Restaurant } from '@/types';
import { Star, MapPin, Clock } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow animate-fade-in"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Star className="w-4 h-4 text-accent" />
          {restaurant.rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
        <p className="text-muted-foreground text-sm mb-2">{restaurant.cuisine}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {restaurant.distance}km
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;