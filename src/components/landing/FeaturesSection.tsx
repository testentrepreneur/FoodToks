import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, MapPin, Users } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Join the Conversation",
    description: "A vibrant social space for food enthusiasts to connect, share, and grow together. Just like Discord, but built for foodies.",
  },
  {
    icon: MapPin,
    title: "Find Authentic Food Near You",
    description: "Search for street food vendors, restaurants, and local cooks with detailed profiles, live directions, and contact info.",
  },
  {
    icon: Users,
    title: "Build Your Network",
    description: "Connect with fellow food lovers, share recipes, and discover new culinary experiences together.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/50" id="features">
      <div className="container px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose FoodToks?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}