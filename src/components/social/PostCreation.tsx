import React, { useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Image, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

export function PostCreation({ onPostCreated }: { onPostCreated: () => void }) {
  const session = useSession();
  const [newPost, setNewPost] = useState('');

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
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
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
  );
}