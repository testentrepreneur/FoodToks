import React, { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PostCreation } from './PostCreation';
import { PostCard } from './PostCard';
import { Post } from './types';

export function HomeFeed() {
  const session = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchPosts();
    subscribeToNewPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          media_urls,
          likes_count,
          comments_count,
          shares_count,
          created_at,
          user:profiles!posts_user_id_fkey (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedPosts: Post[] = (postsData || []).map(post => ({
        id: post.id,
        content: post.content || '',
        media_urls: post.media_urls || [],
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        shares_count: post.shares_count || 0,
        created_at: post.created_at,
        user: {
          username: post.user?.username || 'Anonymous',
          avatar_url: post.user?.avatar_url || ''
        }
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNewPosts = () => {
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'posts'
      }, payload => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-background border-b z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Avatar className="h-10 w-10" />
          <div className="flex-1 max-w-md mx-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full"
            />
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1">
                {notificationCount}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden mt-[60px] mb-[50px]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-4">
            <PostCreation onPostCreated={fetchPosts} />
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}