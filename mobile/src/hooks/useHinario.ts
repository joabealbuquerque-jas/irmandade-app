import { useState, useEffect, useCallback } from 'react';

interface Hino {
  id: number;
  numero: number;
  titulo: string;
  tom: string;
  categoria: string;
  letra: string;
  is_favorito: boolean;
}

export const useHinario = () => {
  const [hinos, setHinos] = useState<Hino[]>([]);
  const [hinosFavoritos, setHinosFavoritos] = useState<Hino[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar hinos
  const loadHinos = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar hinos da API
      const mockHinos: Hino[] = [
        {
          id: 1,
          numero: 1,
          titulo: 'Cristo, meu Mestre',
          tom: 'Dó Maior',
          categoria: 'Adoração',
          letra: 'Cristo, meu Mestre, a Ti eu clamo\nDá-me a Tua paz, ó Senhor\nDá-me a Tua graça e salvação\nE vida eterna, ó Salvador',
          is_favorito: false,
        },
        {
          id: 2,
          numero: 2,
          titulo: 'De Deus Tu És Eleita',
          tom: 'Si Bemol',
          categoria: 'Adoração',
          letra: 'De Deus tu és eleita\nÓ alma que chora\nVem a Cristo, vem agora\nEle te consola',
          is_favorito: false,
        },
        {
          id: 3,
          numero: 3,
          titulo: 'Faz-nos Ouvir Tua Voz',
          tom: 'Mi Bemol',
          categoria: 'Oração',
          letra: 'Faz-nos ouvir Tua voz\nÓ Senhor, ó Senhor\nPara que nós conheçamos\nO Teu amor, o Teu amor',
          is_favorito: false,
        },
        {
          id: 4,
          numero: 4,
          titulo: 'Ouve a Nossa Oração',
          tom: 'Fá Maior',
          categoria: 'Oração',
          letra: 'Ouve a nossa oração\nÓ Senhor, ó Senhor\nAtende à nossa súplica\nCom amor, com amor',
          is_favorito: false,
        },
        {
          id: 5,
          numero: 5,
          titulo: 'A Rocha Celestial',
          tom: 'Lá Maior',
          categoria: 'Adoração',
          letra: 'A Rocha celestial\nÉ Jesus, é Jesus\nO Salvador do mundo\nÉ Jesus, é Jesus',
          is_favorito: false,
        },
        {
          id: 6,
          numero: 6,
          titulo: 'Glória ao Justo, Fiel Cordeiro',
          tom: 'Dó Maior',
          categoria: 'Adoração',
          letra: 'Glória ao justo, Fiel Cordeiro\nGlória ao Salvador\nGlória ao Rei verdadeiro\nGlória ao Senhor',
          is_favorito: false,
        },
        {
          id: 7,
          numero: 7,
          titulo: 'Granjeai, Granjeai os Talentos',
          tom: 'Si Bemol',
          categoria: 'Exortação',
          letra: 'Granjeai, granjeai os talentos\nQue Deus vos confiou\nPara que no dia do Senhor\nSejais bem-vindo, ó irmão',
          is_favorito: false,
        },
        {
          id: 8,
          numero: 8,
          titulo: 'Oh! Vem, Sim, Vem',
          tom: 'Mi Bemol',
          categoria: 'Evangelístico',
          letra: 'Oh! Vem, sim, vem\nJesus te chama\nVem a Ele, vem agora\nEle te salva',
          is_favorito: false,
        },
        {
          id: 9,
          numero: 9,
          titulo: 'Santo! Santo! Santo!',
          tom: 'Fá Maior',
          categoria: 'Adoração',
          letra: 'Santo! Santo! Santo!\nDeus Todo-Poderoso\nCéus e terra proclamam\nSanto és Tu, Senhor',
          is_favorito: false,
        },
        {
          id: 10,
          numero: 10,
          titulo: 'A Minha Alma Deseja Ver-Te',
          tom: 'Lá Maior',
          categoria: 'Adoração',
          letra: 'A minha alma deseja ver-Te\nÓ meu Salvador\nPara contemplar a Tua face\nCom amor, com amor',
          is_favorito: false,
        },
      ];
      setHinos(mockHinos);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar hinos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar favoritos
  const loadFavoritos = useCallback(async () => {
    try {
      // TODO: Carregar favoritos da API
      const mockFavoritos: Hino[] = [];
      setHinosFavoritos(mockFavoritos);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar favoritos');
    }
  }, []);

  // Buscar hinos
  const searchHinos = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      // TODO: Buscar hinos na API
      const mockHinos: Hino[] = [];
      setHinos(mockHinos);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao buscar hinos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Adicionar favorito
  const addFavorito = useCallback(async (hinoId: number) => {
    try {
      // TODO: Adicionar favorito na API
      setHinos((prev) =>
        prev.map((hino) =>
          hino.id === hinoId ? { ...hino, is_favorito: true } : hino
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao adicionar favorito' };
    }
  }, []);

  // Remover favorito
  const removeFavorito = useCallback(async (hinoId: number) => {
    try {
      // TODO: Remover favorito na API
      setHinos((prev) =>
        prev.map((hino) =>
          hino.id === hinoId ? { ...hino, is_favorito: false } : hino
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao remover favorito' };
    }
  }, []);

  useEffect(() => {
    loadHinos();
    loadFavoritos();
  }, [loadHinos, loadFavoritos]);

  return {
    hinos,
    hinosFavoritos,
    isLoading,
    error,
    loadHinos,
    loadFavoritos,
    searchHinos,
    addFavorito,
    removeFavorito,
  };
};
