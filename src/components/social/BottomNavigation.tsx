import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useSession } from '@supabase/auth-helpers-react';

export function BottomNavigation() {
  const navigate = useNavigate();
  const session = useSession();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t">
      <div className="container mx-auto h-full max-w-2xl">
        <div className="flex items-center justify-around h-full px-4">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-6 w-6" />
          </Button>
          <Avatar 
            className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            onClick={() => navigate('/profile')}
          />
        </div>
      </div>
    </nav>
  );
}