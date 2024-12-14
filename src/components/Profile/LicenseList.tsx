import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { License } from '../../types/license';

interface LicenseListProps {
  licenses: License[];
}

export function LicenseList({ licenses }: LicenseListProps) {
  const { t } = useTranslation();

  if (licenses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        {t('profile.noLicenses')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {licenses.map((license) => (
        <div
          key={license.id}
          className="border rounded-lg p-4 hover:bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{license.product_name}</h3>
              <p className="text-sm text-gray-600">
                {t('profile.licenseKey')}: {license.license_key}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                license.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {t(`profile.status.${license.status}`)}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>
              {t('profile.expires')}: {format(new Date(license.expires_at), 'PP')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}