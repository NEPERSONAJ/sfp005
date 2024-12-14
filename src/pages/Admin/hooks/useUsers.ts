import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface User {
  id: string;
  email: string;
  role: string;
  active_licenses_count: number;
  created_at: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data: profiles, error: profilesError } = await supabase
          .from('license_system.user_profiles')
          .select(`
            id,
            role,
            created_at,
            user:auth.users(email)
          `);

        if (profilesError) throw profilesError;

        const { data: licenseCounts, error: licensesError } = await supabase
          .from('license_system.licenses')
          .select('user_id, status')
          .eq('status', 'active');

        if (licensesError) throw licensesError;

        const userLicenseCounts = licenseCounts.reduce((acc, license) => {
          acc[license.user_id] = (acc[license.user_id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const formattedUsers = profiles.map((profile) => ({
          id: profile.id,
          email: profile.user?.email || '',
          role: profile.role,
          active_licenses_count: userLicenseCounts[profile.id] || 0,
          created_at: profile.created_at,
        }));

        setUsers(formattedUsers);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, isLoading, error };
}