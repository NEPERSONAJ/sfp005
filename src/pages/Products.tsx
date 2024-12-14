import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/Products/ProductCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export function Products() {
  const { t } = useTranslation();
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {t('products.error')}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-4">{t('products.title')}</h1>
        <p className="text-gray-600">{t('products.description')}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}