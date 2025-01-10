import React from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TopNavigation } from '@/components/social/TopNavigation';
import { BottomNavigation } from '@/components/social/BottomNavigation';
import { Button } from '@/components/ui/button';
import { MapPin, Edit, Share2, Grid, Star } from 'lucide-react';
import { PostGrid } from '@/components/social/PostGrid';

export default function Profile() {
  const session = useSession();

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: posts } = useQuery({
    queryKey: ['user-posts', session?.user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('posts')
        .select('*, user:profiles(*)')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <div className="pb-16">
        {/* Banner */}
        <div className="h-32 bg-primary" />
        
        {/* Profile Info */}
        <div className="relative px-4">
          <div className="absolute -top-16 w-full left-0 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden">
              <img
                src={profile?.avatar_url || 'https://via.placeholder.com/128'}
                alt={profile?.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-20 text-center">
            <h1 className="text-2xl font-bold">{profile?.username}</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>New York, USA</span>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="font-bold">1.2K</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold">348</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-4 text-muted-foreground">
              {profile?.bio || 'Food enthusiast and home chef 🍳 Sharing my culinary adventures!'}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="font-bold">156</div>
                <div className="text-sm text-muted-foreground">Orders</div>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="font-bold">89</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <span className="font-bold">4.8</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <Button className="flex-1" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button className="flex-1" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Grid className="w-5 h-5" />
              <h2 className="font-semibold">Posts</h2>
            </div>
            <PostGrid posts={posts || []} />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}