import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Package,
  Users,
  Key,
  Globe,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { t } = useTranslation();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: t('admin.nav.dashboard') },
    { to: '/admin/products', icon: Package, label: t('admin.nav.products') },
    { to: '/admin/users', icon: Users, label: t('admin.nav.users') },
    { to: '/admin/licenses', icon: Key, label: t('admin.nav.licenses') },
    { to: '/admin/languages', icon: Globe, label: t('admin.nav.languages') },
  ];

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">{t('admin.title')}</h2>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}