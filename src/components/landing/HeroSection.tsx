import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";

export function HeroSection() {
  return (
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
            {/* Auth component will be rendered here by parent */}
          </div>
        </div>
      </div>
    </section>
  );
}