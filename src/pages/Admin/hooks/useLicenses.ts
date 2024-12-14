import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface AdminLicense {
  id: string;
  user_id: string;
  user_email: string;
  product_name: string;
  license_key: string;
  status: string;
  expires_at: string;
}

export function useLicenses() {
  const [licenses, setLicenses] = useState<AdminLicense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLicenses = async () => {
    try {
      const { data, error: licensesError } = await supabase
        .from('license_system.licenses')
        .select(`
          *,
          product:license_system.products(name),
          user:auth.users(email)
        `)
        .order('created_at', { ascending: false });

      if (licensesError) throw licensesError;

      const formattedLicenses = data.map((license) => ({
        id: license.id,
        user_id: license.user_id,
        user_email: license.user?.email || '',
        product_name: license.product?.name?.ru || '',
        license_key: license.license_key,
        status: license.status,
        expires_at: license.expires_at,
      }));

      setLicenses(formattedLicenses);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch licenses'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateLicenseStatus = async (licenseId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('license_system.licenses')
        .update({ status })
        .eq('id', licenseId);

      if (error) throw error;
      await fetchLicenses();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update license status');
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return { licenses, isLoading, error, updateLicenseStatus };
}