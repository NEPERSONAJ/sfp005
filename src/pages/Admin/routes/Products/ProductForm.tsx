import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProduct } from '../../hooks/useProduct';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';

const productSchema = z.object({
  name: z.object({
    ru: z.string().min(1, 'Обязательное поле'),
    en: z.string().min(1, 'Required field'),
  }),
  description: z.object({
    ru: z.string().min(1, 'Обязательное поле'),
    en: z.string().min(1, 'Required field'),
  }),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, isLoading, error, saveProduct } = useProduct(id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: { ru: '', en: '' },
      description: { ru: '', en: '' },
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error.message}</div>;

  const onSubmit = async (data: ProductFormData) => {
    try {
      await saveProduct(data);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {id ? t('admin.products.edit') : t('admin.products.create')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">{t('admin.products.nameSection')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('admin.products.nameRu')}
                  </label>
                  <input
                    type="text"
                    {...register('name.ru')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.name?.ru && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.ru.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('admin.products.nameEn')}
                  </label>
                  <input
                    type="text"
                    {...register('name.en')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.name?.en && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.en.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">{t('admin.products.descriptionSection')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('admin.products.descriptionRu')}
                  </label>
                  <textarea
                    {...register('description.ru')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.description?.ru && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.ru.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('admin.products.descriptionEn')}
                  </label>
                  <textarea
                    {...register('description.en')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.description?.en && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.en.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </form>
    </div>
  );
}