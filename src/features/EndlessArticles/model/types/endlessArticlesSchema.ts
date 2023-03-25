import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface EndlessArticlesSchema extends EntityState<Article> {
  view: ArticleView;

  isLoading?: boolean;
  error?: string;
}