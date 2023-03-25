import { lazy } from 'react';

export const ArticlesPageAsync = lazy(
  () => new Promise((res: any) => {
    setTimeout(() => res(import('./ArticlesPage')), 400);
  }),
);