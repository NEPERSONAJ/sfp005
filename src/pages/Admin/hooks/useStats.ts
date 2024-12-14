import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface Stats {
  totalUsers: number;
  totalProducts: number;
  activeLicenses: number;
  totalRevenue: number;
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    activeLicenses: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: usersCount },
          { count: productsCount },
          { count: licensesCount },
        ] = await Promise.all([
          supabase
            .from('license_system.user_profiles')
            .select('id', { count: 'exact' }),
          supabase
            .from('license_system.products')
            .select('id', { count: 'exact' }),
          supabase
            .from('license_system.licenses')
            .select('id', { count: 'exact' })
            .eq('status', 'active'),
        ]);

        setStats({
          totalUsers: usersCount || 0,
          totalProducts: productsCount || 0,
          activeLicenses: licensesCount || 0,
          totalRevenue: 0, // This would need to be calculated from a payments table
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}