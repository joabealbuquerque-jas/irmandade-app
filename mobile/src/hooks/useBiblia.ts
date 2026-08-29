import { useState, useEffect, useCallback } from 'react';

interface Livro {
  id: number;
  nome: string;
  abreviatura: string;
  testamento: 'antigo' | 'novo';
  capitulos: number;
}

interface Versiculo {
  id: number;
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

interface Versao {
  id: string;
  nome: string;
  sigla: string;
}

export const useBiblia = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [versaoAtual, setVersaoAtual] = useState<Versao>({ id: 'ara', nome: 'Almeida Revista e Atualizada', sigla: 'ARA' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const versoes: Versao[] = [
    { id: 'ara', nome: 'Almeida Revista e Atualizada', sigla: 'ARA' },
    { id: 'nvi', nome: 'Nova Versão Internacional', sigla: 'NVI' },
    { id: 'arc', nome: 'Almeida Revista e Corrigida', sigla: 'ARC' },
  ];

  // Carregar livros
  const loadLivros = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar livros da API
      const mockLivros: Livro[] = [
        { id: 1, nome: 'Gênesis', abreviatura: 'Gn', testamento: 'antigo', capitulos: 50 },
        { id: 2, nome: 'Êxodo', abreviatura: 'Êx', testamento: 'antigo', capitulos: 40 },
        { id: 3, nome: 'Salmos', abreviatura: 'Sl', testamento: 'antigo', capitulos: 150 },
        { id: 4, nome: 'Provérbios', abreviatura: 'Pv', testamento: 'antigo', capitulos: 31 },
        { id: 5, nome: 'Isaías', abreviatura: 'Is', testamento: 'antigo', capitulos: 66 },
        { id: 6, nome: 'Mateus', abreviatura: 'Mt', testamento: 'novo', capitulos: 28 },
        { id: 7, nome: 'Marcos', abreviatura: 'Mc', testamento: 'novo', capitulos: 16 },
        { id: 8, nome: 'Lucas', abreviatura: 'Lc', testamento: 'novo', capitulos: 24 },
        { id: 9, nome: 'João', abreviatura: 'Jo', testamento: 'novo', capitulos: 21 },
        { id: 10, nome: 'Atos', abreviatura: 'At', testamento: 'novo', capitulos: 28 },
        { id: 11, nome: 'Romanos', abreviatura: 'Rm', testamento: 'novo', capitulos: 16 },
        { id: 12, nome: 'Apocalipse', abreviatura: 'Ap', testamento: 'novo', capitulos: 22 },
      ];
      setLivros(mockLivros);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar livros');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar versículos
  const loadVersiculos = useCallback(async (livro: string, capitulo: number) => {
    try {
      setIsLoading(true);
      // TODO: Carregar versículos da API
      const mockVersiculos: Versiculo[] = [
        {
          id: 1,
          livro,
          capitulo,
          versiculo: 1,
          texto: 'No princípio, Deus criou os céus e a terra.',
        },
        {
          id: 2,
          livro,
          capitulo,
          versiculo: 2,
          texto: 'A terra era sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava sobre as águas.',
        },
        {
          id: 3,
          livro,
          capitulo,
          versiculo: 3,
          texto: 'Disse Deus: "Haja luz", e houve luz.',
        },
        {
          id: 4,
          livro,
          capitulo,
          versiculo: 4,
          texto: 'Deus viu que a luz era boa, e separou a luz das trevas.',
        },
        {
          id: 5,
          livro,
          capitulo,
          versiculo: 5,
          texto: 'Deus chamou à luz Dia, e às trevas chamou Noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.',
        },
      ];
      setVersiculos(mockVersiculos);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar versículos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Buscar versículos
  const searchVersiculos = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      // TODO: Buscar versículos na API
      const mockVersiculos: Versiculo[] = [];
      setVersiculos(mockVersiculos);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao buscar versículos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Versículo do dia
  const versiculoDoDia = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar versículo do dia da API
      const mockVersiculo: Versiculo = {
        id: 1,
        livro: 'João',
        capitulo: 3,
        versiculo: 16,
        texto: 'Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna.',
      };
      return mockVersiculo;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar versículo do dia');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLivros();
  }, [loadLivros]);

  return {
    livros,
    versiculos,
    versaoAtual,
    versoes,
    isLoading,
    error,
    loadLivros,
    loadVersiculos,
    searchVersiculos,
    versiculoDoDia,
    setVersaoAtual,
  };
};
