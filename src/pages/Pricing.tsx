import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/landing/Footer";
import { Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (tier: string) => {
    if (tier === "Free") {
      navigate("/register");
    } else {
      navigate("/contact");
    }
  };

  const tiers = [
    {
      name: "Free",
      monthlyPrice: "$0",
      annualPrice: "Free",
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
      limitedTime: false,
    },
    {
      name: "Starter",
      monthlyPrice: "$9.99",
      annualPrice: "$99",
      period: isAnnual ? "/year" : "/mo",
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
      limitedTime: false,
    },
    {
      name: "Pro",
      monthlyPrice: "$19.99",
      annualPrice: "$199",
      period: isAnnual ? "/year" : "/mo",
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
      limitedTime: false,
    },
    {
      name: "Enterprise",
      monthlyPrice: "$49.99",
      annualPrice: "$499",
      period: isAnnual ? "/year" : "/mo",
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
      limitedTime: false,
    },
    {
      name: "Lifetime",
      monthlyPrice: "$499",
      annualPrice: "$499",
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

  const compareFeatures = [
    { name: "Monthly Price", values: ["$0", "$9.99", "$19.99", "$49.99", "$499 One-time"] },
    { name: "Annual Price", values: ["Free", "$99", "$199", "$499", "$499 One-time"] },
    { name: "Community Hub", values: ["Basic Access", "Full Access", "Full Access", "Full Access", "Full Access"] },
    { name: "Food Directory", values: ["View Only", "Unlimited Listings", "Unlimited Listings", "Unlimited Listings", "Unlimited Listings"] },
    { name: "Marketplace Access", values: ["View Only", "5 Listings/Month", "Unlimited Listings", "Unlimited + Analytics", "Unlimited + Analytics"] },
    { name: "AI Recommendations", values: ["5/Month", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
    { name: "Pantry Management", values: ["Basic Tools", "Advanced Tools", "Advanced Tools", "Advanced Tools", "Advanced Tools"] },
    { name: "Health & Wellness Analytics", values: [false, true, true, true, true] },
    { name: "SEO Tools", values: [false, false, "Advanced Tools", "Advanced Tools", "Advanced Tools"] },
    { name: "Financial Services Dashboard", values: [false, false, true, true, true] },
    { name: "Events & Catering Management", values: [false, false, true, true, true] },
    { name: "Delivery Management Integration", values: [false, false, false, true, true] },
    { name: "VIP Customer Support", values: [false, false, true, true, true] },
    { name: "Custom Branding for Vendors", values: [false, false, false, true, true] },
    { name: "Early Access to New Features", values: [false, true, true, true, true] },
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
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="text-sm font-medium text-green-500">
                  (Save 17%)
                </span>
              )}
            </div>
          </div>
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
                      {isAnnual ? tier.annualPrice : tier.monthlyPrice}
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
                  onClick={() => handleSubscribe(tier.name)}
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

        <div className="mt-24 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Compare Plans</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Features</TableHead>
                  <TableHead>Free</TableHead>
                  <TableHead>Starter</TableHead>
                  <TableHead>Pro</TableHead>
                  <TableHead>Enterprise</TableHead>
                  <TableHead>Lifetime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compareFeatures.map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    {feature.values.map((value, index) => (
                      <TableCell key={index}>
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          value
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
