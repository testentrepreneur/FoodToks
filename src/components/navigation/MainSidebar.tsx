import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  Store,
  Users,
  Brain,
  Tv,
  DollarSign,
  CreditCard,
  Truck,
  Heart,
  Calendar,
  LogOut,
  MessageCircle,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainSidebarProps {
  onNavigate?: () => void;
}

export function MainSidebar({ onNavigate }: MainSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSession();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onNavigate) onNavigate();
  };

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Package, label: 'Smart Pantry', path: '/pantry' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: Users, label: 'Directory', path: '/directory' },
    { icon: Brain, label: 'AI Services', path: '/ai-services', comingSoon: true },
    { icon: Tv, label: 'FoodToks TV', path: '/tv', comingSoon: true },
    { icon: Users, label: 'Communities', path: '/communities', comingSoon: true },
    { icon: DollarSign, label: 'SEO & Revenue', path: '/seo', comingSoon: true },
    { icon: CreditCard, label: 'FoodToks Pay', path: '/pay', comingSoon: true },
    { icon: Truck, label: 'Delivery Management', path: '/delivery', comingSoon: true },
    { icon: Heart, label: 'Health & Wellness', path: '/health', comingSoon: true },
    { icon: Calendar, label: 'Events & Catering', path: '/events', comingSoon: true },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="h-full w-64 border-r bg-background p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#ff3131]">FoodToks</h1>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <div key={item.path} className="flex flex-col mb-1">
            <Button
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 text-lg ${
                location.pathname === item.path ? 'bg-[#ff3131]/10 text-[#ff3131]' : ''
              } hover:bg-[#ff3131]/10 hover:text-[#ff3131]`}
              onClick={() => !item.comingSoon && handleNavigation(item.path)}
              disabled={item.comingSoon}
            >
              <item.icon className="h-5 w-5" />
              <span className="truncate">{item.label}</span>
            </Button>
            {item.comingSoon && (
              <span className="text-xs text-[#ff3131] ml-9">Coming Soon</span>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 mb-4 p-2 cursor-pointer hover:bg-[#ff3131]/10 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {session?.user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={handleSignOut} className="text-[#ff3131]">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}