import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Plus } from 'lucide-react';
import { useLanguages } from '../../hooks/useLanguages';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';

export function Languages() {
  const { t } = useTranslation();
  const { languages, isLoading, error, toggleLanguage, addLanguage } = useLanguages();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">{t('admin.languages.title')}</h1>
        </div>
        <button
          onClick={() => addLanguage()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          {t('admin.languages.addNew')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((language) => (
          <motion.div
            key={language.code}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{language.name}</h3>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={language.is_active}
                  onChange={() => toggleLanguage(language.code)}
                  className="sr-only peer"
                  id={`toggle-${language.code}`}
                />
                <label
                  htmlFor={`toggle-${language.code}`}
                  className="block h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full cursor-pointer transition-colors"
                >
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6" />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {t('admin.languages.code')}: {language.code}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}