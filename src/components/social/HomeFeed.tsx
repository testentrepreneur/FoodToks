import React, { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Home, Search, MessageCircle, Settings, Upload, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PostCreation } from './PostCreation';
import { PostCard } from './PostCard';
import { StoriesCarousel } from './StoriesCarousel';
import { useNavigate } from 'react-router-dom';

export function HomeFeed() {
  const [showPostCreation, setShowPostCreation] = useState(false);
  const navigate = useNavigate();
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
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
            <HomeIcon className="h-6 w-6" />
          </Button>
          <div className="flex-1 max-w-md mx-4">
            <Input type="search" placeholder="Search..." className="w-full" />
          </div>
          <Button variant="ghost" className="p-2">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden mt-[60px] mb-[60px]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-4">
            <StoriesCarousel />
            {showPostCreation && (
              <PostCreation onPostCreated={() => {
                setShowPostCreation(false);
                fetchPosts();
              }} />
            )}
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-background border-t">
        <div className="container mx-auto h-full flex items-center justify-around">
          <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="p-2">
            <Search className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setShowPostCreation(!showPostCreation)}
            className="p-2"
          >
            <Upload className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="p-2">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Avatar className="h-8 w-8 cursor-pointer" />
        </div>
      </nav>
    </div>
  );
}
