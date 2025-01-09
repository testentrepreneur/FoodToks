import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/landing/Footer";
import { Check } from "lucide-react";

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying the platform!",
      features: [
        "Community Hub (Basic Features)",
        "Food Directory (View Listings)",
        "View Public Marketplace Content",
        "Basic Pantry Management Tools",
        "Limited AI Recommendations (5/month)",
        "Ad-Supported Experience",
      ],
      popular: false,
      buttonText: "Sign Up for Free",
    },
    {
      name: "Starter",
      price: "$9.99",
      period: "/mo",
      description: "Ideal for casual sellers and small food entrepreneurs!",
      features: [
        "Everything in Free +",
        "Full Community Hub Access",
        "Unlimited Food Directory Listings",
        "Advanced Pantry Management Tools",
        "Unlimited AI Recommendations",
        "Health & Wellness Analytics",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "/mo",
      description: "Perfect for growing food businesses!",
      features: [
        "Everything in Starter +",
        "Advanced SEO Tools",
        "Financial Services Dashboard",
        "Events & Catering Management",
        "VIP Customer Support",
        "Early Access to Beta Features",
      ],
      popular: true,
      buttonText: "Go Pro",
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "/mo",
      description: "Designed for scaling and streamlining operations.",
      features: [
        "Everything in Pro +",
        "Delivery Management Integration",
        "Custom Branding Options",
        "Team Collaboration Tools",
        "API Access for Business Data",
        "Dedicated Account Manager",
      ],
      popular: false,
      buttonText: "Contact Us",
    },
    {
      name: "Lifetime",
      price: "$149",
      description: "Limited time founder pricing - First 100 members only!",
      features: [
        "All Pro Features +",
        "Exclusive Lifetime Member Badge",
        "VIP Priority for Future Features",
        "Guaranteed Future Upgrades",
        "No Monthly Payments Ever",
        "Founder Status Benefits",
      ],
      popular: false,
      buttonText: "Become a Lifetime Member",
      limitedTime: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="text-center space-y-4 mb-12 px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Choose the Perfect Plan for Your Food Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From casual food lovers to professional vendors, we have a plan that's right for you.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl ring-1 p-8 xl:p-10 ${
                  tier.popular ? "bg-primary/5 ring-primary" : "ring-muted"
                } ${tier.limitedTime ? "ring-[#9333EA]" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  </div>
                )}
                {tier.limitedTime && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center rounded-full bg-[#9333EA] px-4 py-1 text-sm font-medium text-white">
                      Limited Time
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
                    tier.limitedTime ? "bg-[#9333EA] hover:bg-[#9333EA]/90" :
                    tier.popular ? "" : "bg-background hover:bg-muted"
                  }`}
                  variant={tier.popular || tier.limitedTime ? "default" : "outline"}
                >
                  {tier.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-muted-foreground">
            Whether you're a food lover, vendor, or business, our plans are tailored to meet your needs. 
            Unlock the power of AI-driven recommendations, pantry management, and community networking today!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}