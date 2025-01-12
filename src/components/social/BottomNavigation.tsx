import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PostCreation } from './PostCreation';

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Only render on home feed
  if (location.pathname !== '/home') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-40">
      <div className="h-full max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around h-full">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/home')}
            className="text-[#ff3131]"
          >
            <Home className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/directory')}
          >
            <Search className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsPostModalOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/favorites')}
          >
            <Heart className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/profile')}
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <PostCreation onPostCreated={() => setIsPostModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </nav>
  );
}