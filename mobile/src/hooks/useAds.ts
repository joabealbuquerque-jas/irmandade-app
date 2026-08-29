import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
}

interface Ad {
  id: number;
  page_id: number;
  title: string;
  description?: string;
  media_url: string;
  format: 'feed' | 'story' | 'sidebar' | 'banner' | 'reels';
  target_url?: string;
  target_audience: {
    age_min?: number;
    age_max?: number;
    gender?: string;
    city?: string;
    state?: string;
    congregation?: string;
  };
  impressions_count: number;
  clicks_count: number;
  budget: number;
  status: 'active' | 'paused' | 'completed' | 'rejected';
  start_date?: string;
  end_date?: string;
  created_at: string;
  page?: {
    id: number;
    business_name: string;
    logo_url?: string;
  };
}

export const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [myAds, setMyAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar anúncios
  const loadAds = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar anúncios da API
      const mockAds: Ad[] = [
        {
          id: 1,
          page_id: 1,
          title: 'Livraria Cristã - Oferta Especial',
          description: 'Bíblias com 30% de desconto',
          media_url: 'https://picsum.photos/400/300',
          format: 'feed',
          target_url: 'https://livrariacrista.com.br',
          target_audience: {
            age_min: 18,
            age_max: 60,
            city: 'São Paulo',
            state: 'SP',
          },
          impressions_count: 1500,
          clicks_count: 45,
          budget: 100.00,
          status: 'active',
          start_date: '2026-08-29',
          end_date: '2026-09-29',
          created_at: '2026-08-29T10:00:00Z',
          page: {
            id: 1,
            business_name: 'Livraria Cristã',
          },
        },
      ];
      setAds(mockAds);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar anúncios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar meus anúncios
  const loadMyAds = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar meus anúncios da API
      const mockAds: Ad[] = [
        {
          id: 1,
          page_id: 1,
          title: 'Livraria Cristã - Oferta Especial',
          description: 'Bíblias com 30% de desconto',
          media_url: 'https://picsum.photos/400/300',
          format: 'feed',
          target_url: 'https://livrariacrista.com.br',
          target_audience: {
            age_min: 18,
            age_max: 60,
            city: 'São Paulo',
            state: 'SP',
          },
          impressions_count: 1500,
          clicks_count: 45,
          budget: 100.00,
          status: 'active',
          start_date: '2026-08-29',
          end_date: '2026-09-29',
          created_at: '2026-08-29T10:00:00Z',
        },
      ];
      setMyAds(mockAds);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar anúncios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar anúncio
  const createAd = useCallback(async (data: {
    title: string;
    description?: string;
    media_url: string;
    format: string;
    target_url?: string;
    target_audience?: any;
    budget: number;
    start_date?: string;
    end_date?: string;
  }) => {
    try {
      // TODO: Criar anúncio via API
      const newAd: Ad = {
        id: Date.now(),
        page_id: 1, // TODO: Pegar da página profissional
        title: data.title,
        description: data.description,
        media_url: data.media_url,
        format: data.format as any,
        target_url: data.target_url,
        target_audience: data.target_audience || {},
        impressions_count: 0,
        clicks_count: 0,
        budget: data.budget,
        status: 'active',
        start_date: data.start_date,
        end_date: data.end_date,
        created_at: new Date().toISOString(),
      };

      setMyAds((prev) => [newAd, ...prev]);
      return { success: true, ad: newAd };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar anúncio' };
    }
  }, []);

  // Atualizar anúncio
  const updateAd = useCallback(async (adId: number, data: Partial<Ad>) => {
    try {
      // TODO: Atualizar anúncio via API
      setMyAds((prev) =>
        prev.map((ad) =>
          ad.id === adId ? { ...ad, ...data } : ad
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao atualizar anúncio' };
    }
  }, []);

  // Deletar anúncio
  const deleteAd = useCallback(async (adId: number) => {
    try {
      // TODO: Deletar anúncio via API
      setMyAds((prev) => prev.filter((ad) => ad.id !== adId));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao deletar anúncio' };
    }
  }, []);

  // Pausar anúncio
  const pauseAd = useCallback(async (adId: number) => {
    try {
      // TODO: Pausar anúncio via API
      setMyAds((prev) =>
        prev.map((ad) =>
          ad.id === adId ? { ...ad, status: 'paused' } : ad
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao pausar anúncio' };
    }
  }, []);

  // Ativar anúncio
  const activateAd = useCallback(async (adId: number) => {
    try {
      // TODO: Ativar anúncio via API
      setMyAds((prev) =>
        prev.map((ad) =>
          ad.id === adId ? { ...ad, status: 'active' } : ad
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao ativar anúncio' };
    }
  }, []);

  useEffect(() => {
    loadAds();
    loadMyAds();
  }, [loadAds, loadMyAds]);

  return {
    ads,
    myAds,
    isLoading,
    error,
    loadAds,
    loadMyAds,
    createAd,
    updateAd,
    deleteAd,
    pauseAd,
    activateAd,
  };
};
