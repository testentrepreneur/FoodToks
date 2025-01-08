import React, { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PostCreation } from './PostCreation';
import { PostCard } from './PostCard';
import { StoriesCarousel } from './StoriesCarousel';
import { Post } from './types';
import { useToast } from '@/components/ui/use-toast';

export function HomeFeed() {
  const session = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
      fetchPosts();
      subscribeToNewPosts();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
        return;
      }

      // If no profile exists, create one
      if (!data) {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: session.user.id,
              username: session.user.email?.split('@')[0] || 'user',
              avatar_url: null,
            },
          ])
          .select()
          .single();

        if (createError) {
          console.error('Error creating user profile:', createError);
          toast({
            title: "Error",
            description: "Failed to create user profile",
            variant: "destructive",
          });
          return;
        }

        setUserProfile(newProfile);
      } else {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error in profile management:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

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
          user:profiles!inner (
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
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
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
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile?.avatar_url} />
            <AvatarFallback>{userProfile?.username?.[0] || '?'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 max-w-md mx-4">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <StoriesCarousel />
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