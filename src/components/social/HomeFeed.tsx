import React from 'react';
import { TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';
import { PostList } from './PostList';
import { AIAssistant } from '../chat/AIAssistant';

const mockPosts = [
  {
    id: '1',
    content: 'Delicious homemade sushi rolls! 🍣 #FoodLover #Sushi',
    media_urls: ['/sushi-rolls.jpg'],
    likes_count: 234,
    comments_count: 45,
    shares_count: 12,
    created_at: new Date().toISOString(),
    user: {
      username: 'sushi_master',
      avatar_url: '/chef-avatar.jpg'
    }
  },
  {
    id: '2',
    content: 'Perfect Italian pasta with fresh basil 🍝 #ItalianFood #Foodie',
    media_urls: ['/pasta.jpg'],
    likes_count: 567,
    comments_count: 89,
    shares_count: 23,
    created_at: new Date().toISOString(),
    user: {
      username: 'pasta_lover',
      avatar_url: '/chef-avatar-2.jpg'
    }
  }
];

export function HomeFeed() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavigation />
      <main className="flex-1 mt-16 mb-16 container mx-auto max-w-2xl">
        <PostList initialPosts={mockPosts} />
      </main>
      <BottomNavigation />
      <AIAssistant />
    </div>
  );
}