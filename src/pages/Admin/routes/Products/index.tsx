import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductsList } from './ProductsList';
import { ProductForm } from './ProductForm';

export function Products() {
  return (
    <Routes>
      <Route index element={<ProductsList />} />
      <Route path="new" element={<ProductForm />} />
      <Route path=":id/edit" element={<ProductForm />} />
    </Routes>
  );
}