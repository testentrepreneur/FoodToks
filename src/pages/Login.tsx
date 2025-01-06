import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/ui/header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-md mx-auto pt-32 px-4">
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
              theme="light"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}