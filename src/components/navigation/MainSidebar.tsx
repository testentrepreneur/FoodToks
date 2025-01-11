import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  Store,
  Users,
  Settings,
  LogOut,
  MessageCircle,
  Bell,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';

export function MainSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSession();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Package, label: 'Smart Pantry', path: '/pantry' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: Users, label: 'Directory', path: '/directory' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r bg-background p-4">
      <div className="flex h-full flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">FoodToks</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 text-lg"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center space-x-3 mb-4 p-2">
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
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="h-6 w-6" />
            <span className="text-lg">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}