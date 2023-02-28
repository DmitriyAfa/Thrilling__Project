import { lazy } from 'react';

export const ProfilePageAsync = lazy(
  // имитируем загрузку тяжелого контента для демонстрации suspense
  () => new Promise((resolve: any) => {
    setTimeout(() => resolve(import('./ProfilePage')), 1500);
  }),
);
