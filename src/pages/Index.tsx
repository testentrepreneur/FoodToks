import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, MapPin, Users, Search, ArrowRight } from "lucide-react";

export default function Index() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up in seconds and join the foodie community.",
    },
    {
      number: "02",
      title: "Explore & Connect",
      description: "Join food channels or find local vendors near you.",
    },
    {
      number: "03",
      title: "Share & Discover",
      description: "Share your experiences and discover new favorites.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {!session ? (
        <>
          <Header />
          {/* Hero Section */}
          <section className="pt-24 lg:pt-32 pb-16">
            <div className="container px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                    Your Global Hub for{" "}
                    <span className="text-primary">Food and Connections</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                    Discover authentic food experiences and connect with a vibrant community of food lovers worldwide.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button size="lg" className="text-lg">
                      Explore Food Directory <Search className="ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg">
                      Join the Community <Users className="ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 w-full max-w-md">
                  <Card>
                    <CardContent className="p-6">
                      <Auth
                        supabaseClient={supabase}
                        appearance={{
                          theme: ThemeSupa,
                          variables: {
                            default: {
                              colors: {
                                brand: '#ff3131',
                                brandAccent: '#e62c2c',
                              },
                            },
                          },
                        }}
                        providers={[]}
                        theme="light"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
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

          {/* How It Works */}
          <section className="py-16">
            <div className="container px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {steps.map((step) => (
                  <div key={step.number} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Join the Food Revolution?</h2>
              <p className="text-xl mb-8 opacity-90">Get started for free and upgrade anytime.</p>
              <Button size="lg" variant="secondary" asChild>
                <a href="#top">
                  Get Started Now <ArrowRight className="ml-2" />
                </a>
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t">
            <div className="container px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Product</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Support</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Legal</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary">Terms</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
                <p>&copy; 2024 FoodToks. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <div className="p-4">
          <Button
            onClick={() => supabase.auth.signOut()}
            variant="outline"
            className="absolute top-4 right-4"
          >
            Sign Out
          </Button>
          <h1 className="text-2xl font-bold mb-4">Welcome to FoodToks!</h1>
          <p>You're signed in. Main app interface coming soon...</p>
        </div>
      )}
    </div>
  );
}