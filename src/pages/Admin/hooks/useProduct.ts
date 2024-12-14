import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Product } from '../../../types/product';

interface ProductFormData {
  name: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
}

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('license_system.products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const saveProduct = async (formData: ProductFormData) => {
    try {
      const data = {
        name: formData.name,
        description: formData.description,
      };

      if (id) {
        const { error } = await supabase
          .from('license_system.products')
          .update(data)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('license_system.products')
          .insert([data]);
        if (error) throw error;
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to save product');
    }
  };

  return { product, isLoading, error, saveProduct };
}