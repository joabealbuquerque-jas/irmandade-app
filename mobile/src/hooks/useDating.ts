import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  congregation?: string;
  city?: string;
  state?: string;
  baptism_date?: string;
}

interface Match {
  id: number;
  user_id: number;
  matched_user_id: number;
  status: 'pending' | 'matched' | 'rejected';
  created_at: string;
  user?: User;
  matched_user?: User;
}

interface DatingProfile {
  id: number;
  user_id: number;
  bio: string;
  looking_for: string;
  age: number;
  gender: string;
  interests: string[];
  photos: string[];
  is_active: boolean;
  created_at: string;
  user?: User;
}

export const useDating = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [pendingMatches, setPendingMatches] = useState<Match[]>([]);
  const [datingProfile, setDatingProfile] = useState<DatingProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar matches
  const loadMatches = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar matches da API
      const mockMatches: Match[] = [
        {
          id: 1,
          user_id: 1,
          matched_user_id: 2,
          status: 'matched',
          created_at: '2026-08-29T10:00:00Z',
          matched_user: {
            id: 2,
            name: 'Maria Santos',
            username: 'maria.santos',
            bio: 'Serva de Deus',
            congregation: 'Congregação Central',
            city: 'São Paulo',
            state: 'SP',
          },
        },
        {
          id: 2,
          user_id: 1,
          matched_user_id: 3,
          status: 'pending',
          created_at: '2026-08-29T09:00:00Z',
          matched_user: {
            id: 3,
            name: 'Ana Oliveira',
            username: 'ana.oliveira',
            bio: 'Membro da CCB',
            congregation: 'Congregação Sul',
            city: 'São Paulo',
            state: 'SP',
          },
        },
      ];
      setMatches(mockMatches.filter((m) => m.status === 'matched'));
      setPendingMatches(mockMatches.filter((m) => m.status === 'pending'));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar matches');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar perfil de namoro
  const loadDatingProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar perfil de namoro da API
      const mockProfile: DatingProfile = {
        id: 1,
        user_id: 1,
        bio: 'Servo de Deus buscando um relacionamento sério',
        looking_for: 'Uma irmã na fé para caminhar juntos',
        age: 28,
        gender: 'male',
        interests: ['Louvor', 'Estudo Bíblico', 'Missões'],
        photos: [],
        is_active: true,
        created_at: '2026-08-29T10:00:00Z',
      };
      setDatingProfile(mockProfile);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar perfil');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar perfil de namoro
  const createDatingProfile = useCallback(async (data: {
    bio: string;
    looking_for: string;
    age: number;
    gender: string;
    interests: string[];
    photos: string[];
  }) => {
    try {
      // TODO: Criar perfil via API
      const newProfile: DatingProfile = {
        id: Date.now(),
        user_id: 1, // TODO: Pegar do usuário logado
        bio: data.bio,
        looking_for: data.looking_for,
        age: data.age,
        gender: data.gender,
        interests: data.interests,
        photos: data.photos,
        is_active: true,
        created_at: new Date().toISOString(),
      };

      setDatingProfile(newProfile);
      return { success: true, profile: newProfile };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar perfil' };
    }
  }, []);

  // Dar like em usuário
  const likeUser = useCallback(async (userId: number) => {
    try {
      // TODO: Dar like via API
      const newMatch: Match = {
        id: Date.now(),
        user_id: 1, // TODO: Pegar do usuário logado
        matched_user_id: userId,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      setPendingMatches((prev) => [...prev, newMatch]);
      return { success: true, match: newMatch };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao dar like' };
    }
  }, []);

  // Aceitar match
  const acceptMatch = useCallback(async (matchId: number) => {
    try {
      // TODO: Aceitar match via API
      setPendingMatches((prev) =>
        prev.map((match) =>
          match.id === matchId ? { ...match, status: 'matched' } : match
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao aceitar match' };
    }
  }, []);

  // Rejeitar match
  const rejectMatch = useCallback(async (matchId: number) => {
    try {
      // TODO: Rejeitar match via API
      setPendingMatches((prev) => prev.filter((match) => match.id !== matchId));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao rejeitar match' };
    }
  }, []);

  useEffect(() => {
    loadMatches();
    loadDatingProfile();
  }, [loadMatches, loadDatingProfile]);

  return {
    matches,
    pendingMatches,
    datingProfile,
    isLoading,
    error,
    loadMatches,
    loadDatingProfile,
    createDatingProfile,
    likeUser,
    acceptMatch,
    rejectMatch,
  };
};
