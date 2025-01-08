import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Post } from './types';

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.user.avatar_url || ''} />
          <AvatarFallback>{post.user.username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{post.user.username}</h3>
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
  );
}