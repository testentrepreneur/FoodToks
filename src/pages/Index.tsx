import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

  return (
    <div className="min-h-screen bg-background">
      {!session ? (
        <div className="flex min-h-screen flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 py-12 lg:py-24">
            <div className="max-w-2xl text-center lg:text-left lg:pr-8">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Welcome to{" "}
                <span className="text-primary">FoodCord</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join the ultimate food community. Share recipes, discover culinary tips, and connect with fellow food enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 max-w-md w-full bg-card p-6 rounded-lg shadow-lg">
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
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-muted py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose FoodCord?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Community First</h3>
                  <p className="text-muted-foreground">
                    Connect with food lovers from around the world in real-time.
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Share Recipes</h3>
                  <p className="text-muted-foreground">
                    Create and share your favorite recipes with the community.
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Live Chat</h3>
                  <p className="text-muted-foreground">
                    Discuss cooking tips and tricks in real-time chat channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <Button
            onClick={() => supabase.auth.signOut()}
            variant="outline"
            className="absolute top-4 right-4"
          >
            Sign Out
          </Button>
          <h1 className="text-2xl font-bold mb-4">Welcome to FoodCord!</h1>
          <p>You're signed in. Main app interface coming soon...</p>
        </div>
      )}
    </div>
  );
}