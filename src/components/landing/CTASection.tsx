import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Join the Food Revolution?</h2>
        <p className="text-xl mb-8 opacity-90">Get started for free and upgrade anytime.</p>
        <Button 
          size="lg" 
          variant="outline" 
          className="bg-white text-primary hover:bg-white/90 hover:text-primary"
          onClick={() => navigate('/register')}
        >
          Get Started Now <ArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
}