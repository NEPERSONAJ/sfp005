import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LicenseManager</h3>
            <p className="text-gray-400">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-gray-400 hover:text-white">
                  {t('products')}
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-400 hover:text-white">
                  {t('profile')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <p className="text-gray-400">
              support@licensemanager.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          © {currentYear} LicenseManager. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}