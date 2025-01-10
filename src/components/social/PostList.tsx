import React from 'react';
import { PostCard } from './PostCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Post } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          media_urls,
          likes_count,
          comments_count,
          shares_count,
          created_at,
          user:profiles!inner (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading posts...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </ScrollArea>
  );
}