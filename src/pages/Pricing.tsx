import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Check } from "lucide-react";
import { CTASection } from "@/components/landing/CTASection";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out FoodToks",
      features: [
        "Join 2 food communities",
        "Basic recipe search",
        "Public profile",
        "Community chat",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$10",
      period: "/month",
      description: "For food enthusiasts and creators",
      features: [
        "Everything in Starter, plus:",
        "Unlimited food communities",
        "Advanced recipe search",
        "Priority support",
        "Custom profile badges",
        "Advanced analytics",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For restaurants and food businesses",
      features: [
        "Everything in Pro, plus:",
        "Custom branding",
        "Dedicated support",
        "SLA",
        "Custom integrations",
        "Team management",
        "Advanced security",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="text-center space-y-4 mb-12 px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your food journey. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl ring-1 ring-muted p-8 xl:p-10 ${
                  tier.popular ? "bg-primary/5 ring-primary" : "ring-muted"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold leading-7">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-muted-foreground ml-1 text-sm font-semibold">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <div className="flex-1">
                  <ul role="list" className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`mt-8 w-full ${
                    tier.popular ? "" : "bg-background hover:bg-muted"
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  Get started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CTASection />
    </div>
  );
}