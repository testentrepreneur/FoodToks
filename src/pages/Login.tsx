import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/ui/header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();

  useEffect(() => {
    if (session) {
      toast.success("Successfully signed in!");
      navigate('/');
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast.success("Successfully signed in!");
        navigate('/');
      }
      if (event === 'SIGNED_OUT') {
        toast.success("Successfully signed out!");
      }
    });

    return () => subscription.unsubscribe();
  }, [session, navigate]);

  useEffect(() => {
    const handleAuthError = (error: Error) => {
      if (error.message.includes('Invalid login credentials')) {
        toast.error("Invalid email or password. Please check your credentials and try again.");
      } else if (error.message.includes('Email not confirmed')) {
        toast.error("Please verify your email address before signing in.");
      } else {
        toast.error(error.message);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session, error) => {
      if (error) {
        handleAuthError(error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-md mx-auto pt-32 px-4">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
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
              redirectTo={`${window.location.origin}/`}
              theme="light"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}