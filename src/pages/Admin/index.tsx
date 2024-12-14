import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAdminCheck } from '../../hooks/useAdminCheck';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard, Products, Users, Licenses, Languages } from './routes';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export function Admin() {
  const { user } = useAuth();
  const { isAdmin, isLoading } = useAdminCheck(user?.id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="products/*" element={<Products />} />
        <Route path="users" element={<Users />} />
        <Route path="licenses" element={<Licenses />} />
        <Route path="languages" element={<Languages />} />
      </Routes>
    </AdminLayout>
  );
}