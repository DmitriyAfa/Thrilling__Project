import { EntityState } from '@reduxjs/toolkit';
import { Article } from './article';

export interface ArticleRecommendsSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}