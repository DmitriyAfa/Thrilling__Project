import { lazy } from 'react';

export const ArticleEditPageAsync = lazy(
  () => new Promise((resolve: any) => {
    setTimeout(() => resolve(import('./ArticleEditPage')), 400);
  }),
);