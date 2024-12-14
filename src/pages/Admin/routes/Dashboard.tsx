import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useStats } from '../hooks/useStats';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export function Dashboard() {
  const { t } = useTranslation();
  const { stats, isLoading, error } = useStats();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-600">
        {t('admin.dashboard.error')}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('admin.dashboard.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-gray-600 text-sm mb-2">
              {t(`admin.dashboard.stats.${key}`)}
            </h3>
            <p className="text-3xl font-bold">{value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}