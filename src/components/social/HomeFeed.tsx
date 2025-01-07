import React, { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Bell, Search, Plus, Image, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: string;
  content: string;
  media_urls: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  user: {
    username: string;
    avatar_url: string;
  };
}

export function HomeFeed() {
  const session = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchPosts();
    subscribeToNewPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:profiles(username, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPosts(data || []);
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
        setPosts(current => [payload.new as Post, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handlePostSubmit = async () => {
    if (!newPost.trim() || !session?.user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            content: newPost,
            user_id: session.user.id,
          }
        ]);

      if (error) throw error;
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 overflow-hidden mt-[60px] mb-[50px]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-4">
            {/* Post Creation */}
            <Card className="mb-6 p-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10" />
                <div className="flex-1">
                  <Input
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" size="sm">
                      <Image className="h-5 w-5 mr-2" />
                      Add Photo
                    </Button>
                    <Button onClick={handlePostSubmit} size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{post.user?.username}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2">{post.content}</p>
                      <div className="flex gap-4 mt-4">
                        <Button variant="ghost" size="sm">
                          Like ({post.likes_count})
                        </Button>
                        <Button variant="ghost" size="sm">
                          Comment ({post.comments_count})
                        </Button>
                        <Button variant="ghost" size="sm">
                          Share ({post.shares_count})
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}