import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { useLicenses } from '../../hooks/useLicenses';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';

export function Licenses() {
  const { t } = useTranslation();
  const { licenses, isLoading, error, updateLicenseStatus } = useLicenses();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error.message}</div>;

  const handleStatusChange = async (licenseId: string, newStatus: string) => {
    try {
      await updateLicenseStatus(licenseId, newStatus);
    } catch (error) {
      console.error('Error updating license status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Key className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">{t('admin.licenses.title')}</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.licenses.product')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.licenses.user')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.licenses.key')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.licenses.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.licenses.expiresAt')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {licenses.map((license) => (
              <motion.tr
                key={license.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {license.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {license.user_email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                  {license.license_key}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={license.status}
                    onChange={(e) => handleStatusChange(license.id, e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="active">{t('admin.licenses.statuses.active')}</option>
                    <option value="suspended">{t('admin.licenses.statuses.suspended')}</option>
                    <option value="expired">{t('admin.licenses.statuses.expired')}</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(license.expires_at).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}