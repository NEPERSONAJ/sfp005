import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            LicenseManager
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/products" className="text-gray-700 hover:text-gray-900">
              {t('products')}
            </Link>
            {user && (
              <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                {t('profile')}
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}