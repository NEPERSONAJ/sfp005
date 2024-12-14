import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { License } from '../types/license';

export function useLicenses(userId?: string) {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    async function fetchLicenses() {
      try {
        const { data, error } = await supabase
          .from('license_system.licenses')
          .select(`
            *,
            product:license_system.products(name)
          `)
          .eq('user_id', userId);

        if (error) throw error;
        setLicenses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch licenses'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchLicenses();
  }, [userId]);

  return { licenses, isLoading, error };
}