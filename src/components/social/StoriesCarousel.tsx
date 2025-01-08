import React, { useState, useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Story } from '@/types/story';
import { Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export function StoriesCarousel() {
  const session = useSession();
  const [stories, setStories] = useState<Story[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStories();
    subscribeToStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        id,
        media_url,
        expires_at,
        created_at,
        user_id,
        profiles:profiles(username, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching stories:', error);
      return;
    }

    const formattedStories: Story[] = (data || []).map(story => ({
      id: story.id,
      user_id: story.user_id,
      media_url: story.media_url,
      expires_at: story.expires_at,
      created_at: story.created_at,
      user: {
        username: story.profiles?.username || 'Anonymous',
        avatar_url: story.profiles?.avatar_url || ''
      }
    }));

    setStories(formattedStories);
  };

  const subscribeToStories = () => {
    const channel = supabase
      .channel('stories-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stories' },
        () => {
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !session?.user) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('posts')
        .getPublicUrl(filePath);

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      const { error: insertError } = await supabase
        .from('stories')
        .insert({
          user_id: session.user.id,
          media_url: publicUrl,
          expires_at: expiresAt.toISOString(),
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Your story has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading story:', error);
      toast({
        title: "Error",
        description: "Failed to upload story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-background border-b mb-4">
      <ScrollArea className="w-full">
        <div className="flex gap-4 p-4 min-w-full">
          {session && (
            <div className="flex flex-col items-center">
              <div className="relative">
                <label htmlFor="story-upload" className="cursor-pointer">
                  <div className="w-[70px] h-[70px] rounded-full bg-muted flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                </label>
                <input
                  id="story-upload"
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>
              <span className="text-xs mt-1">Add Story</span>
            </div>
          )}
          
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={story.user.avatar_url || ''} alt={story.user.username} />
                    <AvatarFallback>{story.user.username[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <span className="text-xs mt-1 truncate w-[70px] text-center">
                {story.user.username}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}