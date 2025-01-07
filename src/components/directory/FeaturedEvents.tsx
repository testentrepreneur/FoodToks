import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FeaturedEvents = () => {
  const events = [
    {
      id: 1,
      title: "Chef's Table Experience",
      description: "Exclusive 7-course tasting menu",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      id: 2,
      title: "Street Food Festival",
      description: "Global cuisines under one roof",
      date: "March 20-22, 2024",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    },
    {
      id: 3,
      title: "Wine & Dine Night",
      description: "Premium wine pairing event",
      date: "March 25, 2024",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Events</h2>
        <Button variant="link">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
              <p className="text-sm mt-2">{event.date}</p>
              <Button className="mt-4" variant="secondary">RSVP</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;