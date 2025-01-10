import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, ShoppingBag, MessageCircle, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopNavigation() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Radio className="h-5 w-5" />
            <span className="text-sm">Live</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Zap className="h-5 w-5" />
            <span className="text-sm">AI</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => navigate('/marketplace')}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm">Market</span>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">Messages</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Settings className="h-5 w-5" />
            <span className="text-sm">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}