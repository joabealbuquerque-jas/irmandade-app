import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
}

interface ProfessionalPage {
  id: number;
  user_id: number;
  business_name: string;
  description?: string;
  logo_url?: string;
  cover_url?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  city?: string;
  state?: string;
  plan: 'basic' | 'professional' | 'premium';
  status: 'active' | 'inactive' | 'suspended';
  plan_expires_at?: string;
  created_at: string;
  user?: User;
}

export const useProfessionalPages = () => {
  const [pages, setPages] = useState<ProfessionalPage[]>([]);
  const [myPage, setMyPage] = useState<ProfessionalPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar páginas
  const loadPages = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar páginas da API
      const mockPages: ProfessionalPage[] = [
        {
          id: 1,
          user_id: 1,
          business_name: 'Livraria Cristã',
          description: 'Livros e bíblias para a edificação espiritual',
          phone: '(11) 99999-9999',
          whatsapp: '(11) 99999-9999',
          website: 'www.livrariacrista.com.br',
          instagram: '@livrariacrista',
          facebook: 'livrariacrista',
          youtube: 'livrariacrista',
          city: 'São Paulo',
          state: 'SP',
          plan: 'premium',
          status: 'active',
          plan_expires_at: '2027-08-29',
          created_at: '2026-08-29T10:00:00Z',
        },
      ];
      setPages(mockPages);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar páginas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar minha página
  const loadMyPage = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar minha página da API
      const mockPage: ProfessionalPage = {
        id: 1,
        user_id: 1,
        business_name: 'Livraria Cristã',
        description: 'Livros e bíblias para a edificação espiritual',
        phone: '(11) 99999-9999',
        whatsapp: '(11) 99999-9999',
        website: 'www.livrariacrista.com.br',
        instagram: '@livrariacrista',
        facebook: 'livrariacrista',
        youtube: 'livrariacrista',
        city: 'São Paulo',
        state: 'SP',
        plan: 'premium',
        status: 'active',
        plan_expires_at: '2027-08-29',
        created_at: '2026-08-29T10:00:00Z',
      };
      setMyPage(mockPage);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar minha página');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar página
  const createPage = useCallback(async (data: {
    business_name: string;
    description?: string;
    phone?: string;
    whatsapp?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    city?: string;
    state?: string;
    plan?: string;
  }) => {
    try {
      // TODO: Criar página via API
      const newPage: ProfessionalPage = {
        id: Date.now(),
        user_id: 1, // TODO: Pegar do usuário logado
        business_name: data.business_name,
        description: data.description,
        phone: data.phone,
        whatsapp: data.whatsapp,
        website: data.website,
        instagram: data.instagram,
        facebook: data.facebook,
        youtube: data.youtube,
        city: data.city,
        state: data.state,
        plan: (data.plan as any) || 'basic',
        status: 'active',
        plan_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      };

      setPages((prev) => [newPage, ...prev]);
      setMyPage(newPage);
      return { success: true, page: newPage };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar página' };
    }
  }, []);

  // Atualizar página
  const updatePage = useCallback(async (pageId: number, data: Partial<ProfessionalPage>) => {
    try {
      // TODO: Atualizar página via API
      setPages((prev) =>
        prev.map((page) =>
          page.id === pageId ? { ...page, ...data } : page
        )
      );
      if (myPage?.id === pageId) {
        setMyPage((prev) => (prev ? { ...prev, ...data } : null));
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao atualizar página' };
    }
  }, [myPage]);

  // Deletar página
  const deletePage = useCallback(async (pageId: number) => {
    try {
      // TODO: Deletar página via API
      setPages((prev) => prev.filter((page) => page.id !== pageId));
      if (myPage?.id === pageId) {
        setMyPage(null);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao deletar página' };
    }
  }, [myPage]);

  useEffect(() => {
    loadPages();
    loadMyPage();
  }, [loadPages, loadMyPage]);

  return {
    pages,
    myPage,
    isLoading,
    error,
    loadPages,
    loadMyPage,
    createPage,
    updatePage,
    deletePage,
  };
};
