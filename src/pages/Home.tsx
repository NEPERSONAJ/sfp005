import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Key, Lock } from 'lucide-react';

export function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: t('home.features.security.title'),
      description: t('home.features.security.description')
    },
    {
      icon: <Key className="w-12 h-12 text-blue-600" />,
      title: t('home.features.licensing.title'),
      description: t('home.features.licensing.description')
    },
    {
      icon: <Lock className="w-12 h-12 text-blue-600" />,
      title: t('home.features.protection.title'),
      description: t('home.features.protection.description')
    }
  ];

  return (
    <div className="space-y-20">
      <section className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {t('home.hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-8"
        >
          {t('home.hero.subtitle')}
        </motion.p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}