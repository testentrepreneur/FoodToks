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
import { supabase } from '@/integrations/supabase/client';

export function MainSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

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
          <h1 className="text-2xl font-bold text-primary">FoodToks</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}