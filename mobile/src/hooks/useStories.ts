import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
}

interface Story {
  id: number;
  user_id: number;
  media_url: string;
  type: 'image' | 'video' | 'text';
  content?: string;
  stickers: any[];
  views_count: number;
  expires_at: string;
  created_at: string;
  user?: User;
  is_viewed?: boolean;
}

interface StoryGroup {
  user: User;
  stories: Story[];
  has_unviewed: boolean;
}

export const useStories = () => {
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar stories
  const loadStories = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar stories da API
      const mockStories: StoryGroup[] = [
        {
          user: {
            id: 1,
            name: 'João Silva',
            username: 'joao.silva',
          },
          stories: [
            {
              id: 1,
              user_id: 1,
              media_url: 'https://picsum.photos/400/700',
              type: 'image',
              content: 'Paz de Deus, irmãos!',
              stickers: [],
              views_count: 10,
              expires_at: '2026-08-30T10:00:00Z',
              created_at: '2026-08-29T10:00:00Z',
            },
          ],
          has_unviewed: true,
        },
        {
          user: {
            id: 2,
            name: 'Maria Santos',
            username: 'maria.santos',
          },
          stories: [
            {
              id: 2,
              user_id: 2,
              media_url: 'https://picsum.photos/400/701',
              type: 'image',
              content: 'Hino 374 - Santo! Santo! Santo!',
              stickers: [],
              views_count: 20,
              expires_at: '2026-08-30T10:00:00Z',
              created_at: '2026-08-29T09:00:00Z',
            },
          ],
          has_unviewed: false,
        },
      ];
      setStoryGroups(mockStories);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar stories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar story
  const createStory = useCallback(async (data: {
    media_url: string;
    type: 'image' | 'video' | 'text';
    content?: string;
    stickers?: any[];
  }) => {
    try {
      // TODO: Criar story via API
      const newStory: Story = {
        id: Date.now(),
        user_id: 1, // TODO: Pegar do usuário logado
        media_url: data.media_url,
        type: data.type,
        content: data.content,
        stickers: data.stickers || [],
        views_count: 0,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      };

      // Adicionar ao grupo de stories do usuário
      setStoryGroups((prev) => {
        const existingGroup = prev.find((g) => g.user.id === newStory.user_id);
        if (existingGroup) {
          return prev.map((g) =>
            g.user.id === newStory.user_id
              ? { ...g, stories: [...g.stories, newStory] }
              : g
          );
        } else {
          return [
            ...prev,
            {
              user: { id: 1, name: 'Você', username: 'voce' },
              stories: [newStory],
              has_unviewed: false,
            },
          ];
        }
      });

      return { success: true, story: newStory };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar story' };
    }
  }, []);

  // Visualizar story
  const viewStory = useCallback(async (storyId: number) => {
    try {
      // TODO: Marcar story como visualizado via API
      setStoryGroups((prev) =>
        prev.map((group) => ({
          ...group,
          stories: group.stories.map((story) =>
            story.id === storyId ? { ...story, is_viewed: true } : story
          ),
        }))
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao visualizar story' };
    }
  }, []);

  // Deletar story
  const deleteStory = useCallback(async (storyId: number) => {
    try {
      // TODO: Deletar story via API
      setStoryGroups((prev) =>
        prev.map((group) => ({
          ...group,
          stories: group.stories.filter((story) => story.id !== storyId),
        }))
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao deletar story' };
    }
  }, []);

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  return {
    storyGroups,
    isLoading,
    error,
    loadStories,
    createStory,
    viewStory,
    deleteStory,
  };
};
