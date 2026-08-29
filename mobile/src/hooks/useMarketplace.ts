import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
}

interface Product {
  id: number;
  seller_id: number;
  title: string;
  description?: string;
  price: number;
  currency: string;
  images: string[];
  category: 'books' | 'clothing' | 'accessories' | 'music' | 'art' | 'services' | 'food' | 'other';
  status: 'active' | 'sold' | 'paused' | 'removed';
  views_count: number;
  created_at: string;
  seller?: User;
}

export const useMarketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar produtos
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar produtos da API
      const mockProducts: Product[] = [
        {
          id: 1,
          seller_id: 1,
          title: 'Bíblia de Estudo ARA',
          description: 'Bíblia de estudo completa com notas e comentários',
          price: 89.90,
          currency: 'BRL',
          images: ['https://picsum.photos/400/400'],
          category: 'books',
          status: 'active',
          views_count: 25,
          created_at: '2026-08-29T10:00:00Z',
        },
        {
          id: 2,
          seller_id: 2,
          title: 'CD Hinos CCB 2024',
          description: 'CD com os mais recentes hinos da congregação',
          price: 25.00,
          currency: 'BRL',
          images: ['https://picsum.photos/400/401'],
          category: 'music',
          status: 'active',
          views_count: 15,
          created_at: '2026-08-29T09:00:00Z',
        },
        {
          id: 3,
          seller_id: 3,
          title: 'Camiseta Modéstia CCB',
          description: 'Camiseta 100% algodão com estampa cristã',
          price: 45.00,
          currency: 'BRL',
          images: ['https://picsum.photos/400/402'],
          category: 'clothing',
          status: 'active',
          views_count: 30,
          created_at: '2026-08-28T10:00:00Z',
        },
      ];
      setProducts(mockProducts);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar produto
  const createProduct = useCallback(async (data: {
    title: string;
    description?: string;
    price: number;
    images: string[];
    category: string;
  }) => {
    try {
      // TODO: Criar produto via API
      const newProduct: Product = {
        id: Date.now(),
        seller_id: 1, // TODO: Pegar do usuário logado
        title: data.title,
        description: data.description,
        price: data.price,
        currency: 'BRL',
        images: data.images,
        category: data.category as any,
        status: 'active',
        views_count: 0,
        created_at: new Date().toISOString(),
      };

      setProducts((prev) => [newProduct, ...prev]);
      return { success: true, product: newProduct };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar produto' };
    }
  }, []);

  // Atualizar produto
  const updateProduct = useCallback(async (productId: number, data: Partial<Product>) => {
    try {
      // TODO: Atualizar produto via API
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, ...data } : product
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao atualizar produto' };
    }
  }, []);

  // Deletar produto
  const deleteProduct = useCallback(async (productId: number) => {
    try {
      // TODO: Deletar produto via API
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao deletar produto' };
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
