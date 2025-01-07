import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Header } from "@/components/ui/header";
import { HomeFeed } from "@/components/social/HomeFeed";
import { AIAssistant } from "@/components/chat/AIAssistant";

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
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <HomeFeed />
      <AIAssistant />
    </DashboardLayout>
  );
}