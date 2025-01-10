import React from 'react';
import { TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';
import { PostList } from './PostList';
import { AIAssistant } from '../chat/AIAssistant';
import { Post } from './types';

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just made this amazing homemade sushi! 🍣 The key is fresh ingredients and patience. Swipe to see the process! #FoodLover #Sushi #Homemade',
    media_urls: ['/sushi-platter.jpg', '/sushi-making.jpg'],
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
    content: 'Sunday brunch done right! 🥑 Avocado toast with poached eggs and microgreens. Simple but delicious! #BrunchGoals #HealthyEating',
    media_urls: ['/avocado-toast.jpg'],
    likes_count: 567,
    comments_count: 89,
    shares_count: 23,
    created_at: new Date().toISOString(),
    user: {
      username: 'foodie_adventures',
      avatar_url: '/foodie-avatar.jpg'
    }
  },
  {
    id: '3',
    content: 'Made this colorful Buddha bowl for lunch! 🥗 Quinoa, roasted chickpeas, fresh veggies, and tahini dressing. #HealthyFood #VeganRecipes',
    media_urls: ['/buddha-bowl.jpg'],
    likes_count: 789,
    comments_count: 56,
    shares_count: 34,
    created_at: new Date().toISOString(),
    user: {
      username: 'plant_based_chef',
      avatar_url: '/vegan-chef-avatar.jpg'
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