import React from 'react';
import { TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';
import { PostList } from './PostList';
import { Post } from './types';

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just made this amazing homemade sushi! 🍣 The key is fresh ingredients and patience. Swipe to see the process! #FoodLover #Sushi #Homemade',
    media_urls: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c'],
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
    media_urls: ['https://images.unsplash.com/photo-1525351484163-7529414344d8'],
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
    media_urls: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd'],
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
      <main className="flex-1 container mx-auto max-w-2xl px-4 pt-20 pb-16">
        <PostList posts={mockPosts} />
      </main>
      <BottomNavigation />
    </div>
  );
}