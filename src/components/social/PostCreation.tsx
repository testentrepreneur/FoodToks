import React, { useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Image, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

export function PostCreation({ onPostCreated }: { onPostCreated: () => void }) {
  const session = useSession();
  const [newPost, setNewPost] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const handlePostSubmit = async () => {
    if (!newPost.trim() || !session?.user) return;

    setIsPosting(true);
    try {
      let mediaUrls: string[] = [];

      if (mediaFile) {
        const fileExt = mediaFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(filePath, mediaFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(filePath);

        mediaUrls = [publicUrl];
      }

      const { error } = await supabase
        .from('posts')
        .insert([
          {
            content: newPost,
            user_id: session.user.id,
            media_urls: mediaUrls,
          }
        ]);

      if (error) throw error;

      setNewPost('');
      setMediaFile(null);
      onPostCreated();
      toast({
        title: "Success",
        description: "Your post has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
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
            <Input
              type="file"
              accept="image/*"
              className="max-w-[200px]"
              onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
            />
            <Button onClick={handlePostSubmit} size="sm" disabled={isPosting}>
              <Send className="h-4 w-4 mr-2" />
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}