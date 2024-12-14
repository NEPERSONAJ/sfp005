import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useLicenses } from '../hooks/useLicenses';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { LicenseList } from '../components/Profile/LicenseList';

export function Profile() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { licenses, isLoading, error } = useLicenses(user?.id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {t('profile.error')}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{t('profile.title')}</h1>
        <p className="text-gray-600">{t('profile.description')}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{t('profile.licenses')}</h2>
        <LicenseList licenses={licenses} />
      </div>
    </div>
  );
}