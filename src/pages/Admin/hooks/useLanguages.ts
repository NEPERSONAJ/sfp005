import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface Language {
  code: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLanguages = async () => {
    try {
      const { data, error: languagesError } = await supabase
        .from('license_system.languages')
        .select('*')
        .order('created_at', { ascending: true });

      if (languagesError) throw languagesError;
      setLanguages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch languages'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = async (code: string) => {
    try {
      const language = languages.find((l) => l.code === code);
      if (!language) return;

      const { error } = await supabase
        .from('license_system.languages')
        .update({ is_active: !language.is_active })
        .eq('code', code);

      if (error) throw error;
      await fetchLanguages();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to toggle language status');
    }
  };

  const addLanguage = async () => {
    // This would typically open a modal or form to add a new language
    console.log('Add language functionality to be implemented');
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return { languages, isLoading, error, toggleLanguage, addLanguage };
}