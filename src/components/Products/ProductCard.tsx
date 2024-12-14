import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <Package className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {product.name[currentLang]}
        </h3>
        <p className="text-gray-600 mb-4">
          {product.description[currentLang]}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('products.viewDetails')}
        </Link>
      </div>
    </motion.div>
  );
}