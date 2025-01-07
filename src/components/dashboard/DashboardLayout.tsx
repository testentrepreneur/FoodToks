import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { 
  Home, 
  Film, 
  Brain, 
  Package, 
  List, 
  Store, 
  Users, 
  BarChart, 
  CreditCard, 
  Truck, 
  Heart, 
  Calendar,
  BellRing,
  UserCircle
} from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const session = useSession();
  const username = session?.user?.email?.split('@')[0] || 'there';

  const features = [
    {
      title: "Home Feed",
      icon: <Home className="text-primary" />,
      description: "Discover personalized food content and updates",
      status: "Live",
      statusColor: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Food Entertainment",
      icon: <Film className="text-primary" />,
      description: "Watch cooking shows, recipes, and food vlogs",
      status: "Beta",
      statusColor: "bg-purple-100 text-purple-700"
    },
    {
      title: "AI Powered Services",
      icon: <Brain className="text-primary" />,
      description: "Get smart recipe suggestions and cooking tips",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Smart Pantry",
      icon: <Package className="text-primary" />,
      description: "Track and manage your food inventory efficiently",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Food Directory",
      icon: <List className="text-primary" />,
      description: "Explore our comprehensive food database",
      status: "Beta",
      statusColor: "bg-purple-100 text-purple-700",
      path: "/directory"
    },
    {
      title: "Food Marketplace",
      icon: <Store className="text-primary" />,
      description: "Connect with local food vendors and suppliers",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Community Hub",
      icon: <Users className="text-primary" />,
      description: "Join discussions with fellow food enthusiasts",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "SEO & Revenue",
      icon: <BarChart className="text-primary" />,
      description: "Optimize your food business performance",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Financial Services",
      icon: <CreditCard className="text-primary" />,
      description: "Manage payments and transactions seamlessly",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Delivery Management",
      icon: <Truck className="text-primary" />,
      description: "Streamline your food delivery operations",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Health & Wellness",
      icon: <Heart className="text-primary" />,
      description: "Track nutrition and maintain dietary goals",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Events & Catering",
      icon: <Calendar className="text-primary" />,
      description: "Plan and manage food events efficiently",
      status: "Coming Soon",
      statusColor: "bg-blue-100 text-blue-700"
    }
  ];

  const handleCardClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">FoodToks</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <BellRing className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => {
                supabase.auth.signOut();
                navigate("/");
              }}
              variant="outline"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-2">
          <Home className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Dashboard</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Hello, {username}!</h2>
        <p className="text-muted-foreground mb-8">Manage your food business from one place</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-card cursor-pointer"
              onClick={() => handleCardClick(feature.path)}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{feature.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${feature.statusColor}`}>
                  {feature.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
