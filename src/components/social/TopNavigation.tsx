import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Tv, Brain, ShoppingBag, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MainSidebar } from '@/components/navigation/MainSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomeFeed = location.pathname === '/home';

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {isMobile ? (
          <div className="flex items-center gap-4 w-full">
            {isHomeFeed && (
              <>
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0">
                    <MainSidebar onNavigate={() => setIsMenuOpen(false)} />
                  </SheetContent>
                </Sheet>
                <span className="text-2xl font-bold text-primary">FoodToks</span>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="ghost" size="icon">
                    <Tv className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Brain className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
            {!isHomeFeed && (
              <>
                <span className="text-2xl font-bold text-primary">FoodToks</span>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/live')}
              className="flex items-center gap-1"
            >
              <Tv className="h-5 w-5" />
              <span className="text-sm">Live</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Brain className="h-5 w-5" />
              <span className="text-sm">AI</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-1"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm">Market</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
