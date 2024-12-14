import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Product } from '../../../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('license_system.products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('license_system.products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete product'));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, deleteProduct, refetch: fetchProducts };
}