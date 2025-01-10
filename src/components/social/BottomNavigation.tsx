import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PostCreation } from './PostCreation';
import { useState } from 'react';

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t">
        <div className="container mx-auto h-full max-w-2xl">
          <div className="flex items-center justify-around h-full px-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/home')}
              className={isActive('/home') ? 'text-primary' : ''}
            >
              <Home className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/search')}
              className={isActive('/search') ? 'text-primary' : ''}
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
              className={isActive('/favorites') ? 'text-primary' : ''}
            >
              <Heart className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/profile')}
              className={isActive('/profile') ? 'text-primary' : ''}
            >
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <PostCreation onPostCreated={() => setIsPostModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}