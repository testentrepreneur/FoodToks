import React from 'react';
import { TopNavigation } from '@/components/social/TopNavigation';
import { BottomNavigation } from '@/components/social/BottomNavigation';
import { AIAssistant } from '@/components/chat/AIAssistant';

export default function Marketplace() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavigation />
      <main className="flex-1 mt-16 mb-16 container mx-auto max-w-2xl p-4">
        <div className="space-y-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search marketplace..."
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['All', 'Food', 'Services', 'Projects', 'Personal Shoppers'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-full whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Post a Project', 'Offer a Service', 'Become a Personal Shopper'].map((action) => (
              <div
                key={action}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold text-lg">{action}</h3>
                <p className="text-muted-foreground">Start your food business journey</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation />
      <AIAssistant />
    </div>
  );
}