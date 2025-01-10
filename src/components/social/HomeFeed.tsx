import React from 'react';
import { TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';
import { PostList } from './PostList';
import { AIAssistant } from '../chat/AIAssistant';

export function HomeFeed() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavigation />
      <main className="flex-1 mt-16 mb-16 container mx-auto max-w-2xl">
        <PostList />
      </main>
      <BottomNavigation />
      <AIAssistant />
    </div>
  );
}