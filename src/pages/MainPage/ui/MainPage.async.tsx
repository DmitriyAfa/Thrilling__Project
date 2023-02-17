import { lazy } from 'react';

export const MainPageAsync = lazy(
  // имитируем загрузку тяжелого контента для демонстрации suspense
  () => {
    return new Promise((resolve: any) => {
      setTimeout(() => { return resolve(import('./MainPage')); }, 1500);
    });
  },
);
