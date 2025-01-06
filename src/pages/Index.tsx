import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button import
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Header } from "@/components/ui/header";

export default function Index() {
  const [session, setSession] = useState(null);

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

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <Card className="mx-auto max-w-md">
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
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Welcome to FoodToks!</h2>
        <p className="text-muted-foreground">
          Start exploring food communities or discover local vendors near you.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Food Communities</h3>
              <p className="text-muted-foreground mb-4">
                Join discussions, share recipes, and connect with fellow food enthusiasts.
              </p>
              <Button className="w-full">Browse Communities</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Local Food Directory</h3>
              <p className="text-muted-foreground mb-4">
                Discover authentic food vendors, restaurants, and home chefs near you.
              </p>
              <Button className="w-full">Explore Directory</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}