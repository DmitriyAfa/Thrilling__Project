import { lazy } from 'react';

export const MainPageAsync = lazy(
  // имитируем загрузку тяжелого контента для демонстрации suspense
  () => new Promise((resolve: any) => {
    setTimeout(() => resolve(import('./MainPage')), 400);
  }),
);
