export interface Story {
  id: string;
  user_id: string;
  media_url: string;
  expires_at: string;
  created_at: string;
  user: {
    username: string;
    avatar_url: string | null;
  };
}