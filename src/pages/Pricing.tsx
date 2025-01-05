import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Check } from "lucide-react";

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Join unlimited food communities",
        "Basic vendor search",
        "Public profile",
        "Community chat access",
      ],
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Best for food enthusiasts",
      features: [
        "All Free features",
        "Create unlimited food communities",
        "Advanced vendor search filters",
        "Priority support",
        "Custom profile badges",
        "Voice channels",
      ],
    },
    {
      name: "Business",
      price: "$29.99",
      description: "For food vendors and businesses",
      features: [
        "All Pro features",
        "Verified vendor badge",
        "Business analytics",
        "Priority listing in search",
        "Marketing tools",
        "API access",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container pt-24 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your food journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-3xl font-bold mb-6">{tier.price}<span className="text-lg text-muted-foreground">/month</span></div>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}