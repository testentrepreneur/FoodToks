import React from 'react';
import { Post } from './types';

interface PostGridProps {
  posts: Post[];
}

export function PostGrid({ posts }: PostGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div key={post.id} className="aspect-square">
          <img
            src={post.media_urls?.[0] || 'https://via.placeholder.com/300'}
            alt={post.content}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}