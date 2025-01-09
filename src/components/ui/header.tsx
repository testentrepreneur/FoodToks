import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">FoodToks</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/pricing" 
            className={`text-sm font-medium transition-colors ${
              isActive('/pricing') ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}