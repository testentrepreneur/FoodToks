export interface Post {
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