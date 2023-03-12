import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(
  () => new Promise((resolve: any) => {
    setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500);
  }),
);