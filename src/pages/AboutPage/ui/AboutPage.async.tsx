import { lazy } from 'react';

export const AboutPageAsync = lazy(
  // имитируем загрузку тяжелого контента для демонстрации suspense
  () => {
    return new Promise((resolve: any) => {
      setTimeout(() => { return resolve(import('./AboutPage')); }, 1500);
    });
  },
);
