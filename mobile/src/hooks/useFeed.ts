import { useState, useEffect, useCallback } from 'react';
import { postService } from '../services/api';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
  role?: string;
}

interface Post {
  id: number;
  content: string;
  type: string;
  media_urls: string[];
  link_url?: string;
  poll_options: string[];
  is_story: boolean;
  likes_count: number;
  prayers_count: number;
  comments_count: number;
  created_at: string;
  user: User;
  is_liked?: boolean;
  is_prayed?: boolean;
}

export const useFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadPosts = useCallback(async (reset = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const currentReset = reset ? 0 : offset;
      const data = await postService.getFeed(50, currentReset);

      if (reset) {
        setPosts(data);
        setOffset(50);
      } else {
        setPosts((prev) => [...prev, ...data]);
        setOffset((prev) => prev + 50);
      }

      setHasMore(data.length === 50);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar posts');
    } finally {
      setIsLoading(false);
    }
  }, [offset]);

  const refreshPosts = useCallback(async () => {
    setOffset(0);
    setHasMore(true);
    await loadPosts(true);
  }, [loadPosts]);

  const loadMore = useCallback(async () => {
    if (!isLoading && hasMore) {
      await loadPosts(false);
    }
  }, [isLoading, hasMore, loadPosts]);

  const likePost = useCallback(async (postId: number, type: 'like' | 'prayer' = 'like') => {
    try {
      const response = await postService.likePost(postId, type);

      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId) {
            const isLiked = type === 'like' ? !post.is_liked : post.is_liked;
            const isPrayed = type === 'prayer' ? !post.is_prayed : post.is_prayed;

            return {
              ...post,
              is_liked: isLiked,
              is_prayed: isPrayed,
              likes_count: type === 'like'
                ? post.is_liked ? post.likes_count - 1 : post.likes_count + 1
                : post.likes_count,
              prayers_count: type === 'prayer'
                ? post.is_prayed ? post.prayers_count - 1 : post.prayers_count + 1
                : post.prayers_count,
            };
          }
          return post;
        })
      );

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao curtir' };
    }
  }, []);

  const createPost = useCallback(async (data: {
    content: string;
    type?: string;
    media_urls?: string[];
    link_url?: string;
    poll_options?: string[];
    is_story?: boolean;
  }) => {
    try {
      const response = await postService.createPost(data);
      setPosts((prev) => [response.post, ...prev]);
      return { success: true, post: response.post };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar post' };
    }
  }, []);

  const addComment = useCallback(async (postId: number, content: string, parent_id?: number) => {
    try {
      const response = await postService.addComment(postId, content, parent_id);

      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments_count: post.comments_count + 1,
            };
          }
          return post;
        })
      );

      return { success: true, comment: response.comment };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao comentar' };
    }
  }, []);

  useEffect(() => {
    loadPosts(true);
  }, []);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    loadPosts,
    refreshPosts,
    loadMore,
    likePost,
    createPost,
    addComment,
  };
};
