import React from 'react';
import { PostCard } from './PostCard';
import { Post } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </ScrollArea>
  );
}