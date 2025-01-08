import React, { useState, useCallback } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Image, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const MAX_CHARS = 500;
const MAX_FILES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function PostCreation({ onPostCreated }: { onPostCreated: () => void }) {
  const session = useSession();
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Error",
          description: `File ${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
        return false;
      }
      return file.type.startsWith('image/') || file.type.startsWith('video/');
    });

    if (mediaFiles.length + validFiles.length > MAX_FILES) {
      toast({
        title: "Error",
        description: "Maximum 10 files allowed",
        variant: "destructive",
      });
      return;
    }

    setMediaFiles(prev => [...prev, ...validFiles].slice(0, MAX_FILES));
  };

  const removeFile = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePostSubmit = async () => {
    if (!content.trim() && mediaFiles.length === 0 || !session?.user) return;

    setIsPosting(true);
    try {
      const mediaUrls: string[] = [];

      for (const file of mediaFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(filePath);

        mediaUrls.push(publicUrl);
      }

      const { error } = await supabase
        .from('posts')
        .insert([
          {
            content: content.trim(),
            user_id: session.user.id,
            media_urls: mediaUrls,
          }
        ]);

      if (error) throw error;

      setContent('');
      setMediaFiles([]);
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
        <Avatar className="h-10 w-10">
          <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
            className="mb-2 min-h-[100px]"
          />
          <div className="text-sm text-muted-foreground mb-2">
            {content.length}/{MAX_CHARS}
          </div>

          {mediaFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {mediaFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div
            className={`border-2 border-dashed rounded-lg p-4 mb-4 transition-colors ${
              dragActive ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
              <Image className="w-8 h-8 mb-2" />
              <p>Drag and drop files here or</p>
              <label className="cursor-pointer text-primary hover:underline">
                browse
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {mediaFiles.length}/{MAX_FILES} files
            </span>
            <Button onClick={handlePostSubmit} disabled={isPosting}>
              <Send className="h-4 w-4 mr-2" />
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}